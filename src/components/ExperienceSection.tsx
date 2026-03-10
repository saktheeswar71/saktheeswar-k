import { Briefcase, GraduationCap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const timeline = [
  {
    icon: Briefcase,
    role: "Data Analyst Intern",
    org: "Unified Mentor Pvt. Ltd.",
    location: "Chennai",
    duration: "Jan 2024 – Mar 2024",
    badge: "3 Months",
    bullets: [
      "Analyzed 5+ years of Netflix subscription data and forecasted growth using ARIMA and LSTM, improving forecast reliability by 18%",
      "Processed and visualized 1M+ data records, driving 15–20% improvement in prediction accuracy",
      "Built and deployed end-to-end ML pipelines for subscription forecasting, reducing manual effort by 40%",
    ],
    tags: ["Python", "ARIMA", "LSTM", "Pandas", "Matplotlib", "Time-Series"],
  },
  {
    icon: GraduationCap,
    role: "B.Tech — Artificial Intelligence & Data Science",
    org: "St. Joseph's Institute of Technology",
    location: "Chennai, Tamil Nadu",
    duration: "2021 – 2025",
    badge: "CGPA: 6.53",
    bullets: [
      "Specialized in AI, Data Science, Machine Learning, and Deep Learning",
      "Conducted research leading to a conference publication at ICASET-2025",
      "Developed multiple end-to-end ML projects across forecasting and computer vision domains",
    ],
    tags: [],
  },
];

const ExperienceSection = () => (
  <section id="experience" className="section-padding relative">
    <div className="blob-purple -bottom-60 -left-60 opacity-40" />
    <div className="container mx-auto max-w-[1200px] relative z-10">
      <AnimatedSection>
        <p className="section-label">// EXPERIENCE</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-14">
          Experience & <span className="text-gradient">Journey</span>
        </h2>
      </AnimatedSection>

      <div className="relative">
        {/* Center timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent md:-translate-x-px" />

        {timeline.map((entry, i) => (
          <AnimatedSection key={entry.role} delay={i * 0.2}>
            <div className={`relative flex flex-col md:flex-row gap-8 mb-14 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1.5 mt-2 z-10">
                <div className="absolute inset-0 rounded-full bg-primary/40 animate-pulse-ring" />
              </div>

              {/* Spacer */}
              <div className="hidden md:block md:w-1/2" />

              {/* Card */}
              <div className="ml-10 md:ml-0 md:w-1/2">
                <div className="glass rounded-xl p-6 card-hover">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <entry.icon className="text-primary" size={20} />
                    </div>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent/10 text-cyan font-medium">
                      {entry.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{entry.role}</h3>
                  <p className="text-primary text-sm font-medium">{entry.org}</p>
                  <p className="text-muted-foreground text-xs mb-4">{entry.duration} · {entry.location}</p>

                  <ul className="space-y-2 mb-4">
                    {entry.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gradient-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono px-2 py-0.5 rounded-md"
                          style={{ background: "rgba(124, 58, 237, 0.1)", color: "#A855F7" }}
                        >
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
    </div>
  </section>
);

export default ExperienceSection;
