import { useEffect, useRef } from 'react'
import { useFinePointer, useReducedMotion } from '../hooks'

/* ============================================================================
 *  FUNDO DE PONTOS GLOBAL
 *  Uma unica camada position:fixed cobrindo a viewport, atras de todo o
 *  conteudo. Liga so depois que o hero sai da tela (ou imediatamente em
 *  paginas que nao tem hero).
 * ------------------------------------------------------------------------ */

type Props = {
  gap?: number
  radius?: number
  base?: number
  glow?: number
  ease?: number
  /** Seletor do bloco que, enquanto visivel, mantem o fundo desligado. */
  desligarEm?: string
}

export function DotBackdrop({
  gap = 30,
  radius = 520,
  base = 0.1,
  glow = 0.34,
  ease = 0.16,
  desligarEm = '.hero',
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const ativo = !reduced && fine

  useEffect(() => {
    const el = ref.current
    if (!el || !ativo) return

    let frame = 0
    let alvoX = -9999
    let alvoY = -9999
    let x = -9999
    let y = -9999
    let iniciado = false

    const escrever = () => {
      el.style.setProperty('--dot-x', `${x.toFixed(1)}px`)
      el.style.setProperty('--dot-y', `${y.toFixed(1)}px`)
    }

    const tick = () => {
      x += (alvoX - x) * ease
      y += (alvoY - y) * ease
      escrever()
      const parou = Math.abs(alvoX - x) < 0.5 && Math.abs(alvoY - y) < 0.5
      frame = parou ? 0 : requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      alvoX = e.clientX
      alvoY = e.clientY
      if (!iniciado) {
        iniciado = true
        x = alvoX
        y = alvoY
        escrever()
      }
      if (!frame) frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ativo, ease])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const hero = document.querySelector(desligarEm)
    if (!hero || !('IntersectionObserver' in window)) {
      el.classList.add('is-on')
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle('is-on', !entry.isIntersecting)
      },
      { threshold: 0 },
    )
    io.observe(hero)
    return () => io.disconnect()
  }, [desligarEm])

  return (
    <div
      ref={ref}
      className={`dot-backdrop ${ativo ? 'is-live' : ''}`}
      aria-hidden="true"
      style={
        {
          '--dot-gap': `${gap}px`,
          '--dot-r': `${radius}px`,
          '--dot-base': base,
          '--dot-glow': glow,
        } as React.CSSProperties
      }
    >
      <span className="dot-backdrop__base" />
      <span className="dot-backdrop__glow" />
    </div>
  )
}
