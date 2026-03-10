import { motion } from "framer-motion";
import { ArrowDown, FolderOpen, Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import ParticleField from "./ParticleField";

const stats = [
  { label: "2 Projects", angle: -30, distance: 160 },
  { label: "1 Publication", angle: 90, distance: 170 },
  { label: "3 Certifications", angle: 210, distance: 160 },
];

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden section-padding pt-24">
    <ParticleField count={40} />
    <div className="blob-purple -top-40 -left-60" />
    <div className="blob-cyan -bottom-40 -right-40" />

    <div className="relative z-10 container mx-auto grid lg:grid-cols-2 gap-12 items-center">
      {/* Left */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-sm font-medium text-muted-foreground"
        >
          👋 Hello, I'm
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight"
        >
          <span className="text-gradient glow-text">Saktheeswar K</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl font-semibold text-foreground/90 mb-6 h-10"
        >
          <TypeAnimation
            sequence={[
              "Data Analyst", 2500,
              "AI & Data Science Graduate", 2500,
              "Machine Learning Engineer", 2500,
              "Deep Learning Researcher", 2500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-cyan"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground text-sm md:text-base max-w-lg mb-8 leading-relaxed"
        >
          B.Tech graduate in Artificial Intelligence and Data Science from St. Joseph's Institute
          of Technology, Chennai. Passionate about turning raw data into actionable insights and
          building intelligent ML systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          <a href="#projects" className="btn-gradient px-6 py-3 text-sm flex items-center gap-2">
            <FolderOpen size={16} /> View My Projects
          </a>
          <a href="/Saktheeswar_Resume.pdf" download className="btn-ghost px-6 py-3 text-sm flex items-center gap-2">
            <Download size={16} /> Download Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center gap-4"
        >
          {[
            { icon: Github, href: "https://github.com/saktheeswar71", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/saktheeswar-k-a888b61a7/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:saktheeswar71.k@gmail.com", label: "Email" },
            { icon: Phone, href: "tel:+918939703436", label: "Phone" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="p-2.5 rounded-lg glass hover:glow-border transition-all duration-300 text-muted-foreground hover:text-foreground"
              aria-label={label}
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Right — Profile ring + floating stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hidden lg:flex justify-center items-center relative"
      >
        {/* Rotating gradient ring */}
        <div className="relative w-72 h-72">
          <div className="absolute inset-0 rounded-full animate-rotate-border"
            style={{
              background: "conic-gradient(from 0deg, #7C3AED, #A855F7, #06B6D4, #22D3EE, #7C3AED)",
              padding: "4px",
              WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 4px), black calc(100% - 4px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), black calc(100% - 4px))",
            }}
          />
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse-ring" />
          
          {/* Initials placeholder */}
          <div className="absolute inset-2 rounded-full bg-card flex items-center justify-center">
            <span className="text-5xl font-bold text-gradient">SK</span>
          </div>
        </div>

        {/* Floating stat badges */}
        {stats.map((s, i) => {
          const rad = (s.angle * Math.PI) / 180;
          const x = Math.cos(rad) * s.distance;
          const y = Math.sin(rad) * s.distance;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.2, type: "spring" }}
              className="absolute glass rounded-full px-4 py-2 text-xs font-medium text-foreground whitespace-nowrap"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {s.label}
            </motion.div>
          );
        })}
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
        <ArrowDown className="text-muted-foreground animate-bounce" size={24} />
      </a>
    </motion.div>
  </section>
);

export default HeroSection;
