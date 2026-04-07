import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
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
    { title: "Netflix Subscriptions Forecasting", date: "Feb 2024", desc: "Built ARIMA and LSTM models on Netflix subscription data, achieving 10–15% better forecast accuracy and a reusable pipeline that automates 30–40% of manual effort. Processed 1M+ records.", tech: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "ARIMA", "LSTM", "Git"] },
    { title: "Wildlife Animal Classification", date: "Mar 2024", desc: "Used YOLOv7, v8, and v9 for camera trap photo classification. Achieved 88% accuracy on 2096 images over 150 epochs with 25% better robustness.", tech: ["Python", "YOLOv7", "YOLOv8", "YOLOv9", "NumPy", "Pandas", "Git"] },
  ],
  experience: { role: "Data Analyst Intern at Unified Mentor Pvt. Ltd., Chennai (Jan–Mar 2024). Analyzed 5+ years of Netflix data using ARIMA & LSTM, improved forecast reliability by 18%, processed 1M+ records, deployed end-to-end ML pipelines cutting manual effort by 40%." },
  publication: "Liver Disease Prediction using Deep Learning: TabNet vs XGBoost — published at ICASET-2025. Achieved 5–8% higher accuracy than XGBoost using TabNet on the ILPD dataset (583 records).",
  certifications: ["HTML & CSS — PrepInsta", "Cloud Computing — NPTEL", "Cambridge English B1 Preliminary — Cambridge Assessment English"],
};

function getResponse(query: string): string {
  const q = query.toLowerCase().trim();
  if (/^(hi|hello|hey|hola|greetings)/.test(q)) return `Hey there! 👋 I'm Saktheeswar's portfolio bot. Ask me about his skills, projects, experience, or education!`;
  if (/who (are you|is this|is saktheeswar|is he)|about|tell me about|introduce/.test(q)) return portfolioData.about;
  if (/skill|tech|what (can|does) (he|you) (do|know)|stack|language|framework|tool/.test(q)) return `**Skills:** ${portfolioData.skills.languages.join(", ")} | **Frameworks:** ${portfolioData.skills.frameworks.slice(0, 6).join(", ")} & more | **Tools:** ${portfolioData.skills.tools.slice(0, 4).join(", ")} & more.`;
  if (/project|built|portfolio work|netflix|wildlife|animal|yolo|arima|lstm|forecast/.test(q)) {
    if (/netflix|forecast|arima|lstm|subscription/.test(q)) return portfolioData.projects[0].desc;
    if (/wildlife|animal|yolo|classification/.test(q)) return portfolioData.projects[1].desc;
    return `He's built 2 key projects: **Netflix Subscriptions Forecasting** (ARIMA/LSTM, 1M+ records) and **Wildlife Animal Classification** (YOLOv7-v9, 88% accuracy).`;
  }
  if (/experience|work|intern|job|company|unified mentor/.test(q)) return portfolioData.experience.role;
  if (/education|college|university|degree|b\.?tech|cgpa|gpa|study|studied/.test(q)) return portfolioData.education;
  if (/publication|research|paper|tabnet|xgboost|liver|icaset/.test(q)) return portfolioData.publication;
  if (/certif|certificate|course/.test(q)) return `He holds: ${portfolioData.certifications.join(" | ")}.`;
  if (/contact|email|phone|reach|hire|connect|linkedin|github/.test(q)) return `📧 ${portfolioData.email} | 📞 ${portfolioData.phone} | 📍 ${portfolioData.location}. Also on LinkedIn and GitHub!`;
  if (/location|where|city|country|live/.test(q)) return `He's based in ${portfolioData.location}.`;
  if (/python|sql|java|power bi|mysql|jupyter/.test(q)) return `Yes! ${q.includes("python") ? "Python is his primary language" : "That's part of his toolkit"}. He uses it across data analysis, ML, and deep learning projects.`;
  return "I'm here to answer questions only about this portfolio and the developer behind it. Try asking about his skills, projects, or experience! 😊";
}

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hey! 👋 I'm Saktheeswar's portfolio assistant. Ask me anything about his skills, projects, or experience!" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: "user", text: trimmed }, { role: "bot", text: getResponse(trimmed) }]);
    setInput("");
  };

  return (
    <div className="fixed z-50" style={{ bottom: 24, right: 24 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-3 w-[340px] sm:w-[380px] overflow-hidden"
            style={{ background: "#111111", border: "1px solid #222222" }}
          >
            <div className="flex items-center justify-between px-4 py-3" style={{ background: "#161616", borderBottom: "1px solid #222222" }}>
              <span className="text-sm font-medium text-[#f5f5f5]">Portfolio Assistant</span>
              <button onClick={() => setOpen(false)} className="text-[#888888] hover:text-[#f5f5f5] transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="h-[300px] overflow-y-auto p-3 space-y-2" style={{ scrollbarWidth: "thin" }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[80%] px-3 py-2 text-sm leading-relaxed"
                    style={{
                      background: msg.role === "user" ? "#222222" : "#161616",
                      color: msg.role === "user" ? "#f5f5f5" : "#888888",
                      border: "1px solid #222222",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-3" style={{ borderTop: "1px solid #222222" }}>
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about skills, projects..."
                  className="flex-1 px-3 py-2 text-sm focus:outline-none"
                  style={{ background: "#0a0a0a", border: "1px solid #222222", color: "#f5f5f5" }}
                  maxLength={200}
                />
                <button onClick={handleSend} className="p-2 transition-colors" style={{ background: "#222222", color: "#f5f5f5" }}>
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!open && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="w-14 h-14 flex items-center justify-center text-[#f5f5f5]"
          style={{ background: "#161616", border: "1px solid #222222" }}
        >
          <MessageCircle size={24} />
        </motion.button>
      )}
    </div>
  );
};

export default ChatbotWidget;
