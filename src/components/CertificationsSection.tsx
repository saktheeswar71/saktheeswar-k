import { Code, Cloud, Globe } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const certs = [
  { name: "HTML & CSS", issuer: "PrepInsta", icon: Code },
  { name: "Cloud Computing", issuer: "NPTEL", icon: Cloud },
  { name: "Cambridge English B1", issuer: "Cambridge Assessment", icon: Globe },
];

const CertificationsSection = () => (
  <section className="section-padding relative">
    <div className="container mx-auto max-w-[1200px] relative z-10">
      <AnimatedSection>
        <p className="section-label">Certifications</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate tracking-tight">Certifications</h2>
        <p className="text-body text-sm mb-12 max-w-md">Professional certifications and credentials.</p>
      </AnimatedSection>

      <div className="grid sm:grid-cols-3 gap-5">
        {certs.map((cert, i) => (
          <AnimatedSection key={cert.name} delay={i * 0.1}>
            <div className="rounded-2xl p-6 text-center h-full bg-white/70 backdrop-blur-sm border border-sage/30 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-steel/30 transition-all duration-300">
              <div className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-steel/10 flex items-center justify-center">
                <cert.icon className="text-steel" size={20} />
              </div>
              <h3 className="font-bold text-slate mb-1 text-sm">{cert.name}</h3>
              <p className="text-body text-xs">{cert.issuer}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default CertificationsSection;
