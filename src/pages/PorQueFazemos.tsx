import { FinalCta, Packages, Plan } from '../components/Sections'
import { PageHero } from '../components/navigation'
import { Reveal, WhatsAppButton } from '../components/primitives'
import { porQueFazemosPagina } from '../data/site'

export default function PorQueFazemos() {
  return (
    <>
      <PageHero
        eyebrow={porQueFazemosPagina.eyebrow}
        titulo={porQueFazemosPagina.titulo}
        lead={porQueFazemosPagina.lead}
      />

      <section className="section missao">
        <div className="shell missao__grid">
          <Reveal className="missao__head">
            <p className="eyebrow">{porQueFazemosPagina.missao.eyebrow}</p>
            <h2>{porQueFazemosPagina.missao.titulo}</h2>
          </Reveal>

          <div className="missao__texto">
            {porQueFazemosPagina.missao.paragrafos.map((paragrafo, index) => (
              <Reveal as="p" key={paragrafo} delay={index * 80}>
                {paragrafo}
              </Reveal>
            ))}
          </div>
        </div>

        <div className="shell">
          <ol className="compromissos">
            {porQueFazemosPagina.compromissos.map((item, index) => (
              <Reveal as="li" key={item.numero} delay={index * 90}>
                <span>{item.numero}</span>
                <h3>{item.titulo}</h3>
                <p>{item.texto}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section para-quem inverted">
        <div className="shell para-quem__grid">
          <Reveal className="para-quem__head">
            <p className="eyebrow">{porQueFazemosPagina.paraQuem.eyebrow}</p>
            <h2>{porQueFazemosPagina.paraQuem.titulo}</h2>
            <WhatsAppButton origem="porQueFazemos" variante="contorno">
              Conversar sobre meu negócio
            </WhatsAppButton>
          </Reveal>

          <ul className="para-quem__lista">
            {porQueFazemosPagina.paraQuem.perfis.map((perfil, index) => (
              <Reveal as="li" key={perfil} delay={index * 70}>
                <span aria-hidden="true">↗</span>
                {perfil}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Packages />
      <Plan />
      <FinalCta />
    </>
  )
}
