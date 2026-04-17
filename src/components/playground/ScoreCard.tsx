import { motion } from "framer-motion";
import { ScoreResult } from "@/utils/gameLogic";
import { useEffect, useState } from "react";

interface Props {
  result: ScoreResult;
}

const gradeStyles: Record<string, { bg: string; color: string }> = {
  S: { bg: "#F2811D", color: "#2E2E2E" },
  A: { bg: "#FF9A40", color: "#2E2E2E" },
  B: { bg: "#3A3A3A", color: "#1F1F1F" },
  C: { bg: "#3A3A3A", color: "#1F1F1F" },
  D: { bg: "#333333", color: "#1F1F1F" },
};

const ScoreCard = ({ result }: Props) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 1000;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * result.finalScore));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [result.finalScore]);

  return (
    <div className="text-center mb-8">
      <div className="text-6xl font-bold mb-2" style={{ color: "#1F1F1F" }}>
        {displayScore}
        <span className="text-2xl font-normal" style={{ color: "#A0A0A0" }}>
          /100
        </span>
      </div>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
        className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-3"
        style={{ background: gradeStyles[result.grade].bg, color: gradeStyles[result.grade].color }}
      >
        {result.emoji} Grade {result.grade} — {result.message}
      </motion.div>

      {/* Breakdown */}
      <div className="flex justify-center gap-4 mt-4">
        {[
          { label: "Correct", value: result.hits.length, icon: "✅" },
          { label: "Missed", value: result.missed.length, icon: "❌" },
          { label: "Unnecessary", value: result.extras.length, icon: "➕" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl px-4 py-3 text-center"
            style={{ background: "#262626", border: "1px solid #3A3A3A" }}
          >
            <div className="text-lg font-bold" style={{ color: "#1F1F1F" }}>
              {item.icon} {item.value}
            </div>
            <div className="text-xs" style={{ color: "#A0A0A0" }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Bonus/Penalty */}
      <div className="flex justify-center gap-4 mt-3">
        {result.timeBonus > 0 && (
          <span className="text-xs px-2 py-1 rounded-full" style={{ background: "#333333", color: "#1F1F1F" }}>
            ⚡ Speed bonus: +{result.timeBonus} pts
          </span>
        )}
        {result.hintPenalty > 0 && (
          <span className="text-xs px-2 py-1 rounded-full" style={{ background: "#3A3A3A", color: "#1F1F1F" }}>
            💡 Hint penalty: −{result.hintPenalty} pts
          </span>
        )}
      </div>
    </div>
  );
};

export default ScoreCard;
