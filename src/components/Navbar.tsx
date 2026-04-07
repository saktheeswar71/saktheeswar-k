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
  { label: "Playground", href: "/playground", isRoute: true },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#");
  const location = useLocation();

  const isPlaygroundActive = location.pathname === "/playground";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems
        .filter(i => !i.isRoute)
        .map(i => i.href.replace("#", ""))
        .filter(Boolean);
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
    if (item.isRoute) return isPlaygroundActive;
    if (isPlaygroundActive) return false;
    return activeSection === item.href;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      style={{ borderBottom: scrolled ? "1px solid hsl(100 12% 81%)" : "none" }}
    >
      <div className="container mx-auto max-w-[1200px] flex items-center justify-between py-4 px-4 md:px-8">
        <Link to="/" className="text-lg md:text-xl font-bold text-slate whitespace-nowrap shrink-0">Saktheeswar K</Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const active = isActive(item);
            if (item.isRoute) {
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm font-medium transition-colors relative pb-1 ${
                    active ? "text-steel" : "text-slate hover:text-steel"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-steel"
                    />
                  )}
                </Link>
              );
            }
            return (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors relative pb-1 ${
                  active ? "text-steel" : "text-slate hover:text-steel"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-steel"
                  />
                )}
              </a>
            );
          })}
        </div>

        <button
          className="md:hidden text-slate"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-sage"
          >
            <div className="flex flex-col gap-4 p-6">
              {navItems.map((item) => {
                const active = isActive(item);
                if (item.isRoute) {
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-sm font-medium transition-colors ${
                        active ? "text-steel" : "text-slate hover:text-steel"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm font-medium transition-colors ${
                      active ? "text-steel" : "text-slate hover:text-steel"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;