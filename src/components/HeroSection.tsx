import { motion } from "framer-motion";
import { ArrowDown, FolderOpen, Download, Github, Linkedin, Mail } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import profileImg from "@/assets/profile.jpeg";
import lofiCoding from "@/assets/lofi-coding.png";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center section-padding pt-24 overflow-hidden">
    <div className="blob-peach -top-40 -right-40" />
    <div className="blob-mint -bottom-40 -left-40" />

    <div className="relative z-10 container mx-auto max-w-[1200px] grid lg:grid-cols-2 gap-12 items-center">
      {/* Left */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full text-sm font-medium"
          style={{ background: "hsl(14 62% 82%)", color: "hsl(140 12% 40%)" }}
        >
          👋 Open to opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-slate"
        >
          Hi, I'm<br />
          Saktheeswar K.<br />
          <span className="text-steel">I make data talk.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-body text-sm md:text-base max-w-lg mb-4 leading-relaxed"
        >
          B.Tech graduate in AI & Data Science. I turn messy datasets into clean insights,
          build ML models that actually work, and occasionally explain to my mom
          what a neural network is.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl font-semibold mb-6 h-8 text-steel"
        >
          <TypeAnimation
            sequence={[
              "Data Analyst 📊", 2500,
              "ML Engineer 🤖", 2500,
              "Deep Learning Researcher 🧠", 2500,
              "Occasional Graph Explainer 📈", 2500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          <a href="#projects" className="btn-primary flex items-center gap-2">
            <FolderOpen size={16} /> See My Work
          </a>
          <a href="/Saktheeswar_Resume.pdf" download className="btn-outline flex items-center gap-2">
            <Download size={16} /> Download Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center gap-4"
        >
          {[
            { icon: Github, href: "https://github.com/saktheeswar71", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/saktheeswar-k-a888b61a7/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:saktheeswar71.k@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="p-2.5 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 text-slate hover:text-steel"
              aria-label={label}
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Right — Profile photo + lofi pixel art */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hidden lg:flex flex-col justify-center items-center relative"
      >
        {/* Decorative blob behind photo */}
        <div
          className="absolute w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(14 62% 82% / 0.5) 0%, transparent 70%)" }}
        />

        {/* Profile photo */}
        <div className="relative">
          <div className="w-64 h-64 rounded-full overflow-hidden border-[3px] border-steel shadow-lg">
            <img
              src={profileImg}
              alt="Saktheeswar K"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Location sticky note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-xl px-4 py-2 shadow-md text-xs font-medium text-slate whitespace-nowrap"
          >
            📍 Chennai, Tamil Nadu
          </motion.div>

          {/* Degree badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="absolute -top-2 -right-6 bg-white rounded-xl px-3 py-1.5 shadow-md text-xs font-medium text-slate"
          >
            🎓 B.Tech AI & DS • 2025
          </motion.div>
        </div>

        {/* Lofi pixel art character below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10 relative"
        >
          <img
            src={lofiCoding}
            alt="Pixel art of a developer coding"
            className="w-40 h-auto opacity-80"
          />
          <p className="text-center text-body text-[10px] mt-1 italic">me, right now, building this site</p>
        </motion.div>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <a href="#about" aria-label="Scroll down">
        <ArrowDown className="text-slate animate-bounce" size={24} />
      </a>
    </motion.div>
  </section>
);

export default HeroSection;
