import { BookOpen, Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";

const tags = ["TabNet", "XGBoost", "Healthcare Analytics", "Deep Learning", "ILPD Dataset"];

const PublicationSection = () => (
  <section id="publication" className="section-padding relative" style={{ background: "hsl(150 30% 90%)" }}>
    <div className="container mx-auto max-w-[1200px] relative z-10">
      <AnimatedSection>
        <p className="section-label">// RESEARCH</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-slate">Published Work</h2>
        <p className="text-body text-sm mb-12">Yes, I've been published. My mom was impressed too.</p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="soft-card p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-steel" />

          <div className="flex items-start gap-5 flex-col sm:flex-row">
            <div className="p-3 rounded-xl bg-steel/10 flex-shrink-0">
              <BookOpen className="text-steel" size={28} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-rose/50 text-slate font-medium">
                  <Trophy size={12} /> Conference Paper — ICASET 2025
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2 text-slate">
                Liver Disease Prediction using Deep Learning: TabNet vs XGBoost
              </h3>
              <p className="text-sm font-medium mb-1 text-steel">March 2025</p>
              <p className="text-sm text-body mb-4">
                Saktheeswar K, Venkatesan S · ICASET-2025
              </p>

              <p className="text-sm text-body leading-relaxed mb-5">
                Applied TabNet on the ILPD dataset (583 records) for early-stage liver disease
                prediction — achieving 5–8% higher accuracy than XGBoost and improving model
                interpretability through TabNet's feature-attention mechanism.
                Presented at ICASET-2025.
              </p>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-mint text-slate font-medium">
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