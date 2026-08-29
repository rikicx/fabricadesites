import { useEffect, useRef } from 'react'
import { useFinePointer, useReducedMotion } from '../hooks'

/* ============================================================================
 *  CAMPO DE PONTOS COM HOLOFOTE NO CURSOR
 * ============================================================================
 *
 *  Duas camadas sobrepostas com a MESMA grade de pontos:
 *
 *    base   → pontos discretos, sempre visíveis
 *    brilho → pontos mais fortes, revelados por uma máscara radial que
 *             acompanha o cursor
 *
 *  Como a grade é idêntica nas duas camadas, o holofote não desloca nada:
 *  ele só "acende" os pontos que já estavam lá.
 *
 *  A cor dos pontos vem de --dot-rgb (definido por tema em tokens.css), então
 *  o efeito funciona em fundo claro e escuro sem ajuste manual.
 *
 *  Desligado no toque (pointer: coarse) e em prefers-reduced-motion — nesses
 *  casos sobra só a camada base, que é estática e continua fazendo sentido.
 *
 *  USO: o elemento pai precisa de position: relative e overflow: hidden.
 *
 *      <div className="algum-bloco">
 *        <DotField />
 *        ...conteúdo...
 *      </div>
 * ------------------------------------------------------------------------ */

type Props = {
  /** Distância entre pontos, em px. */
  gap?: number
  /** Raio do holofote, em px. */
  radius?: number
  /** Opacidade dos pontos fora do holofote. */
  base?: number
  /** Opacidade dos pontos dentro do holofote. */
  glow?: number
  /** Suavização do movimento: 1 = colado no cursor, 0.1 = bem preguiçoso. */
  ease?: number
}

export function DotField({
  gap = 28,
  radius = 420,
  base = 0.14,
  glow = 0.38,
  ease = 0.16,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const ativo = !reduced && fine

  useEffect(() => {
    const el = ref.current
    const host = el?.parentElement
    if (!el || !host || !ativo) return

    let frame = 0
    let alvoX = -9999
    let alvoY = -9999
    let x = -9999
    let y = -9999
    let dentro = false

    const escrever = () => {
      el.style.setProperty('--dot-x', `${x.toFixed(1)}px`)
      el.style.setProperty('--dot-y', `${y.toFixed(1)}px`)
    }

    const tick = () => {
      // Interpolação: o holofote persegue o cursor em vez de colar nele.
      // Sem isso o movimento fica duro e cada micro-tremida do mouse repinta.
      x += (alvoX - x) * ease
      y += (alvoY - y) * ease
      escrever()

      const parou = Math.abs(alvoX - x) < 0.5 && Math.abs(alvoY - y) < 0.5
      frame = parou ? 0 : requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect()
      alvoX = e.clientX - r.left
      alvoY = e.clientY - r.top

      // Primeira entrada: teleporta em vez de vir voando de -9999px.
      if (!dentro) {
        dentro = true
        x = alvoX
        y = alvoY
        escrever()
      }
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onLeave = () => {
      dentro = false
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      x = alvoX = -9999
      y = alvoY = -9999
      escrever()
    }

    host.addEventListener('pointermove', onMove, { passive: true })
    host.addEventListener('pointerleave', onLeave, { passive: true })

    return () => {
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ativo, ease])

  return (
    <div
      ref={ref}
      className={`dotfield ${ativo ? 'is-live' : ''}`}
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
      <span className="dotfield__base" />
      <span className="dotfield__glow" />
    </div>
  )
}
