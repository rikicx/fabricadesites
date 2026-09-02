import { clientes } from '../data/site'
import { useReducedMotion, useTabVisible } from '../hooks'

export function Clients() {
  const reduced = useReducedMotion()
  const tabVisivel = useTabVisible()

  const pausado = !tabVisivel || reduced
  const trilha = [...clientes, ...clientes]

  if (clientes.length === 0) return null

  return (
    <section className="clients" aria-label="Negócios atendidos">
      <div className="shell clients__head">
        <p className="eyebrow eyebrow--muted">Negócios que já estão no ar</p>
      </div>

      <div className={`marquee ${pausado ? 'is-paused' : ''}`}>
        <div className="marquee__track" aria-hidden="true">
          {trilha.map((cliente, i) => (
            <span className="marquee__item" key={`${cliente.nome}-${i}`}>
              <img
                src={cliente.logo}
                alt=""
                className="marquee__logo"
                loading="lazy"
                width={240}
                height={80}
              />
            </span>
          ))}
        </div>
      </div>

      <p className="sr-only">{clientes.map((c) => c.nome).join(', ')}</p>
    </section>
  )
}
