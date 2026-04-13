import { motion } from "framer-motion";
import { ArrowDown, FolderOpen, Download, Github, Linkedin, Mail, Sparkles, BarChart3, Brain, Database } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import profileImg from "@/assets/profile.jpeg";

const floatingCards = [
  { icon: BarChart3, label: "Data Analysis", delay: 0 },
  { icon: Brain, label: "Machine Learning", delay: 0.2 },
  { icon: Database, label: "Deep Learning", delay: 0.4 },
];

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center section-padding pt-28 overflow-hidden">
    {/* Subtle gradient orbs */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, hsl(193 46% 72% / 0.3), transparent 70%)" }} />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, hsl(14 62% 82% / 0.4), transparent 70%)" }} />

    <div className="relative z-10 container mx-auto max-w-[1200px] grid lg:grid-cols-2 gap-16 items-center">
      {/* Left — Content */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-sm font-medium border border-sage/60 bg-white/60 backdrop-blur-sm text-slate"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Open to opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold mb-6 leading-[1.1] tracking-tight text-slate"
        >
          Turning raw data into
          <br />
          <span className="text-steel">meaningful insights.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-body text-base md:text-lg max-w-lg mb-6 leading-relaxed"
        >
          B.Tech graduate in AI & Data Science. I build ML models,
          craft dashboards, and make data tell stories that matter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl font-semibold mb-8 h-8 text-steel"
        >
          <TypeAnimation
            sequence={[
              "Data Analyst 📊", 2500,
              "ML Engineer 🤖", 2500,
              "Deep Learning Researcher 🧠", 2500,
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
          className="flex flex-wrap gap-4 mb-10"
        >
          <a href="#projects" className="btn-primary flex items-center gap-2 shadow-lg shadow-steel/20">
            <FolderOpen size={16} /> View Projects
          </a>
          <a href="#contact" className="btn-outline flex items-center gap-2">
            <Mail size={16} /> Contact Me
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center gap-3"
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
              className="p-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-sage/40 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-slate hover:text-steel"
              aria-label={label}
            >
              <Icon size={18} />
            </a>
          ))}
          <a href="/Saktheeswar_Resume.pdf" download className="ml-2 inline-flex items-center gap-2 text-sm font-medium text-slate/60 hover:text-steel transition-colors">
            <Download size={14} /> Resume
          </a>
        </motion.div>
      </div>

      {/* Right — Interactive visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-col justify-center items-center relative"
      >
        {/* Profile container with glow */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-steel/10 blur-2xl" />
          <div className="relative w-44 h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-[3px] border-white shadow-2xl shadow-steel/20">
            <img
              src={profileImg}
              alt="Saktheeswar K"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg text-xs font-medium text-slate whitespace-nowrap border border-sage/30"
          >
            📍 Chennai, India
          </motion.div>

          {/* Degree badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="absolute -top-2 -right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg text-xs font-medium text-slate border border-sage/30"
          >
            🎓 B.Tech AI & DS
          </motion.div>
        </div>

        {/* Floating skill cards */}
        <div className="mt-10 flex gap-3 flex-wrap justify-center">
          {floatingCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + card.delay, duration: 0.5 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-sage/30 shadow-sm text-sm font-medium text-slate hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <card.icon size={16} className="text-steel" />
              {card.label}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <a href="#about" aria-label="Scroll down" className="flex flex-col items-center gap-2 text-slate/40 hover:text-slate/60 transition-colors">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ArrowDown className="animate-bounce" size={18} />
      </a>
    </motion.div>
  </section>
);

export default HeroSection;
