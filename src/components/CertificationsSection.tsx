import AnimatedSection from "./AnimatedSection";

const certs = [
  { num: "001", name: "HTML & CSS", issuer: "PrepInsta" },
  { num: "002", name: "Cloud Computing", issuer: "NPTEL" },
  { num: "003", name: "Cambridge English B1 Preliminary", issuer: "Cambridge Assessment English" },
];

const CertificationsSection = () => (
  <section className="fab-section">
    <div className="fab-container">
      <div className="fab-label">
        <span className="font-mono-dm text-[12px]" style={{ color: "#555555" }}>(06)</span>
        <span className="font-display text-[13px]" style={{ color: "#888888" }}>Certifications.</span>
      </div>

      <AnimatedSection>
        <h2 className="fab-heading mb-10">Certifications.</h2>
      </AnimatedSection>

      <div>
        {certs.map((cert, i) => (
          <AnimatedSection key={cert.name} delay={i * 0.08}>
            <div className="fab-row py-5 md:py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className="font-mono-dm text-[12px]" style={{ color: "#555555" }}>({cert.num})</span>
                  <span className="text-[18px] font-medium text-[#f5f5f5]">{cert.name}</span>
                </div>
                <span className="text-[13px]" style={{ color: "#888888" }}>{cert.issuer}</span>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default CertificationsSection;
