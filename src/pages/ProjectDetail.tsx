import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, ArrowUp, ExternalLink } from "lucide-react";
import ChartCard, { ChartItem } from "@/components/detail/ChartCard";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import DetailNavbar from "@/components/detail/DetailNavbar";
import TableOfContents from "@/components/detail/TableOfContents";
import Footer from "@/components/Footer";
import { getProjectBySlug, projects } from "@/data/projects";
import { useEffect, useState } from "react";

SyntaxHighlighter.registerLanguage("python", python);

const tocItems = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "dataset", label: "Dataset" },
  { id: "methodology", label: "Methodology" },
  { id: "architecture", label: "Architecture" },
  { id: "results", label: "Results" },
  { id: "visualizations", label: "Visualizations" },
  { id: "learnings", label: "Key Learnings" },
  { id: "source-code", label: "Source Code" },
  { id: "future-work", label: "Future Work" },
  { id: "related", label: "Related Projects" },
];

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug || "");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0a" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#f5f5f5] mb-2">Project not found</h1>
          <Link to="/#projects" className="text-sm text-[#888888] hover:text-[#f5f5f5]">← Back to Projects</Link>
        </div>
      </div>
    );
  }

  const related = projects.filter((p) => project.relatedSlugs.includes(p.slug));

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
      <DetailNavbar backLabel="← Back to Projects" backTo="/#projects" />

      {/* Hero */}
      <section className="pt-20" style={{ background: "#0a0a0a", borderBottom: "1px solid #222222" }}>
        <div className="fab-container px-5 md:px-10 py-10 md:py-24">
          <motion.div {...fadeIn}>
            <p className="font-mono-dm text-[12px] mb-4" style={{ color: "#555555" }}>
              Projects / {project.title}
            </p>
            <h1 className="font-display font-bold italic text-[#f5f5f5] mb-4" style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1 }}>
              {project.title}.
            </h1>
            <p className="text-base mb-5 max-w-2xl" style={{ color: "#888888", fontWeight: 300 }}>{project.subtitle}</p>
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 py-4 mb-6" style={{ borderTop: "1px solid #222222", borderBottom: "1px solid #222222" }}>
              <span className="font-mono-dm text-[12px]" style={{ color: "#555555" }}>{project.date}</span>
              <span style={{ color: "#333333" }}>·</span>
              {project.tags.map((t) => (
                <span key={t} className="font-mono-dm text-[12px]" style={{ color: "#555555" }}>{t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="fab-btn inline-flex items-center gap-2 text-sm">
                <Github size={16} /> View Source Code
              </a>
              <a href="#methodology" className="fab-btn-muted inline-flex items-center gap-2 text-sm">
                Read Full Report
              </a>
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
          {/* Overview */}
          <motion.section id="overview" className="py-10 md:py-16" {...fadeIn}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px mb-8" style={{ background: "#222222" }}>
              {project.stats.map((s) => (
                <div key={s.label} className="p-5 text-center" style={{ background: "#111111" }}>
                  <span className="text-xl">{s.icon}</span>
                  <p className="text-lg font-bold text-[#f5f5f5] mt-2">{s.value}</p>
                  <p className="text-xs" style={{ color: "#555555" }}>{s.label}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#888888" }}>{project.overview}</p>
          </motion.section>

          {/* Problem */}
          <motion.section id="problem" className="py-10 md:py-16 px-6 md:px-10 mb-8" style={{ background: "#111111", border: "1px solid #222222" }} {...fadeIn}>
            <span className="text-2xl">❓</span>
            <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mt-2 mb-4">The Problem.</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#888888" }}>{project.problem}</p>
          </motion.section>

          {/* Dataset */}
          <motion.section id="dataset" className="py-10 md:py-16" {...fadeIn}>
            <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mb-6">Dataset.</h2>
            <div className="overflow-x-auto" style={{ border: "1px solid #222222" }}>
              <table className="w-full text-sm min-w-[400px]">
                <tbody>
                  {project.dataset.map((row, i) => (
                    <tr key={row.property} style={{ background: i % 2 === 0 ? "#0a0a0a" : "#111111", borderBottom: "1px solid #222222" }}>
                      <td className="px-5 py-3 font-medium text-[#f5f5f5] whitespace-nowrap">{row.property}</td>
                      <td className="px-5 py-3" style={{ color: "#888888" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm mt-4 leading-relaxed" style={{ color: "#888888" }}>{project.datasetNote}</p>
          </motion.section>

          {/* Methodology */}
          <motion.section id="methodology" className="py-10 md:py-16 px-6 md:px-10 mb-8" style={{ background: "#111111", border: "1px solid #222222" }} {...fadeIn}>
            <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mb-2">How I Built This.</h2>
            <p className="text-sm mb-10" style={{ color: "#555555" }}>Step by step — no magic, just process.</p>
            <div className="space-y-8">
              {project.methodology.map((step, i) => (
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

          {/* Architecture */}
          <motion.section id="architecture" className="py-10 md:py-16" {...fadeIn}>
            <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mb-6">Model Architecture.</h2>
            <div className={`grid gap-px ${project.architectureCards.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`} style={{ background: "#222222" }}>
              {project.architectureCards.map((card) => (
                <div key={card.title} className="p-6" style={{ background: "#111111" }}>
                  <h3 className="text-lg font-bold text-[#f5f5f5] mb-3">{card.title}</h3>
                  <div className="space-y-1.5">
                    {card.details.map((d, i) => (
                      <p key={i} className="font-mono-dm text-xs break-words" style={{ color: "#888888" }}>{d}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Results */}
          <motion.section id="results" className="py-10 md:py-16 px-6 md:px-10 mb-8" style={{ background: "#111111", border: "1px solid #222222" }} {...fadeIn}>
            <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mb-2">Results.</h2>
            <p className="text-sm mb-8" style={{ color: "#555555" }}>Numbers that actually matter.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-8" style={{ background: "#222222" }}>
              {project.results.metrics.map((m) => (
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
                    {project.results.comparisonHeaders.map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold text-[#f5f5f5]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {project.results.comparisonRows.map((row, i) => (
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
            {project.results.note && (
              <p className="text-[10px] italic mt-3" style={{ color: "#555555" }}>{project.results.note}</p>
            )}
          </motion.section>

          {/* Visualizations */}
          <motion.section id="visualizations" className="py-10 md:py-16" {...fadeIn}>
            <p className="font-mono-dm text-[12px] mb-1" style={{ color: "#555555" }}>// VISUALIZATIONS</p>
            <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mb-2">Charts & Results.</h2>
            <p className="text-sm mb-8" style={{ color: "#888888" }}>
              {project.slug === "netflix-forecasting" ? "Because if you can't plot it, did it even happen?" : "2096 images, 150 epochs, and these charts to show for it."}
            </p>
            {(() => {
              const chartMap: Record<string, ChartItem[]> = {
                "netflix-forecasting": [
                  { src: "/charts/netflix_trend.png", title: "Subscription Trend Over Time", caption: "40 months of Netflix subscriber data showing steady growth with seasonal patterns detected before model training.", fullWidth: true },
                  { src: "/charts/netflix_arima.png", title: "ARIMA — Actual vs Predicted", caption: "ARIMA forecast for the final 10 months." },
                  { src: "/charts/netflix_lstm.png", title: "LSTM — Actual vs Predicted", caption: "LSTM deep learning forecast for the same period." },
                  { src: "/charts/netflix_comparison.png", title: "ARIMA vs LSTM — Error Metrics", caption: "Side-by-side comparison of MAE, RMSE, and MAPE.", fullWidth: true },
                  { src: "/charts/netflix_rolling.png", title: "Rolling Average Analysis", caption: "4-month rolling average overlaid on raw data." },
                  { src: "/charts/netflix_acf_pacf.png", title: "ACF & PACF — Stationarity Analysis", caption: "Autocorrelation and partial autocorrelation plots." },
                ],
                "wildlife-classification": [
                  { src: "/charts/wildlife_model_comparison.png", title: "YOLOv7 vs YOLOv8 vs YOLOv9", caption: "Grouped bar chart comparing all metrics.", fullWidth: true },
                  { src: "/charts/wildlife_loss_curve.png", title: "Training & Validation Loss", caption: "Loss curves across 150 epochs.", fullWidth: true },
                  { src: "/charts/wildlife_confusion_matrix.png", title: "Confusion Matrix — YOLOv9", caption: "Normalized confusion matrix for YOLOv9." },
                  { src: "/charts/wildlife_map_epochs.png", title: "mAP@0.5 Over Training Epochs", caption: "All three YOLO models improving over 150 epochs." },
                  { src: "/charts/wildlife_class_dist.png", title: "Dataset — Class Distribution", caption: "Distribution of 2096 training images.", fullWidth: true },
                ],
              };
              const charts = chartMap[project.slug] || [];
              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "#222222" }}>
                  {charts.map((chart, i) => (
                    <ChartCard key={i} chart={chart} index={i} allCharts={charts} />
                  ))}
                </div>
              );
            })()}
          </motion.section>

          {/* Learnings */}
          <motion.section id="learnings" className="py-10 md:py-16 px-6 md:px-10 mb-8" style={{ background: "#111111", border: "1px solid #222222" }} {...fadeIn}>
            <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mb-2">What I Learned.</h2>
            <p className="text-sm mb-8" style={{ color: "#555555" }}>Lessons learned the slightly painful way.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px" style={{ background: "#222222" }}>
              {project.learnings.map((l) => (
                <div key={l.title} className="p-5" style={{ background: "#161616" }}>
                  <span className="text-2xl">{l.icon}</span>
                  <h3 className="text-sm font-bold text-[#f5f5f5] mt-2 mb-2">{l.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#888888" }}>{l.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Source Code */}
          <motion.section id="source-code" className="py-10 md:py-16" {...fadeIn}>
            <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mb-2">Source Code.</h2>
            <p className="text-sm mb-6" style={{ color: "#888888" }}>Feel free to fork, star, or judge my variable names.</p>
            <div className="p-6 mb-6" style={{ background: "#111111", border: "1px solid #222222" }}>
              <div className="flex items-center gap-3 mb-3">
                <Github className="text-[#f5f5f5]" size={20} />
                <span className="text-lg font-bold text-[#f5f5f5]">View Full Source Code on GitHub</span>
              </div>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="fab-btn inline-flex items-center gap-2 text-sm">
                Open Repository <ExternalLink size={14} />
              </a>
            </div>
            <div className="overflow-x-auto">
              <SyntaxHighlighter
                language="python"
                style={atomOneDark}
                customStyle={{ padding: "1rem", fontSize: "0.75rem", background: "#111111", border: "1px solid #222222" }}
                wrapLongLines
              >
                {project.codeSnippet}
              </SyntaxHighlighter>
            </div>
          </motion.section>

          {/* Future Work */}
          <motion.section id="future-work" className="py-10 md:py-16 px-6 md:px-10 mb-8" style={{ background: "#111111", border: "1px solid #222222" }} {...fadeIn}>
            <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mb-6">What's Next.</h2>
            <ul className="space-y-3">
              {project.futureWork.map((fw) => (
                <li key={fw.text} className="flex items-start gap-3" style={{ color: "#888888" }}>
                  <span className="text-lg shrink-0">{fw.icon}</span>
                  <span className="text-sm leading-relaxed">{fw.text}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Related */}
          <motion.section id="related" className="py-10 md:py-16" {...fadeIn}>
            <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mb-6">Other Projects.</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "#222222" }}>
              {related.map((rp) => (
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

export default ProjectDetail;
