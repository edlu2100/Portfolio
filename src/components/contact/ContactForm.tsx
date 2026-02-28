import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } from '../../config/emailjs'
import SuccessMessage from './SuccessMessage'

interface ContactData {
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  messageLabel: string
  messagePlaceholder: string
  send: string
  sending: string
  successTitle: string
  successMsg: string
  errorMsg: string
}

interface Props {
  c: ContactData
  color: string
  theme: string
  visible: boolean
}

export default function ContactForm({ c, color, theme, visible }: Props) {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [focused, setFocused] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      setStatus('success')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    padding: '0.85rem 1.1rem',
    background: 'var(--color-surface-elevated)',
    border: '1px solid',
    borderColor: focused === field ? color : 'var(--color-border)',
    borderRadius: '2px',
    color: 'var(--color-text)',
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: '0.85rem',
    outline: 'none',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
    boxSizing: 'border-box',
    boxShadow: focused === field ? `0 0 0 3px ${color}18` : 'none',
  })

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: '0.64rem', fontWeight: 600, letterSpacing: '0.18em',
    textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.5rem',
  }

  const fieldStyle = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(14px)',
    transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
  })

  if (status === 'success') {
    return <SuccessMessage title={c.successTitle} msg={c.successMsg} color={color} />
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      {/* Name + Email row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.25rem', marginBottom: '1.25rem',
      }}>
        <div style={fieldStyle(80)}>
          <label htmlFor="cf-name" style={labelStyle}>{c.nameLabel}</label>
          <input
            id="cf-name" name="from_name" type="text" required
            placeholder={c.namePlaceholder}
            style={inputStyle('name')}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
          />
        </div>
        <div style={fieldStyle(140)}>
          <label htmlFor="cf-email" style={labelStyle}>{c.emailLabel}</label>
          <input
            id="cf-email" name="reply_to" type="email" required
            placeholder={c.emailPlaceholder}
            style={inputStyle('email')}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
          />
        </div>
      </div>

      {/* Message */}
      <div style={{ ...fieldStyle(200), marginBottom: '1.75rem' }}>
        <label htmlFor="cf-message" style={labelStyle}>{c.messageLabel}</label>
        <textarea
          id="cf-message" name="message" required rows={6}
          placeholder={c.messagePlaceholder}
          style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '140px' }}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused(null)}
        />
      </div>

      {/* Error */}
      {status === 'error' && (
        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '0.8rem', color: '#e05c5c', marginBottom: '1rem',
        }}>
          {c.errorMsg}
        </p>
      )}

      {/* Submit */}
      <div style={fieldStyle(260)}>
        <button
          type="submit"
          disabled={status === 'sending'}
          style={{
            padding: '0.85rem 2.5rem',
            background: color,
            color: theme === 'dark' ? '#0a0e1a' : '#fff',
            border: 'none', borderRadius: '2px',
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '0.75rem', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            cursor: status === 'sending' ? 'wait' : 'pointer',
            opacity: status === 'sending' ? 0.7 : 1,
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          {status === 'sending' ? c.sending : c.send}
        </button>
      </div>
    </form>
  )
}
