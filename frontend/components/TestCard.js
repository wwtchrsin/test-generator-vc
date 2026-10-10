import Link from "next/link";
import { getTestProgress } from "../lib/storage";
import { HandDoubleCircle } from "./HandMarks";
import { txtResComp, lang } from "../lib/text-resources";

export default function TestCard({ test, results, initialized }) {
  const progress = getTestProgress(results, test.id, test.taskCount);
  return (
    <div className="test-card-wrap">
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
          { txtResComp.CompletedTasks(progress.completed,progress.total)[lang] }
          {progress.completed < progress.total && (
            " · " + txtResComp.AccuracyRate(progress.percent)[lang]
          )}
        </div>
      </Link>
      {progress.completed === progress.total && (
        <div className="test-mark-wrap">
          <div className="test-mark">
            {progress.percent}
          </div>
          <HandDoubleCircle />
        </div>
      )}
    </div>
  );
}
