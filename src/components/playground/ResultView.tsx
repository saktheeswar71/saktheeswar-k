import { motion } from "framer-motion";
import { ScoreResult, ACTION_CONFIG } from "@/utils/gameLogic";
import { Dataset } from "@/data/datasets";
import ScoreCard from "./ScoreCard";

interface Props {
  result: ScoreResult;
  dataset: Dataset;
  cleanedRows: any[];
  streak: number;
  onExplain: () => void;
  onNext: () => void;
}

const ResultView = ({ result, dataset, cleanedRows, streak, onExplain, onNext }: Props) => {
  const allActions = Object.keys(ACTION_CONFIG);
  const correctSet = new Set(dataset.correctActions);
  const selectedSet = new Set([...result.hits, ...result.extras]);

  return (
    <div>
      <ScoreCard result={result} />

      {/* Streak */}
      {streak >= 2 && (
        <motion.div
          className="text-center mb-6"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-bold"
            style={{ background: "#3A3A3A", color: "#1F1F1F" }}
          >
            🔥 {streak} game streak!
          </span>
        </motion.div>
      )}

      {/* Action feedback */}
      <div className="space-y-3 mb-8">
      {allActions.map((actionId, i) => {
          const config = ACTION_CONFIG[actionId];
          const isCorrect = correctSet.has(actionId as any);
          const wasSelected = selectedSet.has(actionId);

          let status: 'hit' | 'missed' | 'extra' | 'neutral';
          if (isCorrect && wasSelected) status = 'hit';
          else if (isCorrect && !wasSelected) status = 'missed';
          else if (!isCorrect && wasSelected) status = 'extra';
          else status = 'neutral';

          if (status === 'neutral') return null;

          const styles = {
            hit: { bg: "#333333", border: "#F2811D", label: "✓ Correct!", icon: "✅" },
            missed: { bg: "#3A3A3A", border: "#FF9A40", label: "✗ You missed this", icon: "❌" },
            extra: { bg: "#2E2E2E", border: "#3A3A3A", label: "→ Not needed here", icon: "⚠️" },
          };
          const s = styles[status];

          return (
            <motion.div
              key={actionId}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.25 }}
              className="rounded-xl p-4 flex items-center justify-between"
              style={{
                background: s.bg,
                borderLeft: `4px solid ${s.border}`,
                border: `1px solid ${s.border}`,
                borderLeftWidth: 4,
              }}
            >
              <span className="text-sm font-medium" style={{ color: "#1F1F1F" }}>
                {config.icon} {config.label}
              </span>
              <span className="text-xs font-medium" style={{ color: "#A0A0A0" }}>
                {s.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Before / After mini tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <h4 className="text-sm font-bold mb-2" style={{ color: "#1F1F1F" }}>
            Before (messy)
          </h4>
          <MiniTable columns={dataset.columns} rows={dataset.rows} highlight={false} />
        </div>
        <div>
          <h4 className="text-sm font-bold mb-2" style={{ color: "#1F1F1F" }}>
            After (with your actions)
          </h4>
          <MiniTable columns={dataset.columns} rows={cleanedRows} highlight />
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <button
          onClick={onExplain}
          className="px-6 py-2.5 rounded-full text-sm font-medium text-white"
          style={{ background: "#F2811D" }}
        >
          📖 See Full Explanation
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-full text-sm font-medium"
          style={{ background: "#2E2E2E", border: "1px solid #3A3A3A", color: "#1F1F1F" }}
        >
          Next Dataset →
        </button>
      </div>
    </div>
  );
};

const MiniTable = ({
  columns,
  rows,
  highlight,
}: {
  columns: string[];
  rows: any[];
  highlight: boolean;
}) => (
  <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid #3A3A3A" }}>
    <table className="w-full text-[11px]">
      <thead>
        <tr style={{ background: "#1F1F1F" }}>
          {columns.map((col) => (
            <th key={col} className="px-2 py-1.5 text-left font-bold uppercase" style={{ color: "#333333" }}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr
            key={ri}
            style={{
              background: highlight ? "#262626" : ri % 2 === 0 ? "#2E2E2E" : "#262626",
              borderBottom: "1px solid #3A3A3A",
            }}
          >
            {columns.map((col) => (
              <td key={col} className="px-2 py-1.5" style={{ color: "#1F1F1F" }}>
                {row[col] === null ? (
                  <span className="px-1 rounded text-[9px]" style={{ background: "#3A3A3A", color: "#1F1F1F" }}>
                    NULL
                  </span>
                ) : (
                  String(row[col])
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ResultView;
