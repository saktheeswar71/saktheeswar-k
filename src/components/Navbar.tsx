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
      className="fixed top-0 left-0 right-0 z-50 bg-dark"
    >
      <div className="container mx-auto max-w-[1200px] flex items-center justify-between py-4 px-4 md:px-8">
        <Link to="/" className="group flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-orange flex items-center justify-center text-white text-xs font-bold tracking-tight transition-transform duration-300 group-hover:scale-110">
            SK
          </div>
          <span className="text-base font-semibold text-white hidden sm:block">Saktheeswar K</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = isActive(item);
            const className = `relative px-3.5 py-2 text-sm font-medium transition-all duration-300 ${
              active
                ? "text-orange"
                : "text-white/70 hover:text-orange"
            }`;

            const underline = active && (
              <motion.div
                layoutId="nav-underline"
                className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-orange rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            );

            if (item.isRoute) {
              return (
                <Link key={item.href} to={item.href} className={className}>
                  {item.label}
                  {underline}
                </Link>
              );
            }
            return (
              <a key={item.href} href={item.href} className={className}>
                {item.label}
                {underline}
              </a>
            );
          })}
        </div>

        <button
          className="md:hidden p-2 rounded-lg text-white hover:text-orange transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark border-t border-white/10"
          >
            <div className="flex flex-col gap-1 p-4">
              {navItems.map((item) => {
                const active = isActive(item);
                const className = `px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                  active
                    ? "text-orange bg-white/5"
                    : "text-white/70 hover:text-orange hover:bg-white/5"
                }`;
                if (item.isRoute) {
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={className}
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
                    className={className}
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
