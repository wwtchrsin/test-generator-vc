import Link from "next/link";
import { getTestProgress } from "../lib/storage";

export default function TestCard({ test, results, initialized }) {
  const progress = getTestProgress(results, test.id, test.taskCount);
  return (
    <Link href={`/tests/${test.id}`} className="test-card">
      <div className="test-card-top">
        <h2>{test.title}</h2>
        <span>{test.level}</span>
      </div>
      <div className="test-chapter">
        {test.chapter}
      </div>
      <div className="test-topic">
        {test.topic && (
          test.topic.split("\n").map((line, index) => {
            return <div key={`test-topic-${index}`}>{line}</div>;
          })
        )}
      </div>
      <div className={initialized ? "progress-line" : "progress-line-inactive"}>
        Выполнено {progress.completed} из {progress.total}
        {" · "}
        {progress.percent}% верных ответов
      </div>
    </Link>
  );
}
