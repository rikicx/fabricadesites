import { linkWhatsApp } from '../data/site'

function IconeWhatsApp() {
  return (
    <img
      src="/whatsapp-icon.png"
      alt=""
      width={31}
      height={31}
      className="wa-fab__icon"
    />
  )
}

export function WhatsAppFab() {
  const href = linkWhatsApp('flutuante')

  if (!href) {
    return (
      <button
        type="button"
        className="wa-fab is-visible is-disabled"
        disabled
        aria-label="WhatsApp: número ainda não definido"
        title="Número do WhatsApp ainda não definido"
      >
        <IconeWhatsApp />
      </button>
    )
  }

  return (
    <a
      className="wa-fab is-visible"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp"
    >
      <IconeWhatsApp />
    </a>
  )
}
