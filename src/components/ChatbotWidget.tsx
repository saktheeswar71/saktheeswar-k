import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, GripVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "bot";
  text: string;
}

const portfolioData = {
  name: "Saktheeswar K",
  title: "Data Analyst & AI Graduate",
  location: "Chennai, Tamil Nadu, India",
  email: "saktheeswar71.k@gmail.com",
  phone: "+91 8939703436",
  education: "B.Tech in Artificial Intelligence & Data Science from St. Joseph's Institute of Technology, Chennai (2021–2025). CGPA: 6.53.",
  about: "Fresh B.Tech graduate specializing in data analysis, time-series forecasting, computer vision, and deep learning. Has built ML pipelines, published research, and processed over a million data records.",
  skills: {
    technologies: ["Data Science", "Data Analytics"],
    languages: ["Python", "SQL", "Java"],
    frameworks: ["Scikit-learn", "NumPy", "Pandas", "Matplotlib", "Seaborn", "ARIMA", "LSTM", "YOLOv7", "YOLOv8", "YOLOv9", "TabNet", "XGBoost"],
    tools: ["VSCode", "PyCharm", "Power BI", "MySQL", "Git", "Jupyter", "HTML", "CSS"],
    soft: ["Leadership", "Team Management", "Creativity"],
  },
  projects: [
    {
      title: "Netflix Subscriptions Forecasting",
      date: "Feb 2024",
      desc: "Built ARIMA and LSTM models on Netflix subscription data, achieving 10–15% better forecast accuracy and a reusable pipeline that automates 30–40% of manual effort. Processed 1M+ records.",
      tech: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "ARIMA", "LSTM", "Git"],
    },
    {
      title: "Wildlife Animal Classification",
      date: "Mar 2024",
      desc: "Used YOLOv7, v8, and v9 for camera trap photo classification. Achieved 88% accuracy on 2096 images over 150 epochs with 25% better robustness.",
      tech: ["Python", "YOLOv7", "YOLOv8", "YOLOv9", "NumPy", "Pandas", "Git"],
    },
  ],
  experience: {
    role: "Data Analyst Intern at Unified Mentor Pvt. Ltd., Chennai (Jan–Mar 2024). Analyzed 5+ years of Netflix data using ARIMA & LSTM, improved forecast reliability by 18%, processed 1M+ records, deployed end-to-end ML pipelines cutting manual effort by 40%.",
  },
  publication: "Liver Disease Prediction using Deep Learning: TabNet vs XGBoost — published at ICASET-2025. Achieved 5–8% higher accuracy than XGBoost using TabNet on the ILPD dataset (583 records).",
  certifications: ["HTML & CSS — PrepInsta", "Cloud Computing — NPTEL", "Cambridge English B1 Preliminary — Cambridge Assessment English"],
};

