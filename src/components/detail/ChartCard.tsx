import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ChartItem {
  src: string;
  title: string;
  caption: string;
  fullWidth?: boolean;
}

interface ChartCardProps {
  chart: ChartItem;
  index: number;
  allCharts: ChartItem[];
}

const ChartCard = ({ chart, index, allCharts }: ChartCardProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(index);
  const current = allCharts[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setCurrentIndex((i) => Math.min(i + 1, allCharts.length - 1));
      if (e.key === "ArrowLeft") setCurrentIndex((i) => Math.max(i - 1, 0));
    },
    [lightboxOpen, allCharts.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <div
        onClick={() => { setCurrentIndex(index); setLightboxOpen(true); }}
        className={`group cursor-pointer p-4 transition-all duration-300 hover:bg-[#1e1e1e] ${chart.fullWidth ? "col-span-1 sm:col-span-2" : "col-span-1"}`}
        style={{ background: "#111111", border: "1px solid #222222" }}
      >
        <img src={chart.src} alt={chart.title} className="w-full object-contain" loading="lazy" />
        <p className="text-sm font-medium mt-3 text-[#f5f5f5]">{chart.title}</p>
        <p className="text-xs italic mt-1.5" style={{ color: "#555555" }}>{chart.caption}</p>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={() => setLightboxOpen(false)}
          >
            <button onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }} className="absolute top-4 right-4 p-2 text-[#888888] hover:text-[#f5f5f5]" aria-label="Close"><X size={24} /></button>
            {currentIndex > 0 && <button onClick={(e) => { e.stopPropagation(); setCurrentIndex((i) => i - 1); }} className="absolute left-4 p-2 text-[#888888] hover:text-[#f5f5f5]" aria-label="Previous"><ChevronLeft size={24} /></button>}
            {currentIndex < allCharts.length - 1 && <button onClick={(e) => { e.stopPropagation(); setCurrentIndex((i) => i + 1); }} className="absolute right-4 p-2 text-[#888888] hover:text-[#f5f5f5]" aria-label="Next"><ChevronRight size={24} /></button>}
            <div className="flex flex-col items-center max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <img src={current.src} alt={current.title} className="max-w-full max-h-[80vh] object-contain" />
              <p className="text-[#f5f5f5] text-sm font-medium mt-3">{current.title}</p>
              <p className="text-[#555555] text-xs italic mt-1">{current.caption}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChartCard;
