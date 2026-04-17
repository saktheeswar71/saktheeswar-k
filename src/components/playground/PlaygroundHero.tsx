import { motion } from "framer-motion";
import { ScoreResult } from "@/utils/gameLogic";

interface Props {
  streak: number;
  totalPlayed: number;
  lastScore: ScoreResult | null;
}

const PlaygroundHero = ({ streak, totalPlayed, lastScore }: Props) => {
  return (
    <section
      className="py-20 px-4 md:px-8"
      style={{ background: "linear-gradient(135deg, #1F1F1F, #262626)" }}
    >
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{ background: "rgba(242,129,29,0.18)", color: "#FF9A40", border: "1px solid rgba(242,129,29,0.35)" }}
            >
              🧹 Interactive Data Challenge
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}
            >
              <span style={{ color: "#2E2E2E" }}>Fix the Data</span>
              <br />
              <span style={{ color: "#FF9A40" }}>Playground</span>
            </h1>
            <p className="text-base md:text-lg max-w-md mb-6" style={{ color: "rgba(229,229,229,0.85)" }}>
              Think like a data analyst. Spot the issues, pick the right cleaning
              actions, and see how clean data changes everything.
            </p>
            <div className="flex flex-wrap gap-2">
              {["📊 3 Datasets", "🎯 Scoring System", "💡 Explanations"].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: "rgba(242,129,29,0.18)", color: "#333333", border: "1px solid rgba(242,129,29,0.35)" }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — stat card */}
          <motion.div
            className="w-full md:w-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(242,129,29,0.35)",
                backdropFilter: "blur(8px)",
              }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "rgba(229,229,229,0.7)" }}>
                Your Stats
              </h3>
              <div className="space-y-3">
                {[
                  { icon: "🏆", label: "Best Streak", value: streak },
                  { icon: "🎮", label: "Games Played", value: totalPlayed },
                  { icon: "⭐", label: "Last Score", value: lastScore ? `${lastScore.finalScore}/100` : "—" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: "rgba(229,229,229,0.9)" }}>
                      {stat.icon} {stat.label}
                    </span>
                    <span className="text-lg font-bold" style={{ color: "#2E2E2E" }}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-center mt-3" style={{ color: "rgba(229,229,229,0.6)" }}>
              Data cleaning is 80% of a data analyst's job. Master it here.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlaygroundHero;
