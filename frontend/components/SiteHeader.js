import Link from "next/link";

export default function SiteHeader({ extra }) {
  return (
    <header className="site-header">
      <Link href="/">
        <h1>{process.env.NEXT_PUBLIC_APP_NAME}</h1>
      </Link>
      <nav>
        {extra}
      </nav>
    </header>
  );
}
