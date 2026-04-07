import { useState, useEffect } from "react";

interface TOCItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
  variant?: "desktop" | "mobile";
}

const TableOfContents = ({ items, variant = "desktop" }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState(items[0]?.id || "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0.1 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (variant === "mobile") {
    return (
      <div className="lg:hidden sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-sage overflow-x-auto">
        <div className="flex gap-1 px-4 py-2 min-w-max">
          {items.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-xs whitespace-nowrap py-1.5 px-3 rounded-full transition-all duration-300 ${
                activeId === id
                  ? "bg-steel text-white font-medium"
                  : "text-slate/60 hover:bg-sage/30"
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <aside className="hidden lg:block sticky top-24 self-start w-56 shrink-0">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-steel mb-4">
        On this page
      </p>
      <nav className="flex flex-col gap-1">
        {items.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`text-sm py-1.5 px-3 rounded-lg transition-all duration-300 ${
              activeId === id
                ? "bg-steel/10 text-steel font-medium"
                : "text-slate/60 hover:text-slate hover:bg-sage/30"
            }`}
          >
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default TableOfContents;
