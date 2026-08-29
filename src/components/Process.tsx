import { processo } from '../data/site'
import { useScrollFill } from '../hooks'
import { Reveal } from './primitives'

/* Serpentina em S, suave de verdade: amostra uma senoide entre y0 e y1 e emite
   cúbicas cujas tangentes são a derivada exata (Hermite → Bézier). O resultado
   é C1-contínuo em todo ponto, então nunca "quebra" nem forma bico — nem quando
   o preserveAspectRatio="none" estica o traçado na vertical. */
function serpentine(y0: number, y1: number, steps: number, w = 100, amp = 30) {
  const h = 1000
  const cx = w / 2
  const seg = h / steps
  const x = (y: number) => cx + amp * Math.sin(Math.PI * (y / seg - 0.5))
  const dx = (y: number) =>
    ((amp * Math.PI) / seg) * Math.cos(Math.PI * (y / seg - 0.5))

  const n = Math.max(2, Math.round(((y1 - y0) / h) * steps * 6))
  let d = `M ${x(y0).toFixed(2)} ${y0.toFixed(2)}`
  for (let i = 1; i <= n; i += 1) {
    const y = y0 + ((y1 - y0) * i) / n
    const yp = y0 + ((y1 - y0) * (i - 1)) / n
    const dy = y - yp
    const c1x = x(yp) + (dx(yp) * dy) / 3
    const c2x = x(y) - (dx(y) * dy) / 3
    d +=
      ` C ${c1x.toFixed(2)} ${(yp + dy / 3).toFixed(2)}` +
      ` ${c2x.toFixed(2)} ${(y - dy / 3).toFixed(2)}` +
      ` ${x(y).toFixed(2)} ${y.toFixed(2)}`
  }
  return d
}

const STEPS = processo.etapas.length
const SEG = 1000 / STEPS
/* Trilho cinza: curva inteira, com sobra em cima e embaixo.
   Fluxo verde: só do 1º ao último passo — assim --p (0..1) mapeia direto
   pra "líquido no passo 1" → "líquido no passo N", sem conta de offset. */
const JOURNEY_TRACK_D = serpentine(0, 1000, STEPS)
const JOURNEY_FLOW_D = serpentine(SEG / 2, 1000 - SEG / 2, STEPS)

function StageVisual({ etapa }: { etapa: number }) {
  if (etapa === 0) {
    return (
      <div className="stage-visual stage-visual--research">
        <div className="stage-search">
          <span className="stage-search__icon" />
          <span className="stage-search__text">presença digital</span>
          <span className="stage-search__action">↗</span>
        </div>
        <div className="stage-results">
          {[68, 84, 57].map((width, index) => (
            <span
              key={width}
              className="stage-result"
              style={{ ['--result-width' as string]: `${width}%`, ['--i' as string]: index }}
            >
              <i />
              <b />
              <em />
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (etapa === 1) {
    return (
      <div className="stage-visual stage-visual--prototype">
        <div className="stage-browser">
          <div className="stage-browser__top">
            <span /><span /><span />
            <i>fabricadesites.com</i>
          </div>
          <div className="stage-browser__page">
            <span className="stage-browser__nav" />
            <div className="stage-browser__hero">
              <i /><i /><b />
            </div>
            <div className="stage-browser__cards">
              <span /><span /><span />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (etapa === 2) {
    return (
      <div className="stage-visual stage-visual--review">
        <div className="stage-review-sheet">
          {['Textos confirmados', 'Dados essenciais', 'Último ajuste'].map((label, index) => (
            <div className={`stage-review-row ${index < 2 ? 'is-checked' : 'is-current'}`} key={label}>
              <span className="stage-review-check">{index < 2 ? '✓' : ''}</span>
              <span>{label}</span>
              {index === 2 && <i>1</i>}
            </div>
          ))}
        </div>
        <span className="stage-review-cursor">↖</span>
      </div>
    )
  }

  if (etapa === 3) {
    return (
      <div className="stage-visual stage-visual--domain">
        <div className="stage-domain-call">
          <span className="stage-domain-call__icon" aria-hidden="true">↗</span>
          <div>
            <strong>Ligação do domínio</strong>
            <span>Dono + designer</span>
          </div>
          <span className="stage-domain-call__status">ao vivo</span>
        </div>
        <div className="stage-domain-options">
          <span>meunegocio.com.br</span>
          <span className="is-selected">meunegocio.com</span>
          <span>nomedamarca.com.br</span>
        </div>
        <p className="stage-domain-note">Você escolhe. A gente verifica e compra junto.</p>
      </div>
    )
  }

  return (
    <div className="stage-visual stage-visual--launch">
      <div className="stage-launch-orbit">
        <span className="stage-launch-core">NO AR</span>
        <i /><i /><i />
      </div>
      <div className="stage-launch-domain">
        <span className="stage-launch-status" />
        <span>fabricadesites.com</span>
        <strong>online</strong>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------------------
 *  BAIXO ESFORÇO PARA O CLIENTE
 *  Desktop: o bloco fica fixado enquanto o scroll avança e o texto, o
 *  indicador e a composição mudam de etapa.
 *  Mobile (≤880px): vira uma lista empilhada normal — sem fixação, sem
 *  sequestro de scroll. A intenção visual continua (numeração, trilho, ordem),
 *  só a implementação simplifica.
 * ----------------------------------------------------------------------- */
export function Process() {
  const { ref, reached } = useScrollFill<HTMLDivElement>(STEPS)

  return (
    <section className="section process inverted" id="como-funciona">
      <div className="shell">
        <Reveal className="section__head section__head--wide">
          <p className="eyebrow">Como funciona</p>
          <h2>{processo.titulo}</h2>
          <p className="lead">{processo.texto}</p>
        </Reveal>
      </div>

      <div className="shell">
        <div className="journey-wrap" ref={ref}>
          <div className="journey__rail" aria-hidden="true">
            {/* Trilho cinza: curva inteira. */}
            <svg
              className="journey__svg"
              viewBox="0 0 100 1000"
              preserveAspectRatio="none"
            >
              <path className="journey__track" d={JOURNEY_TRACK_D} />
            </svg>

            {/* Líquido verde: revelado de cima pra baixo por uma máscara CSS
                dirigida por --p. Sem dash/pathLength — a técnica de dash não
                funciona aqui porque preserveAspectRatio="none" + non-scaling
                -stroke fazem a normalização e o desenho do traço acontecerem
                em sistemas de coordenadas diferentes. */}
            <div className="journey__flowmask">
              <svg
                className="journey__svg"
                viewBox="0 0 100 1000"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="journey-grad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0" className="journey__grad-a" />
                    <stop offset="1" className="journey__grad-b" />
                  </linearGradient>
                </defs>
                <path className="journey__flow" d={JOURNEY_FLOW_D} />
              </svg>
            </div>
          </div>

          <ol className="journey">
            {processo.etapas.map((etapa, index) => (
              <Reveal
                as="li"
                key={etapa.numero}
                className={`journey__item ${
                  index < reached ? 'is-reached' : ''
                }`}
              >
                <div className="journey__marker" aria-hidden="true">
                  <span>{etapa.numero}</span>
                </div>

                <div className="journey__content">
                  <p className="eyebrow">Etapa {etapa.numero}</p>
                  <h3>{etapa.titulo}</h3>
                  <p>{etapa.texto}</p>
                </div>

                <div className="journey__visual" aria-hidden="true">
                  <div className="journey__visual-head">
                    <span>{etapa.numero}</span>
                    <strong>{etapa.titulo}</strong>
                  </div>
                  <StageVisual etapa={index} />
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
