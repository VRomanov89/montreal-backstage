import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-muted text-white py-12 px-6 mt-auto border-t border-white/5">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex flex-col gap-2">
                    <span className="font-bold text-lg font-serif">Montreal Backstage</span>
                    <p className="text-sm text-gray-400 max-w-sm">
                        An independent weekly newsletter focused on policy, real estate, culture, and city level signals.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 text-sm text-gray-400">
                    <Link href="/archive" className="hover:text-white transition-colors">Archive</Link>
                    <Link href="/about" className="hover:text-white transition-colors">About</Link>
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                </div>
            </div>
            <div className="max-w-5xl mx-auto mt-12 pt-8 border-t border-white/10 text-xs text-gray-500 flex justify-between items-center">
                <p>&copy; {new Date().getFullYear()} Montreal Backstage.</p>
            </div>
        </footer>
    );
}
