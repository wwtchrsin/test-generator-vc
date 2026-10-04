import Link from "next/link";
import { fetchTests } from "../../lib/api";
import AdminPanel from "../../components/AdminPanel";
import SiteHeader from "../../components/SiteHeader";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let tests = [];
  let error = "";
  try {
    tests = await fetchTests();
  } catch (err) {
    error = err.message;
  }

  return (
    <div className="page">
      <SiteHeader extra={<Link href="/">К тестам</Link>} />
      {error ? <p className="error">{error}</p> : null}
      <AdminPanel initialTests={tests} />
    </div>
  );
}
