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
      <div
        className="lg:hidden sticky top-16 z-40 backdrop-blur-md overflow-x-auto"
        style={{
          background: "hsl(var(--background) / 0.9)",
          borderBottom: "1px solid hsl(var(--border))",
        }}
      >
        <div className="flex gap-1 px-4 py-2 min-w-max">
          {items.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-xs whitespace-nowrap py-1.5 px-3 rounded-full transition-all duration-300 ${
                activeId === id
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-4">
        On this page
      </p>
      <nav className="flex flex-col gap-1">
        {items.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`text-sm py-1.5 px-3 rounded-lg transition-all duration-300 ${
              activeId === id
                ? "bg-primary/15 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
