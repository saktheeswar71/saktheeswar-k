import { Briefcase, GraduationCap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import lofiDesk from "@/assets/lofi-desk.jpg";

const timeline = [
  {
    icon: Briefcase,
    role: "Data Analyst Intern",
    org: "Unified Mentor Pvt. Ltd.",
    location: "Chennai",
    duration: "Jan 2024 – Mar 2024",
    badge: "3 months of real world chaos 📊",
    bullets: [
      "Analyzed 5+ years of Netflix subscription data using ARIMA and LSTM — improved forecast reliability by 18%",
      "Processed and visualized 1M+ records, boosting prediction accuracy by 15–20%",
      "Deployed end-to-end ML pipelines, cutting manual effort by 40%",
    ],
    tags: ["Python", "ARIMA", "LSTM", "Pandas", "Matplotlib"],
  },
  {
    icon: GraduationCap,
    role: "B.Tech — Artificial Intelligence & Data Science",
    org: "St. Joseph's Institute of Technology, Chennai",
    location: "2021–2025",
    duration: "CGPA: 6.53",
    badge: "Four years. One brain. Infinite Stack Overflows.",
    bullets: [
      "Specialized in ML, Deep Learning, and Data Science",
      "Published research at ICASET-2025",
      "Built multiple real-world ML and computer vision projects",
    ],
    tags: [],
  },
];

const ExperienceSection = () => (
  <section id="experience" className="section-padding relative bg-white">
    <div className="container mx-auto max-w-[1200px] relative z-10">
      <AnimatedSection>
        <p className="section-label">// MY JOURNEY</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-slate">Experience & Education</h2>
        <p className="text-body text-sm mb-14">How I got here — and why I stayed.</p>
      </AnimatedSection>

      <div className="relative">
        {/* Timeline line */}
        <div
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
          style={{ borderLeft: "2px dashed hsl(100 12% 81%)" }}
        />

        {timeline.map((entry, i) => (
          <AnimatedSection key={entry.role} delay={i * 0.2}>
            <div className={`relative flex flex-col md:flex-row gap-8 mb-14 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-steel -translate-x-2 mt-2 z-10">
                <div
                  className="absolute inset-0 rounded-full bg-steel/40"
                  style={{ animation: "pulse-dot 2s ease-out infinite" }}
                />
              </div>

              <div className="hidden md:block md:w-1/2" />

              <div className="ml-10 md:ml-0 md:w-1/2">
                <div className="soft-card p-6">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <div className="p-2 rounded-xl bg-steel/10">
                      <entry.icon className="text-steel" size={20} />
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-rose/50 text-slate font-medium italic">
                      {entry.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate">{entry.role}</h3>
                  <p className="text-steel text-sm font-medium">{entry.org}</p>
                  <p className="text-body text-xs mb-4">{entry.duration} · {entry.location}</p>

                  <ul className="space-y-2 mb-4">
                    {entry.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-body">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-steel" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-mint text-slate font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Lofi desk illustration */}
      <AnimatedSection delay={0.4}>
        <div className="mt-8 max-w-lg mx-auto">
          <div className="rounded-[20px] overflow-hidden shadow-sm border border-sage">
            <img
              src={lofiDesk}
              alt="Lofi pixel art of a developer coding late at night"
              className="w-full h-auto"
            />
          </div>
          <p className="text-center text-body text-xs mt-3 italic">
            accurate representation of me at 1 AM debugging LSTM layers
          </p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default ExperienceSection;
