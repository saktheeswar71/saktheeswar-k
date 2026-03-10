import { useMemo } from "react";

const ParticleField = ({ count = 30 }: { count?: number }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${Math.random() * 6 + 6}s`,
        isPurple: Math.random() > 0.5,
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
            background: p.isPurple ? "rgba(124, 58, 237, 0.3)" : "rgba(6, 182, 212, 0.2)",
            animation: `float ${p.duration} ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleField;
