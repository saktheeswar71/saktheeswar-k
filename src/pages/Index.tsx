import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeTicker from "@/components/MarqueeTicker";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import PublicationSection from "@/components/PublicationSection";
import ExperienceSection from "@/components/ExperienceSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";

const Index = () => (
  <div className="min-h-screen page-enter" style={{ background: "#0a0a0a" }}>
    <Navbar />
    <HeroSection />
    <MarqueeTicker />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <PublicationSection />
    <ExperienceSection />
    <CertificationsSection />
    <ContactSection />
    <Footer />
    <ChatbotWidget />
  </div>
);

export default Index;
