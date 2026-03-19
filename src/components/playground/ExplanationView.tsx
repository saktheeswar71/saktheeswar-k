import { motion } from "framer-motion";
import { Dataset } from "@/data/datasets";
import { ACTION_CONFIG } from "@/utils/gameLogic";

interface Props {
  dataset: Dataset;
  onPlayAgain: () => void;
  onNext: () => void;
  onRestart: () => void;
}

const borderColors = ["#99CDD8", "#F3C3B2", "#8a9e8f", "#CFD6C4"];

const ExplanationView = ({ dataset, onPlayAgain, onNext, onRestart }: Props) => {
  const actionIds = Object.keys(ACTION_CONFIG);

  return (
    <div style={{ background: "#DAEBE3" }} className="rounded-2xl p-6 md:p-8">
      <h2 className="text-xl font-bold mb-1" style={{ color: "#657166" }}>
        Step 4: The Full Explanation
      </h2>
      <p className="text-sm mb-6" style={{ color: "#8a9e8f" }}>
        Here's why each action was needed — and what happens if you skip it.
      </p>

      <div className="space-y-4 mb-8">
        {actionIds.map((actionId, i) => {
          const config = ACTION_CONFIG[actionId];
          const explanation = dataset.explanations[actionId];
          const isCorrect = dataset.correctActions.includes(actionId);

          return (
            <motion.div
              key={actionId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.3 }}
              className="rounded-2xl p-5"
              style={{
                background: "#FFFFFF",
                borderLeft: `4px solid ${borderColors[i % borderColors.length]}`,
                boxShadow: "0 2px 16px rgba(101,113,102,0.08)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold" style={{ color: "#657166" }}>
                  {config.icon} {config.label}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: isCorrect ? "#DAEBE3" : "#FAFAF8",
                    color: "#657166",
                  }}
                >
                  {isCorrect ? "✓ Needed" : "— Not needed"}
                </span>
              </div>
              <p className="text-sm" style={{ color: "#4a5568" }}>
                {explanation || "This action was not required for this dataset."}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Fun Fact */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl p-5 mb-8"
        style={{
          background: "#FDE8D3",
          borderLeft: "4px solid #F3C3B2",
        }}
      >
        <p className="text-sm font-bold mb-1" style={{ color: "#657166" }}>
          💡 Did you know?
        </p>
        <p className="text-sm italic" style={{ color: "#8a9e8f" }}>
          {dataset.funFact}
        </p>
      </motion.div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onPlayAgain}
          className="px-5 py-2.5 rounded-full text-sm font-medium"
          style={{ background: "#FFFFFF", border: "1px solid #CFD6C4", color: "#657166" }}
        >
          🎮 Play Again (same dataset)
        </button>
        <button
          onClick={onNext}
          className="px-5 py-2.5 rounded-full text-sm font-medium text-white"
          style={{ background: "#99CDD8" }}
        >
          Next Dataset →
        </button>
        <button
          onClick={onRestart}
          className="text-xs hover:opacity-70 transition-opacity"
          style={{ color: "#8a9e8f" }}
        >
          🔁 Try All Datasets
        </button>
      </div>
    </div>
  );
};

export default ExplanationView;
