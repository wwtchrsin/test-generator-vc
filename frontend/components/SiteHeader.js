import Link from "next/link";

export default function SiteHeader({ extra }) {
  return (
    <header className="site-header">
      <Link href="/">
        <h1>English Grammar Tests</h1>
      </Link>
      <nav>
        {extra}
        <Link href="/admin">Админ</Link>
      </nav>
    </header>
  );
}
