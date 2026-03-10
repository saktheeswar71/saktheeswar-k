import { BarChart3, Brain, Award, GraduationCap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const stats = [
  { icon: BarChart3, label: "2+ Projects", sub: "Completed" },
  { icon: Brain, label: "1 Publication", sub: "Research" },
  { icon: Award, label: "3 Certifications", sub: "Earned" },
  { icon: GraduationCap, label: "CGPA: 6.53", sub: "B.Tech AI & DS" },
];

const AboutSection = () => (
  <section id="about" className="section-padding relative" style={{ background: "hsl(150 30% 90%)" }}>
    <div className="container mx-auto max-w-[1200px] relative z-10">
      <AnimatedSection>
        <p className="section-label">// WHO AM I</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate">
          A little about me
        </h2>
      </AnimatedSection>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left — decorative */}
        <AnimatedSection delay={0.1}>
          <div className="relative w-full max-w-sm mx-auto aspect-square rounded-[20px] bg-white shadow-sm flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ background: "linear-gradient(135deg, hsl(193 46% 72%), hsl(14 62% 82%))" }} />
            <div className="relative z-10 text-center px-8">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-slate font-semibold text-lg">Data × AI × Coffee</p>
              <p className="text-body text-sm mt-2">Making sense of the messy stuff</p>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-12 h-12 border-2 border-steel/30 rounded-lg rotate-12" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-2 border-rose/50 rounded-full" />
          </div>
        </AnimatedSection>

        {/* Right — text */}
        <AnimatedSection delay={0.2}>
          <div className="space-y-5 text-body text-sm md:text-base leading-relaxed">
            <p>
              I'm <span className="text-slate font-semibold">Saktheeswar</span>, a fresh B.Tech graduate from
              St. Joseph's Institute of Technology, Chennai, where I spent four years studying Artificial
              Intelligence and Data Science — and trying to understand why my models worked in the notebook
              but not in production.
            </p>
            <p>
              I specialize in data analysis, time-series forecasting, computer vision, and deep learning.
              I've built ML pipelines, published research, and wrangled over a million data records without
              losing my mind (mostly).
            </p>
            <p>
              When I'm not training models, I'm probably overthinking a Power BI dashboard, or explaining
              to someone why correlation doesn't equal causation — again.
            </p>
          </div>
        </AnimatedSection>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
        {stats.map((s, i) => (
          <AnimatedSection key={s.label} delay={0.3 + i * 0.1}>
            <div className="soft-card p-5 text-center" style={{ background: "hsl(28 93% 91%)" }}>
              <s.icon className="mx-auto mb-3 text-steel" size={24} />
              <p className="font-bold text-slate">{s.label}</p>
              <p className="text-body text-xs mt-1">{s.sub}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;