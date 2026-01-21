"use client";

import { cn } from "@/lib/utils";

interface SubscribeFormProps {
    className?: string;
    placeholder?: string;
}

export function SubscribeForm({ className, placeholder = "Enter your email" }: SubscribeFormProps) {
    return (
        <form
            className={cn("flex flex-col sm:flex-row gap-3 w-full max-w-sm", className)}
            onSubmit={(e) => {
                e.preventDefault();
                alert("Subscription integration coming soon!");
            }}
        >
            <input
                type="email"
                placeholder={placeholder}
                className="flex-1 bg-white border border-secondary px-4 py-3 text-primary placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors rounded-sm"
                required
            />
            <button
                type="submit"
                className="bg-accent text-white font-medium px-6 py-3 hover:bg-[#7a3225] transition-colors whitespace-nowrap rounded-sm cursor-pointer"
            >
                Subscribe
            </button>
        </form>
    )
}
