import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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
      toast.success("Message sent! I'll get back to you soon.");
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
    <section id="contact" className="fab-section">
      <div className="fab-container">
        <div className="fab-label">
          <span className="font-mono-dm text-[12px]" style={{ color: "#555555" }}>(07)</span>
          <span className="font-display text-[13px]" style={{ color: "#888888" }}>Contact.</span>
        </div>

        {/* Large CTA heading */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="font-display leading-[0.95] mb-6" style={{ fontSize: "clamp(48px, 8vw, 120px)", color: "#f5f5f5" }}>
              <span className="font-bold">Let's work</span>
              <br />
              <span className="italic font-normal">together.</span>
            </h2>
            <p className="text-base max-w-md mx-auto mb-8" style={{ color: "#888888", fontWeight: 300 }}>
              Open to opportunities, collaborations, and research discussions.
            </p>
          </div>
        </AnimatedSection>

        {/* Contact form */}
        <AnimatedSection delay={0.1}>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-16">
            {[
              { key: "name", label: "Name", type: "text" },
              { key: "email", label: "Email", type: "email" },
            ].map((f) => (
              <div key={f.key} className="mb-4">
                <label className="text-[13px] uppercase tracking-[0.05em] mb-2 block" style={{ color: "#555555" }}>
                  {f.label}
                </label>
                <input
                  type={f.type}
                  maxLength={f.key === "email" ? 255 : 100}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full px-4 py-3 text-sm text-[#f5f5f5] focus:outline-none transition-colors"
                  style={{ background: "#111111", border: "1px solid #222222" }}
                  placeholder={f.label}
                  required
                />
              </div>
            ))}
            <div className="mb-6">
              <label className="text-[13px] uppercase tracking-[0.05em] mb-2 block" style={{ color: "#555555" }}>
                Message
              </label>
              <textarea
                rows={4}
                maxLength={1000}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 text-sm text-[#f5f5f5] focus:outline-none resize-none transition-colors"
                style={{ background: "#111111", border: "1px solid #222222" }}
                placeholder="Your message..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="fab-btn w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {sending ? "Sending..." : "Get in touch →"}
            </button>
          </form>
        </AnimatedSection>

        {/* 3-column info */}
        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              {
                label: "Email",
                content: (
                  <a href="mailto:saktheeswar71.k@gmail.com" className="text-sm text-[#f5f5f5] hover:underline">
                    saktheeswar71.k@gmail.com
                  </a>
                ),
              },
              {
                label: "Based in",
                content: <span className="text-sm text-[#f5f5f5]">Chennai, Tamil Nadu, India</span>,
              },
              {
                label: "Social",
                content: (
                  <span className="text-sm text-[#f5f5f5]">
                    <a href="https://github.com/saktheeswar71" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                    <span className="mx-2" style={{ color: "#555555" }}>·</span>
                    <a href="https://www.linkedin.com/in/saktheeswar-k-a888b61a7/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                  </span>
                ),
              },
            ].map((item, i) => (
              <div
                key={item.label}
                className="py-6 px-0 md:px-6"
                style={{
                  borderTop: "1px solid #222222",
                  borderLeft: i > 0 ? "1px solid #222222" : "none",
                }}
              >
                <p className="text-[13px] uppercase tracking-[0.05em] mb-2" style={{ color: "#555555" }}>{item.label}</p>
                {item.content}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactSection;
