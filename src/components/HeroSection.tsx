import { motion } from "framer-motion";
import { ArrowDown, FolderOpen, Download, Mail } from "lucide-react";
import ParticleField from "./ParticleField";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden">
    <ParticleField count={40} />

    {/* Gradient orbs */}
    <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

    <div className="relative z-10 container mx-auto text-center max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-mono"
      >
        AI & Data Science Graduate
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
      >
        Turning Data into{" "}
        <span className="text-gradient glow-text">Decisions.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-4"
      >
        Data Analyst · Machine Learning Enthusiast
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-muted-foreground/80 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        I am a B.Tech AI & Data Science graduate passionate about transforming raw data into
        meaningful insights. I specialize in Python, SQL, Machine Learning, and data visualization,
        with hands-on experience in forecasting, classification, and analytics-driven decision making.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="#projects"
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <FolderOpen size={16} /> View Projects
        </a>
        <a
          href="/Saktheeswar_Resume.pdf"
          download
          className="flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/40 text-primary font-semibold text-sm hover:bg-primary/10 transition-colors"
        >
          <Download size={16} /> Download Resume
        </a>
        <a
          href="#contact"
          className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold text-sm hover:border-primary/40 hover:text-primary transition-colors"
        >
          <Mail size={16} /> Contact Me
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-16"
      >
        <a href="#about" aria-label="Scroll down">
          <ArrowDown className="mx-auto text-muted-foreground animate-bounce" size={24} />
        </a>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
