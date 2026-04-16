import { motion } from "framer-motion";
import { ArrowDown, FolderOpen, Download, Github, Linkedin, Mail, BarChart3, Brain, Database } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import profileImg from "@/assets/profile.jpeg";

const floatingCards = [
  { icon: BarChart3, label: "Data Analysis", delay: 0 },
  { icon: Brain, label: "Machine Learning", delay: 0.2 },
  { icon: Database, label: "Deep Learning", delay: 0.4 },
];

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center section-padding pt-28 overflow-hidden bg-background">
    {/* Radial glow */}
    <div className="absolute top-20 right-10 w-[600px] h-[600px] rounded-full opacity-20 blur-[100px] pointer-events-none" style={{ background: "radial-gradient(circle, hsl(27 89% 53% / 0.5), transparent 70%)" }} />
    <div className="absolute bottom-20 left-10 w-[400px] h-[400px] rounded-full opacity-10 blur-[80px] pointer-events-none" style={{ background: "radial-gradient(circle, hsl(27 100% 63% / 0.3), transparent 70%)" }} />

    <div className="relative z-10 container mx-auto max-w-[1200px] grid lg:grid-cols-2 gap-16 items-center">
      {/* Left — Content */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-lg text-sm font-medium border border-border bg-card text-foreground"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Open to opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold mb-6 leading-[1.1] tracking-tight text-foreground"
        >
          Turning raw data into
          <br />
          <span className="text-primary">meaningful insights.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-base md:text-lg max-w-lg mb-6 leading-relaxed"
        >
          B.Tech graduate in AI & Data Science. I build ML models,
          craft dashboards, and make data tell stories that matter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl font-semibold mb-8 h-8 text-primary"
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
          <a href="#projects" className="btn-primary flex items-center gap-2">
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
              className="p-2.5 rounded-lg bg-card border border-border shadow-sm hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5 transition-all duration-300 text-muted-foreground hover:text-primary"
              aria-label={label}
            >
              <Icon size={18} />
            </a>
          ))}
          <a href="/Saktheeswar_Resume.pdf" download className="ml-2 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Download size={14} /> Resume
          </a>
        </motion.div>
      </div>

      {/* Right — Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-col justify-center items-center relative"
      >
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-primary/10 blur-2xl" />
          <div className="relative w-44 h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-[3px] border-card shadow-2xl shadow-primary/20">
            <img
              src={profileImg}
              alt="Saktheeswar K"
              className="w-full h-full object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-card rounded-lg px-4 py-2 shadow-lg text-xs font-medium text-foreground whitespace-nowrap border border-border"
          >
            📍 Chennai, India
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="absolute -top-2 -right-4 bg-card rounded-lg px-3 py-1.5 shadow-lg text-xs font-medium text-foreground border border-border"
          >
            🎓 B.Tech AI & DS
          </motion.div>
        </div>

        <div className="mt-10 flex gap-3 flex-wrap justify-center">
          {floatingCards.map((card) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + card.delay, duration: 0.5 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border shadow-sm text-sm font-medium text-foreground hover:shadow-md hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 cursor-default"
            >
              <card.icon size={16} className="text-primary" />
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
      <a href="#about" aria-label="Scroll down" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ArrowDown className="animate-bounce" size={18} />
      </a>
    </motion.div>
  </section>
);

export default HeroSection;
