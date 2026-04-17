import { motion } from "framer-motion";
import { ACTION_CONFIG } from "@/utils/gameLogic";
import { Check } from "lucide-react";

interface Props {
  selectedActions: string[];
  onToggle: (action: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const allActions = Object.values(ACTION_CONFIG);

const ActionPanel = ({ selectedActions, onToggle, onSubmit, onBack }: Props) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-1" style={{ color: "#1F1F1F" }}>
        Step 2: Choose Your Cleaning Actions
      </h2>
      <p className="text-sm mb-6" style={{ color: "#A0A0A0" }}>
        Select ALL the actions needed to fix this dataset. Order doesn't matter — choose wisely!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {allActions.map((action, i) => {
          const isSelected = selectedActions.includes(action.id);
          return (
            <motion.button
              key={action.id}
              onClick={() => onToggle(action.id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.25 }}
              className="text-left rounded-2xl p-5 cursor-pointer transition-all duration-200 relative"
              style={{
                background: isSelected ? "#333333" : "#2E2E2E",
                border: isSelected ? "2px solid #F2811D" : "1px solid #3A3A3A",
                boxShadow: "0 2px 16px rgba(0,0,0,0.4)",
                transform: isSelected ? "scale(1.01)" : undefined,
              }}
              whileHover={{ y: -3 }}
            >
              {isSelected && (
                <div
                  className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: "#F2811D" }}
                >
                  <Check size={12} color="#2E2E2E" />
                </div>
              )}
              <div className="text-2xl mb-2">{action.icon}</div>
              <div className="font-bold text-sm mb-1" style={{ color: "#1F1F1F" }}>
                {action.label}
              </div>
              <p className="text-xs" style={{ color: "#A0A0A0" }}>
                {action.description}
              </p>
            </motion.button>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="text-sm hover:opacity-70 transition-opacity"
          style={{ color: "#A0A0A0" }}
        >
          ← Back to dataset
        </button>
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: selectedActions.length > 0 ? "#F2811D" : "#A0A0A0" }}>
            {selectedActions.length} / 4 actions selected
          </span>
          <button
            onClick={onSubmit}
            disabled={selectedActions.length === 0}
            className="px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all hover:shadow-md disabled:opacity-40"
            style={{
              background: "#F2811D",
            }}
          >
            Submit My Choices →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;
