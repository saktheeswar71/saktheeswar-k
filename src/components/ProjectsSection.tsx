import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";

const projects = [
  {
    title: "Netflix Subscriptions Forecasting",
    slug: "netflix-forecasting",
    date: "Feb 2024",
    tech: ["Python", "ARIMA", "LSTM", "Pandas"],
  },
  {
    title: "Wildlife Animal Classification",
    slug: "wildlife-classification",
    date: "Mar 2024",
    tech: ["YOLOv7", "YOLOv8", "YOLOv9", "Python"],
  },
];

const ProjectsSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="projects" className="fab-section">
      <div className="fab-container">
        <div className="fab-label">
          <span className="font-mono-dm text-[12px]" style={{ color: "#555555" }}>(03)</span>
          <span className="font-display text-[13px]" style={{ color: "#888888" }}>Projects.</span>
        </div>

        <div className="flex items-end justify-between mb-10">
          <AnimatedSection>
            <h2 className="fab-heading">Projects.</h2>
          </AnimatedSection>
          <span className="font-mono-dm text-[12px]" style={{ color: "#555555" }}>({projects.length})</span>
        </div>

        <div>
          {projects.map((proj, i) => (
            <AnimatedSection key={proj.slug} delay={i * 0.06}>
              <Link
                to={`/projects/${proj.slug}`}
                className="fab-row block py-6 md:py-8 group relative"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                    <span className="font-mono-dm text-[12px] shrink-0" style={{ color: "#555555" }}>{proj.date}</span>
                    <span
                      className="font-display font-bold italic text-xl md:text-[28px] transition-colors duration-200"
                      style={{ color: hoveredIdx === i ? "#e8343a" : "#f5f5f5" }}
                    >
                      {proj.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex gap-2">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono-dm text-[12px] px-2.5 py-1"
                          style={{ border: "1px solid #333333", borderRadius: 4, color: "#555555" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <ArrowRight
                      size={18}
                      className="transition-colors duration-200 shrink-0"
                      style={{ color: hoveredIdx === i ? "#f5f5f5" : "#555555" }}
                    />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
          {/* Bottom border */}
          <div style={{ borderTop: "1px solid #222222" }} />
        </div>

        <div className="mt-6">
          <a href="#projects" className="text-sm transition-colors duration-200 hover:text-[#f5f5f5]" style={{ color: "#888888" }}>
            All projects ({projects.length}) →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
