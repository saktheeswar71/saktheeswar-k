import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Publication", href: "#publication" },
  { label: "Experience", href: "#experience" },
  { label: "F1 🏎️", href: "/playground", isRoute: true },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#");
  const location = useLocation();
  const isPlayground = location.pathname === "/playground";

  useEffect(() => {
    const onScroll = () => {
      const sections = navItems.filter(i => !i.isRoute).map(i => i.href.replace("#", "")).filter(Boolean);
      let current = "#";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) current = `#${id}`;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (item: typeof navItems[0]) => {
    if (item.isRoute) return isPlayground;
    if (isPlayground) return false;
    return activeSection === item.href;
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: "#0a0a0a", borderBottom: "1px solid #222222", height: 64 }}
      >
        <div className="fab-container flex items-center justify-between h-full px-5 md:px-10">
          {/* Logo */}
          <Link to="/" className="font-display italic text-[22px] text-[#f5f5f5] shrink-0">
            SK
          </Link>

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const active = isActive(item);
              const el = item.isRoute ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="relative text-sm tracking-[0.02em] transition-colors duration-300"
                  style={{ color: active ? "#f5f5f5" : "#888888", fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 14 }}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: "#e8343a" }}
                    />
                  )}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative text-sm tracking-[0.02em] transition-colors duration-300 hover:text-[#f5f5f5]"
                  style={{ color: active ? "#f5f5f5" : "#888888", fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 14 }}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: "#e8343a" }}
                    />
                  )}
                </a>
              );
              return el;
            })}
          </div>

          {/* Right: availability pill */}
          <div className="hidden md:flex items-center">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs tracking-[0.02em] transition-all duration-200 hover:border-[#f5f5f5]"
              style={{
                border: "1px solid #222222",
                color: "#888888",
                fontFamily: "'DM Mono', monospace",
                borderRadius: 20,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "#4ade80" }} />
              Available for work
            </span>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#f5f5f5]"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col"
            style={{ background: "#0a0a0a" }}
          >
            <div className="flex items-center justify-between px-5 h-16">
              <span className="font-display italic text-[22px] text-[#f5f5f5]">SK</span>
              <button onClick={() => setMobileOpen(false)} className="text-[#f5f5f5]" aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-10 gap-6">
              {navItems.map((item, i) => {
                const active = isActive(item);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                  >
                    {item.isRoute ? (
                      <Link
                        to={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="font-display text-[32px] transition-colors duration-300"
                        style={{ color: active ? "#f5f5f5" : "#555555" }}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="font-display text-[32px] transition-colors duration-300"
                        style={{ color: active ? "#f5f5f5" : "#555555" }}
                      >
                        {item.label}
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
