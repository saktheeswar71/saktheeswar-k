import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/30 py-12 px-4">
    <div className="container mx-auto max-w-[1200px] text-center">
      <h3 className="text-xl font-bold text-gradient mb-2">Saktheeswar K</h3>
      <p className="text-muted-foreground text-sm mb-6">Data Analyst & AI Graduate</p>

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
            className="p-2.5 rounded-lg glass hover:glow-border transition-all duration-300 text-muted-foreground hover:text-foreground"
            aria-label={label}
          >
            <Icon size={18} />
          </a>
        ))}
      </div>

      <p className="text-muted-foreground text-xs mb-1">
        Built with ❤️ using React + Lovable
      </p>
      <p className="text-muted-foreground/60 text-xs">
        © 2025 Saktheeswar K. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
