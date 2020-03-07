import Link from "next/link";

export default function Header() {
  return (
    <div>
      <b>Socket IO Hub</b> |
      <Link href="/about">
        <a> About</a>
      </Link>
    </div>
  );
}