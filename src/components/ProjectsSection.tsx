import { useState } from "react";
import { Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

type Category = "All" | "Machine Learning" | "Computer Vision" | "Forecasting";

const projects = [
  {
    title: "Netflix Subscriptions Forecasting",
    date: "Feb 2024",
    description:
      "Forecasted Netflix subscription growth using time-series models on 40 records. Built ARIMA and LSTM models with end-to-end ML pipelines, achieving 10–15% better forecast accuracy and reducing manual steps by 30–40%.",
    tech: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "ARIMA", "LSTM", "Git"],
    highlights: [
      "Preprocessed subscription data — improved data quality by ~20%",
      "ARIMA + LSTM models with 10–15% improved accuracy after tuning",
      "Reusable ML pipeline reducing manual steps by 30–40%",
    ],
    github: "https://github.com/saktheeswar71",
    categories: ["Machine Learning", "Forecasting"] as Category[],
    featured: true,
  },
  {
    title: "Wildlife Animal Classification from Trap Images",
    date: "Mar 2024",
    description:
      "Built a wildlife classification system using camera-trap images with YOLOv7/v8/v9. Achieved 88% accuracy on 2096 training images over 150 epochs, reducing misclassification by 10–15%.",
    tech: ["Python", "YOLOv7", "YOLOv8", "YOLOv9", "NumPy", "Pandas", "Matplotlib", "Git"],
    highlights: [
      "88% accuracy on 2096-image dataset across 150 epochs",
      "YOLOv7/v8/v9 ensemble — 10–15% reduced misclassification",
      "Data augmentation boosted model robustness by 25%",
    ],
    github: "https://github.com/saktheeswar71",
    categories: ["Machine Learning", "Computer Vision"] as Category[],
    featured: false,
  },
];

const filters: Category[] = ["All", "Machine Learning", "Computer Vision", "Forecasting"];

const ProjectsSection = () => {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.categories.includes(active));

  return (
    <section id="projects" className="section-padding relative">
      <div className="blob-purple -bottom-40 -right-60 opacity-40" />
      <div className="container mx-auto max-w-[1200px] relative z-10">
        <AnimatedSection>
          <p className="section-label">// PROJECTS</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </AnimatedSection>

        {/* Filter tabs */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  active === f
                    ? "btn-gradient"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {filtered.map((proj, i) => (
              <div
                key={proj.title}
                className={`glass rounded-xl p-6 flex flex-col card-hover group ${
                  proj.featured ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-muted-foreground">{proj.date}</span>
                  {proj.featured && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      Featured
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-gradient transition-colors">
                  {proj.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{proj.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2.5 py-1 rounded-md"
                      style={{ background: "rgba(124, 58, 237, 0.1)", color: "#A855F7" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <ul className="space-y-2 flex-1 mb-6">
                  {proj.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gradient-primary" />
                      {h}
                    </li>
                  ))}
                </ul>

                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
                >
                  <Github size={16} /> View on GitHub
                </a>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
