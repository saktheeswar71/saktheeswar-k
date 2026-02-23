import { GraduationCap, MapPin, Brain, Users } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const highlights = [
  { icon: GraduationCap, label: "B.Tech AI & Data Science (2021–2025)", sub: "St. Joseph's Institute of Technology · CGPA: 6.53" },
  { icon: Brain, label: "Core Interests", sub: "Data Analytics, Machine Learning, Forecasting" },
  { icon: Users, label: "Soft Skills", sub: "Leadership, Teamwork, Creativity" },
  { icon: MapPin, label: "Location", sub: "Chennai, Tamil Nadu, India" },
];

const AboutSection = () => (
  <section id="about" className="section-padding">
    <div className="container mx-auto max-w-5xl">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          About <span className="text-gradient">Me</span>
        </h2>
        <p className="text-muted-foreground mb-12 max-w-xl">
          A data-driven problem solver with a passion for AI and analytics.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-6">
        {highlights.map((item, i) => (
          <AnimatedSection key={item.label} delay={i * 0.1}>
            <div className="glass rounded-xl p-6 hover:glow-border transition-shadow duration-300">
              <item.icon className="text-primary mb-3" size={28} />
              <h3 className="font-semibold text-lg mb-1">{item.label}</h3>
              <p className="text-muted-foreground text-sm">{item.sub}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
