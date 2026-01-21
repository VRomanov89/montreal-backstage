import { SubscribeForm } from "@/components/ui/SubscribeForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Subscribe - Montreal Backstage",
    description: "Get the weekly briefing.",
};

export default function SubscribePage() {
    return (
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">Get the full picture.</h1>
            <p className="text-lg text-muted mb-10 max-w-lg mx-auto">
                Sent once a week. Free to join. Unsubscribe anytime.
            </p>
            <div className="flex justify-center">
                <SubscribeForm className="w-full" placeholder="Your email address" />
            </div>
        </div>
    );
}
