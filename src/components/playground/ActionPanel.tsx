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
      <h2 className="text-xl font-bold mb-1" style={{ color: "#280905" }}>
        Step 2: Choose Your Cleaning Actions
      </h2>
      <p className="text-sm mb-6" style={{ color: "#740a03" }}>
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
                background: isSelected ? "#fce4d6" : "#FFFFFF",
                border: isSelected ? "2px solid #c3110e" : "1px solid #ddb8a0",
                boxShadow: "0 2px 16px rgba(40,9,5,0.08)",
                transform: isSelected ? "scale(1.01)" : undefined,
              }}
              whileHover={{ y: -3 }}
            >
              {isSelected && (
                <div
                  className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: "#c3110e" }}
                >
                  <Check size={12} color="#fff" />
                </div>
              )}
              <div className="text-2xl mb-2">{action.icon}</div>
              <div className="font-bold text-sm mb-1" style={{ color: "#280905" }}>
                {action.label}
              </div>
              <p className="text-xs" style={{ color: "#740a03" }}>
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
          style={{ color: "#740a03" }}
        >
          ← Back to dataset
        </button>
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: selectedActions.length > 0 ? "#c3110e" : "#740a03" }}>
            {selectedActions.length} / 4 actions selected
          </span>
          <button
            onClick={onSubmit}
            disabled={selectedActions.length === 0}
            className="px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all hover:shadow-md disabled:opacity-40"
            style={{
              background: "#c3110e",
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
