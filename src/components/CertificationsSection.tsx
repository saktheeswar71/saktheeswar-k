import { Code, Cloud, Globe } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const certs = [
  { name: "HTML & CSS", issuer: "PrepInsta", icon: Code },
  { name: "Cloud Computing", issuer: "NPTEL", icon: Cloud },
  { name: "Cambridge English B1 Preliminary", issuer: "Cambridge Assessment English", icon: Globe },
];

const CertificationsSection = () => (
  <section className="section-padding relative">
    <div className="container mx-auto max-w-[1200px] relative z-10">
      <AnimatedSection>
        <p className="section-label">// CERTIFICATIONS</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          <span className="text-gradient">Certifications</span>
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-3 gap-6">
        {certs.map((cert, i) => (
          <AnimatedSection key={cert.name} delay={i * 0.15}>
            <div className="glass rounded-xl p-6 text-center card-hover h-full">
              <div className="mx-auto mb-4 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <cert.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-bold text-foreground mb-1">{cert.name}</h3>
              <p className="text-muted-foreground text-sm">{cert.issuer}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default CertificationsSection;
