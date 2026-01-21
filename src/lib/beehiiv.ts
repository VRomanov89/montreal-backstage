export interface Post {
    id: string;
    title: string;
    slug: string;
    subtitle?: string;
    publish_date: number; // Unix timestamp
    thumbnail_url?: string;
    content?: {
        free?: {
            web?: string;
            email?: string;
            rss?: string;
        };
        premium?: {
            web?: string;
            email?: string;
        };
    };
    status: string;
    web_url?: string;
    authors?: string[];
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
            free: {
                web: "<p>The Old Port is undergoing a massive transformation...</p><h2>New Retailers</h2><p>We are seeing a shift...</p>"
            }
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
            free: {
                web: "<p>Big changes are coming to the Montreal metro system...</p>"
            }
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
            free: {
                web: "<p>Analysis of the tech sector in Montreal...</p>"
            }
        }
    }
];

export async function getPosts(limit = 10): Promise<Post[]> {
    if (!API_KEY || !PUB_ID) {
        console.warn("Beehiiv API keys missing. Using mock data.");
        return Promise.resolve(MOCK_POSTS.slice(0, limit));
    }

    try {
        const url = new URL(`https://api.beehiiv.com/v2/publications/${PUB_ID}/posts`);
        url.searchParams.append('limit', limit.toString());
        url.searchParams.append('status', 'confirmed');

        const res = await fetch(url.toString(), {
            headers: { 'Authorization': `Bearer ${API_KEY}` },
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            if (res.status === 401) console.error("Beehiiv API Error: Unauthorized (Invalid API Key)");
            else console.error(`Beehiiv API Error: ${res.status}`);
            return MOCK_POSTS;
        }

        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error("Error fetching posts:", error);
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
        // Correct expansion for multiple fields according to docs playground
        const baseUrl = `https://api.beehiiv.com/v2/publications/${PUB_ID}/posts`;
        const params = new URLSearchParams();
        params.append('slugs[]', slug);
        params.append('expand', 'free_web_content');
        params.append('expand', 'premium_web_content');
        params.append('expand', 'stats'); // Useful for future improvements

        const url = `${baseUrl}?${params.toString()}`;

        console.log('=== BEEHIIV API REQUEST (OPTIMIZED) ===');
        console.log('URL:', url);

        const res = await fetch(url, {
            headers: { 'Authorization': `Bearer ${API_KEY}` },
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            console.error(`Failed to fetch post: ${res.status}`);
            return null;
        }

        const response = await res.json();
        const posts = response.data || [];
        const post = posts[0]; // Filtered by slugs[] so should be index 0

        if (!post) {
            console.warn(`Post with slug "${slug}" not found in API response.`);
            return null;
        }

        console.log('=== BEEHIIV RESPONSE ANALYSIS ===');
        console.log('Post ID:', post.id);
        console.log('Has content field?', !!post.content);
        if (post.content) {
            console.log('Content sub-fields:', Object.keys(post.content));
            console.log('Has content.free?', !!post.content.free);
            if (post.content.free) console.log('Content.free fields:', Object.keys(post.content.free));
        }
        console.log('==============================');

        return post;
    } catch (error) {
        console.error("Error fetching post by slug:", error);
        return null;
    }
}
