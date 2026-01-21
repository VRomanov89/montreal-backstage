import { getPostBySlug, getPosts } from "@/lib/beehiiv";
import { notFound } from "next/navigation";
import { SubscribeForm } from "@/components/ui/SubscribeForm";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string }>;
};

// Generate static paths for all published posts (ISR)
export async function generateStaticParams() {
    const posts = await getPosts(50); // Get up to 50 most recent posts

    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: "Issue Not Found"
        };
    }

    return {
        title: `${post.title} - Montreal Backstage`,
        description: post.subtitle,
        openGraph: {
            title: post.title,
            description: post.subtitle,
            images: post.thumbnail_url ? [post.thumbnail_url] : undefined,
        }
    };
}

export default async function IssuePage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Extract content - Beehiiv API returns content.html when using expand=content
    const contentHtml = post.content?.html || post.content?.free?.html || "";

    return (
        <article className="max-w-3xl mx-auto px-6 py-12 md:py-20">
            <Link href="/archive" className="text-sm text-secondary hover:text-primary mb-8 block">
                ← Back to Archive
            </Link>

            <header className="mb-12">
                <div className="text-secondary text-sm font-semibold uppercase tracking-wider mb-4">
                    {new Date(post.publish_date * 1000).toLocaleDateString("en-US", {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </div>
                <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6 leading-tight">
                    {post.title}
                </h1>
                {post.subtitle && (
                    <p className="text-xl text-muted leading-relaxed">
                        {post.subtitle}
                    </p>
                )}
            </header>

            <div
                className="prose prose-slate prose-lg max-w-none prose-headings:font-serif prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-img:rounded-sm"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            <hr className="my-12 border-secondary/20" />

            <div className="bg-fog p-8 rounded-sm">
                <h3 className="font-serif text-2xl text-primary mb-4">Subscribe for more</h3>
                <p className="text-muted mb-6">
                    Get Montreal Backstage delivered to your inbox every week.
                </p>
                <SubscribeForm />
            </div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        headline: post.title,
                        datePublished: new Date(post.publish_date * 1000).toISOString(),
                        description: post.subtitle,
                        image: post.thumbnail_url,
                        author: {
                            '@type': 'Organization',
                            name: 'Montreal Backstage',
                        },
                    }),
                }}
            />
        </article>
    );
}
