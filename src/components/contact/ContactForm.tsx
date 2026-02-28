import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } from "../../config/emailjs";
import { useMobile } from "../../hooks/useMobile";
import SuccessMessage from "./SuccessMessage";

interface ContactData {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  send: string;
  sending: string;
  successTitle: string;
  successMsg: string;
  errorMsg: string;
}

interface Props {
  c: ContactData;
  color: string;
  theme: string;
  visible: boolean;
}

export default function ContactForm({ c, color, theme, visible }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const isMobile = useMobile(860);

  // Initialize EmailJS on mount
  useEffect(() => {
    if (PUBLIC_KEY) {
      emailjs.init(PUBLIC_KEY);
      console.log("EmailJS initialized with public key");
    } else {
      console.warn("PUBLIC_KEY not found - EmailJS will not work");
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    try {
      console.log(
        "Sending form with SERVICE_ID:",
        SERVICE_ID,
        "TEMPLATE_ID:",
        TEMPLATE_ID,
      );
      const result = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
      );
      console.log("EmailJS response:", result);
      setStatus("success");
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    padding: "0.85rem 1.1rem",
    background: "var(--color-surface-elevated)",
    border: "1px solid",
    borderColor: focused === field ? color : "var(--color-border)",
    borderRadius: "2px",
    color: "var(--color-text)",
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: "0.85rem",
    outline: "none",
    transition: "border-color 0.25s ease, box-shadow 0.25s ease",
    boxSizing: "border-box",
    boxShadow: focused === field ? `0 0 0 3px ${color}18` : "none",
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: "0.64rem",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--color-text-muted)",
    marginBottom: "0.5rem",
  };

  const fieldStyle = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(14px)",
    transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
  });

  if (status === "success") {
    return (
      <SuccessMessage title={c.successTitle} msg={c.successMsg} color={color} />
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      {/* Name + Email row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.25rem",
          marginBottom: "1.25rem",
        }}
      >
        <div style={fieldStyle(80)}>
          <label htmlFor="cf-name" style={labelStyle}>
            {c.nameLabel}
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            placeholder={c.namePlaceholder}
            style={inputStyle("name")}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
          />
        </div>
        <div style={fieldStyle(140)}>
          <label htmlFor="cf-email" style={labelStyle}>
            {c.emailLabel}
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            placeholder={c.emailPlaceholder}
            style={inputStyle("email")}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
          />
        </div>
      </div>

      {/* Message */}
      <div style={{ ...fieldStyle(200), marginBottom: "1.75rem" }}>
        <label htmlFor="cf-message" style={labelStyle}>
          {c.messageLabel}
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={6}
          placeholder={c.messagePlaceholder}
          style={{
            ...inputStyle("message"),
            resize: "vertical",
            minHeight: "140px",
          }}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
        />
      </div>

      {/* Error */}
      {status === "error" && (
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "0.8rem",
            color: "#e05c5c",
            marginBottom: "1rem",
          }}
        >
          {c.errorMsg}
        </p>
      )}

      {/* Submit */}
      <div style={fieldStyle(260)}>
        <button
          type="submit"
          disabled={status === "sending"}
          style={{
            padding: "0.85rem 2.5rem",
            width: isMobile ? "100%" : "auto",
            backgroundColor: "invisible",
            color: theme === "dark" ? "var(--color-accent)" : "var(--color-accent)" ,
            border: theme === "dark" ? "1px solid var(--color-accent-warm)" : "1px solid var(--color-accent)",
            borderRadius: "2px",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: status === "sending" ? "wait" : "pointer",
            opacity: status === "sending" ? 0.7 : 1,
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (status !== "sending") {
              (e.currentTarget as HTMLButtonElement).style.background =
                theme === "dark"
                  ? "var(--color-surface-elevated)"
                  : "var(--color-surface-elevated)";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0px) scale(1.01)";
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.transform = "none";
          }}
        >
          {status === "sending" ? c.sending : c.send}
        </button>
      </div>
    </form>
  );
}
