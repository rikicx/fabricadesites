import { clientes } from '../data/site'
import { useReducedMotion, useTabVisible } from '../hooks'

/* --------------------------------------------------------------------------
 *  PROVA VISUAL
 *  ⚠ PLACEHOLDER — nenhuma empresa real está listada. A faixa fica marcada
 *  como pendente enquanto todos os itens de `clientes` tiverem
 *  placeholder: true.
 *
 *  O marquee pausa quando a aba está oculta e não roda com movimento
 *  reduzido (nesse caso vira uma faixa estática com scroll horizontal).
 * ----------------------------------------------------------------------- */
export function Clients() {
  const reduced = useReducedMotion()
  const tabVisivel = useTabVisible()
  const todosPlaceholder = clientes.every((c) => c.placeholder)

  const pausado = !tabVisivel || reduced
  const trilha = [...clientes, ...clientes]

  if (todosPlaceholder) return null

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
