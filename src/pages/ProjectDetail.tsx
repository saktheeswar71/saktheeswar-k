import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Upload, ArrowUp, ExternalLink } from "lucide-react";
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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate mb-2">Project not found</h1>
          <Link to="/#projects" className="text-steel hover:underline">← Back to Projects</Link>
        </div>
      </div>
    );
  }

  const related = projects.filter((p) => project.relatedSlugs.includes(p.slug));

  return (
    <div className="min-h-screen bg-background">
      <DetailNavbar backLabel="← Back to Projects" backTo="/#projects" />

      {/* Hero */}
      <section className="pt-20" style={{ background: project.heroGradient }}>
        <div className="container mx-auto max-w-[1200px] px-4 md:px-8 py-16 md:py-24">
          <motion.div {...fadeIn}>
            <h1 className="text-3xl md:text-5xl font-bold text-slate mb-3">{project.title}</h1>
            <p className="text-lg text-body mb-5 max-w-2xl">{project.subtitle}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((t) => (
                <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/60 text-slate font-medium">{t}</span>
              ))}
            </div>
            <span className="inline-block text-xs px-3 py-1 rounded-full bg-steel/20 text-slate font-medium mb-6">{project.date}</span>
            <div className="flex flex-wrap gap-3">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                <Github size={16} /> View Source Code 🐙
              </a>
              <a href="#methodology" className="btn-outline inline-flex items-center gap-2">
                Read Full Report 📄
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TOC for mobile/tablet */}
      <TableOfContents items={tocItems} variant="mobile" />

      <div className="container mx-auto max-w-[1200px] px-4 md:px-8 flex gap-10">
        {/* Desktop TOC */}
        <div className="hidden lg:block pt-12">
          <TableOfContents items={tocItems} variant="desktop" />
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Overview */}
          <motion.section id="overview" className="py-16" {...fadeIn}>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {project.stats.map((s) => (
                <div key={s.label} className="soft-card p-5 text-center">
                  <span className="text-2xl">{s.icon}</span>
                  <p className="text-xl font-bold text-slate mt-2">{s.value}</p>
                  <p className="text-xs text-body">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="text-body leading-relaxed">{project.overview}</p>
          </motion.section>

          {/* Problem */}
          <motion.section id="problem" className="py-16 px-6 md:px-10 rounded-2xl mb-8" style={{ background: "hsl(150 30% 90%)" }} {...fadeIn}>
            <span className="text-2xl">❓</span>
            <h2 className="text-2xl font-bold text-slate mt-2 mb-4">The Problem</h2>
            <p className="text-body leading-relaxed">{project.problem}</p>
          </motion.section>

          {/* Dataset */}
          <motion.section id="dataset" className="py-16" {...fadeIn}>
            <h2 className="text-2xl font-bold text-slate mb-6">Dataset</h2>
            <div className="overflow-x-auto rounded-xl border border-sage">
              <table className="w-full text-sm">
                <tbody>
                  {project.dataset.map((row, i) => (
                    <tr key={row.property} className={i % 2 === 0 ? "bg-white" : "bg-mint/30"}>
                      <td className="px-5 py-3 font-medium text-slate whitespace-nowrap">{row.property}</td>
                      <td className="px-5 py-3 text-body">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-body mt-4 leading-relaxed">{project.datasetNote}</p>
          </motion.section>

          {/* Methodology */}
          <motion.section id="methodology" className="py-16 px-6 md:px-10 rounded-2xl mb-8" style={{ background: "hsl(28 93% 91%)" }} {...fadeIn}>
            <h2 className="text-2xl font-bold text-slate mb-2">How I Built This</h2>
            <p className="text-sm text-body mb-10">Step by step — no magic, just process.</p>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-steel/20 hidden md:block" />
              <div className="space-y-10">
                {project.methodology.map((step, i) => (
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

          {/* Architecture */}
          <motion.section id="architecture" className="py-16" {...fadeIn}>
            <h2 className="text-2xl font-bold text-slate mb-6">Model Architecture</h2>
            <div className={`grid gap-4 ${project.architectureCards.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
              {project.architectureCards.map((card) => (
                <div key={card.title} className="soft-card p-6">
                  <h3 className="text-lg font-bold text-steel mb-3">{card.title}</h3>
                  <div className="space-y-1.5">
                    {card.details.map((d, i) => (
                      <p key={i} className="text-sm text-body font-mono">{d}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Results */}
          <motion.section id="results" className="py-16 px-6 md:px-10 rounded-2xl mb-8" style={{ background: "hsl(150 30% 90%)" }} {...fadeIn}>
            <h2 className="text-2xl font-bold text-slate mb-2">Results</h2>
            <p className="text-sm text-body mb-8">Numbers that actually matter.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {project.results.metrics.map((m) => (
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
                    {project.results.comparisonHeaders.map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold text-slate">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {project.results.comparisonRows.map((row, i) => (
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
            {project.results.note && (
              <p className="text-xs text-body/60 italic mt-3">{project.results.note}</p>
            )}
          </motion.section>

          {/* Visualizations */}
          <motion.section id="visualizations" className="py-16" {...fadeIn}>
            <h2 className="text-2xl font-bold text-slate mb-2">Charts & Visualizations</h2>
            <p className="text-sm text-body mb-8">Because a good chart is worth a thousand rows.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {project.visualizations.map((label) => (
                <div key={label} className="rounded-xl border-2 border-dashed border-sage p-10 flex flex-col items-center justify-center text-center bg-sage/10">
                  <Upload className="text-slate/30 mb-3" size={32} />
                  <p className="text-sm font-medium text-slate/50">{label}</p>
                  <p className="text-xs text-body/40 mt-1">Upload chart image here</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Learnings */}
          <motion.section id="learnings" className="py-16 px-6 md:px-10 rounded-2xl mb-8" style={{ background: "hsl(28 93% 91%)" }} {...fadeIn}>
            <h2 className="text-2xl font-bold text-slate mb-2">What I Learned</h2>
            <p className="text-sm text-body mb-8">Lessons learned the slightly painful way.</p>
            <div className="grid md:grid-cols-3 gap-4">
              {project.learnings.map((l) => (
                <div key={l.title} className="soft-card p-5">
                  <span className="text-2xl">{l.icon}</span>
                  <h3 className="text-base font-bold text-slate mt-2 mb-2">{l.title}</h3>
                  <p className="text-sm text-body leading-relaxed">{l.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Source Code */}
          <motion.section id="source-code" className="py-16" {...fadeIn}>
            <h2 className="text-2xl font-bold text-slate mb-2">Source Code</h2>
            <p className="text-sm text-body mb-6">Feel free to fork, star, or judge my variable names.</p>
            <div className="soft-card p-6 mb-6" style={{ background: "hsl(150 30% 90%)" }}>
              <div className="flex items-center gap-3 mb-3">
                <Github className="text-slate" size={24} />
                <span className="text-lg font-bold text-slate">View Full Source Code on GitHub</span>
              </div>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                Open Repository 🐙 <ExternalLink size={14} />
              </a>
            </div>
            <div className="rounded-xl overflow-hidden">
              <SyntaxHighlighter
                language="python"
                style={atomOneDark}
                customStyle={{ borderRadius: "0.75rem", padding: "1.5rem", fontSize: "0.85rem" }}
              >
                {project.codeSnippet}
              </SyntaxHighlighter>
            </div>
          </motion.section>

          {/* Future Work */}
          <motion.section id="future-work" className="py-16 px-6 md:px-10 rounded-2xl mb-8" style={{ background: "hsl(150 30% 90%)" }} {...fadeIn}>
            <h2 className="text-2xl font-bold text-slate mb-6">What's Next</h2>
            <ul className="space-y-3">
              {project.futureWork.map((fw) => (
                <li key={fw.text} className="flex items-start gap-3 text-body">
                  <span className="text-lg">{fw.icon}</span>
                  <span className="text-sm leading-relaxed">{fw.text}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Related Projects */}
          <motion.section id="related" className="py-16" {...fadeIn}>
            <h2 className="text-2xl font-bold text-slate mb-6">Other Projects</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {related.map((rp) => (
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

      {/* Back to top button (mobile) */}
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

export default ProjectDetail;
