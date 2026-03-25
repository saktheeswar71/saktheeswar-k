import { motion } from "framer-motion";
import { Dataset } from "@/data/datasets";
import { ACTION_CONFIG } from "@/utils/gameLogic";

interface Props {
  dataset: Dataset;
  onPlayAgain: () => void;
  onNext: () => void;
  onRestart: () => void;
}

const borderColors = ["#c3110e", "#e6501b", "#740a03", "#ddb8a0"];

const ExplanationView = ({ dataset, onPlayAgain, onNext, onRestart }: Props) => {
  const actionIds = Object.keys(ACTION_CONFIG);

  return (
    <div style={{ background: "#fce4d6" }} className="rounded-2xl p-6 md:p-8">
      <h2 className="text-xl font-bold mb-1" style={{ color: "#280905" }}>
        Step 4: The Full Explanation
      </h2>
      <p className="text-sm mb-6" style={{ color: "#740a03" }}>
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
                background: "#FFFFFF",
                borderLeft: `4px solid ${borderColors[i % borderColors.length]}`,
                boxShadow: "0 2px 16px rgba(40,9,5,0.08)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold" style={{ color: "#280905" }}>
                  {config.icon} {config.label}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: isCorrect ? "#fce4d6" : "#fef8f4",
                    color: "#280905",
                  }}
                >
                  {isCorrect ? "✓ Needed" : "— Not needed"}
                </span>
              </div>
              <p className="text-sm" style={{ color: "#280905" }}>
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
          background: "#fdd8c5",
          borderLeft: "4px solid #e6501b",
        }}
      >
        <p className="text-sm font-bold mb-1" style={{ color: "#280905" }}>
          💡 Did you know?
        </p>
        <p className="text-sm italic" style={{ color: "#740a03" }}>
          {dataset.funFact}
        </p>
      </motion.div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onPlayAgain}
          className="px-5 py-2.5 rounded-full text-sm font-medium"
          style={{ background: "#FFFFFF", border: "1px solid #ddb8a0", color: "#280905" }}
        >
          🎮 Play Again (same dataset)
        </button>
        <button
          onClick={onNext}
          className="px-5 py-2.5 rounded-full text-sm font-medium text-white"
          style={{ background: "#c3110e" }}
        >
          Next Dataset →
        </button>
        <button
          onClick={onRestart}
          className="text-xs hover:opacity-70 transition-opacity"
          style={{ color: "#740a03" }}
        >
          🔁 Try All Datasets
        </button>
      </div>
    </div>
  );
};

export default ExplanationView;
