import Link from "next/link";
import { getPosts } from "@/lib/beehiiv";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Archive - Montreal Backstage",
    description: "Browse past issues of Montreal Backstage.",
};

export default async function ArchivePage() {
    const posts = await getPosts();

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
            <h1 className="text-4xl md:text-5xl font-serif text-primary mb-12">Archive</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/issue/${post.slug}`}
                        className="group block border border-transparent hover:border-secondary/30 p-5 -m-5 rounded-sm transition-colors"
                    >
                        <div className="text-xs text-secondary mb-3 font-semibold uppercase tracking-wider">
                            {new Date(post.publish_date * 1000).toLocaleDateString("en-US", {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </div>
                        <h2 className="text-xl font-serif text-primary mb-3 group-hover:text-accent transition-colors">
                            {post.title}
                        </h2>
                        <p className="text-muted text-sm leading-relaxed line-clamp-3">
                            {post.subtitle}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
