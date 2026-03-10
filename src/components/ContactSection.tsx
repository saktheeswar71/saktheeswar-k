import { useState } from "react";
import { Mail, Linkedin, Github, Send, Phone, MapPin } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { toast } from "sonner";

const contactInfo = [
  { icon: Mail, label: "saktheeswar71.k@gmail.com", href: "mailto:saktheeswar71.k@gmail.com" },
  { icon: Phone, label: "+91 8939703436", href: "tel:+918939703436" },
  { icon: MapPin, label: "Chennai, Tamil Nadu, India", href: undefined },
  { icon: Linkedin, label: "linkedin.com/in/saktheeswar-k", href: "https://www.linkedin.com/in/saktheeswar-k-a888b61a7/" },
  { icon: Github, label: "github.com/saktheeswar71", href: "https://github.com/saktheeswar71" },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl bg-transparent border text-foreground text-sm focus:outline-none transition-all duration-300";

  const getInputStyle = (field: string) => ({
    borderColor: focused === field ? "rgba(124, 58, 237, 0.6)" : "rgba(255,255,255,0.1)",
    boxShadow: focused === field ? "0 0 20px rgba(124,58,237,0.15)" : "none",
  });

  return (
    <section id="contact" className="section-padding relative">
      <div className="blob-cyan -bottom-40 -left-60 opacity-30" />
      <div className="container mx-auto max-w-[1200px] relative z-10">
        <AnimatedSection>
          <p className="section-label">// CONTACT</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground text-sm mb-12">
            Open to opportunities, collaborations, and research discussions.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection delay={0.1}>
            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, href }) => {
                const content = (
                  <div className="glass rounded-xl p-4 flex items-center gap-4 card-hover">
                    <div className="p-2.5 rounded-lg bg-primary/10">
                      <Icon className="text-primary" size={18} />
                    </div>
                    <span className="text-sm text-muted-foreground">{label}</span>
                  </div>
                );
                return href ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="block"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={label}>{content}</div>
                );
              })}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} className="glass rounded-xl p-8 space-y-5">
              {[
                { key: "name", label: "Name", type: "text", required: true },
                { key: "email", label: "Email", type: "email", required: true },
                { key: "subject", label: "Subject", type: "text", required: false },
              ].map((f) => (
                <div key={f.key} className="relative">
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    {f.label} {f.required && <span className="text-primary">*</span>}
                  </label>
                  <input
                    type={f.type}
                    maxLength={f.key === "email" ? 255 : 100}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    onFocus={() => setFocused(f.key)}
                    onBlur={() => setFocused(null)}
                    className={inputClasses}
                    style={getInputStyle(f.key)}
                    placeholder={f.label}
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  rows={4}
                  maxLength={1000}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className={`${inputClasses} resize-none`}
                  style={getInputStyle("message")}
                  placeholder="Your message..."
                />
              </div>
              <button type="submit" className="w-full btn-gradient py-3 flex items-center justify-center gap-2 text-sm">
                <Send size={16} /> Send Message
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
