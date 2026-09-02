import { useEffect, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Reveal } from './primitives'

export function NavLink({
  href,
  children,
  className = '',
  onClick,
}: {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  const { pathname } = useLocation()
  const [rota, hash] = href.split('#')
  const rotaAlvo = rota || '/'
  const ehAncora = Boolean(hash)
  const mesmaPagina = rotaAlvo === pathname

  if (ehAncora && mesmaPagina) {
    return (
      <a href={`#${hash}`} className={className} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <Link
      to={ehAncora ? { pathname: rotaAlvo, hash: `#${hash}` } : rotaAlvo}
      className={className}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const alvo = document.querySelector(hash)
          alvo?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }),
      )
      return () => cancelAnimationFrame(id)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}

export function PageHero({
  eyebrow,
  titulo,
  lead,
  children,
}: {
  eyebrow: string
  titulo: string
  lead?: string
  children?: ReactNode
}) {
  return (
    <header className="page-hero">
      <div className="shell">
        <Reveal className="page-hero__inner">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="page-hero__titulo">{titulo}</h1>
          {lead && <p className="lead page-hero__lead">{lead}</p>}
          {children && <div className="page-hero__extra">{children}</div>}
        </Reveal>
      </div>
    </header>
  )
}