function getResponse(query: string): string {
  const q = query.toLowerCase().trim();

  if (/^(hi|hello|hey|hola|greetings)/.test(q)) {
    return `Hey there! 👋 I'm Saktheeswar's portfolio bot. Ask me about his skills, projects, experience, or education!`;
  }
  if (/who (are you|is this|is saktheeswar|is he)|about|tell me about|introduce/.test(q)) {
    return portfolioData.about;
  }
  if (/skill|tech|what (can|does) (he|you) (do|know)|stack|language|framework|tool/.test(q)) {
    return `**Skills:** ${portfolioData.skills.languages.join(", ")} | **Frameworks:** ${portfolioData.skills.frameworks.slice(0, 6).join(", ")} & more | **Tools:** ${portfolioData.skills.tools.slice(0, 4).join(", ")} & more.`;
  }
  if (/project|built|portfolio work|netflix|wildlife|animal|yolo|arima|lstm|forecast/.test(q)) {
    if (/netflix|forecast|arima|lstm|subscription/.test(q)) return portfolioData.projects[0].desc;
    if (/wildlife|animal|yolo|classification/.test(q)) return portfolioData.projects[1].desc;
    return `He's built 2 key projects: **Netflix Subscriptions Forecasting** (ARIMA/LSTM, 1M+ records) and **Wildlife Animal Classification** (YOLOv7-v9, 88% accuracy).`;
  }
  if (/experience|work|intern|job|company|unified mentor/.test(q)) {
    return portfolioData.experience.role;
  }
  if (/education|college|university|degree|b\.?tech|cgpa|gpa|study|studied/.test(q)) {
    return portfolioData.education;
  }
  if (/publication|research|paper|tabnet|xgboost|liver|icaset/.test(q)) {
    return portfolioData.publication;
  }
  if (/certif|certificate|course/.test(q)) {
    return `He holds: ${portfolioData.certifications.join(" | ")}.`;
  }
  if (/contact|email|phone|reach|hire|connect|linkedin|github/.test(q)) {
    return `📧 ${portfolioData.email} | 📞 ${portfolioData.phone} | 📍 ${portfolioData.location}. Also on LinkedIn and GitHub!`;
  }
  if (/location|where|city|country|live/.test(q)) {
    return `He's based in ${portfolioData.location}.`;
  }
  if (/python|sql|java|power bi|mysql|jupyter/.test(q)) {
    return `Yes! ${q.includes("python") ? "Python is his primary language" : "That's part of his toolkit"}. He uses it across data analysis, ML, and deep learning projects.`;
  }

  return "I'm here to answer questions only about this portfolio and the developer behind it. Try asking about his skills, projects, or experience! 😊";
}

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hey! 👋 I'm Saktheeswar's portfolio assistant. Ask me anything about his skills, projects, or experience!" },
  ]);
  const [input, setInput] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: Message = { role: "user", text: trimmed };
    const botMsg: Message = { role: "bot", text: getResponse(trimmed) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY, startPosX: position.x, startPosY: position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !dragRef.current) return;
    setPosition({
      x: dragRef.current.startPosX + (e.clientX - dragRef.current.startX),
      y: dragRef.current.startPosY + (e.clientY - dragRef.current.startY),
    });
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    const onUp = () => setDragging(false);
    window.addEventListener("mouseup", onUp);
    return () => window.removeEventListener("mouseup", onUp);
  }, []);

  return (
    <div
      className="fixed z-50"
      style={{ bottom: `${24 - position.y}px`, right: `${24 - position.x}px` }}
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mb-3 w-[340px] sm:w-[380px] rounded-2xl overflow-hidden backdrop-blur-xl"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              boxShadow: "0 20px 60px -10px rgba(0,0,0,0.6), 0 0 40px -10px hsl(var(--orange) / 0.25)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 cursor-grab active:cursor-grabbing select-none"
              style={{
                background: "hsl(var(--dark-lighter))",
                borderBottom: "1px solid hsl(var(--border))",
              }}
              onMouseDown={handleMouseDown}
            >
              <div className="flex items-center gap-2">
                <GripVertical size={14} className="text-muted-foreground" />
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-foreground font-semibold text-sm">Portfolio Assistant</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="h-[320px] overflow-y-auto p-3 space-y-2"
              style={{ scrollbarWidth: "thin", background: "hsl(var(--background))" }}
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed"
                    style={
                      msg.role === "user"
                        ? {
                            background: "hsl(var(--orange-light))",
                            color: "hsl(var(--btn-text))",
                          }
                        : {
                            background: "hsl(var(--dark-lighter))",
                            color: "hsl(var(--text-primary))",
                            border: "1px solid hsl(var(--border))",
                          }
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="p-3"
              style={{
                background: "hsl(var(--card))",
                borderTop: "1px solid hsl(var(--border))",
              }}
            >
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about skills, projects..."
                  className="flex-1 px-3 py-2 rounded-xl text-sm focus:outline-none transition-colors focus:border-primary"
                  style={{
                    background: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    color: "hsl(var(--text-primary))",
                  }}
                  maxLength={200}
                />
                <button
                  onClick={handleSend}
                  className="p-2 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "hsl(var(--orange-light))",
                    color: "hsl(var(--btn-text))",
                    boxShadow: "0 4px 12px -2px hsl(var(--orange) / 0.4)",
                  }}
                  aria-label="Send"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      {!open && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-shadow"
          style={{
            background: "hsl(var(--orange))",
            color: "hsl(var(--btn-text))",
            boxShadow: "0 8px 24px -4px hsl(var(--orange) / 0.5), 0 0 0 4px hsl(var(--orange) / 0.15)",
          }}
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </motion.button>
      )}
    </div>
  );
};

export default ChatbotWidget;
