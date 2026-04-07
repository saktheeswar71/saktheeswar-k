import { useState } from "react";
import { Mail, Linkedin, Github, Send, Phone, MapPin, Loader2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import contactRobot from "@/assets/contact-robot.png";

const contactInfo = [
  { icon: Mail, label: "saktheeswar71.k@gmail.com", href: "mailto:saktheeswar71.k@gmail.com" },
  { icon: Phone, label: "+91 8939703436", href: "tel:+918939703436" },
  { icon: MapPin, label: "Chennai, Tamil Nadu, India", href: undefined },
  { icon: Linkedin, label: "linkedin.com/in/saktheeswar-k", href: "https://www.linkedin.com/in/saktheeswar-k-a888b61a7/" },
  { icon: Github, label: "github.com/saktheeswar71", href: "https://github.com/saktheeswar71" },
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

    // Simple spam protection: 30s cooldown
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

      toast.success("Message sent! I'll get back to you before my next git commit. 🎉");
      setForm({ name: "", email: "", message: "" });
      setLastSent(Date.now());
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error("Failed to send message. Please try again or email directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative" style={{ background: "hsl(150 30% 90%)" }}>
      <div className="container mx-auto max-w-[1200px] relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <AnimatedSection>
            <p className="section-label">// LET'S TALK</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-slate">Get In Touch</h2>
            <p className="text-body text-sm">
              Whether it's a job, a collab, or just to debate which YOLO model is best — I'm here for it.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <img src={contactRobot} alt="Pixel art robot" className="w-32 h-32 object-contain hidden md:block" />
          </AnimatedSection>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection delay={0.1}>
            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, href }) => {
                const content = (
                  <div className="soft-card p-4 flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-steel/10">
                      <Icon className="text-steel" size={18} />
                    </div>
                    <span className="text-sm text-body">{label}</span>
                  </div>
                );
                return href ? (
                  <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={label}>{content}</div>
                );
              })}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} className="soft-card p-8 space-y-5">
              {[
                { key: "name", label: "Name", type: "text" },
                { key: "email", label: "Email", type: "email" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-xs font-medium text-body mb-1.5 block">
                    {f.label} <span className="text-steel">*</span>
                  </label>
                  <input
                    type={f.type}
                    maxLength={f.key === "email" ? 255 : 100}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    onFocus={() => setFocused(f.key)}
                    onBlur={() => setFocused(null)}
                    className="w-full px-4 py-3 rounded-xl bg-white border text-slate text-sm focus:outline-none transition-all duration-300"
                    style={{
                      borderColor: focused === f.key ? "hsl(193 46% 72%)" : "hsl(100 12% 81%)",
                      boxShadow: focused === f.key ? "0 0 0 3px hsla(193, 46%, 72%, 0.15)" : "none",
                    }}
                    placeholder={f.label}
                    required
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-body mb-1.5 block">
                  Message <span className="text-steel">*</span>
                </label>
                <textarea
                  rows={4}
                  maxLength={1000}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className="w-full px-4 py-3 rounded-xl bg-white border text-slate text-sm focus:outline-none transition-all duration-300 resize-none"
                  style={{
                    borderColor: focused === "message" ? "hsl(193 46% 72%)" : "hsl(100 12% 81%)",
                    boxShadow: focused === "message" ? "0 0 0 3px hsla(193, 46%, 72%, 0.15)" : "none",
                  }}
                  placeholder="Your message..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-sm disabled:opacity-60"
              >
                {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {sending ? "Sending..." : "Send It 🚀"}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
