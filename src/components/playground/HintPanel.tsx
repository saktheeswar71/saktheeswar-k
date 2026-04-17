import { motion } from "framer-motion";

interface Props {
  visible: boolean;
  onUseHint: () => void;
  hintsUsed: number;
  datasetId: number;
}

const hintsByDataset: Record<number, string[]> = {
  1: [
    "Look for rows that appear more than once",
    "Check for blank cells (shown as NULL)",
    "Are all city names in the same format?",
    "Is any purchase value suspiciously large?",
  ],
  2: [
    "Any employee listed twice?",
    "Check for missing salary values",
    "Are department names and dates consistent?",
    "Can a salary be negative?",
  ],
  3: [
    "Compare rows 1 and 2 carefully",
    "Some ratings are missing entirely",
    "Check the 'verified' column for inconsistencies",
    "Is a rating of 10 valid on a 5-point scale?",
  ],
};

const HintPanel = ({ visible, onUseHint, hintsUsed, datasetId }: Props) => {
  if (!visible) {
    return (
      <div className="flex justify-end mt-3">
        <button
          onClick={onUseHint}
          className="text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80"
          style={{ background: "#2E2E2E", border: "1px solid #3A3A3A", color: "#A0A0A0" }}
        >
          💡 Need a hint? (-10 pts)
        </button>
      </div>
    );
  }

  const hints = hintsByDataset[datasetId] || hintsByDataset[1];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.25 }}
      className="mt-4 rounded-2xl p-4"
      style={{
        background: "#3A3A3A",
        borderLeft: "4px solid #FF9A40",
      }}
    >
      <p className="text-sm font-semibold mb-2" style={{ color: "#E5E5E5" }}>
        Hints for this dataset:
      </p>
      <ul className="space-y-1">
        {hints.map((hint, i) => (
          <li key={i} className="text-xs" style={{ color: "#E5E5E5" }}>
            • {hint}
          </li>
        ))}
      </ul>
      <p className="text-[10px] mt-2" style={{ color: "#A0A0A0" }}>
        Hints used: {hintsUsed} (−{hintsUsed * 10} pts penalty)
      </p>
    </motion.div>
  );
};

export default HintPanel;
