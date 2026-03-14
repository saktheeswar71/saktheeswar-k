import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, ArrowUp, Copy, Check } from "lucide-react";
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
        <div className="container mx-auto max-w-[1200px] px-4 md:px-8 py-16 md:py-24">
          <motion.div {...fadeIn}>
            <span className="inline-block text-xs px-3 py-1 rounded-full bg-white/20 text-white font-medium mb-4">
              {pub.badge}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">{pub.title}</h1>
            <p className="text-white/70 mb-1">{pub.authors} · {pub.conference}</p>
            <p className="text-white/50 text-sm mb-5">{pub.date}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {pub.tags.map((t) => (
                <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 font-medium">{t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#abstract" className="btn-primary">Read Abstract 📄</a>
              <a href="#results" className="inline-flex items-center gap-2 font-semibold rounded-full px-6 py-3 text-sm border-2 border-white/40 text-white hover:bg-white/10 transition-all">
                View Results 📊
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile TOC */}
      <TableOfContents items={tocItems} variant="mobile" />

      <div className="container mx-auto max-w-[1200px] px-4 md:px-8 flex gap-10">
        {/* Desktop TOC */}
        <div className="hidden lg:block pt-12">
          <TableOfContents items={tocItems} variant="desktop" />
        </div>

        <main className="flex-1 min-w-0">
          {/* Abstract */}
          <motion.section id="abstract" className="py-16" {...fadeIn}>
            <h2 className="text-2xl font-bold text-slate mb-4">Abstract</h2>
            <p className="text-body leading-relaxed text-base">{pub.abstract}</p>
          </motion.section>

          {/* Problem */}
          <motion.section id="problem" className="py-16 px-6 md:px-10 rounded-2xl mb-8" style={{ background: "hsl(150 30% 90%)" }} {...fadeIn}>
            <span className="text-2xl">🔬</span>
            <h2 className="text-2xl font-bold text-slate mt-2 mb-4">Research Problem</h2>
            <p className="text-body leading-relaxed">{pub.problem}</p>
          </motion.section>

          {/* Dataset */}
          <motion.section id="dataset" className="py-16" {...fadeIn}>
            <h2 className="text-2xl font-bold text-slate mb-6">Dataset</h2>
            <div className="overflow-x-auto rounded-xl border border-sage">
              <table className="w-full text-sm">
                <tbody>
                  {pub.dataset.map((row, i) => (
                    <tr key={row.property} className={i % 2 === 0 ? "bg-white" : "bg-mint/30"}>
                      <td className="px-5 py-3 font-medium text-slate whitespace-nowrap">{row.property}</td>
                      <td className="px-5 py-3 text-body">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Methodology */}
          <motion.section id="methodology" className="py-16 px-6 md:px-10 rounded-2xl mb-8" style={{ background: "hsl(28 93% 91%)" }} {...fadeIn}>
            <h2 className="text-2xl font-bold text-slate mb-2">Methodology</h2>
            <p className="text-sm text-body mb-10">A structured approach to clinical prediction.</p>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-steel/20 hidden md:block" />
              <div className="space-y-10">
                {pub.methodology.map((step, i) => (
                  <div key={i} className="md:pl-16 relative">
                    <div className="hidden md:flex absolute left-0 w-12 h-12 items-center justify-center rounded-full bg-white text-lg shadow-sm border border-sage">
                      {step.icon}
                    </div>
                    <div className="soft-card p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="md:hidden text-lg">{step.icon}</span>
                        <span className="text-xs font-semibold text-steel">Step {i + 1}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate mb-2">{step.title}</h3>
                      <p className="text-sm text-body leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Results */}
          <motion.section id="results" className="py-16 px-6 md:px-10 rounded-2xl mb-8" style={{ background: "hsl(150 30% 90%)" }} {...fadeIn}>
            <h2 className="text-2xl font-bold text-slate mb-2">Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-6">
              {pub.results.metrics.map((m) => (
                <div key={m.label} className="soft-card p-4 text-center border-t-2" style={{ borderColor: "hsl(193 46% 72%)" }}>
                  <span className="text-xl">{m.icon}</span>
                  <p className="text-lg font-bold text-slate mt-1">{m.value}</p>
                  <p className="text-xs text-body">{m.label}</p>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto rounded-xl border border-sage bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-steel/10">
                    <th className="px-4 py-3 text-left font-semibold text-slate">Metric</th>
                    {pub.results.comparisonHeaders.map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold text-slate">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pub.results.comparisonRows.map((row, i) => (
                    <tr key={row.metric} className={i % 2 === 0 ? "" : "bg-mint/20"}>
                      <td className="px-4 py-3 font-medium text-slate">{row.metric}</td>
                      {row.values.map((v, j) => (
                        <td key={j} className="px-4 py-3 text-body">{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Visualizations */}
          <motion.section id="visualizations" className="py-16" {...fadeIn}>
            <h2 className="text-2xl font-bold text-slate mb-6">Visualizations</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {pub.visualizations.map((label) => (
                <div key={label} className="rounded-xl border-2 border-dashed border-sage p-10 flex flex-col items-center justify-center text-center bg-sage/10">
                  <Upload className="text-slate/30 mb-3" size={32} />
                  <p className="text-sm font-medium text-slate/50">{label}</p>
                  <p className="text-xs text-body/40 mt-1">Upload chart image here</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Findings */}
          <motion.section id="findings" className="py-16 px-6 md:px-10 rounded-2xl mb-8" style={{ background: "hsl(28 93% 91%)" }} {...fadeIn}>
            <h2 className="text-2xl font-bold text-slate mb-6">Key Findings</h2>
            <ul className="space-y-3">
              {pub.findings.map((f) => (
                <li key={f} className="flex items-start gap-3 text-body">
                  <span className="text-lg text-steel">✅</span>
                  <span className="text-sm leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Future Research */}
          <motion.section id="future" className="py-16" {...fadeIn}>
            <h2 className="text-2xl font-bold text-slate mb-6">Future Research</h2>
            <ul className="space-y-3">
              {pub.futureResearch.map((fw) => (
                <li key={fw.text} className="flex items-start gap-3 text-body">
                  <span className="text-lg">{fw.icon}</span>
                  <span className="text-sm leading-relaxed">{fw.text}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Citation */}
          <motion.section id="citation" className="py-16 px-6 md:px-10 rounded-2xl mb-8" style={{ background: "hsl(150 30% 90%)" }} {...fadeIn}>
            <h2 className="text-2xl font-bold text-slate mb-4">Cite This Paper</h2>
            <div className="relative bg-white rounded-xl p-5 border border-sage">
              <p className="text-sm text-body font-mono leading-relaxed pr-10">{pub.citation}</p>
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 rounded-lg bg-sage/30 hover:bg-sage/50 transition-colors text-slate"
                aria-label="Copy citation"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            {copied && <p className="text-xs text-steel mt-2">Copied to clipboard!</p>}
          </motion.section>

          {/* Related Work */}
          <motion.section id="related" className="py-16" {...fadeIn}>
            <h2 className="text-2xl font-bold text-slate mb-6">Related Work</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((rp) => (
                <Link key={rp.slug} to={`/projects/${rp.slug}`} className="soft-card p-6 block">
                  <span className="text-xs font-medium text-body">{rp.date}</span>
                  <h3 className="text-lg font-bold text-slate mt-1 mb-2">{rp.title}</h3>
                  <p className="text-sm text-body mb-3">{rp.subtitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {rp.tags.slice(0, 4).map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-mint text-slate font-medium">{t}</span>
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
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-steel text-white shadow-lg lg:hidden"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </div>
  );
};

export default PublicationDetail;
