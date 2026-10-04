import { fetchTests } from "../lib/api";
import TestList from "../components/TestList";
import SiteHeader from "../components/SiteHeader";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let tests = [];
  let error = "";
  try {
    tests = await fetchTests();
  } catch (err) {
    error = err.message;
  }

  return (
    <div className="page">
      <SiteHeader />
      {error ? <p className="error">{error}</p> : <TestList tests={tests} />}
    </div>
  );
}
