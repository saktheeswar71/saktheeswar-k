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
        onClick={() => {
          setCurrentIndex(index);
          setLightboxOpen(true);
        }}
        className={`group cursor-pointer bg-white rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 ${
          chart.fullWidth ? "col-span-1 sm:col-span-2" : "col-span-1"
        }`}
        style={{
          boxShadow: "0 4px 20px rgba(101, 113, 102, 0.1)",
        }}
      >
        <img
          src={chart.src}
          alt={chart.title}
          className="w-full rounded-xl object-contain"
          loading="lazy"
        />
        <p className="text-sm font-bold mt-3" style={{ color: "#657166" }}>
          {chart.title}
        </p>
        <p className="text-xs italic mt-1.5" style={{ color: "#94A3B8" }}>
          {chart.caption}
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.85)" }}
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {currentIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((i) => i - 1);
                }}
                className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {currentIndex < allCharts.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((i) => i + 1);
                }}
                className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>
            )}

            <div
              className="flex flex-col items-center max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={current.src}
                alt={current.title}
                className="max-w-full max-h-[80vh] object-contain rounded-xl"
              />
              <p className="text-white text-sm font-medium mt-3">{current.title}</p>
              <p className="text-white/60 text-xs italic mt-1">{current.caption}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChartCard;
