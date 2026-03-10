import { useState } from "react";
import { Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

type Category = "All" | "Machine Learning" | "Computer Vision" | "Forecasting";

const projects = [
  {
    title: "Netflix Subscriptions Forecasting",
    date: "Feb 2024",
    tag: "Machine Learning • Forecasting",
    description:
      "Because who wouldn't want to predict the future of Netflix? Built ARIMA and LSTM models on subscription data, achieving 10–15% better forecast accuracy — and a reusable pipeline that does 30–40% of the boring work automatically.",
    impacts: ["18% better reliability", "1M+ records", "40% less manual effort"],
    tech: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "ARIMA", "LSTM", "Git"],
    github: "https://github.com/saktheeswar71",
    categories: ["Machine Learning", "Forecasting"] as Category[],
    featured: true,
  },
  {
    title: "Wildlife Animal Classification",
    date: "Mar 2024",
    tag: "Computer Vision • Deep Learning",
    description:
      "Taught a computer to identify animals from camera trap photos. Used YOLOv7, v8, and v9 — because one YOLO model just wasn't dramatic enough. Achieved 88% accuracy on 2096 images over 150 epochs.",
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
    <section id="projects" className="section-padding relative" style={{ background: "hsl(28 93% 91%)" }}>
      <div className="container mx-auto max-w-[1200px] relative z-10">
        <AnimatedSection>
          <p className="section-label">// THINGS I BUILT</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-slate">Featured Projects</h2>
          <p className="text-body text-sm mb-8">Real projects. Real data. Real results. (No lorem ipsum was harmed.)</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === f
                    ? "bg-steel text-white"
                    : "bg-white text-slate hover:bg-rose/50"
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
                className={`soft-card p-6 flex flex-col ${proj.featured ? "md:col-span-2" : ""}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-body">{proj.date}</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-rose/50 text-slate font-medium">
                    {proj.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-3 text-slate">{proj.title}</h3>
                <p className="text-body text-sm mb-4 leading-relaxed">{proj.description}</p>

                {/* Impact pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.impacts.map((impact) => (
                    <span
                      key={impact}
                      className="text-xs font-semibold px-3 py-1 rounded-full bg-steel/10 text-steel"
                    >
                      {impact}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {proj.tech.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-mint text-slate font-medium">
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-steel hover:text-slate transition-colors mt-auto"
                >
                  <Github size={16} /> 🐙 View on GitHub
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