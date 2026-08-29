import { useEffect, useState, type CSSProperties } from 'react'

type ParticleStyle = CSSProperties & {
  '--start-x': string
  '--start-y': string
  '--end-x': string
  '--end-y': string
  '--delay': string
  '--duration': string
  '--size': string
  '--alpha': string
  '--blur': string
}

const aleatorio = (semente: number) => {
  const valor = Math.sin(semente * 12.9898) * 43758.5453
  return valor - Math.floor(valor)
}

const particulas: ParticleStyle[] = Array.from({ length: 260 }, (_, index) => {
  const angulo = aleatorio(index + 1) * Math.PI * 2
  const onda = index % 3

  // Faixa larga e irregular para não desenhar um círculo evidente.
  const raioInicial = 3 + aleatorio(index + 11) * 21
  const raioFinal = 25 + aleatorio(index + 21) * 40
  const distorcaoX = 0.72 + aleatorio(index + 31) * 0.56
  const distorcaoY = 0.72 + aleatorio(index + 41) * 0.56

  return {
    '--start-x': `${Math.cos(angulo) * raioInicial * distorcaoX}vmin`,
    '--start-y': `${Math.sin(angulo) * raioInicial * distorcaoY}vmin`,
    '--end-x': `${Math.cos(angulo) * raioFinal * distorcaoX}vmax`,
    '--end-y': `${Math.sin(angulo) * raioFinal * distorcaoY}vmax`,
    '--delay': `${100 + onda * 560 + aleatorio(index + 51) * 420}ms`,
    '--duration': `${1250 + aleatorio(index + 61) * 850}ms`,
    '--size': `${0.8 + aleatorio(index + 71) * 2.6}px`,
    '--alpha': `${0.2 + aleatorio(index + 81) * 0.72}`,
    '--blur': `${aleatorio(index + 91) * 0.55}px`,
  }
})

export function Loader() {
  const [saindo, setSaindo] = useState(false)
  const [visivel, setVisivel] = useState(() => typeof window !== 'undefined')

  useEffect(() => {
    const movimentoReduzido = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const overflowAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const liberarScroll = () => {
      document.body.style.overflow = overflowAnterior
    }

    const timerSaida = window.setTimeout(
      () => setSaindo(true),
      movimentoReduzido ? 150 : 2350,
    )

    const timerRemocao = window.setTimeout(
      () => {
        liberarScroll()
        setVisivel(false)
      },
      movimentoReduzido ? 350 : 3000,
    )

    return () => {
      window.clearTimeout(timerSaida)
      window.clearTimeout(timerRemocao)
      liberarScroll()
    }
  }, [])

  if (!visivel) return null

  return (
    <div
      className={`loader ${saindo ? 'is-leaving' : ''}`}
      role="status"
      aria-label="Carregando Fábrica de Sites"
    >
      <div className="loader__glow" aria-hidden="true" />

      <div className="loader__particles" aria-hidden="true">
        {particulas.map((style, index) => (
          <span key={index} className="loader__particle" style={style} />
        ))}
      </div>

      <svg
        className="loader__logo"
        viewBox="0 0 515.86 412.69"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient
            id="loader-gradient"
            x1="23.92"
            y1="205.17"
            x2="491.92"
            y2="205.17"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#cff759" />
            <stop offset="1" stopColor="#00ff00" />
          </linearGradient>
        </defs>

        <path
          className="loader__logo-path"
          pathLength="1"
          d="M 28 318
             C 78 280, 128 252, 188 230
             L 132 342
             L 151 104
             L 338 26
             L 290 208
             C 340 176, 397 156, 445 166
             C 490 174, 486 217, 456 270
             L 393 385"
        />
      </svg>

      <span className="loader__text">FÁBRICA DE SITES</span>
    </div>
  )
}
