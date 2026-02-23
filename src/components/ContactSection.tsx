import { useState } from "react";
import { Mail, Linkedin, Github, Send, Phone, MapPin } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { toast } from "sonner";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Get in <span className="text-gradient">Touch</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection delay={0.1}>
            <div className="glass rounded-xl p-8 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-4">Let's connect</h3>
                <p className="text-muted-foreground text-sm mb-8">
                  Open to opportunities in Data Analytics, Machine Learning, and AI.
                  Feel free to reach out!
                </p>
              </div>
              <div className="space-y-4">
                <a href="mailto:saktheeswar71.k@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail size={18} /> saktheeswar71.k@gmail.com
                </a>
                <a href="tel:+918939703436" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Phone size={18} /> +91 8939703436
                </a>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin size={18} /> Chennai, Tamil Nadu, India
                </div>
                <div className="flex gap-4 mt-6">
                  <a
                    href="https://www.linkedin.com/in/saktheeswar-k-a888b61a7/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://github.com/saktheeswar71"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} className="glass rounded-xl p-8 space-y-5">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Name</label>
                <input
                  type="text"
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <input
                  type="email"
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Message</label>
                <textarea
                  rows={4}
                  maxLength={1000}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
              >
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
