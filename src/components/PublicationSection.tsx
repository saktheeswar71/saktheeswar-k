import { BookOpen, Trophy } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const tags = ["TabNet", "XGBoost", "Deep Learning", "Healthcare Analytics", "ILPD Dataset"];

const PublicationSection = () => (
  <section id="publication" className="section-padding relative">
    <div className="blob-cyan -top-40 -right-80 opacity-30" />
    <div className="container mx-auto max-w-[1200px] relative z-10">
      <AnimatedSection>
        <p className="section-label">// RESEARCH</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          <span className="text-gradient">Publication</span>
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="glass rounded-xl p-8 card-hover relative overflow-hidden">
          {/* Decorative gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary" />

          <div className="flex items-start gap-5">
            <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
              <BookOpen className="text-primary" size={28} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  <Trophy size={12} /> Conference Paper — ICASET 2025
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2 text-foreground">
                Liver Disease Prediction using Deep Learning: TabNet vs XGBoost
              </h3>
              <p className="text-sm font-medium mb-1 text-cyan">March 2025</p>
              <p className="text-sm text-muted-foreground mb-4">
                Saktheeswar K, Venkatesan S · ICASET-2025
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Applied TabNet on the ILPD dataset (583 records), achieving 5–8% higher accuracy
                than XGBoost while improving interpretability through TabNet's feature-attention
                mechanism. Demonstrated TabNet's potential for reliable early-stage liver disease
                prediction in healthcare analytics.
              </p>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2.5 py-1 rounded-md"
                    style={{ background: "rgba(6, 182, 212, 0.1)", color: "#22D3EE" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default PublicationSection;
