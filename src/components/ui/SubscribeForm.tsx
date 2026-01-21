"use client";

import { cn } from "@/lib/utils";

interface SubscribeFormProps {
    className?: string;
    placeholder?: string;
}

import { useActionState } from "react";
import { subscribe } from "@/lib/actions";

const initialState = {
    message: "",
    success: false,
}

export function SubscribeForm({ className, placeholder = "Enter your email" }: SubscribeFormProps) {
    const [state, formAction, isPending] = useActionState(subscribe, initialState);

    return (
        <div className={cn("w-full max-w-sm", className)}>
            <form
                className="flex flex-col sm:flex-row gap-3 w-full"
                action={formAction}
            >
                <input
                    name="email"
                    type="email"
                    placeholder={placeholder}
                    defaultValue=""
                    disabled={state.success}
                    className="flex-1 bg-white border border-secondary px-4 py-3 text-primary placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors rounded-sm"
                    required
                />
                <button
                    type="submit"
                    disabled={isPending || state.success}
                    className={cn(
                        "bg-accent text-white font-medium px-6 py-3 transition-colors whitespace-nowrap rounded-sm cursor-pointer disabled:opacity-70",
                        state.success ? "bg-green-600 hover:bg-green-700" : "hover:bg-[#7a3225]"
                    )}
                >
                    {isPending ? "Subscribing..." : state.success ? "Subscribed!" : "Subscribe"}
                </button>
            </form>
            {state.message && (
                <p className={cn("mt-3 text-sm font-medium", state.success ? "text-green-600" : "text-red-500")}>
                    {state.message}
                </p>
            )}
        </div>
    )
}
