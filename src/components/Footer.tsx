import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="py-12 px-4" style={{ background: "hsl(140 12% 40%)" }}>
    <div className="container mx-auto max-w-[1200px] text-center">
      <h3 className="text-xl font-bold text-white mb-2">Saktheeswar K</h3>
      <p className="text-white/70 text-sm mb-6">Data Analyst & AI Graduate • Chennai</p>

      <div className="flex justify-center gap-4 mb-8">
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
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 text-white/70 hover:text-steel"
            aria-label={label}
          >
            <Icon size={18} />
          </a>
        ))}
      </div>

      <p className="text-white/60 text-xs mb-1">
        Built with way too many cups of coffee ☕ and React + Lovable
      </p>
      <p className="text-white/40 text-xs">
        © 2025 Saktheeswar K — No neural networks were overfitted in the making of this site.
      </p>
    </div>
  </footer>
);

export default Footer;