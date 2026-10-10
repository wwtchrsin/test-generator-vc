import Link from "next/link";
import { notFound } from "next/navigation"
import { fetchTests } from "../../lib/api";
import { txtRes, lang } from "../../lib/text-resources";
import AdminPanel from "../../components/AdminPanel";
import SiteHeader from "../../components/SiteHeader";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if ( process.env.NODE_ENV === "production" ) {
    notFound();
  }

  let tests = [];
  let error = "";
  try {
    tests = await fetchTests();
  } catch (err) {
    error = err.message;
  }

  return (
    <div className="page">
      <SiteHeader extra={<Link href="/">{ txtRes.HomePage[lang] }</Link>} />
      {error ? <p className="error">{error}</p> : null}
      <AdminPanel initialTests={tests} />
    </div>
  );
}
