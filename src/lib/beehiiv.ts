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
        await new Promise(r => setTimeout(r, 100));
        const post = MOCK_POSTS.find(p => p.slug === slug);
        return post || null;
    }

    try {
        const url = `https://api.beehiiv.com/v2/publications/${PUB_ID}/posts?expand=free_web_content,premium_web_content&limit=50`;

        console.log('=== BEEHIIV API REQUEST ===');
        console.log('URL:', url);
        console.log('Looking for slug:', slug);
        console.log('=========================');

        const res = await fetch(url, {
            headers: { 'Authorization': `Bearer ${API_KEY}` },
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            console.error(`Failed to fetch posts list: ${res.status}`);
            return null;
        }

        const data = await res.json();
        const posts = data.data || [];

        console.log('=== BEEHIIV API RESPONSE ===');
        console.log('Total posts returned:', posts.length);
        console.log('First post keys:', posts[0] ? Object.keys(posts[0]) : 'no posts');
        console.log('First post has content field?', posts[0] ? !!posts[0].content : 'N/A');
        if (posts[0]?.content) {
            console.log('Content keys:', Object.keys(posts[0].content));
        }
        console.log('============================');

        const post = posts.find((p: Post) => p.slug === slug);

        if (!post) {
            console.warn(`Post with slug "${slug}" not found in ${posts.length} posts`);
            console.log('Available slugs:', posts.map((p: Post) => p.slug).join(', '));
            return null;
        }

        console.log('=== POST CONTENT CHECK ===');
        console.log('Slug:', slug);
        console.log('Post keys:', Object.keys(post));
        console.log('Has content?', !!post.content);
        console.log('Has free_web_content?', !!post.content?.free_web_content);
        console.log('Preview:', post.content?.free_web_content?.substring(0, 150) || 'EMPTY');
        console.log('=== END ===');

        return post;
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
}
