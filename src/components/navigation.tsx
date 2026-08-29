import { useEffect, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Reveal } from './primitives'

/* ==========================================================================
 *  LINK DE NAVEGAÇÃO
 *  Resolve os três casos que o site tem:
 *    /servicos          → rota, usa Link do router
 *    /#como-funciona    → âncora numa seção que só existe na home
 *    #algo              → âncora na página atual
 *  Quando o usuário está em /contato e clica em "Como funciona", precisa
 *  navegar para / e SÓ ENTÃO rolar até a seção — quem cuida disso é o
 *  ScrollManager abaixo, lendo o hash depois da troca de rota.
 * ======================================================================== */
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

  // Âncora na página em que já estamos: deixa o browser rolar sozinho.
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

/* ==========================================================================
 *  SCROLL MANAGER
 *  Sem isso, trocar de rota mantém a posição de scroll da página anterior —
 *  o usuário entra em /contato já no meio da página.
 *  Com hash, espera o layout pintar e rola até o alvo.
 * ======================================================================== */
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // rAF duplo: garante que a rota nova já montou antes de procurar o alvo.
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

/* ==========================================================================
 *  CABEÇALHO DE PÁGINA INTERNA
 *  Versão contida do hero: mesma tipografia, sem viewport inteira, sem
 *  palavra dinâmica e sem elemento gráfico — as internas não competem com
 *  a home.
 * ======================================================================== */
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
