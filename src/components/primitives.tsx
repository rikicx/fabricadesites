import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { marca, linkWhatsApp, type OrigemWhatsApp } from '../data/site'
import { useReveal, type Theme } from '../hooks'

/* ==========================================================================
 *  LOGO
 *  ⚠ PLACEHOLDER — quadrado verde no lugar do monograma FS.
 *  Quando a identidade estiver pronta, troque só o conteúdo de .logo__mark.
 * ======================================================================== */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="logo" aria-label={marca.nome}>
      <img
        className="logo__mark"
        src="/logo-green.svg"
        alt=""
        width="42"
        height="34"
        draggable={false}
        aria-hidden="true"
      />
      {!compact && <span className="logo__word">{marca.nome}</span>}
    </span>
  )
}

/* ==========================================================================
 *  REVEAL — envelope de entrada por scroll
 * ======================================================================== */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: ReactNode
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'p'
  className?: string
}) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ ['--reveal-delay' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

/* ==========================================================================
 *  BOTÃO
 *  Hover: o rótulo desliza para cima e uma cópia entra por baixo; a seta
 *  acompanha o movimento. Tudo em transform/opacity.
 * ======================================================================== */
type Variante = 'solido' | 'contorno' | 'fantasma'

function Rotulo({ children }: { children: ReactNode }) {
  return (
    <span className="btn__labels" aria-hidden="false">
      <span className="btn__label">{children}</span>
      <span className="btn__label btn__label--ghost" aria-hidden="true">
        {children}
      </span>
    </span>
  )
}

function Seta() {
  return (
    <span className="btn__arrow" aria-hidden="true">
      <span className="btn__arrow-glyph">↗</span>
      <span className="btn__arrow-glyph btn__arrow-glyph--ghost">↗</span>
    </span>
  )
}

export function LinkButton({
  href,
  children,
  variante = 'solido',
  seta = true,
  className = '',
}: {
  href: string
  children: ReactNode
  variante?: Variante
  seta?: boolean
  className?: string
}) {
  return (
    <a href={href} className={`btn btn--${variante} ${className}`.trim()}>
      <Rotulo>{children}</Rotulo>
      {seta && <Seta />}
    </a>
  )
}

export function RouteButton({
  to,
  children,
  variante = 'solido',
  seta = true,
  className = '',
}: {
  to: string
  children: ReactNode
  variante?: Variante
  seta?: boolean
  className?: string
}) {
  return (
    <Link to={to} className={`btn btn--${variante} ${className}`.trim()}>
      <Rotulo>{children}</Rotulo>
      {seta && <Seta />}
    </Link>
  )
}

/* --------------------------------------------------------------------------
 *  CTA DE WHATSAPP
 *  Enquanto o número não estiver configurado em src/data/site.ts, o botão
 *  aparece desabilitado com aviso — de propósito, para não publicar link morto.
 * ----------------------------------------------------------------------- */
export function WhatsAppButton({
  origem,
  children,
  variante = 'solido',
  seta = true,
  className = '',
}: {
  origem: OrigemWhatsApp
  children: ReactNode
  variante?: Variante
  seta?: boolean
  className?: string
}) {
  const href = linkWhatsApp(origem)

  if (!href) {
    return (
      <span className={`btn btn--${variante} btn--pendente ${className}`.trim()}>
        <Rotulo>{children}</Rotulo>
        <span className="btn__pending" title="Número de WhatsApp ainda não configurado">
          WhatsApp pendente
        </span>
      </span>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn--${variante} ${className}`.trim()}
    >
      <Rotulo>{children}</Rotulo>
      {seta && <Seta />}
    </a>
  )
}

/* ==========================================================================
 *  ALTERNADOR DE TEMA
 * ======================================================================== */
export function ThemeToggle({
  theme,
  onToggle,
  className = '',
}: {
  theme: Theme
  onToggle: () => void
  className?: string
}) {
  const proximo = theme === 'dark' ? 'claro' : 'escuro'
  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={onToggle}
      aria-label={`Mudar para o tema ${proximo}`}
      title={`Mudar para o tema ${proximo}`}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__knob" />
      </span>
      <span className="theme-toggle__text" aria-hidden="true">
        {theme === 'dark' ? 'Escuro' : 'Claro'}
      </span>
    </button>
  )
}
