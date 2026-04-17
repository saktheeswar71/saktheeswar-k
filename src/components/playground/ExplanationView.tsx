import { motion } from "framer-motion";
import { Dataset } from "@/data/datasets";
import { ACTION_CONFIG } from "@/utils/gameLogic";

interface Props {
  dataset: Dataset;
  onPlayAgain: () => void;
  onNext: () => void;
  onRestart: () => void;
}

const borderColors = ["#F2811D", "#FF9A40", "#A0A0A0", "#3A3A3A"];

const ExplanationView = ({ dataset, onPlayAgain, onNext, onRestart }: Props) => {
  const actionIds = Object.keys(ACTION_CONFIG);

  return (
    <div style={{ background: "#333333" }} className="rounded-2xl p-6 md:p-8">
      <h2 className="text-xl font-bold mb-1" style={{ color: "#1F1F1F" }}>
        Step 4: The Full Explanation
      </h2>
      <p className="text-sm mb-6" style={{ color: "#A0A0A0" }}>
        Here's why each action was needed — and what happens if you skip it.
      </p>

      <div className="space-y-4 mb-8">
        {actionIds.map((actionId, i) => {
          const config = ACTION_CONFIG[actionId];
          const explanation = dataset.explanations[actionId];
          const isCorrect = (dataset.correctActions as string[]).includes(actionId);

          return (
            <motion.div
              key={actionId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.3 }}
              className="rounded-2xl p-5"
              style={{
                background: "#2E2E2E",
                borderLeft: `4px solid ${borderColors[i % borderColors.length]}`,
                boxShadow: "0 2px 16px rgba(0,0,0,0.4)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold" style={{ color: "#1F1F1F" }}>
                  {config.icon} {config.label}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: isCorrect ? "#333333" : "#262626",
                    color: "#1F1F1F",
                  }}
                >
                  {isCorrect ? "✓ Needed" : "— Not needed"}
                </span>
              </div>
              <p className="text-sm" style={{ color: "#1F1F1F" }}>
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
          background: "#3A3A3A",
          borderLeft: "4px solid #FF9A40",
        }}
      >
        <p className="text-sm font-bold mb-1" style={{ color: "#1F1F1F" }}>
          💡 Did you know?
        </p>
        <p className="text-sm italic" style={{ color: "#A0A0A0" }}>
          {dataset.funFact}
        </p>
      </motion.div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onPlayAgain}
          className="px-5 py-2.5 rounded-full text-sm font-medium"
          style={{ background: "#2E2E2E", border: "1px solid #3A3A3A", color: "#1F1F1F" }}
        >
          🎮 Play Again (same dataset)
        </button>
        <button
          onClick={onNext}
          className="px-5 py-2.5 rounded-full text-sm font-medium text-white"
          style={{ background: "#F2811D" }}
        >
          Next Dataset →
        </button>
        <button
          onClick={onRestart}
          className="text-xs hover:opacity-70 transition-opacity"
          style={{ color: "#A0A0A0" }}
        >
          🔁 Try All Datasets
        </button>
      </div>
    </div>
  );
};

export default ExplanationView;
