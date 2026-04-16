import { useState } from "react";
import { Github, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";

type Category = "All" | "Machine Learning" | "Computer Vision" | "Forecasting";

const projects = [
  {
    title: "Netflix Subscriptions Forecasting",
    slug: "netflix-forecasting",
    date: "Feb 2024",
    tag: "Machine Learning • Forecasting",
    description:
      "Built ARIMA and LSTM models on subscription data, achieving 10–15% better forecast accuracy — and a reusable pipeline that automates 30–40% of manual work.",
    impacts: ["18% better reliability", "1M+ records", "40% less manual effort"],
    tech: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "ARIMA", "LSTM", "Git"],
    github: "https://github.com/saktheeswar71",
    categories: ["Machine Learning", "Forecasting"] as Category[],
    featured: true,
  },
  {
    title: "Wildlife Animal Classification",
    slug: "wildlife-classification",
    date: "Mar 2024",
    tag: "Computer Vision • Deep Learning",
    description:
      "Used YOLOv7, v8, and v9 for camera trap photo classification. Achieved 88% accuracy on 2096 images over 150 epochs.",
    impacts: ["88% accuracy", "2096 images", "25% better robustness"],
    tech: ["Python", "YOLOv7", "YOLOv8", "YOLOv9", "NumPy", "Pandas", "Git"],
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
    <section id="projects" className="section-padding relative bg-background">
      <div className="container mx-auto max-w-[1200px] relative z-10">
        <AnimatedSection>
          <p className="section-label">Projects</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground tracking-tight">Featured Projects</h2>
          <p className="text-muted-foreground text-sm mb-10 max-w-md">Real projects with real data and measurable results.</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
                  active === f
                    ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
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
            {filtered.map((proj) => (
              <div
                key={proj.title}
                className={`group rounded-xl p-6 flex flex-col bg-card border border-border shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 hover:border-primary/30 transition-all duration-400 ${
                  proj.featured ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-muted-foreground">{proj.date}</span>
                  <span className="text-xs px-3 py-1 rounded-md bg-primary/10 text-primary font-medium">
                    {proj.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{proj.title}</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{proj.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {proj.impacts.map((impact) => (
                    <span
                      key={impact}
                      className="text-xs font-semibold px-3 py-1.5 rounded-md bg-primary/10 text-primary border border-primary/20"
                    >
                      {impact}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.tech.map((t) => (
                    <span key={t} className="text-[11px] px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-medium">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 mt-auto">
                  <Link
                    to={`/projects/${proj.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground bg-primary px-5 py-2.5 rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    Case Study <ArrowRight size={14} />
                  </Link>
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github size={16} /> GitHub
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
