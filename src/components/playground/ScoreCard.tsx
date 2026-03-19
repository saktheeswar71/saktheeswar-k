import { motion } from "framer-motion";
import { ScoreResult } from "@/utils/gameLogic";
import { useEffect, useState } from "react";

interface Props {
  result: ScoreResult;
}

const gradeStyles: Record<string, { bg: string }> = {
  S: { bg: "#99CDD8" },
  A: { bg: "#DAEBE3" },
  B: { bg: "#FDE8D3" },
  C: { bg: "#CFD6C4" },
  D: { bg: "#F3C3B2" },
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
      <div className="text-6xl font-bold mb-2" style={{ color: "#657166" }}>
        {displayScore}
        <span className="text-2xl font-normal" style={{ color: "#8a9e8f" }}>
          /100
        </span>
      </div>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
        className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-3"
        style={{ background: gradeStyles[result.grade].bg, color: result.grade === 'S' ? '#fff' : "#657166" }}
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
            style={{ background: "#FAFAF8", border: "1px solid #CFD6C4" }}
          >
            <div className="text-lg font-bold" style={{ color: "#657166" }}>
              {item.icon} {item.value}
            </div>
            <div className="text-xs" style={{ color: "#8a9e8f" }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Bonus/Penalty */}
      <div className="flex justify-center gap-4 mt-3">
        {result.timeBonus > 0 && (
          <span className="text-xs px-2 py-1 rounded-full" style={{ background: "#DAEBE3", color: "#657166" }}>
            ⚡ Speed bonus: +{result.timeBonus} pts
          </span>
        )}
        {result.hintPenalty > 0 && (
          <span className="text-xs px-2 py-1 rounded-full" style={{ background: "#FDE8D3", color: "#657166" }}>
            💡 Hint penalty: −{result.hintPenalty} pts
          </span>
        )}
      </div>
    </div>
  );
};

export default ScoreCard;
