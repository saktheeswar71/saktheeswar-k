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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: "#0a0a0a", borderBottom: "1px solid #222222", height: 64 }}
    >
      <div className="fab-container flex items-center justify-between h-full px-5 md:px-10">
        <button
          onClick={() => navigate(backTo)}
          className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[#f5f5f5]"
          style={{ color: "#888888" }}
        >
          <ArrowLeft size={18} />
          {backLabel}
        </button>
        <a href="/" className="font-display italic text-[22px] text-[#f5f5f5]">SK</a>
      </div>
    </motion.nav>
  );
};

export default DetailNavbar;
