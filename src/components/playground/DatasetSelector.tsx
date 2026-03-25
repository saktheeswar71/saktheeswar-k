import { motion } from "framer-motion";
import { DATASETS } from "@/data/datasets";

interface Props {
  activeIndex: number;
  onSelect: (index: number) => void;
}

const difficultyColors: Record<string, string> = {
  Easy: "#fce4d6",
  Medium: "#fdd8c5",
  Hard: "#e6501b",
};

const difficultyTextColors: Record<string, string> = {
  Easy: "#280905",
  Medium: "#280905",
  Hard: "#FFFFFF",
};

const DatasetSelector = ({ activeIndex, onSelect }: Props) => {
  return (
    <section className="py-12 px-4 md:px-8" style={{ background: "#fef8f4" }}>
      <div className="container mx-auto max-w-[1200px]">
        <h2 className="text-xl font-bold mb-6" style={{ color: "#280905" }}>
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
                background: activeIndex === i ? "#fce4d6" : "#FFFFFF",
                border: activeIndex === i ? "2px solid #c3110e" : "1px solid #ddb8a0",
                boxShadow: "0 2px 16px rgba(40,9,5,0.08)",
                transform: activeIndex === i ? "scale(1.02)" : "scale(1)",
              }}
            >
              <div className="text-3xl mb-2">{ds.emoji}</div>
              <div className="font-bold text-sm mb-1" style={{ color: "#280905" }}>
                {ds.name}
              </div>
              <span
                className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2"
                style={{ background: difficultyColors[ds.difficulty], color: difficultyTextColors[ds.difficulty] }}
              >
                {ds.difficulty}
              </span>
              <p className="text-xs mb-2 line-clamp-2" style={{ color: "#740a03" }}>
                {ds.description}
              </p>
              <p className="text-xs" style={{ color: "#740a03" }}>
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
