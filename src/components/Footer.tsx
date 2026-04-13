import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="py-12 px-4 border-t border-sage/30">
    <div className="container mx-auto max-w-[1200px]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate flex items-center justify-center text-white text-xs font-bold">
            SK
          </div>
          <div>
            <p className="font-semibold text-sm text-slate">Saktheeswar K</p>
            <p className="text-xs text-body">Data Analyst & AI Graduate</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
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
              className="p-2 rounded-lg border border-sage/30 text-slate/50 hover:text-steel hover:border-steel/30 transition-all duration-300"
              aria-label={label}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <p className="text-xs text-body/50">
          © 2025 Saktheeswar K. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
