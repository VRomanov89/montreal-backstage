import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
            <h2 className="text-4xl font-serif text-primary mb-4">Page Not Found</h2>
            <p className="text-muted mb-8">Could not find requested resource</p>
            <Link href="/" className="text-accent hover:underline decoration-accent underline-offset-4">
                Return Home
            </Link>
        </div>
    );
}
