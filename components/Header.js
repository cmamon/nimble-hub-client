import Link from "next/link";

export default function Header() {
    return (
    <Link href="/about" title="About Page">
        <a>About Page</a>
    </Link>
    );
}