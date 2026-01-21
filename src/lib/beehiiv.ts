export interface Post {
    id: string;
    title: string;
    slug: string;
    subtitle?: string;
    publish_date: number; // Unix timestamp
    thumbnail_url?: string;
    content?: {
        free_web_content?: string;
        premium_web_content?: string;
        free_email_content?: string;
        premium_email_content?: string;
        html?: string; // Legacy fallback
        free?: {
            html: string;
        }
    };
    status: string;
    web_url?: string;
}

const API_KEY = process.env.BEEHIIV_API_KEY;
const PUB_ID = process.env.BEEHIIV_PUBLICATION_ID;

// Mock data for development when API keys are missing
const MOCK_POSTS: Post[] = [
    {
        id: "1",
        title: "The Shift in Old Port",
        slug: "the-shift-in-old-port",
        subtitle: "Why the tourist traps are fading and what’s replacing them.",
        publish_date: 1729766400, // Oct 24 2024
        status: "confirmed",
        content: {
            html: "<p>This is the full content of the issue about Old Port...</p><h2>New Retailers</h2><p>We are seeing a shift...</p>"
        }
    },
    {
        id: "2",
        title: "Metro Line Extension",
        slug: "metro-line-extension",
        subtitle: "The real impact on property values in the east end.",
        publish_date: 1729161600, // Oct 17 2024
        status: "confirmed",
        content: {
            html: "<p>Details about the metro line extension...</p>"
        }
    },
    {
        id: "3",
        title: "Tech Winter",
        slug: "tech-winter",
        subtitle: "Which startups are surviving the funding freeze.",
        publish_date: 1728556800, // Oct 10 2024
        status: "confirmed",
        content: {
            html: "<p>Analysis of the tech sector in Montreal...</p>"
        }
    }
];

export async function getPosts(limit = 10): Promise<Post[]> {
    if (!API_KEY || !PUB_ID) {
        console.warn("Beehiiv API keys missing. Using mock data.");
        // return Promise.resolve([]);
        return Promise.resolve(MOCK_POSTS.slice(0, limit));
    }

    try {
        const res = await fetch(`https://api.beehiiv.com/v2/publications/${PUB_ID}/posts?status=confirmed&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
            },
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            if (res.status === 401) {
                console.error("Beehiiv API Error: 401 Unauthorized. Check your BEEHIIV_API_KEY.");
            } else if (res.status === 400) {
                console.error("Beehiiv API Error: 400 Bad Request. Check your BEEHIIV_PUBLICATION_ID. It should usually start with 'pub_'.");
            }
            throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return data.data; // Beehiiv returns { data: [...], ... }
    } catch (error) {
        // Enhance error visibility for Vercel logs without leaking full secrets
        const maskedPubId = PUB_ID ? `${PUB_ID.substring(0, 4)}...` : 'undefined';
        console.error(`Error fetching posts (Pub ID: ${maskedPubId}):`, error);

        // Return mock data so build doesn't crash
        return MOCK_POSTS;
    }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    if (!API_KEY || !PUB_ID) {
        // Simulate API delay
        await new Promise(r => setTimeout(r, 100));
        const post = MOCK_POSTS.find(p => p.slug === slug);
        return post || null;
    }

    try {
        // Beehiiv API doesn't allow fetching by slug directly in the list endpoint efficiently without filtering,
        // but the standard way is often to list and find, or use the specific endpoint if available.
        // Actually, getPosts usually returns the list.
        // To get content we need the retrieval endpoint: /publications/{publication_id}/posts/{post_id}
        // So we first need to find the ID from the slug.

        // 1. Fetch index to match slug (cached usually)
        const posts = await getPosts(50);
        const postSummary = posts.find(p => p.slug === slug);

        if (!postSummary) return null;

        // CHECK: If this is a mock post, return it immediately without hitting the API
        // This prevents 400 errors if keys are invalid but "present" (e.g. placeholders)
        if (MOCK_POSTS.some(mp => mp.id === postSummary.id)) {
            return postSummary;
        }

        // 2. Fetch full detail from API with web content expanded
        // Beehiiv requires specific expand values: free_web_content, premium_web_content, etc.
        const res = await fetch(`https://api.beehiiv.com/v2/publications/${PUB_ID}/posts/${postSummary.id}?expand=free_web_content,premium_web_content`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
            },
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            console.error(`Failed to fetch post ${postSummary.id}: ${res.status}`);
            return null;
        }

        const data = await res.json();

        // Debug logging to understand response structure
        console.log('=== BEEHIIV POST RESPONSE DEBUG ===');
        console.log('Post ID:', postSummary.id);
        console.log('Post Slug:', slug);
        console.log('Response keys:', Object.keys(data));
        console.log('Data keys:', data.data ? Object.keys(data.data) : 'no data');
        console.log('Content structure:', data.data?.content ? Object.keys(data.data.content) : 'no content');
        console.log('Has content.html?', !!data.data?.content?.html);
        console.log('Has content.free.html?', !!data.data?.content?.free?.html);
        console.log('Content preview:', data.data?.content?.html?.substring(0, 200) || 'EMPTY');
        console.log('=== END DEBUG ===');

        return data.data;

    } catch (error) {
        console.error("Error fetching post by slug:", error);
        return null;
    }
}
