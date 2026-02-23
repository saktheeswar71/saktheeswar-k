import AnimatedSection from "./AnimatedSection";

const skillGroups = [
  {
    category: "Programming",
    skills: ["Python", "SQL", "Java"],
  },
  {
    category: "Data Science",
    skills: ["NumPy", "Pandas", "Scikit-learn", "Matplotlib"],
  },
  {
    category: "Tools & Platforms",
    skills: ["Power BI", "MySQL", "VS Code", "PyCharm", "HTML", "CSS"],
  },
];

const SkillsSection = () => (
  <section id="skills" className="section-padding">
    <div className="container mx-auto max-w-5xl">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Technical <span className="text-gradient">Skills</span>
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-6">
        {skillGroups.map((group, gi) => (
          <AnimatedSection key={group.category} delay={gi * 0.1}>
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold text-primary mb-4 font-mono text-sm uppercase tracking-wider">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
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
