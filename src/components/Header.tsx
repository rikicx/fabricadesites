import { useEffect, useState } from 'react'
import { navegacao } from '../data/site'
import { useScrolledPast } from '../hooks'
import { Link } from 'react-router-dom'
import { Logo, RouteButton } from './primitives'
import { NavLink } from './navigation'

export function Header() {
  const [aberto, setAberto] = useState(false)
  const rolou = useScrolledPast(64)

  /* Trava o scroll do corpo com o menu aberto e fecha no Esc. */
  useEffect(() => {
    if (!aberto) return
    const anterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = anterior
      window.removeEventListener('keydown', onKey)
    }
  }, [aberto])

  return (
    <header className={`header ${rolou ? 'is-scrolled' : ''} ${aberto ? 'is-open' : ''}`}>
      <div className="header__inner shell">
        <Link to="/" className="header__logo" onClick={() => setAberto(false)}>
          <Logo />
        </Link>

        <nav className="header__nav" aria-label="Navegação principal">
          {navegacao.map((item) => (
            <NavLink key={item.href} href={item.href} className="header__link">
              <span className="header__link-text">{item.rotulo}</span>
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <RouteButton to="/checkout" variante="solido" className="btn--sm header__cta">
            Contratar online
          </RouteButton>
          <button
            type="button"
            className="burger"
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setAberto((v) => !v)}
          >
            <span className="burger__bar" />
            <span className="burger__bar" />
          </button>
        </div>
      </div>

      <div id="menu-mobile" className="mobile-menu" hidden={!aberto}>
        <nav className="mobile-menu__nav" aria-label="Navegação mobile">
          {navegacao.map((item, i) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="mobile-menu__link"
              onClick={() => setAberto(false)}
            >
              <span className="mobile-menu__index" style={{ ['--i' as string]: i }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.rotulo}
            </NavLink>
          ))}
        </nav>
        <div className="mobile-menu__foot">
          <RouteButton to="/checkout" variante="solido">
            Contratar online
          </RouteButton>
        </div>
      </div>
    </header>
  )
}
