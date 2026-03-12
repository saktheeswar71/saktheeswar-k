import { Brain, Code, Package, Wrench, Users } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import noDataDino from "@/assets/no-data-dino.png";

const skillGroups = [
  { icon: Brain, category: "Technologies", skills: ["Data Science", "Data Analytics"] },
  { icon: Code, category: "Languages", skills: ["Python", "SQL", "Java"] },
  {
    icon: Package,
    category: "Frameworks & Libraries",
    skills: ["Scikit-learn", "NumPy", "Pandas", "Matplotlib", "Seaborn", "ARIMA", "LSTM", "YOLOv7", "YOLOv8", "YOLOv9", "TabNet", "XGBoost"],
  },
  { icon: Wrench, category: "Tools", skills: ["VSCode", "PyCharm", "Power BI", "MySQL", "Git", "Jupyter", "HTML", "CSS"] },
  { icon: Users, category: "Soft Skills", skills: ["Leadership", "Team Management", "Creativity"] },
];

const SkillsSection = () => (
  <section id="skills" className="section-padding relative bg-white">
    <div className="container mx-auto max-w-[1200px] relative z-10">
      <AnimatedSection>
        <p className="section-label">// WHAT I WORK WITH</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-slate">Skills & Tools</h2>
        <p className="text-body text-sm mb-12">Things I can actually do — not just list on a resume.</p>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillGroups.map((group, gi) => (
          <AnimatedSection key={group.category} delay={gi * 0.1}>
            <div className="rounded-[20px] p-6 h-full border border-sage" style={{ background: "hsl(150 30% 90%)" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-white">
                  <group.icon className="text-steel" size={20} />
                </div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-slate">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-white text-slate hover:bg-rose transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}

        {/* Fun dino card */}
        <AnimatedSection delay={0.5}>
          <div className="rounded-[20px] p-6 h-full border border-sage bg-white flex flex-col items-center justify-center text-center">
            <img
              src={noDataDino}
              alt="No Data Found - pixel art dinosaur"
              className="w-48 h-auto mb-3"
            />
            <p className="text-body text-xs italic">what happens when I forget to import pandas</p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default SkillsSection;
