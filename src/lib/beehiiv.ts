export interface Post {
    id: string;
    title: string;
    slug: string;
    subtitle?: string;
    publish_date: number; // Unix timestamp
    thumbnail_url?: string;
    content?: {
        html: string;
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
        return Promise.resolve(MOCK_POSTS.slice(0, limit));
    }

    try {
        const res = await fetch(`https://api.beehiiv.com/v2/publications/${PUB_ID}/posts?status=confirmed&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
            },
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch posts: ${res.status}`);
        }

        const data = await res.json();
        return data.data; // Beehiiv returns { data: [...], ... }
    } catch (error) {
        console.error("Error fetching posts:", error);
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

        // 2. Fetch full detail
        const res = await fetch(`https://api.beehiiv.com/v2/publications/${PUB_ID}/posts/${postSummary.id}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
            },
            next: { revalidate: 3600 }
        });

        if (!res.ok) return null;

        const data = await res.json();
        return data.data;

    } catch (error) {
        console.error("Error fetching post by slug:", error);
        return null;
    }
}
