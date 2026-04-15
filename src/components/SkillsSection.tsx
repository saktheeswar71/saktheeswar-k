import { Brain, Code, Package, Wrench, Users } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

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
  <section id="skills" className="dark-section section-padding relative">
    <div className="container mx-auto max-w-[1200px] relative z-10">
      <AnimatedSection>
        <p className="section-label">Skills</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white tracking-tight">Skills & Tools</h2>
        <p className="text-white/60 text-sm mb-12 max-w-md">Technologies and tools I use to bring data projects to life.</p>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillGroups.map((group, gi) => (
          <AnimatedSection key={group.category} delay={gi * 0.08}>
            <div className="rounded-xl p-6 h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                  <group.icon className="text-primary" size={18} />
                </div>
                <h3 className="font-semibold text-sm text-white tracking-wide">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-md text-xs font-medium bg-white/10 text-white/80 hover:bg-primary hover:text-white transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
