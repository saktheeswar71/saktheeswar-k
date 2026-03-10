import { Brain, Code, Package, Wrench, Users } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const skillGroups = [
  {
    icon: Brain,
    category: "Technologies",
    skills: ["Data Science", "Data Analytics"],
  },
  {
    icon: Code,
    category: "Programming Languages",
    skills: ["Python", "SQL", "Java"],
  },
  {
    icon: Package,
    category: "Frameworks & Libraries",
    skills: [
      "Scikit-learn", "NumPy", "Matplotlib", "Seaborn", "Pandas",
      "ARIMA", "LSTM", "YOLOv7", "YOLOv8", "YOLOv9", "TabNet", "XGBoost",
    ],
  },
  {
    icon: Wrench,
    category: "Tools & Platforms",
    skills: ["VSCode", "PyCharm", "Power BI", "MySQL", "HTML", "CSS", "Git", "Jupyter"],
  },
  {
    icon: Users,
    category: "Soft Skills",
    skills: ["Leadership", "Team Management", "Creativity"],
  },
];

const SkillsSection = () => (
  <section id="skills" className="section-padding relative">
    <div className="blob-cyan -top-40 -left-60 opacity-40" />
    <div className="container mx-auto max-w-[1200px] relative z-10">
      <AnimatedSection>
        <p className="section-label">// SKILLS</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Technical <span className="text-gradient">Skills</span>
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillGroups.map((group, gi) => (
          <AnimatedSection key={group.category} delay={gi * 0.1}>
            <div className="glass rounded-xl p-6 h-full card-hover">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-primary/10">
                  <group.icon className="text-primary" size={20} />
                </div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-default"
                    style={{
                      background: "rgba(124, 58, 237, 0.08)",
                      color: "#A855F7",
                      animationDelay: `${si * 100}ms`,
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.background = "rgba(124, 58, 237, 0.2)";
                      (e.target as HTMLElement).style.boxShadow = "0 0 15px rgba(124,58,237,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.background = "rgba(124, 58, 237, 0.08)";
                      (e.target as HTMLElement).style.boxShadow = "none";
                    }}
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
