import { useEffect, useState } from "react";
import { OWNER } from "@/data/placeholder";

const NAV_ITEMS = [
  { label: "Hello", href: "#hello" },
  { label: "Projects", href: "#work" },
  { label: "Thoughts", href: "#thoughts" },
  { label: "Contact", href: "#contact" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState("hello");

  useEffect(() => {
    const sections = ["hello", "work", "thoughts", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "instant" });
    }
  };

  return (
    <>
      {/* Desktop nav */}
      <nav className="sticky top-0 z-50 h-[60px] border-b-hairline border-border bg-background/95 backdrop-blur-sm hidden md:flex items-center justify-between px-12">
        <button
          className="flex items-center gap-2.5 group"
          onClick={() => scrollTo("#hello")}
          data-interactive
        >
          <span
            className="w-2 h-2 rounded-full bg-accent inline-block"
          />
          <span className="text-sm font-medium text-foreground">{OWNER.fullName}</span>
        </button>

        <div className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                data-interactive
                className={`px-4 py-1.5 text-sm rounded-btn transition-colors ${
                  isActive
                    ? "bg-foreground text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 h-14 border-t-hairline border-border bg-background/95 backdrop-blur-sm flex md:hidden items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const sectionId = item.href.replace("#", "");
          const isActive = activeSection === sectionId;
          const mobileLabel = item.href === "#work" ? "Work" : item.label;
          return (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={`text-xs font-medium px-3 py-1.5 rounded-btn transition-colors ${
                isActive
                  ? "bg-foreground text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {mobileLabel}
            </button>
          );
        })}
      </nav>

      <main className="min-h-screen px-6 md:px-12 pb-20 md:pb-12">
        {children}
      </main>
    </>
  );
}
