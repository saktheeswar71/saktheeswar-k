import { BookOpen } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const PublicationSection = () => (
  <section id="publication" className="section-padding">
    <div className="container mx-auto max-w-5xl">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          <span className="text-gradient">Publication</span>
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="glass rounded-xl p-8 hover:glow-border transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
              <BookOpen className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">
                Liver Disease Prediction using Deep Learning: TabNet vs XGBoost
              </h3>
              <p className="text-primary text-sm font-medium mb-4">
                ICASET-2025 · Saktheeswar K, Venkatesan S
              </p>
              <ul className="space-y-2">
                {[
                  "Applied TabNet on the ILPD dataset (583 records).",
                  "Achieved 5–8% higher accuracy than XGBoost.",
                  "Improved interpretability with feature-attention insights.",
                  "Demonstrated TabNet's potential for reliable early-stage liver disease prediction.",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default PublicationSection;
