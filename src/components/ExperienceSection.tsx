import { Briefcase, GraduationCap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const timeline = [
  {
    icon: Briefcase,
    role: "Data Analyst Intern",
    org: "Unified Mentor Pvt. Ltd.",
    location: "Chennai",
    duration: "Jan 2024 – Mar 2024",
    bullets: [
      "Analyzed 5+ years of Netflix subscription data using ARIMA and LSTM — improved forecast reliability by 18%",
      "Processed and visualized 1M+ records, boosting prediction accuracy by 15–20%",
      "Deployed end-to-end ML pipelines, cutting manual effort by 40%",
    ],
    tags: ["Python", "ARIMA", "LSTM", "Pandas", "Matplotlib"],
  },
  {
    icon: GraduationCap,
    role: "B.Tech — AI & Data Science",
    org: "St. Joseph's Institute of Technology",
    location: "Chennai · 2021–2025",
    duration: "CGPA: 6.53",
    bullets: [
      "Specialized in ML, Deep Learning, and Data Science",
      "Published research at ICASET-2025",
      "Built multiple real-world ML and computer vision projects",
    ],
    tags: [],
  },
];

const ExperienceSection = () => (
  <section id="experience" className="section-padding relative">
    <div className="container mx-auto max-w-[1200px] relative z-10">
      <AnimatedSection>
        <p className="section-label">Experience</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate tracking-tight">Experience & Education</h2>
        <p className="text-body text-sm mb-14 max-w-md">My professional journey and academic background.</p>
      </AnimatedSection>

      <div className="relative max-w-3xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-sage/60" />

        {timeline.map((entry, i) => (
          <AnimatedSection key={entry.role} delay={i * 0.15}>
            <div className="relative flex gap-6 mb-10 last:mb-0">
              {/* Dot */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-white border-2 border-steel/30 flex items-center justify-center shadow-sm">
                  <entry.icon className="text-steel" size={18} />
                </div>
              </div>

              {/* Content card */}
              <div className="flex-1 rounded-2xl p-6 bg-white/70 backdrop-blur-sm border border-sage/30 shadow-sm hover:shadow-md transition-all duration-300 -mt-1">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <h3 className="text-lg font-bold text-slate">{entry.role}</h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-steel/10 text-steel font-medium">{entry.duration}</span>
                </div>
                <p className="text-steel text-sm font-medium">{entry.org}</p>
                <p className="text-body text-xs mb-4">{entry.location}</p>

                <ul className="space-y-2.5 mb-4">
                  {entry.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-body leading-relaxed">
                      <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0 bg-steel" />
                      {b}
                    </li>
                  ))}
                </ul>

                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-sage/30 text-slate/70 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
