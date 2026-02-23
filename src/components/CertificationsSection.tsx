import { Award } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const certs = [
  { name: "HTML & CSS", issuer: "PrepInsta" },
  { name: "Cloud Computing", issuer: "NPTEL" },
  { name: "B1 Preliminary", issuer: "Cambridge English" },
];

const CertificationsSection = () => (
  <section className="section-padding">
    <div className="container mx-auto max-w-5xl">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          <span className="text-gradient">Certifications</span>
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-3 gap-6">
        {certs.map((cert, i) => (
          <AnimatedSection key={cert.name} delay={i * 0.1}>
            <div className="glass rounded-xl p-6 text-center hover:glow-border transition-shadow duration-300">
              <Award className="text-primary mx-auto mb-3" size={28} />
              <h3 className="font-semibold mb-1">{cert.name}</h3>
              <p className="text-muted-foreground text-sm">{cert.issuer}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default CertificationsSection;
