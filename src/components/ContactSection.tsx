import { useState } from "react";
import { Mail, Linkedin, Github, Send, Phone, MapPin, Loader2, ArrowUpRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const contactLinks = [
  { icon: Mail, label: "saktheeswar71.k@gmail.com", href: "mailto:saktheeswar71.k@gmail.com" },
  { icon: Phone, label: "+91 8939703436", href: "tel:+918939703436" },
  { icon: MapPin, label: "Chennai, Tamil Nadu, India" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/saktheeswar-k-a888b61a7/" },
  { icon: Github, label: "GitHub", href: "https://github.com/saktheeswar71" },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [lastSent, setLastSent] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (Date.now() - lastSent < 30000) {
      toast.error("Please wait a moment before sending another message.");
      return;
    }
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: { name: form.name.trim(), email: form.email.trim(), message: form.message.trim() },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast.success("Message sent! I'll get back to you soon. 🎉");
      setForm({ name: "", email: "", message: "" });
      setLastSent(Date.now());
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error("Failed to send message. Please try again or email directly.");
    } finally {
      setSending(false);
    }
  };

  const inputClass = (key: string) =>
    `w-full px-4 py-3 rounded-xl bg-white/80 backdrop-blur-sm border text-slate text-sm focus:outline-none transition-all duration-300 ${
      focused === key ? "border-steel shadow-[0_0_0_3px_hsla(193,46%,72%,0.12)]" : "border-sage/40"
    }`;

  return (
    <section id="contact" className="section-padding relative">
      <div className="container mx-auto max-w-[1200px] relative z-10">
        <AnimatedSection>
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="section-label">Contact</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate tracking-tight">
              Let's build something impactful together
            </h2>
            <p className="text-body text-sm">
              Have a project in mind or just want to connect? I'd love to hear from you.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <AnimatedSection delay={0.1}>
            <div className="space-y-3">
              {contactLinks.map(({ icon: Icon, label, href }) => {
                const inner = (
                  <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-sage/30 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                    <div className="w-9 h-9 rounded-xl bg-steel/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="text-steel" size={16} />
                    </div>
                    <span className="text-sm text-slate/80 font-medium">{label}</span>
                    {href && <ArrowUpRight size={14} className="ml-auto text-steel/40" />}
                  </div>
                );
                return href ? (
                  <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="block">
                    {inner}
                  </a>
                ) : (
                  <div key={label}>{inner}</div>
                );
              })}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} className="rounded-2xl p-7 bg-white/70 backdrop-blur-sm border border-sage/30 shadow-sm space-y-4">
              {[
                { key: "name", label: "Name", type: "text" },
                { key: "email", label: "Email", type: "email" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-xs font-medium text-slate/60 mb-1.5 block">
                    {f.label} <span className="text-steel">*</span>
                  </label>
                  <input
                    type={f.type}
                    maxLength={f.key === "email" ? 255 : 100}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    onFocus={() => setFocused(f.key)}
                    onBlur={() => setFocused(null)}
                    className={inputClass(f.key)}
                    placeholder={f.label}
                    required
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-slate/60 mb-1.5 block">
                  Message <span className="text-steel">*</span>
                </label>
                <textarea
                  rows={4}
                  maxLength={1000}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className={`${inputClass("message")} resize-none`}
                  placeholder="Your message..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-slate hover:bg-steel transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-lg hover:shadow-steel/20 disabled:opacity-60"
              >
                {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
