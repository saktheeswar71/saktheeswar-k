import { Step } from "@/hooks/useGameState";
import { motion } from "framer-motion";

interface Props {
  currentStep: Step;
}

const STEPS: { key: Step; label: string; short: string; num: number }[] = [
  { key: "inspect", label: "Inspect", short: "1", num: 1 },
  { key: "act", label: "Choose", short: "2", num: 2 },
  { key: "result", label: "Results", short: "3", num: 3 },
  { key: "explain", label: "Learn", short: "4", num: 4 },
];

const stepOrder: Record<Step, number> = {
  intro: 0,
  inspect: 1,
  act: 2,
  result: 3,
  explain: 4,
};

const ProgressBar = ({ currentStep }: Props) => {
  const currentNum = stepOrder[currentStep];

  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 mb-8">
      {STEPS.map((s, i) => {
        const isActive = s.num === currentNum;
        const isCompleted = s.num < currentNum;

        return (
          <div key={s.key} className="flex items-center">
            <motion.div
              className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all"
              style={{
                background: isActive ? "#F2811D" : isCompleted ? "#333333" : "#2E2E2E",
                color: isActive ? "#2E2E2E" : "#1F1F1F",
                border: isActive ? "none" : isCompleted ? "none" : "1px solid #3A3A3A",
              }}
              initial={{ scale: 0.9 }}
              animate={{ scale: isActive ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="hidden md:inline">
                {isCompleted ? "✓ " : `${s.num} `}
                {s.label}
              </span>
              <span className="md:hidden">
                {isCompleted ? "✓" : s.short}
              </span>
            </motion.div>
            {i < STEPS.length - 1 && (
              <div className="w-4 md:w-8 h-px mx-1" style={{ background: "#3A3A3A" }} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
