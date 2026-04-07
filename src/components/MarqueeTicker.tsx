const items = [
  "Data Analytics", "Machine Learning", "Deep Learning", "Python",
  "Computer Vision", "Research Publication", "YOLO", "LSTM",
  "Power BI", "SQL", "Scikit-learn",
];

const content = items.map((item, i) => (
  <span key={i} className="flex items-center gap-4">
    <span>{item}</span>
    <span style={{ color: "#e8343a" }}>·</span>
  </span>
));

const MarqueeTicker = () => (
  <div
    className="overflow-hidden whitespace-nowrap"
    style={{
      borderTop: "1px solid #222222",
      borderBottom: "1px solid #222222",
      background: "#0a0a0a",
      height: 48,
    }}
  >
    <div className="animate-marquee inline-flex items-center h-full gap-4 font-mono-dm text-[12px] uppercase tracking-[0.08em]" style={{ color: "#555555" }}>
      {content}{content}{content}
    </div>
  </div>
);

export default MarqueeTicker;
