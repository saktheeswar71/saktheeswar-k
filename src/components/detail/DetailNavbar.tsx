import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface DetailNavbarProps {
  backLabel: string;
  backTo: string;
}

const DetailNavbar = ({ backLabel, backTo }: DetailNavbarProps) => {
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm"
      style={{ borderBottom: "1px solid hsl(100 12% 81%)" }}
    >
      <div className="container mx-auto max-w-[1200px] flex items-center justify-between py-4 px-4 md:px-8">
        <button
          onClick={() => navigate(backTo)}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate hover:text-steel transition-colors"
        >
          <ArrowLeft size={18} />
          {backLabel}
        </button>
        <a href="/" className="text-lg font-bold text-slate">
          Saktheeswar K
        </a>
      </div>
    </motion.nav>
  );
};

export default DetailNavbar;
