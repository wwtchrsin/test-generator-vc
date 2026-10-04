import Link from "next/link";
import { fetchTest } from "../../../lib/api";
import TestRunner from "../../../components/TestRunner";

export const dynamic = "force-dynamic";

export default async function TestPage({ params }) {
  const { id } = await params;
  const test = await fetchTest(id);

  if (!test) {
    return (
      <div className="page">
        <p className="empty">Тест не найден.</p>
        <Link href="/">На главную</Link>
      </div>
    );
  }

  return <TestRunner test={test} />;
}
