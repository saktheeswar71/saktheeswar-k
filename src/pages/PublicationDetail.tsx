import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUp, Copy, Check } from "lucide-react";
import ChartCard, { ChartItem } from "@/components/detail/ChartCard";
import DetailNavbar from "@/components/detail/DetailNavbar";
import TableOfContents from "@/components/detail/TableOfContents";
import Footer from "@/components/Footer";
import { publication } from "@/data/publication";
import { projects } from "@/data/projects";
import { useEffect, useState } from "react";

const tocItems = [
  { id: "abstract", label: "Abstract" },
  { id: "problem", label: "Research Problem" },
  { id: "dataset", label: "Dataset" },
  { id: "methodology", label: "Methodology" },
  { id: "results", label: "Results" },
  { id: "visualizations", label: "Visualizations" },
  { id: "findings", label: "Key Findings" },
  { id: "future", label: "Future Research" },
  { id: "citation", label: "Citation" },
  { id: "related", label: "Related Work" },
];

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const pub = publication;

const PublicationDetail = () => {
  const [showTop, setShowTop] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(pub.citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
      <DetailNavbar backLabel="← Back to Publication" backTo="/#publication" />

      {/* Hero */}
      <section className="pt-20" style={{ background: "#111111", borderBottom: "1px solid #222222" }}>
        <div className="fab-container px-5 md:px-10 py-10 md:py-24">
          <motion.div {...fadeIn}>
            <span className="inline-block font-mono-dm text-[12px] px-3 py-1 mb-4" style={{ border: "1px solid #333333", borderRadius: 4, color: "#555555" }}>
              {pub.badge}
            </span>
            <h1 className="font-display font-bold italic text-[#f5f5f5] mb-3" style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1 }}>
              {pub.title}
            </h1>
            <p className="text-sm mb-1" style={{ color: "#888888" }}>{pub.authors} · {pub.conference}</p>
            <p className="font-mono-dm text-[12px] mb-5" style={{ color: "#555555" }}>{pub.date}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {pub.tags.map((t) => (
                <span key={t} className="fab-pill">{t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#abstract" className="fab-btn text-sm">Read Abstract</a>
              <a href="#results" className="fab-btn-muted text-sm">View Results</a>
            </div>
          </motion.div>
        </div>
      </section>

      <TableOfContents items={tocItems} variant="mobile" />

      <div className="fab-container px-5 md:px-10 flex gap-8 lg:gap-10">
        <div className="hidden lg:block pt-12">
          <TableOfContents items={tocItems} variant="desktop" />
        </div>

        <main className="flex-1 min-w-0">
          {/* Abstract */}
          <motion.section id="abstract" className="py-10 md:py-16" {...fadeIn}>
            <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mb-4">Abstract.</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#888888" }}>{pub.abstract}</p>
          </motion.section>

          {/* Problem */}
          <motion.section id="problem" className="py-10 md:py-16 px-6 md:px-10 mb-8" style={{ background: "#111111", border: "1px solid #222222" }} {...fadeIn}>
            <span className="text-2xl">🔬</span>
            <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mt-2 mb-4">Research Problem.</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#888888" }}>{pub.problem}</p>
          </motion.section>

          {/* Dataset */}
          <motion.section id="dataset" className="py-10 md:py-16" {...fadeIn}>
            <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mb-6">Dataset.</h2>
            <div className="overflow-x-auto" style={{ border: "1px solid #222222" }}>
              <table className="w-full text-sm min-w-[400px]">
                <tbody>
                  {pub.dataset.map((row, i) => (
                    <tr key={row.property} style={{ background: i % 2 === 0 ? "#0a0a0a" : "#111111", borderBottom: "1px solid #222222" }}>
                      <td className="px-5 py-3 font-medium text-[#f5f5f5] whitespace-nowrap">{row.property}</td>
                      <td className="px-5 py-3" style={{ color: "#888888" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Methodology */}
          <motion.section id="methodology" className="py-10 md:py-16 px-6 md:px-10 mb-8" style={{ background: "#111111", border: "1px solid #222222" }} {...fadeIn}>
            <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mb-2">Methodology.</h2>
            <p className="text-sm mb-10" style={{ color: "#555555" }}>A structured approach to clinical prediction.</p>
            <div className="space-y-8">
              {pub.methodology.map((step, i) => (
                <div key={i} className="p-5" style={{ background: "#161616", borderLeft: "2px solid #f5f5f5" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{step.icon}</span>
                    <span className="font-mono-dm text-[12px]" style={{ color: "#555555" }}>Step {i + 1}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#f5f5f5] mb-2">{step.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#888888" }}>{step.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Results */}
          <motion.section id="results" className="py-10 md:py-16 px-6 md:px-10 mb-8" style={{ background: "#111111", border: "1px solid #222222" }} {...fadeIn}>
            <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mb-2">Results.</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-6 mb-8" style={{ background: "#222222" }}>
              {pub.results.metrics.map((m) => (
                <div key={m.label} className="p-4 text-center" style={{ background: "#161616", borderTop: "2px solid #f5f5f5" }}>
                  <span className="text-lg">{m.icon}</span>
                  <p className="text-lg font-bold text-[#f5f5f5] mt-1">{m.value}</p>
                  <p className="text-[10px]" style={{ color: "#555555" }}>{m.label}</p>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto" style={{ border: "1px solid #222222" }}>
              <table className="w-full text-sm min-w-[400px]">
                <thead>
                  <tr style={{ background: "#161616" }}>
                    <th className="px-4 py-3 text-left font-semibold text-[#f5f5f5]">Metric</th>
                    {pub.results.comparisonHeaders.map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold text-[#f5f5f5]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pub.results.comparisonRows.map((row, i) => (
                    <tr key={row.metric} style={{ background: i % 2 === 0 ? "#0a0a0a" : "#111111", borderBottom: "1px solid #222222" }}>
                      <td className="px-4 py-3 font-medium text-[#f5f5f5]">{row.metric}</td>
                      {row.values.map((v, j) => (
                        <td key={j} className="px-4 py-3" style={{ color: "#888888" }}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Visualizations */}
          <motion.section id="visualizations" className="py-10 md:py-16" {...fadeIn}>
            <p className="font-mono-dm text-[12px] mb-1" style={{ color: "#555555" }}>// VISUALIZATIONS</p>
            <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mb-2">Charts & Results.</h2>
            <p className="text-sm mb-8" style={{ color: "#888888" }}>The kind of charts that could actually help save lives.</p>
            {(() => {
              const charts: ChartItem[] = [
                { src: "/charts/liver_roc.png", title: "ROC Curve — TabNet vs XGBoost", caption: "TabNet achieves AUC of 0.91 vs XGBoost's 0.85." },
                { src: "/charts/liver_class_dist.png", title: "ILPD Dataset — Class Distribution", caption: "583 patient records: 416 with liver disease and 167 without." },
                { src: "/charts/liver_metrics.png", title: "All Metrics — TabNet vs XGBoost", caption: "TabNet consistently outperforms XGBoost.", fullWidth: true },
                { src: "/charts/liver_confusion.png", title: "Confusion Matrices", caption: "TabNet reduces both false positives and false negatives.", fullWidth: true },
                { src: "/charts/liver_feature_importance.png", title: "Feature Importance", caption: "Both models agree: Total Bilirubin and Albumin are the most critical predictors.", fullWidth: true },
              ];
              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "#222222" }}>
                  {charts.map((chart, i) => (
                    <ChartCard key={i} chart={chart} index={i} allCharts={charts} />
                  ))}
                </div>
              );
            })()}
          </motion.section>

          {/* Findings */}
          <motion.section id="findings" className="py-10 md:py-16 px-6 md:px-10 mb-8" style={{ background: "#111111", border: "1px solid #222222" }} {...fadeIn}>
            <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mb-6">Key Findings.</h2>
            <ul className="space-y-3">
              {pub.findings.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="text-lg text-[#f5f5f5] shrink-0">✅</span>
                  <span className="text-sm leading-relaxed" style={{ color: "#888888" }}>{f}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Future Research */}
          <motion.section id="future" className="py-10 md:py-16" {...fadeIn}>
            <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mb-6">Future Research.</h2>
            <ul className="space-y-3">
              {pub.futureResearch.map((fw) => (
                <li key={fw.text} className="flex items-start gap-3">
                  <span className="text-lg shrink-0">{fw.icon}</span>
                  <span className="text-sm leading-relaxed" style={{ color: "#888888" }}>{fw.text}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Citation */}
          <motion.section id="citation" className="py-10 md:py-16 px-6 md:px-10 mb-8" style={{ background: "#111111", border: "1px solid #222222" }} {...fadeIn}>
            <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mb-4">Cite This Paper.</h2>
            <div className="relative p-5" style={{ background: "#161616", border: "1px solid #222222" }}>
              <p className="font-mono-dm text-xs leading-relaxed pr-10 break-words" style={{ color: "#888888" }}>{pub.citation}</p>
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 transition-colors text-[#555555] hover:text-[#f5f5f5]"
                aria-label="Copy citation"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
            {copied && <p className="text-xs mt-2 text-[#f5f5f5]">Copied to clipboard!</p>}
          </motion.section>

          {/* Related Work */}
          <motion.section id="related" className="py-10 md:py-16" {...fadeIn}>
            <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mb-6">Related Work.</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "#222222" }}>
              {projects.map((rp) => (
                <Link key={rp.slug} to={`/projects/${rp.slug}`} className="block p-6 transition-colors hover:bg-[#1e1e1e]" style={{ background: "#111111" }}>
                  <span className="font-mono-dm text-[12px]" style={{ color: "#555555" }}>{rp.date}</span>
                  <h3 className="text-lg font-bold text-[#f5f5f5] mt-1 mb-2">{rp.title}</h3>
                  <p className="text-sm mb-3" style={{ color: "#888888" }}>{rp.subtitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {rp.tags.slice(0, 4).map((t) => (
                      <span key={t} className="fab-pill">{t}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        </main>
      </div>

      <Footer />

      {showTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 p-3 text-[#f5f5f5]"
          style={{ background: "#161616", border: "1px solid #222222" }}
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </div>
  );
};

export default PublicationDetail;
