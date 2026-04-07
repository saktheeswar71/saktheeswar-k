import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";

const tags = ["TabNet", "XGBoost", "Healthcare Analytics", "Deep Learning", "ILPD Dataset"];
const statPills = ["5–8% Better accuracy than XGBoost", "583 Patient records", "Healthcare AI"];

const PublicationSection = () => (
  <section id="publication" className="fab-section">
    <div className="fab-container">
      <div className="fab-label">
        <span className="font-mono-dm text-[12px]" style={{ color: "#555555" }}>(04)</span>
        <span className="font-display text-[13px]" style={{ color: "#888888" }}>Publication.</span>
      </div>

      <AnimatedSection>
        <h2 className="fab-heading mb-10">Publication.</h2>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="p-8 md:p-12" style={{ background: "#111111", border: "1px solid #222222" }}>
          <div className="grid lg:grid-cols-[1fr_auto] gap-8">
            <div>
              <span
                className="inline-block font-mono-dm text-[12px] px-3 py-1 mb-4"
                style={{ border: "1px solid #333333", borderRadius: 4, color: "#555555" }}
              >
                🏆 Conference Paper
              </span>

              <h3 className="font-display font-bold text-xl md:text-2xl text-[#f5f5f5] mb-3">
                Liver Disease Prediction using Deep Learning: TabNet vs XGBoost
              </h3>

              <p className="text-sm mb-1" style={{ color: "#888888" }}>
                Saktheeswar K, Venkatesan S
              </p>
              <p className="font-mono-dm text-[12px] mb-6" style={{ color: "#555555" }}>
                ICASET-2025 · March 2025
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag) => (
                  <span key={tag} className="fab-pill">{tag}</span>
                ))}
              </div>

              <Link
                to="/publications/liver-disease-tabnet"
                className="inline-flex items-center gap-2 text-sm text-[#f5f5f5] hover:underline"
              >
                Read More <ArrowRight size={14} />
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {statPills.map((s) => (
                <span key={s} className="fab-pill text-center whitespace-nowrap">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default PublicationSection;
