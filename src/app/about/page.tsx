import { SubscribeForm } from "@/components/ui/SubscribeForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About - Montreal Backstage",
};

export default function AboutPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
            <h1 className="text-4xl md:text-5xl font-serif text-primary mb-8">About</h1>

            <div className="prose prose-slate prose-lg mb-12">
                <p className="lead text-xl text-muted">
                    Montreal Backstage is a weekly editorial newsletter that explains the signals shaping Montreal,
                    from real estate and policy to culture and economics.
                </p>
                <p>
                    We exist to show what is happening behind the headlines, behind official announcements,
                    and behind surface-level narratives in Montreal.
                </p>
                <p>
                    Our promise is simple: Clear context about Montreal, delivered calmly and consistently.
                    We don't chase trends. We earn attention through clarity.
                </p>
            </div>

            <div className="bg-fog p-8 rounded-sm">
                <h3 className="font-serif text-2xl text-primary mb-4">Join the list</h3>
                <SubscribeForm />
            </div>
        </div>
    );
}
