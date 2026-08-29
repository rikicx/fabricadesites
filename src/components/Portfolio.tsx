import { projetos } from '../data/site'
import { Reveal } from './primitives'

/* --------------------------------------------------------------------------
 *  PORTFÓLIO
 *  Ritmo editorial por offset vertical: a coluna da direita começa deslocada
 *  para baixo e as proporções alternam entre 'larga' e 'alta'.
 *  ⚠ PLACEHOLDER — screenshots reais pendentes. Nenhuma métrica ou resultado
 *  é exibido, por decisão.
 * ----------------------------------------------------------------------- */
export function Portfolio() {
  const projetosPublicos = projetos.filter((projeto) => !projeto.placeholder)

  if (projetosPublicos.length === 0) return null

  return (
    <section className="section portfolio" id="nosso-trabalho">
      <div className="shell">
        <Reveal className="section__head section__head--wide">
          <p className="eyebrow">Nosso trabalho</p>
          <h2>Sites que já estão trabalhando pelos donos.</h2>
        </Reveal>

        <div className="portfolio__grid">
          {projetosPublicos.map((projeto, i) => {
            const Interno = (
              <>
                <span className={`work__media work__media--${projeto.formato}`}>
                  <img
                    src={projeto.imagem}
                    alt={
                      projeto.placeholder
                        ? 'Espaço reservado para o screenshot do site'
                        : `Site de ${projeto.nome}`
                    }
                    className="work__img"
                    loading="lazy"
                  />
                  <span className="work__veil" aria-hidden="true" />
                  <span className="work__reveal">
                    <span className="work__servico">{projeto.servico}</span>
                    {projeto.link && <span className="work__abrir">Abrir site ↗</span>}
                  </span>
                </span>
                <span className="work__meta">
                  <span className="work__segmento">{projeto.segmento}</span>
                  <span className="work__nome">{projeto.nome}</span>
                </span>
              </>
            )

            return (
              <Reveal
                key={projeto.nome}
                delay={(i % 2) * 90}
                className={`portfolio__cell portfolio__cell--${projeto.formato}`}
              >
                {projeto.link ? (
                  <a
                    className="work"
                    href={projeto.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {Interno}
                  </a>
                ) : (
                  <div className="work work--sem-link">{Interno}</div>
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
