import { BarChart3, Brain, Award, GraduationCap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const stats = [
  { icon: BarChart3, value: "2+", label: "Projects", color: "bg-steel/10 text-steel" },
  { icon: Brain, value: "1", label: "Publication", color: "bg-rose/30 text-slate" },
  { icon: Award, value: "3", label: "Certifications", color: "bg-mint text-slate" },
  { icon: GraduationCap, value: "6.53", label: "CGPA", color: "bg-peach text-slate" },
];

const AboutSection = () => (
  <section id="about" className="section-padding relative overflow-hidden">
    <div className="container mx-auto max-w-[1200px] relative z-10">
      <AnimatedSection>
        <p className="section-label">About</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate tracking-tight">
          A little about me
        </h2>
      </AnimatedSection>

      <div className="grid lg:grid-cols-5 gap-12 items-start mt-10">
        {/* Left — Text (3 cols) */}
        <AnimatedSection delay={0.1} className="lg:col-span-3">
          <div className="space-y-5 text-body text-[15px] leading-[1.8]">
            <p>
              I'm <span className="text-slate font-semibold">Saktheeswar</span>, a fresh B.Tech graduate from
              St. Joseph's Institute of Technology, Chennai. I spent four years diving deep into
              Artificial Intelligence and Data Science — learning how to make machines understand
              the world through data.
            </p>
            <p>
              I specialize in <span className="text-slate font-medium">data analysis</span>, <span className="text-slate font-medium">time-series forecasting</span>, <span className="text-slate font-medium">computer vision</span>, and <span className="text-slate font-medium">deep learning</span>.
              I've built ML pipelines, published research, and processed over a million data records
              to extract actionable insights.
            </p>
            <p>
              When I'm not training models, I'm crafting Power BI dashboards or
              exploring new ways to make data tell compelling stories.
            </p>
          </div>
        </AnimatedSection>

        {/* Right — Stats grid (2 cols) */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={0.2 + i * 0.1}>
              <div className="rounded-2xl p-5 bg-white/80 backdrop-blur-sm border border-sage/30 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mx-auto mb-3`}>
                  <s.icon size={18} />
                </div>
                <p className="text-2xl font-bold text-slate">{s.value}</p>
                <p className="text-body text-xs mt-1">{s.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
