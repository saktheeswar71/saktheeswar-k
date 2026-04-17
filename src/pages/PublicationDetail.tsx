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
    <div className="min-h-screen bg-background">
      <DetailNavbar backLabel="← Back to Publication" backTo="/#publication" />

      {/* Hero - academic dark style */}
      <section className="pt-20" style={{ background: "hsl(140 12% 40%)" }}>
        <div className="container mx-auto max-w-[1200px] px-4 sm:px-6 md:px-8 py-10 sm:py-16 md:py-24">
          <motion.div {...fadeIn}>
            <span className="inline-block text-[10px] sm:text-xs px-3 py-1 rounded-full bg-white/20 text-white font-medium mb-3 sm:mb-4">
              {pub.badge}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">{pub.title}</h1>
            <p className="text-white/70 text-sm sm:text-base mb-1">{pub.authors} · {pub.conference}</p>
            <p className="text-white/50 text-xs sm:text-sm mb-4 sm:mb-5">{pub.date}</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
              {pub.tags.map((t) => (
                <span key={t} className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full bg-white/10 text-white/80 font-medium">{t}</span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
              <a href="#abstract" className="btn-primary text-center text-xs sm:text-sm">Read Abstract 📄</a>
              <a href="#results" className="inline-flex items-center justify-center gap-2 font-semibold rounded-full px-6 py-3 text-xs sm:text-sm border-2 border-white/40 text-white hover:bg-white/10 transition-all">
                View Results 📊
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile TOC */}
      <TableOfContents items={tocItems} variant="mobile" />

      <div className="container mx-auto max-w-[1200px] px-4 sm:px-6 md:px-8 flex gap-8 lg:gap-10">
        {/* Desktop TOC */}
        <div className="hidden lg:block pt-12">
          <TableOfContents items={tocItems} variant="desktop" />
        </div>

        <main className="flex-1 min-w-0">
          {/* Abstract */}
          <motion.section id="abstract" className="py-10 sm:py-16" {...fadeIn}>
            <h2 className="text-xl sm:text-2xl font-bold text-slate mb-3 sm:mb-4">Abstract</h2>
            <p className="text-sm sm:text-base text-body leading-relaxed">{pub.abstract}</p>
          </motion.section>

          {/* Problem */}
          <motion.section id="problem" className="py-10 sm:py-16 px-4 sm:px-6 md:px-10 rounded-2xl mb-6 sm:mb-8" style={{ background: "hsl(var(--dark-lighter))" }} {...fadeIn}>
            <span className="text-2xl">🔬</span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate mt-2 mb-3 sm:mb-4">Research Problem</h2>
            <p className="text-sm sm:text-base text-body leading-relaxed">{pub.problem}</p>
          </motion.section>

          {/* Dataset */}
          <motion.section id="dataset" className="py-10 sm:py-16" {...fadeIn}>
            <h2 className="text-xl sm:text-2xl font-bold text-slate mb-4 sm:mb-6">Dataset</h2>
            <div className="overflow-x-auto -mx-4 sm:mx-0 rounded-xl border border-sage">
              <table className="w-full text-xs sm:text-sm min-w-[400px]">
                <tbody>
                  {pub.dataset.map((row, i) => (
                    <tr key={row.property} className={i % 2 === 0 ? "bg-card" : "bg-mint/30"}>
                      <td className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium text-slate whitespace-nowrap">{row.property}</td>
                      <td className="px-3 sm:px-5 py-2.5 sm:py-3 text-body">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Methodology */}
          <motion.section id="methodology" className="py-10 sm:py-16 px-4 sm:px-6 md:px-10 rounded-2xl mb-6 sm:mb-8" style={{ background: "hsl(var(--muted))" }} {...fadeIn}>
            <h2 className="text-xl sm:text-2xl font-bold text-slate mb-2">Methodology</h2>
            <p className="text-xs sm:text-sm text-body mb-6 sm:mb-10">A structured approach to clinical prediction.</p>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-steel/20 hidden md:block" />
              <div className="space-y-6 sm:space-y-10">
                {pub.methodology.map((step, i) => (
                  <div key={i} className="md:pl-16 relative">
                    <div className="hidden md:flex absolute left-0 w-12 h-12 items-center justify-center rounded-full bg-white text-lg shadow-sm border border-sage">
                      {step.icon}
                    </div>
                    <div className="soft-card p-4 sm:p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="md:hidden text-lg">{step.icon}</span>
                        <span className="text-[10px] sm:text-xs font-semibold text-steel">Step {i + 1}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate mb-1.5 sm:mb-2">{step.title}</h3>
                      <p className="text-xs sm:text-sm text-body leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Results */}
          <motion.section id="results" className="py-10 sm:py-16 px-4 sm:px-6 md:px-10 rounded-2xl mb-6 sm:mb-8" style={{ background: "hsl(var(--dark-lighter))" }} {...fadeIn}>
            <h2 className="text-xl sm:text-2xl font-bold text-slate mb-2">Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 mt-4 sm:mt-6">
              {pub.results.metrics.map((m) => (
                <div key={m.label} className="soft-card p-3 sm:p-4 text-center border-t-2" style={{ borderColor: "hsl(193 46% 72%)" }}>
                  <span className="text-lg sm:text-xl">{m.icon}</span>
                  <p className="text-base sm:text-lg font-bold text-slate mt-1">{m.value}</p>
                  <p className="text-[10px] sm:text-xs text-body">{m.label}</p>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto -mx-4 sm:mx-0 rounded-xl border border-sage bg-card">
              <table className="w-full text-xs sm:text-sm min-w-[400px]">
                <thead>
                  <tr className="bg-steel/10">
                    <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-slate">Metric</th>
                    {pub.results.comparisonHeaders.map((h) => (
                      <th key={h} className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-slate">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pub.results.comparisonRows.map((row, i) => (
                    <tr key={row.metric} className={i % 2 === 0 ? "" : "bg-mint/20"}>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3 font-medium text-slate">{row.metric}</td>
                      {row.values.map((v, j) => (
                        <td key={j} className="px-3 sm:px-4 py-2.5 sm:py-3 text-body">{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Visualizations */}
          <motion.section id="visualizations" className="py-10 sm:py-16" {...fadeIn}>
            <p className="text-xs font-mono text-body/50 mb-1">// VISUALIZATIONS</p>
            <h2 className="text-xl sm:text-2xl font-bold text-slate mb-2">Charts & Results</h2>
            <p className="text-xs sm:text-sm text-body mb-6 sm:mb-8">
              The kind of charts that could actually help save lives. 🏥
            </p>
            {(() => {
              const charts: ChartItem[] = [
                { src: "/charts/liver_roc.png", title: "ROC Curve — TabNet vs XGBoost", caption: "TabNet achieves AUC of 0.91 vs XGBoost's 0.85 on the ILPD test set — a clear improvement in discriminative ability." },
                { src: "/charts/liver_class_dist.png", title: "ILPD Dataset — Class Distribution", caption: "583 patient records: 416 with liver disease (71.4%) and 167 without (28.6%). Class imbalance handled during training." },
                { src: "/charts/liver_metrics.png", title: "All Metrics — TabNet vs XGBoost", caption: "TabNet consistently outperforms XGBoost across Accuracy, Precision, Recall, F1, and AUC-ROC — with an average improvement of 5–8%.", fullWidth: true },
                { src: "/charts/liver_confusion.png", title: "Confusion Matrices — Side by Side", caption: "TabNet reduces both false positives and false negatives compared to XGBoost, critical in a healthcare prediction context.", fullWidth: true },
                { src: "/charts/liver_feature_importance.png", title: "Feature Importance: XGBoost vs TabNet Attention", caption: "Both models agree: Total Bilirubin and Albumin are the most critical predictors. TabNet's attention weights provide step-by-step interpretability that XGBoost cannot.", fullWidth: true },
              ];
              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {charts.map((chart, i) => (
                    <ChartCard key={i} chart={chart} index={i} allCharts={charts} />
                  ))}
                </div>
              );
            })()}
          </motion.section>

          {/* Findings */}
          <motion.section id="findings" className="py-10 sm:py-16 px-4 sm:px-6 md:px-10 rounded-2xl mb-6 sm:mb-8" style={{ background: "hsl(var(--muted))" }} {...fadeIn}>
            <h2 className="text-xl sm:text-2xl font-bold text-slate mb-4 sm:mb-6">Key Findings</h2>
            <ul className="space-y-2.5 sm:space-y-3">
              {pub.findings.map((f) => (
                <li key={f} className="flex items-start gap-2.5 sm:gap-3 text-body">
                  <span className="text-base sm:text-lg text-steel shrink-0">✅</span>
                  <span className="text-xs sm:text-sm leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Future Research */}
          <motion.section id="future" className="py-10 sm:py-16" {...fadeIn}>
            <h2 className="text-xl sm:text-2xl font-bold text-slate mb-4 sm:mb-6">Future Research</h2>
            <ul className="space-y-2.5 sm:space-y-3">
              {pub.futureResearch.map((fw) => (
                <li key={fw.text} className="flex items-start gap-2.5 sm:gap-3 text-body">
                  <span className="text-base sm:text-lg shrink-0">{fw.icon}</span>
                  <span className="text-xs sm:text-sm leading-relaxed">{fw.text}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Citation */}
          <motion.section id="citation" className="py-10 sm:py-16 px-4 sm:px-6 md:px-10 rounded-2xl mb-6 sm:mb-8" style={{ background: "hsl(var(--dark-lighter))" }} {...fadeIn}>
            <h2 className="text-xl sm:text-2xl font-bold text-slate mb-3 sm:mb-4">Cite This Paper</h2>
            <div className="relative bg-white rounded-xl p-4 sm:p-5 border border-sage">
              <p className="text-xs sm:text-sm text-body font-mono leading-relaxed pr-8 sm:pr-10 break-words">{pub.citation}</p>
              <button
                onClick={handleCopy}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 rounded-lg bg-sage/30 hover:bg-sage/50 transition-colors text-slate"
                aria-label="Copy citation"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
            {copied && <p className="text-[10px] sm:text-xs text-steel mt-2">Copied to clipboard!</p>}
          </motion.section>

          {/* Related Work */}
          <motion.section id="related" className="py-10 sm:py-16" {...fadeIn}>
            <h2 className="text-xl sm:text-2xl font-bold text-slate mb-4 sm:mb-6">Related Work</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {projects.map((rp) => (
                <Link key={rp.slug} to={`/projects/${rp.slug}`} className="soft-card p-4 sm:p-6 block hover:shadow-md transition-shadow">
                  <span className="text-[10px] sm:text-xs font-medium text-body">{rp.date}</span>
                  <h3 className="text-base sm:text-lg font-bold text-slate mt-1 mb-1.5 sm:mb-2">{rp.title}</h3>
                  <p className="text-xs sm:text-sm text-body mb-2 sm:mb-3">{rp.subtitle}</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {rp.tags.slice(0, 4).map((t) => (
                      <span key={t} className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-mint text-slate font-medium">{t}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        </main>
      </div>

      <Footer />

      {/* Back to top button */}
      {showTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-steel text-white shadow-lg"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </div>
  );
};

export default PublicationDetail;
