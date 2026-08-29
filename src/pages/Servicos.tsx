import { processo, servicos } from '../data/site'
import { PageHero } from '../components/navigation'
import { Reveal, WhatsAppButton } from '../components/primitives'
import { Faq, FinalCta, Packages, Plan } from '../components/Sections'

export default function Servicos() {
  return (
    <>
      <PageHero
        eyebrow="Serviços"
        titulo="Sites, lojas e identidades com direção de verdade."
        lead="Tudo começa igual: a gente pesquisa, organiza uma primeira direção e você confirma. O formato muda de acordo com o que o negócio precisa colocar no ar."
      />

      {/* Lista de serviços — cada um é uma faixa larga, não um card de grade */}
      <section className="section serv">
        <div className="shell">
          <ol className="serv__lista">
            {servicos.map((servico, i) => (
              <Reveal
                as="li"
                key={servico.id}
                delay={i * 70}
                className="serv__item"
              >
                <div className="serv__cabeca">
                  <span className="serv__num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h2 className="serv__nome">{servico.nome}</h2>
                    <p className="serv__para">{servico.paraQuem}</p>
                  </div>
                </div>

                <div className="serv__corpo">
                  <p className="serv__desc">{servico.descricao}</p>

                  <ul className="serv__inclui">
                    {servico.inclui.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="serv__cta" delay={120}>
            <p className="serv__cta-texto">
              Não sabe qual formato é o seu caso? Normal — é o que a conversa resolve.
            </p>
            <WhatsAppButton origem="servicos" variante="solido">
              Quero entender qual serve para mim
            </WhatsAppButton>
          </Reveal>
        </div>
      </section>

      {/* Processo — mesma informação da home, sem a fixação de scroll.
          Numa página de serviços o usuário está comparando, não sendo
          apresentado: lista lê mais rápido que sequência fixada. */}
      <section className="section proc-simples inverted">
        <div className="shell">
          <Reveal className="section__head section__head--wide">
            <p className="eyebrow">Como funciona</p>
            <h2>{processo.titulo}</h2>
            <p className="lead">{processo.texto}</p>
          </Reveal>

          <ol className="proc-simples__lista">
            {processo.etapas.map((etapa, i) => (
              <Reveal as="li" key={etapa.numero} delay={i * 70} className="proc-simples__item">
                <span className="proc-simples__num">{etapa.numero}</span>
                <h3>{etapa.titulo}</h3>
                <p>{etapa.texto}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Packages />
      <Plan />
      <Faq />
      <FinalCta />
    </>
  )
}
