import { Briefcase } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const bullets = [
  "Analyzed 5+ years of Netflix subscription data using ARIMA and LSTM models.",
  "Improved forecast reliability by 18%.",
  "Processed and visualized 1M+ records for actionable insights.",
  "Built automated ML pipelines reducing manual effort by 40%.",
];

const ExperienceSection = () => (
  <section id="experience" className="section-padding">
    <div className="container mx-auto max-w-5xl">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          <span className="text-gradient">Experience</span>
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="glass rounded-xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-primary/20 rounded-full" />
          <div className="pl-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Briefcase className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Data Analyst Intern</h3>
                <p className="text-primary font-medium text-sm">Unified Mentor Pvt. Ltd</p>
                <p className="text-muted-foreground text-sm">Jan 2024 – Mar 2024 · Chennai</p>
              </div>
            </div>
            <ul className="space-y-3 mt-6">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default ExperienceSection;
