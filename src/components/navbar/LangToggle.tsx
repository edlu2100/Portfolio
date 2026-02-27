import { useLanguage, type Language } from '../../context/LanguageContext'

export default function LangToggle() {
  const { language, setLanguage } = useLanguage()
  const next = language === 'sv' ? 'en' : 'sv'
  return (
    <button
      onClick={() => setLanguage(next as Language)}
      aria-label="Byt språk"
      title={language === 'sv' ? 'Switch to English' : 'Byt till svenska'}
      style={{
        cursor: 'pointer',
        border: 'none',
        background: 'none',
        padding: 0,
        fontSize: '1.25rem',
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "2px"
      }}
    >
      {language === 'sv' ? '🇬🇧' : '🇸🇪'}
    </button>
  )
}
