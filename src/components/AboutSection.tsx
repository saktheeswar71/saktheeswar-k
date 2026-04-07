import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 2, suffix: "+", label: "Projects Completed" },
  { value: 1, suffix: "", label: "Research Publication" },
  { value: 3, suffix: "", label: "Certifications" },
  { value: 6.53, suffix: "", label: "CGPA — B.Tech AI & DS", isDecimal: true },
];

const CountUp = ({ target, suffix, isDecimal }: { target: number; suffix: string; isDecimal?: boolean }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const dur = 1200;
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            setVal(isDecimal ? parseFloat((target * ease).toFixed(2)) : Math.floor(target * ease));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, isDecimal]);

  return (
    <div ref={ref} className="font-mono-dm text-[32px] text-[#f5f5f5]">
      {isDecimal ? val.toFixed(2) : val}{suffix}
    </div>
  );
};

const AboutSection = () => (
  <section id="about" className="fab-section">
    <div className="fab-container">
      {/* Label row */}
      <div className="fab-label">
        <span className="font-mono-dm text-[12px]" style={{ color: "#555555" }}>(01)</span>
        <span className="font-display text-[13px]" style={{ color: "#888888" }}>About.</span>
      </div>

      <div className="grid lg:grid-cols-[40%_1fr] gap-0">
        {/* Left */}
        <div className="lg:border-r" style={{ borderColor: "#222222" }}>
          <div className="pr-0 lg:pr-12">
            <AnimatedSection>
              <h2 className="fab-heading mb-10">About.</h2>
            </AnimatedSection>

            {/* Stat rows */}
            <div>
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="py-4"
                  style={{ borderBottom: "1px solid #222222" }}
                >
                  <CountUp target={s.value} suffix={s.suffix} isDecimal={s.isDecimal} />
                  <p className="text-[13px] mt-1" style={{ color: "#888888" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="pl-0 lg:pl-12 pt-8 lg:pt-0">
          <AnimatedSection delay={0.15}>
            <div className="space-y-6" style={{ color: "#888888", fontWeight: 300, fontSize: 16, lineHeight: 1.8 }}>
              <p>
                I'm <span className="text-[#f5f5f5] font-normal">Saktheeswar K</span>, a B.Tech graduate in Artificial
                Intelligence and Data Science (2021–2025) from
                St. Joseph's Institute of Technology, Chennai.
              </p>
              <p>
                I specialize in data analysis, machine learning,
                and deep learning — transforming complex datasets
                into clear, actionable decisions.
              </p>
              <p>
                When I'm not training models, I'm probably
                overthinking a Power BI dashboard or explaining
                to someone why correlation ≠ causation — again.
              </p>
            </div>

            <a
              href="#projects"
              className="inline-block mt-8 text-sm text-[#f5f5f5] hover:underline transition-all"
            >
              Read full story →
            </a>
          </AnimatedSection>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
