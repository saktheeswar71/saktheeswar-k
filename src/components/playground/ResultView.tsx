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
            style={{ background: "#FDE8D3", color: "#657166" }}
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
            hit: { bg: "#DAEBE3", border: "#99CDD8", label: "✓ Correct!", icon: "✅" },
            missed: { bg: "#FDE8D3", border: "#F3C3B2", label: "✗ You missed this", icon: "❌" },
            extra: { bg: "#FFFFFF", border: "#CFD6C4", label: "→ Not needed here", icon: "⚠️" },
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
              <span className="text-sm font-medium" style={{ color: "#657166" }}>
                {config.icon} {config.label}
              </span>
              <span className="text-xs font-medium" style={{ color: "#8a9e8f" }}>
                {s.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Before / After mini tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <h4 className="text-sm font-bold mb-2" style={{ color: "#657166" }}>
            Before (messy)
          </h4>
          <MiniTable columns={dataset.columns} rows={dataset.rows} highlight={false} />
        </div>
        <div>
          <h4 className="text-sm font-bold mb-2" style={{ color: "#657166" }}>
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
          style={{ background: "#99CDD8" }}
        >
          📖 See Full Explanation
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-full text-sm font-medium"
          style={{ background: "#FFFFFF", border: "1px solid #CFD6C4", color: "#657166" }}
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
  <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid #CFD6C4" }}>
    <table className="w-full text-[11px]">
      <thead>
        <tr style={{ background: "#DAEBE3" }}>
          {columns.map((col) => (
            <th key={col} className="px-2 py-1.5 text-left font-bold uppercase" style={{ color: "#657166" }}>
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
              background: highlight ? "#FAFAF8" : ri % 2 === 0 ? "#FFFFFF" : "#FAFAF8",
              borderBottom: "1px solid #CFD6C4",
            }}
          >
            {columns.map((col) => (
              <td key={col} className="px-2 py-1.5" style={{ color: "#4a5568" }}>
                {row[col] === null ? (
                  <span className="px-1 rounded text-[9px]" style={{ background: "#CFD6C4", color: "#657166" }}>
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
