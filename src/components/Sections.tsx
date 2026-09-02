import { useState } from 'react'
import {
  ctaFinal,
  diferencial,
  faq,
  links,
  marca,
  navegacao,
  navegacaoRodape,
  pacotes,
  plano,
  valoresPlano,
  porque,
  rodape,
  linkWhatsApp,
} from '../data/site'
import { Link } from 'react-router-dom'
import { Logo, Reveal, RouteButton, WhatsAppButton } from './primitives'
import { NavLink } from './navigation'
import { GreenParticleField } from './GreenParticleField'

/* ==========================================================================
 *  6. DIFERENCIAL DE IA
 * ======================================================================== */
export function AiDirection() {
  return (
    <section className="section ai" id="diferencial">
      <div className="shell">
        <Reveal className="section__head section__head--wide">
          <p className="eyebrow">Diferencial</p>
          <h2>{diferencial.titulo}</h2>
        </Reveal>

        <Reveal className="ai__flow">
          {diferencial.fluxo.map((passo, i) => (
            <div className="ai__node" key={passo.rotulo}>
              <span className="ai__node-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="ai__node-rotulo">{passo.rotulo}</span>
              <span className="ai__node-desc">{passo.descricao}</span>
              {i < diferencial.fluxo.length - 1 && (
                <span className="ai__seta" aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </Reveal>

        <Reveal className="ai__texto" delay={80}>
          <p className="lead">{diferencial.texto}</p>
        </Reveal>

        <ul className="ai__pontos">
          {diferencial.pontos.map((ponto, i) => (
            <Reveal as="li" key={ponto.titulo} delay={i * 90} className="ai__ponto">
              <h3>{ponto.titulo}</h3>
              <p>{ponto.texto}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ==========================================================================
 *  7. POR QUE FAZEMOS
 * ======================================================================== */
export function Why() {
  return (
    <section className="section why">
      <div className="shell why__grid">
        <Reveal className="why__head">
          <p className="eyebrow">{porque.eyebrow}</p>
          <h2>{porque.titulo}</h2>
        </Reveal>
        <div className="why__texto">
          {porque.paragrafos.map((p, i) => (
            <Reveal as="p" key={i} delay={i * 80}>
              {p}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
 *  8. PACOTES
 * ======================================================================== */
export function Packages() {
  return (
    <section className="section packages" id="pacotes">
      <div className="shell">
        <Reveal className="section__head section__head--wide">
          <p className="eyebrow">{pacotes.eyebrow}</p>
          <h2>{pacotes.titulo}</h2>
          <p className="lead">{pacotes.texto}</p>
        </Reveal>

        <ol className="packages__grid">
          {pacotes.itens.map((pacote, index) => (
            <Reveal
              as="li"
              key={pacote.nome}
              className="package"
              delay={index * 90}
            >
              <span className="package__num">{String(index + 1).padStart(2, '0')}</span>
              <h3>{pacote.nome}</h3>
              <p className="package__para">{pacote.paraQuem}</p>
              <p className="package__solucao">{pacote.solucao}</p>
              <ul className="package__lista">
                {pacote.inclui.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>

        <Reveal as="p" className="packages__nota" delay={180}>
          {pacotes.nota}
        </Reveal>
      </div>
    </section>
  )
}

/* ==========================================================================
 *  9. PLANO
 * ======================================================================== */
export function Plan() {
  const descontoAVistaPct = Math.round(plano.descontoAVista * 100)
  const moeda = (valor: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(valor)

  return (
    <section className="section plan inverted" id="preco">
      <div className="shell plan__grid">
        <Reveal className="plan__head">
          <p className="eyebrow">{plano.eyebrow}</p>
          <h2>{plano.titulo}</h2>
          <p className="lead">{plano.texto}</p>
        </Reveal>

        <Reveal className="plan__card" delay={100}>
          <div className="plan__options" role="list">
            <article className="plan__option" role="listitem">
              <span className="plan__option-label">Cartão</span>
              <div className="plan__option-price">
                <strong>{plano.parcelas}x</strong>
                <span>de {moeda(plano.valorParcela)}</span>
              </div>
              <p>Total de {moeda(valoresPlano.total)}</p>
            </article>

            <article className="plan__option plan__option--featured" role="listitem">
              <span className="plan__option-label">
                Pix à vista
                <em>{descontoAVistaPct}% de desconto</em>
              </span>
              <div className="plan__option-price">
                <strong>{moeda(valoresPlano.totalAVista)}</strong>
              </div>
              <p>Você economiza {moeda(valoresPlano.economiaAVista)}</p>
            </article>
          </div>

          <RouteButton
            to="/checkout"
            variante="solido"
            className="plan__cta"
          >
            Escolher forma de pagamento
          </RouteButton>

          <p className="plan__nota">
            Os valores acima são referentes à criação do site. A manutenção
            mensal de {moeda(plano.manutencaoMensal)} não está incluída e é
            cobrada à parte. O domínio também é pago separadamente.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ==========================================================================
 *  9. FAQ
 * ======================================================================== */
export function Faq() {
  const [aberto, setAberto] = useState<number | null>(0)

  return (
    <section className="section faq" id="duvidas">
      <div className="shell faq__grid">
        <Reveal className="faq__head">
          <p className="eyebrow">Dúvidas</p>
          <h2>Perguntas que a gente sempre ouve.</h2>
          <p className="lead">
            Se a sua não estiver aqui, manda no WhatsApp. Resposta de gente, não de robô.
          </p>
          <WhatsAppButton origem="plano" variante="contorno" className="faq__cta">
            Perguntar no WhatsApp
          </WhatsAppButton>
        </Reveal>

        <div className="faq__lista">
          {faq.map((item, i) => {
            const estaAberto = aberto === i
            return (
              <Reveal key={item.pergunta} delay={i * 50}>
                <div className={`qa ${estaAberto ? 'is-open' : ''}`}>
                  <h3 className="qa__h">
                    <button
                      type="button"
                      className="qa__btn"
                      aria-expanded={estaAberto}
                      aria-controls={`qa-painel-${i}`}
                      id={`qa-botao-${i}`}
                      onClick={() => setAberto(estaAberto ? null : i)}
                    >
                      <span className="qa__pergunta">{item.pergunta}</span>
                      <span className="qa__icone" aria-hidden="true">
                        <span className="qa__icone-h" />
                        <span className="qa__icone-v" />
                      </span>
                    </button>
                  </h3>
                  {/* O painel fica no DOM para a altura poder animar; quando
                      fechado, visibility:hidden o tira da ordem de tabulação. */}
                  <div
                    className="qa__painel"
                    id={`qa-painel-${i}`}
                    role="region"
                    aria-labelledby={`qa-botao-${i}`}
                  >
                    <div className="qa__conteudo">
                      <p>{item.resposta}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
 *  10. CTA FINAL
 *  Bloco de alto contraste com animação própria: faixas verdes que deslizam
 *  na entrada, diferente do desenho do hero.
 * ======================================================================== */
export function FinalCta() {
  return (
    <section className="final green-particle-surface">
      <GreenParticleField />

      <Reveal className="shell final__inner">
        <div className="final__parallax-content">
          <h2 className="final__titulo">
            {ctaFinal.titulo.map((frase, index) => (
              <span
                key={frase}
                className={`final__frase final__frase--${index + 1}`}
              >
                {frase}
              </span>
            ))}
          </h2>

          <p className="final__texto">{ctaFinal.texto}</p>

          <RouteButton to="/checkout" variante="solido" className="final__cta">
            {ctaFinal.botao}
          </RouteButton>
        </div>
      </Reveal>
    </section>
  )
}

/* ==========================================================================
 *  11. RODAPÉ
 * ======================================================================== */
export function Footer() {
  const wa = linkWhatsApp('rodape')

  return (
    <footer className="footer">
      <div className="shell footer__grid">
        <div className="footer__marca">
          <Link to="/" aria-label="Ir para a home">
            <Logo />
          </Link>
          <p className="footer__assinatura">{rodape.assinatura}</p>
          <p className="footer__dominio">{marca.dominio}</p>
        </div>

        <nav className="footer__nav" aria-label="Navegação do rodapé">
          {[...navegacao, ...navegacaoRodape].map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.rotulo}
            </NavLink>
          ))}
        </nav>

        <div className="footer__contato">
          <a href={wa} target="_blank" rel="noopener noreferrer" className="footer__wa">
            WhatsApp ↗
          </a>
          {links.politicaPrivacidade && (
            <a href={links.politicaPrivacidade} className="footer__politica">
              Política de privacidade
            </a>
          )}
        </div>
      </div>

      <div className="shell footer__base">
        <span>{rodape.copyright}</span>
      </div>
    </footer>
  )
}
