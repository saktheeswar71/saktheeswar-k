import { Code, Cloud, Globe } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import certPixel from "@/assets/cert-pixel.png";

const certs = [
  { name: "HTML & CSS", issuer: "PrepInsta", icon: Code, emoji: "🌐" },
  { name: "Cloud Computing", issuer: "NPTEL", icon: Cloud, emoji: "☁️" },
  { name: "Cambridge English B1 Preliminary", issuer: "Cambridge Assessment English", icon: Globe, emoji: "🇬🇧" },
];

const CertificationsSection = () => (
  <section className="section-padding relative" style={{ background: "hsl(28 93% 91%)" }}>
    <div className="container mx-auto max-w-[1200px] relative z-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
        <AnimatedSection>
          <p className="section-label">// CERTIFIED (OFFICIALLY)</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-slate">Certifications</h2>
          <p className="text-body text-sm">Proof I didn't just watch the tutorial and close the tab.</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <img
            src={certPixel}
            alt="Pixel art character holding a certificate"
            className="w-28 h-28 object-contain hidden md:block"
          />
        </AnimatedSection>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {certs.map((cert, i) => (
          <AnimatedSection key={cert.name} delay={i * 0.15}>
            <div className="soft-card p-6 text-center h-full hover:border-rose border-2 border-transparent transition-all duration-300">
              <div className="mx-auto mb-4 w-14 h-14 rounded-xl bg-steel/10 flex items-center justify-center">
                <cert.icon className="text-steel" size={24} />
              </div>
              <h3 className="font-bold text-slate mb-1">{cert.emoji} {cert.name}</h3>
              <p className="text-body text-sm">{cert.issuer}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default CertificationsSection;
