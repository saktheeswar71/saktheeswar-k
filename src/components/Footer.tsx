import { Link } from "react-router-dom";

const Footer = () => (
  <footer style={{ borderTop: "1px solid #222222", background: "#0a0a0a" }}>
    <div className="fab-container px-5 md:px-10 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left */}
        <div>
          <p className="text-sm font-medium text-[#f5f5f5] mb-1">Saktheeswar K</p>
          <p className="text-[13px]" style={{ color: "#555555" }}>Data Analyst & AI Graduate</p>
        </div>

        {/* Center */}
        <div className="flex flex-wrap gap-4 justify-start md:justify-center">
          {[
            { label: "Home", href: "/" },
            { label: "About", href: "/#about" },
            { label: "Projects", href: "/#projects" },
            { label: "Contact", href: "/#contact" },
          ].map((l) => (
            <Link
              key={l.label}
              to={l.href}
              className="text-[13px] hover:text-[#f5f5f5] transition-colors"
              style={{ color: "#555555" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="text-left md:text-right">
          <p className="text-[13px]" style={{ color: "#555555" }}>© 2025 Saktheeswar K</p>
          <p className="text-[11px] mt-1" style={{ color: "#333333" }}>Built with React + Lovable</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
