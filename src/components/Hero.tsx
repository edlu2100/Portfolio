import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useMobile } from "../hooks/useMobile";
import HeroActions from "./hero/HeroActions";
import HeroScrollIndicator from "./hero/HeroScrollIndicator";
import HeroMountains from "./hero/HeroMountains";

export default function Hero() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isMobile = useMobile();
  const h = t.hero;
  const accentColor =
    theme === "dark" ? "var(--color-accent-warm)" : "var(--color-primary)";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(id);
  }, []);

  const fade = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(1.75rem)",
    transition:
      "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
    transitionDelay: `${delay}ms`,
  });

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Bergstoppar — only on desktop */}
      {!isMobile && <HeroMountains mounted={mounted} />}

      {/* Bakgrundsglöd */}
      <div
        aria-hidden
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "600px",
            borderRadius: "50%",
            opacity: 0,
          }}
        />
        {/* Subtil horisontell linje mitt i */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, var(--color-border), transparent)",
          }}
        />
      </div>

      {/* Innehåll */}
      <div
        style={{
          width: "100%",
          maxWidth: "72rem",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          paddingTop: "8rem",
          paddingBottom: "6rem",
        }}
      >
        {/* Hälsning */}
        <p
          style={{
            ...fade(100),
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: accentColor,
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <svg
            width="28"
            height="14"
            viewBox="0 0 28 14"
            fill="none"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <polyline
              points="0,13  6,4  10,8  16,1  22,8  28,13"
              stroke={accentColor}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.75"
            />
          </svg>

          {/*<svg width="21.6" height="12.6" viewBox="0 0 24 14" fill="none" aria-hidden="true" style={{ flexShrink: 0, opacity: 0.85 }}>
            <path
              d="M1 10 C5 2, 11 2, 12 7 C13 12, 19 12, 23 4"
              stroke={accentColor}
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>*/}
          {h.greeting}
        </p>

        {/* Namn */}
        <h1
          style={{
            ...fade(250),
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(3.5rem, 9vw, 8rem)",
            fontWeight: 600,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: "var(--color-text)",
            marginBottom: "0.5rem",
          }}
        >
          {h.name}
          {/*<span style={{ color: 'var(--color-primary)' }}>.</span>*/}
        </h1>

        {/* Roll – kursiv serif */}
        <h2
          style={{
            ...fade(380),
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--color-accent)",
            marginBottom: "2.5rem",
            lineHeight: 1.2,
          }}
        >
          {h.role}
        </h2>

        {/* Beskrivning */}
        <p
          style={{
            ...fade(500),
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "1rem",
            fontWeight: 300,
            lineHeight: 1.75,
            color: "var(--color-text-muted)",
            maxWidth: "38rem",
            marginBottom: "3rem",
          }}
        >
          {h.description}
        </p>

        <HeroActions
          cta={h.cta}
          contact={h.contact}
          accentColor={accentColor}
          mounted={mounted}
        />

        {!isMobile && (
          <HeroScrollIndicator label={h.scroll} mounted={mounted} />
        )}
      </div>
    </section>
  );
}
