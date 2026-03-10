import { BarChart3, Brain, Award, GraduationCap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const stats = [
  { icon: BarChart3, label: "2+ Projects", sub: "Completed" },
  { icon: Brain, label: "1 Research", sub: "Publication" },
  { icon: Award, label: "3 Certifications", sub: "Earned" },
  { icon: GraduationCap, label: "B.Tech", sub: "AI & Data Science" },
];

const AboutSection = () => (
  <section id="about" className="section-padding relative">
    <div className="blob-purple -top-60 -right-80 opacity-50" />
    <div className="container mx-auto max-w-[1200px] relative z-10">
      <AnimatedSection>
        <p className="section-label">// ABOUT ME</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          About <span className="text-gradient">Me</span>
        </h2>
      </AnimatedSection>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left — decorative frame */}
        <AnimatedSection delay={0.1}>
          <div className="relative">
            <div className="w-full max-w-sm mx-auto aspect-square rounded-2xl glass flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
              <span className="text-7xl font-bold text-gradient relative z-10">SK</span>
              {/* Decorative geometric accents */}
              <div className="absolute top-4 right-4 w-16 h-16 border border-primary/30 rounded-lg rotate-12" />
              <div className="absolute bottom-6 left-6 w-12 h-12 border border-accent/30 rounded-full" />
            </div>
          </div>
        </AnimatedSection>

        {/* Right — text */}
        <AnimatedSection delay={0.2}>
          <div className="space-y-5 text-muted-foreground text-sm md:text-base leading-relaxed">
            <p>
              I'm <span className="text-foreground font-semibold">Saktheeswar K</span>, a B.Tech graduate in
              Artificial Intelligence and Data Science (2021–2025) from St. Joseph's Institute of Technology,
              Chennai, with a CGPA of 6.53.
            </p>
            <p>
              I specialize in data analysis, machine learning, and deep learning — transforming complex
              datasets into clear, data-driven decisions. My work spans time-series forecasting, computer
              vision, and healthcare analytics.
            </p>
            <p>
              Outside of academics, I bring strong leadership, team management, and creative
              problem-solving to every project I'm part of.
            </p>
          </div>
        </AnimatedSection>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
        {stats.map((s, i) => (
          <AnimatedSection key={s.label} delay={0.3 + i * 0.1}>
            <div className="glass rounded-xl p-5 text-center card-hover">
              <s.icon className="mx-auto mb-3 text-primary" size={24} />
              <p className="font-bold text-foreground">{s.label}</p>
              <p className="text-muted-foreground text-xs mt-1">{s.sub}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
