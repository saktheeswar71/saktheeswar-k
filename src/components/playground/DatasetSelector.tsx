import { motion } from "framer-motion";
import { DATASETS } from "@/data/datasets";

interface Props {
  activeIndex: number;
  onSelect: (index: number) => void;
}

const difficultyColors: Record<string, string> = {
  Easy: "#333333",
  Medium: "#3A3A3A",
  Hard: "#FF9A40",
};

const difficultyTextColors: Record<string, string> = {
  Easy: "#1F1F1F",
  Medium: "#1F1F1F",
  Hard: "#2E2E2E",
};

const DatasetSelector = ({ activeIndex, onSelect }: Props) => {
  return (
    <section className="py-12 px-4 md:px-8" style={{ background: "#262626" }}>
      <div className="container mx-auto max-w-[1200px]">
        <h2 className="text-xl font-bold mb-6" style={{ color: "#1F1F1F" }}>
          Choose a Dataset
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {DATASETS.map((ds, i) => (
            <motion.button
              key={ds.id}
              onClick={() => onSelect(i)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="text-left rounded-2xl p-5 transition-all duration-200 cursor-pointer"
              style={{
                background: activeIndex === i ? "#333333" : "#2E2E2E",
                border: activeIndex === i ? "2px solid #F2811D" : "1px solid #3A3A3A",
                boxShadow: "0 2px 16px rgba(0,0,0,0.4)",
                transform: activeIndex === i ? "scale(1.02)" : "scale(1)",
              }}
            >
              <div className="text-3xl mb-2">{ds.emoji}</div>
              <div className="font-bold text-sm mb-1" style={{ color: "#1F1F1F" }}>
                {ds.name}
              </div>
              <span
                className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2"
                style={{ background: difficultyColors[ds.difficulty], color: difficultyTextColors[ds.difficulty] }}
              >
                {ds.difficulty}
              </span>
              <p className="text-xs mb-2 line-clamp-2" style={{ color: "#A0A0A0" }}>
                {ds.description}
              </p>
              <p className="text-xs" style={{ color: "#A0A0A0" }}>
                {ds.rows.length} rows · {ds.correctActions.length} issues to find
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DatasetSelector;
