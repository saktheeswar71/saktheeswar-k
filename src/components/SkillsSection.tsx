import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const skillGroups = [
  { num: "001", category: "Technologies", skills: ["Data Science", "Data Analytics"], count: "2" },
  { num: "002", category: "Languages", skills: ["Python", "SQL", "Java"], count: "3" },
  { num: "003", category: "Frameworks & Libraries", skills: ["Scikit-learn", "NumPy", "Pandas", "Matplotlib", "Seaborn", "ARIMA", "LSTM", "YOLOv7", "YOLOv8", "YOLOv9", "TabNet", "XGBoost"], count: "12" },
  { num: "004", category: "Tools & Platforms", skills: ["VSCode", "PyCharm", "Power BI", "MySQL", "Git", "Jupyter", "HTML", "CSS"], count: "8" },
  { num: "005", category: "Soft Skills", skills: ["Leadership", "Team Management", "Creativity"], count: "3" },
];

const SkillsSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="skills" className="fab-section">
      <div className="fab-container">
        <div className="fab-label">
          <span className="font-mono-dm text-[12px]" style={{ color: "#555555" }}>(02)</span>
          <span className="font-display text-[13px]" style={{ color: "#888888" }}>Skills.</span>
        </div>

        <AnimatedSection>
          <h2 className="fab-heading mb-10">Skills.</h2>
        </AnimatedSection>

        <div>
          {skillGroups.map((group, i) => {
            const isOpen = openIndex === i;
            return (
              <AnimatedSection key={group.category} delay={i * 0.06}>
                <div
                  className="fab-row cursor-pointer"
                  style={{ borderBottom: i === skillGroups.length - 1 ? "none" : undefined }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between py-5 md:py-6 px-0"
                  >
                    <div className="flex items-center gap-6">
                      <span className="font-mono-dm text-[12px]" style={{ color: "#555555" }}>({group.num})</span>
                      <span className="text-[18px] font-medium text-[#f5f5f5]">{group.category}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono-dm text-[12px]" style={{ color: "#555555" }}>{group.count}+</span>
                      <span style={{ color: "#888888" }}>
                        {isOpen ? <X size={18} /> : <Plus size={18} />}
                      </span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-2 pb-6 px-0">
                          {group.skills.map((skill) => (
                            <span key={skill} className="fab-pill">{skill}</span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
