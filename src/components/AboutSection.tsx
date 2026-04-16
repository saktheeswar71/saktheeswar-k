import { BarChart3, Brain, Award, GraduationCap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const stats = [
  { icon: BarChart3, value: "2+", label: "Projects" },
  { icon: Brain, value: "1", label: "Publication" },
  { icon: Award, value: "3", label: "Certifications" },
  { icon: GraduationCap, value: "6.53", label: "CGPA" },
];

const AboutSection = () => (
  <section id="about" className="contrast-section section-padding relative overflow-hidden">
    <div className="container mx-auto max-w-[1200px] relative z-10">
      <AnimatedSection>
        <p className="section-label">About</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight" style={{ color: "#262626" }}>
          A little about me
        </h2>
      </AnimatedSection>

      <div className="grid lg:grid-cols-5 gap-12 items-start mt-10">
        <AnimatedSection delay={0.1} className="lg:col-span-3">
          <div className="space-y-5 text-[15px] leading-[1.8]" style={{ color: "#555" }}>
            <p>
              I'm <span className="font-semibold" style={{ color: "#262626" }}>Saktheeswar</span>, a fresh B.Tech graduate from
              St. Joseph's Institute of Technology, Chennai. I spent four years diving deep into
              Artificial Intelligence and Data Science — learning how to make machines understand
              the world through data.
            </p>
            <p>
              I specialize in <span className="font-medium text-primary">data analysis</span>, <span className="font-medium text-primary">time-series forecasting</span>, <span className="font-medium text-primary">computer vision</span>, and <span className="font-medium text-primary">deep learning</span>.
              I've built ML pipelines, published research, and processed over a million data records
              to extract actionable insights.
            </p>
            <p>
              When I'm not training models, I'm crafting Power BI dashboards or
              exploring new ways to make data tell compelling stories.
            </p>
          </div>
        </AnimatedSection>

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={0.2 + i * 0.1}>
              <div className="rounded-xl p-5 bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 text-center">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <s.icon size={18} className="text-primary" />
                </div>
                <p className="text-2xl font-bold" style={{ color: "#262626" }}>{s.value}</p>
                <p className="text-xs mt-1" style={{ color: "#888" }}>{s.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
