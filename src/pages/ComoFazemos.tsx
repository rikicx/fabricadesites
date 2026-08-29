import { AiDirection, FinalCta, Plan } from '../components/Sections'
import { Process } from '../components/Process'
import { PageHero } from '../components/navigation'
import { Reveal, WhatsAppButton } from '../components/primitives'
import { comoFazemosPagina } from '../data/site'
import { useTituloPagina } from '../hooks'

export default function ComoFazemos() {
  useTituloPagina('Como fazemos — Fábrica de Sites')

  return (
    <>
      <PageHero
        eyebrow={comoFazemosPagina.eyebrow}
        titulo={comoFazemosPagina.titulo}
        lead={comoFazemosPagina.lead}
      />

      <Process />

      <section className="section participacao inverted">
        <div className="shell participacao__grid">
          <Reveal className="participacao__head">
            <p className="eyebrow">{comoFazemosPagina.participacao.eyebrow}</p>
            <h2>{comoFazemosPagina.participacao.titulo}</h2>
            <p className="lead">{comoFazemosPagina.participacao.texto}</p>
            <WhatsAppButton origem="comoFazemos" variante="contorno">
              Quero entender o processo
            </WhatsAppButton>
          </Reveal>

          <ol className="participacao__lista">
            {comoFazemosPagina.participacao.itens.map((item, index) => (
              <Reveal as="li" key={item.titulo} delay={index * 90}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.titulo}</h3>
                  <p>{item.texto}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <AiDirection />
      <Plan />
      <FinalCta />
    </>
  )
}
