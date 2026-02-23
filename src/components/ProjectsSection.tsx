import { Github, ExternalLink } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const projects = [
  {
    title: "Netflix Subscription Forecasting",
    tech: ["Python", "NumPy", "Pandas", "Matplotlib", "Git"],
    bullets: [
      "Built ARIMA and LSTM models for subscription forecasting.",
      "Improved forecast accuracy by 10–15%.",
      "Created reusable ML pipeline reducing manual steps by 30–40%.",
      "Implemented preprocessing & data visualization.",
    ],
    github: "https://github.com/saktheeswar71",
  },
  {
    title: "Wildlife Animal Classification",
    tech: ["Python", "YOLOv7", "YOLOv8", "YOLOv9"],
    bullets: [
      "Trained on 2,096 camera-trap images for 150 epochs.",
      "Achieved 88% classification accuracy.",
      "Reduced misclassification by 10–15%.",
      "Applied data augmentation and preprocessing.",
    ],
    github: "https://github.com/saktheeswar71",
  },
];

const ProjectsSection = () => (
  <section id="projects" className="section-padding">
    <div className="container mx-auto max-w-5xl">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          <span className="text-gradient">Projects</span>
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((proj, i) => (
          <AnimatedSection key={proj.title} delay={i * 0.15}>
            <div className="glass rounded-xl p-6 h-full flex flex-col hover:glow-border transition-shadow duration-300 group">
              <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                {proj.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-primary/10 text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <ul className="space-y-2 flex-1 mb-6">
                {proj.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Github size={16} /> View on GitHub <ExternalLink size={12} />
              </a>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
