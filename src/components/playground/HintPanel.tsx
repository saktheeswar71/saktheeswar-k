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
          style={{ background: "#FFFFFF", border: "1px solid #CFD6C4", color: "#8a9e8f" }}
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
        background: "#FDE8D3",
        borderLeft: "4px solid #F3C3B2",
      }}
    >
      <p className="text-sm font-semibold mb-2" style={{ color: "#657166" }}>
        Hints for this dataset:
      </p>
      <ul className="space-y-1">
        {hints.map((hint, i) => (
          <li key={i} className="text-xs" style={{ color: "#657166" }}>
            • {hint}
          </li>
        ))}
      </ul>
      <p className="text-[10px] mt-2" style={{ color: "#8a9e8f" }}>
        Hints used: {hintsUsed} (−{hintsUsed * 10} pts penalty)
      </p>
    </motion.div>
  );
};

export default HintPanel;
