import { motion } from "framer-motion";
import profileImg from "@/assets/profile.jpeg";

const stats = [
  { value: "2", label: "Projects" },
  { value: "1", label: "Publication" },
  { value: "2026", label: "Available" },
];

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center px-5 md:px-10 pt-16" style={{ background: "#0a0a0a" }}>
    {/* Subtle horizontal line */}
    <div className="absolute left-0 right-0" style={{ top: "60%", height: 1, background: "#1a1a1a" }} />

    <div className="fab-container w-full grid lg:grid-cols-[65%_35%] gap-12 items-center relative z-10">
      {/* Left — Typography */}
      <div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-[13px] tracking-[0.1em] uppercase mb-6"
          style={{ color: "#888888", fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
        >
          Data Analyst & AI Graduate
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-display leading-[0.9] mb-8"
          style={{ fontSize: "clamp(64px, 9vw, 130px)", color: "#f5f5f5" }}
        >
          <span className="font-bold">Saktheeswar</span>
          <br />
          <span className="italic font-normal">K.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-base max-w-[480px] mb-8 leading-[1.7]"
          style={{ color: "#888888", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
        >
          B.Tech AI & Data Science graduate from Chennai.
          I turn messy data into clean decisions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="flex flex-wrap gap-4 mb-12"
        >
          <a href="#projects" className="fab-btn">View Projects →</a>
          <a href="/Saktheeswar_Resume.pdf" download className="fab-btn-muted">Download CV</a>
        </motion.div>

        {/* Micro stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex items-center"
        >
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-center">
              {i > 0 && <div className="w-px h-10 mx-6" style={{ background: "#222222" }} />}
              <div>
                <p className="font-mono-dm text-2xl text-[#f5f5f5]">{s.value}</p>
                <p className="text-[12px] uppercase tracking-[0.05em]" style={{ color: "#888888" }}>{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right — Photo */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="relative hidden lg:block"
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
          <img
            src={profileImg}
            alt="Saktheeswar K"
            className="w-full h-full object-cover transition-all duration-[600ms]"
            style={{ filter: "grayscale(100%) contrast(1.1) brightness(0.95)" }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%)")}
            onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(100%) contrast(1.1) brightness(0.95)")}
          />
          {/* Location overlay */}
          <div
            className="absolute bottom-0 left-0 px-3 py-2 text-[12px]"
            style={{ background: "rgba(10,10,10,0.85)", color: "#888888", borderTop: "1px solid #222222" }}
          >
            📍 Chennai, Tamil Nadu
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
