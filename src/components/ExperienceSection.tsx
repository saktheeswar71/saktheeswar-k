import { useState } from "react";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const timeline = [
  {
    role: "Data Analyst Intern",
    org: "Unified Mentor Pvt. Ltd. · Chennai",
    duration: "Jan 2024 – Mar 2024",
    bullets: [
      "Analyzed 5+ years of Netflix data using ARIMA & LSTM — improved forecast reliability by 18%",
      "Processed and visualized 1M+ records, boosting prediction accuracy by 15–20%",
      "Deployed end-to-end ML pipelines, cutting manual effort by 40%",
    ],
  },
  {
    role: "B.Tech — AI & Data Science",
    org: "St. Joseph's Institute of Technology · 2021–2025",
    duration: "CGPA: 6.53",
    bullets: [
      "Specialized in ML, Deep Learning, and Data Science",
      "Published research at ICASET-2025",
      "Built multiple real-world ML and computer vision projects",
    ],
  },
];

const ExperienceSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="experience" className="fab-section">
      <div className="fab-container">
        <div className="fab-label">
          <span className="font-mono-dm text-[12px]" style={{ color: "#555555" }}>(05)</span>
          <span className="font-display text-[13px]" style={{ color: "#888888" }}>Experience.</span>
        </div>

        <AnimatedSection>
          <h2 className="fab-heading mb-10">Experience.</h2>
        </AnimatedSection>

        <div>
          {timeline.map((entry, i) => (
            <AnimatedSection key={entry.role} delay={i * 0.1}>
              <div
                className="fab-row py-6 md:py-8 relative group"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 flex-1">
                    <span className="font-mono-dm text-[12px] shrink-0 md:w-[160px]" style={{ color: "#555555" }}>
                      {entry.duration}
                    </span>
                    <div className="flex-1">
                      <span className="font-display font-bold italic text-lg md:text-[22px] text-[#f5f5f5]">
                        {entry.role}
                      </span>
                      <p className="text-sm mt-0.5" style={{ color: "#888888" }}>{entry.org}</p>
                    </div>
                  </div>
                  <ArrowRight size={18} className="shrink-0 hidden md:block" style={{ color: "#555555" }} />
                </div>

                {/* Tooltip on hover */}
                {hoveredIdx === i && (
                  <div
                    className="hidden md:block absolute right-0 top-full mt-1 z-20 p-5 w-[340px]"
                    style={{ background: "#161616", border: "1px solid #222222" }}
                  >
                    <ul className="space-y-2">
                      {entry.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-[13px]" style={{ color: "#888888" }}>
                          <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ background: "#f5f5f5" }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
          <div style={{ borderTop: "1px solid #222222" }} />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
