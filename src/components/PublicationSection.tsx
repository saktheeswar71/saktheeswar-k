import { BookOpen, Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";

const tags = ["TabNet", "XGBoost", "Healthcare Analytics", "Deep Learning", "ILPD Dataset"];

const PublicationSection = () => (
  <section id="publication" className="section-padding relative">
    <div className="container mx-auto max-w-[1200px] relative z-10">
      <AnimatedSection>
        <p className="section-label">Research</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate tracking-tight">Published Work</h2>
        <p className="text-body text-sm mb-12 max-w-md">Peer-reviewed research pushing the boundaries of healthcare AI.</p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="rounded-2xl p-8 bg-white/70 backdrop-blur-sm border border-sage/30 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden">
          {/* Accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-steel via-steel/50 to-transparent" />

          <div className="flex items-start gap-6 flex-col sm:flex-row">
            <div className="w-12 h-12 rounded-2xl bg-steel/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="text-steel" size={22} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-peach/60 text-slate font-medium border border-rose/20">
                  <Trophy size={12} /> ICASET 2025
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2 text-slate leading-snug">
                Liver Disease Prediction using Deep Learning: TabNet vs XGBoost
              </h3>
              <p className="text-sm font-medium mb-1 text-steel">March 2025</p>
              <p className="text-sm text-body mb-4">
                Saktheeswar K, Venkatesan S
              </p>

              <p className="text-sm text-body leading-relaxed mb-6">
                Applied TabNet on the ILPD dataset (583 records) for early-stage liver disease
                prediction — achieving 5–8% higher accuracy than XGBoost and improving model
                interpretability through TabNet's feature-attention mechanism.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-sage/30 text-slate/70 font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to="/publications/liver-disease-tabnet"
                className="inline-flex items-center gap-2 text-sm font-medium text-white bg-slate px-5 py-2.5 rounded-full hover:bg-steel hover:shadow-lg hover:shadow-steel/20 transition-all duration-300"
              >
                Read Full Paper <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default PublicationSection;
