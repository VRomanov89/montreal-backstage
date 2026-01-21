import Link from "next/link";
import { cn } from "@/lib/utils";

export function Header() {
    return (
        <header className="flex flex-col md:flex-row items-center justify-between py-8 px-6 max-w-5xl mx-auto w-full">
            <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
                Montreal Backstage
            </Link>
            <nav className="flex gap-6 mt-4 md:mt-0 items-center">
                <Link href="/archive" className="text-sm font-medium text-muted hover:text-primary transition-colors">
                    Archive
                </Link>
                <Link href="/about" className="text-sm font-medium text-muted hover:text-primary transition-colors">
                    About
                </Link>
                <Link
                    href="/subscribe"
                    className={cn(
                        "text-sm font-medium bg-accent text-white px-4 py-2 rounded-sm hover:opacity-90 transition-opacity",
                    )}
                >
                    Subscribe
                </Link>
            </nav>
        </header>
    );
}
