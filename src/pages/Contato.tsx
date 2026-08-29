import { useMemo, useState } from 'react'
import { WHATSAPP, contato, whatsappConfigurado } from '../data/site'
import { PageHero } from '../components/navigation'
import { useTituloPagina } from '../hooks'
import { Reveal } from '../components/primitives'

/* --------------------------------------------------------------------------
 *  FORMULÁRIO SEM BACKEND
 *  Os campos montam uma mensagem e abrem o WhatsApp. Nada trafega para
 *  servidor nenhum — não há endpoint, não há armazenamento, não há LGPD a
 *  tratar nesta etapa.
 *
 *  Não usamos <form> com submit: o "envio" é abrir um link externo. Botão com
 *  onClick deixa isso explícito e evita reload acidental da SPA.
 * ----------------------------------------------------------------------- */
function FormularioWhatsApp() {
  const [nome, setNome] = useState('')
  const [negocio, setNegocio] = useState('')
  const [segmento, setSegmento] = useState('')
  const [mensagem, setMensagem] = useState('')

  const rotulos = contato.formulario.campos

  const texto = useMemo(() => {
    // string[] explícito: `as const` em WHATSAPP deixa a mensagem com tipo literal
    const linhas: string[] = [WHATSAPP.mensagens.contato]
    if (nome.trim()) linhas.push(`Nome: ${nome.trim()}`)
    if (negocio.trim()) linhas.push(`Negócio: ${negocio.trim()}`)
    if (segmento.trim()) linhas.push(`O que faço: ${segmento.trim()}`)
    if (mensagem.trim()) linhas.push(`\n${mensagem.trim()}`)
    return linhas.join('\n')
  }, [nome, negocio, segmento, mensagem])

  const numero = WHATSAPP.numero.replace(/\D/g, '')
  const href = numero ? `https://wa.me/${numero}?text=${encodeURIComponent(texto)}` : null
  const podeEnviar = nome.trim().length > 0 && Boolean(href)

  return (
    <div className="form">
      <h2 className="form__titulo">{contato.formulario.titulo}</h2>
      <p className="form__aviso">{contato.formulario.aviso}</p>

      <div className="form__campos">
        <label className="campo">
          <span className="campo__rotulo">
            {rotulos.nome} <span className="campo__req">obrigatório</span>
          </span>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            autoComplete="name"
            className="campo__input"
          />
        </label>

        <label className="campo">
          <span className="campo__rotulo">{rotulos.negocio}</span>
          <input
            type="text"
            value={negocio}
            onChange={(e) => setNegocio(e.target.value)}
            autoComplete="organization"
            className="campo__input"
          />
        </label>

        <label className="campo">
          <span className="campo__rotulo">{rotulos.segmento}</span>
          <input
            type="text"
            value={segmento}
            onChange={(e) => setSegmento(e.target.value)}
            placeholder="barbearia, consultório, panificadora..."
            className="campo__input"
          />
        </label>

        <label className="campo campo--largo">
          <span className="campo__rotulo">{rotulos.mensagem}</span>
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            rows={4}
            className="campo__input campo__input--area"
          />
        </label>
      </div>

      {/* Prévia: o usuário vê exatamente o que vai sair antes de abrir o app. */}
      <div className="form__previa">
        <span className="form__previa-rotulo">Vai sair assim</span>
        <pre className="form__previa-texto">{texto}</pre>
      </div>

      {href && podeEnviar ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn--solido">
          <span className="btn__labels">
            <span className="btn__label">{contato.formulario.botao}</span>
            <span className="btn__label btn__label--ghost" aria-hidden="true">
              {contato.formulario.botao}
            </span>
          </span>
          <span className="btn__arrow" aria-hidden="true">
            <span className="btn__arrow-glyph">↗</span>
            <span className="btn__arrow-glyph btn__arrow-glyph--ghost">↗</span>
          </span>
        </a>
      ) : (
        <span className="btn btn--solido btn--pendente">
          <span className="btn__labels">
            <span className="btn__label">{contato.formulario.botao}</span>
          </span>
          <span className="btn__pending">
            {whatsappConfigurado ? 'preencha seu nome' : 'WhatsApp pendente'}
          </span>
        </span>
      )}
    </div>
  )
}

export default function Contato() {
  useTituloPagina('Contato — Fábrica de Sites')

  const canaisDefinidos = contato.canais.filter((c) => c.valor)

  return (
    <>
      <PageHero eyebrow={contato.eyebrow} titulo={contato.titulo} lead={contato.lead} />

      <section className="section contato">
        <div className="shell contato__grid">
          {/* Coluna esquerda: canais + expectativa */}
          <div className="contato__lado">
            {canaisDefinidos.length > 0 && (
              <Reveal>
                <h2 className="contato__sub">Onde encontrar a gente</h2>
                <ul className="canais">
                  {canaisDefinidos.map((c) => (
                    <li key={c.rotulo} className="canal">
                      <span className="canal__rotulo">{c.rotulo}</span>
                      {c.tipo === 'email' && c.valor ? (
                        <a href={`mailto:${c.valor}`} className="canal__valor">
                          {c.valor}
                        </a>
                      ) : (
                        <span className="canal__valor">{c.valor}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <Reveal delay={100} className="expectativa">
              <h2 className="contato__sub">{contato.expectativa.titulo}</h2>
              <ol className="expectativa__lista">
                {contato.expectativa.passos.map((passo, i) => (
                  <li key={passo}>
                    <span className="expectativa__num">{String(i + 1).padStart(2, '0')}</span>
                    {passo}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          {/* Coluna direita: formulário */}
          <Reveal delay={80} className="contato__form">
            <FormularioWhatsApp />
          </Reveal>
        </div>
      </section>
    </>
  )
}
