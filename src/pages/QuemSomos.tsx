import { quemSomos } from '../data/site'
import { PageHero } from '../components/navigation'
import { useTituloPagina } from '../hooks'
import { Reveal, WhatsAppButton } from '../components/primitives'
import { FinalCta } from '../components/Sections'

export default function QuemSomos() {
  useTituloPagina('Quem somos — Fábrica de Sites')

  const { responsavel, numeros } = quemSomos
  const numerosDefinidos = numeros.filter((n) => n.valor)

  return (
    <>
      <PageHero
        eyebrow={quemSomos.eyebrow}
        titulo={quemSomos.titulo}
        lead={quemSomos.lead}
      />

      {/* Manifesto — blocos numerados, ritmo editorial */}
      <section className="section manifesto">
        <div className="shell">
          <ol className="manifesto__lista">
            {quemSomos.manifesto.map((bloco, i) => (
              <Reveal as="li" key={bloco.titulo} delay={i * 80} className="manifesto__item">
                <span className="manifesto__num">{String(i + 1).padStart(2, '0')}</span>
                <div className="manifesto__corpo">
                  <h2 className="manifesto__titulo">{bloco.titulo}</h2>
                  <p className="manifesto__texto">{bloco.texto}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Princípios — banda invertida, quebra o ritmo */}
      <section className="section principios inverted">
        <div className="shell">
          <Reveal className="section__head section__head--wide">
            <p className="eyebrow">Como trabalhamos</p>
            <h2>Três coisas que não abrimos mão.</h2>
          </Reveal>

          <ul className="principios__lista">
            {quemSomos.principios.map((p, i) => (
              <Reveal as="li" key={p.titulo} delay={i * 90} className="principio">
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {responsavel.definido && responsavel.nome && (
        <section className="section conduz">
          <div className="shell">
            <Reveal className="conduz__grid">
              {responsavel.foto && (
                <img src={responsavel.foto} alt={responsavel.nome} className="conduz__foto" />
              )}
              <div className="conduz__texto">
                <p className="eyebrow">Quem conduz</p>
                <h2>{responsavel.nome}</h2>
                {responsavel.papel && <p className="conduz__papel">{responsavel.papel}</p>}
                {responsavel.bio && <p className="lead">{responsavel.bio}</p>}
              </div>
            </Reveal>

            {numerosDefinidos.length > 0 && (
              <Reveal className="conduz__numeros" delay={100}>
                {numerosDefinidos.map((n) => (
                  <div className="numero" key={n.rotulo}>
                    <span className="numero__valor">{n.valor}</span>
                    <span className="numero__rotulo">{n.rotulo}</span>
                  </div>
                ))}
              </Reveal>
            )}

            <Reveal className="conduz__cta" delay={160}>
              <WhatsAppButton origem="quemSomos" variante="contorno">
                Falar com a gente
              </WhatsAppButton>
            </Reveal>
          </div>
        </section>
      )}

      <FinalCta />
    </>
  )
}
