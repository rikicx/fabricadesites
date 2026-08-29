import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type InputHTMLAttributes,
} from 'react'
import { PageHero } from '../components/navigation'
import { Reveal } from '../components/primitives'
import {
  CHECKOUT,
  calcularPlano,
  checkoutConfigurado,
  checkoutPagina,
  plano,
} from '../data/site'

type DadosCheckout = {
  nome: string
  whatsapp: string
  email: string
  negocio: string
  segmento: string
  cidade: string
  instagram: string
  facebook: string
  google: string
  siteAtual: string
  dominio: string
  observacoes: string
}

const dadosIniciais: DadosCheckout = {
  nome: '',
  whatsapp: '',
  email: '',
  negocio: '',
  segmento: '',
  cidade: '',
  instagram: '',
  facebook: '',
  google: '',
  siteAtual: '',
  dominio: '',
  observacoes: '',
}

const moeda = (valor: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(valor)

export default function Checkout() {
  const [dados, setDados] = useState<DadosCheckout>(dadosIniciais)
  const [meses, setMeses] = useState<number>(plano.mesesMaximos)
  const [revisado, setRevisado] = useState(false)
  const opcao = calcularPlano(meses)
  const descontoAVistaPct = Math.round(plano.descontoAVista * 100)
  const totalAVista = Math.round(opcao.total * (1 - plano.descontoAVista))
  const economiaAVista = opcao.total - totalAVista
  const marcacoes = Array.from(
    { length: plano.mesesMaximos - plano.mesesMinimos + 1 },
    (_, index) => plano.mesesMinimos + index,
  )
  const progresso =
    ((meses - plano.mesesMinimos) /
      (plano.mesesMaximos - plano.mesesMinimos)) *
    100

  const alterar =
    (campo: keyof DadosCheckout) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDados((atual) => ({ ...atual, [campo]: event.target.value }))
      setRevisado(false)
    }

  const revisar = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setRevisado(true)
  }

  return (
    <>
      <PageHero
        eyebrow={checkoutPagina.eyebrow}
        titulo={checkoutPagina.titulo}
        lead={checkoutPagina.lead}
      >
        <ol className="checkout-steps" aria-label="Etapas da contratação">
          <li className="is-active">01 Informações</li>
          <li>02 Pagamento</li>
          <li>03 Ligação do domínio</li>
        </ol>
      </PageHero>

      <section className="section checkout">
        <div className="shell checkout__grid">
          <Reveal>
            <form id="checkout-form" className="checkout-form" onSubmit={revisar}>
              <fieldset className="checkout-form__section">
                <legend>{checkoutPagina.secoes.responsavel}</legend>
                <div className="form__campos">
                  <Campo
                    label={checkoutPagina.campos.nome}
                    name="nome"
                    required
                    value={dados.nome}
                    onChange={alterar('nome')}
                    autoComplete="name"
                  />
                  <Campo
                    label={checkoutPagina.campos.whatsapp}
                    name="whatsapp"
                    required
                    value={dados.whatsapp}
                    onChange={alterar('whatsapp')}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                  <Campo
                    label={checkoutPagina.campos.email}
                    name="email"
                    required
                    value={dados.email}
                    onChange={alterar('email')}
                    autoComplete="email"
                    type="email"
                    largo
                  />
                </div>
              </fieldset>

              <fieldset className="checkout-form__section">
                <legend>{checkoutPagina.secoes.negocio}</legend>
                <div className="form__campos">
                  <Campo
                    label={checkoutPagina.campos.negocio}
                    name="negocio"
                    required
                    value={dados.negocio}
                    onChange={alterar('negocio')}
                    autoComplete="organization"
                  />
                  <Campo
                    label={checkoutPagina.campos.segmento}
                    name="segmento"
                    required
                    value={dados.segmento}
                    onChange={alterar('segmento')}
                    placeholder="Ex.: clínica odontológica"
                  />
                  <Campo
                    label={checkoutPagina.campos.cidade}
                    name="cidade"
                    required
                    value={dados.cidade}
                    onChange={alterar('cidade')}
                    placeholder="Ex.: Franca, SP"
                    largo
                  />
                </div>
              </fieldset>

              <fieldset className="checkout-form__section">
                <legend>{checkoutPagina.secoes.presenca}</legend>
                <p className="checkout-form__help">
                  Preencha apenas o que já existir. Esses links reduzem perguntas e ajudam a gente a preparar a primeira direção.
                </p>
                <div className="form__campos">
                  <Campo
                    label={checkoutPagina.campos.instagram}
                    name="instagram"
                    value={dados.instagram}
                    onChange={alterar('instagram')}
                    placeholder="@nomedonegocio ou link"
                  />
                  <Campo
                    label={checkoutPagina.campos.facebook}
                    name="facebook"
                    value={dados.facebook}
                    onChange={alterar('facebook')}
                    placeholder="Link da página"
                  />
                  <Campo
                    label={checkoutPagina.campos.google}
                    name="google"
                    value={dados.google}
                    onChange={alterar('google')}
                    placeholder="Link do Google Maps"
                    largo
                  />
                  <Campo
                    label={checkoutPagina.campos.siteAtual}
                    name="siteAtual"
                    value={dados.siteAtual}
                    onChange={alterar('siteAtual')}
                    placeholder="https://"
                    largo
                  />
                </div>
              </fieldset>

              <fieldset className="checkout-form__section">
                <legend>{checkoutPagina.secoes.dominio}</legend>
                <div className="domain-note">
                  <strong>{checkoutPagina.dominio.titulo}</strong>
                  <p>{checkoutPagina.dominio.texto}</p>
                </div>
                <div className="form__campos">
                  <Campo
                    label={checkoutPagina.campos.dominio}
                    name="dominio"
                    value={dados.dominio}
                    onChange={alterar('dominio')}
                    placeholder="Ex.: minhamarca.com.br"
                    largo
                  />
                  <label className="campo campo--largo">
                    <span className="campo__rotulo">{checkoutPagina.campos.observacoes}</span>
                    <textarea
                      className="campo__input campo__input--area"
                      name="observacoes"
                      value={dados.observacoes}
                      onChange={alterar('observacoes')}
                      rows={5}
                    />
                  </label>
                </div>
              </fieldset>
            </form>
          </Reveal>

          <Reveal className="checkout-summary" delay={100}>
            <p className="eyebrow">{checkoutPagina.resumo.titulo}</p>

            <div className="checkout-summary__plan">
              <div className="plan__picker-head">
                <span>{checkoutPagina.resumo.recorrencia}</span>
                <strong>{meses} meses</strong>
              </div>
              <input
                className="plan__range"
                type="range"
                min={plano.mesesMinimos}
                max={plano.mesesMaximos}
                step="1"
                value={meses}
                onChange={(event) => {
                  setMeses(Number(event.target.value))
                  setRevisado(false)
                }}
                aria-label="Escolher a duração do plano"
                aria-valuetext={`${meses} meses, ${moeda(opcao.mensalidade)} por mês`}
                style={{ ['--range-progress' as string]: `${progresso}%` }}
              />
              <div className="plan__ticks" aria-label="Atalhos de período">
                {marcacoes.map((marcacao) => (
                  <button
                    key={marcacao}
                    className={marcacao <= meses ? 'is-active' : ''}
                    type="button"
                    aria-label={`Selecionar ${marcacao} meses no checkout`}
                    aria-pressed={marcacao === meses}
                    onClick={() => {
                      setMeses(marcacao)
                      setRevisado(false)
                    }}
                  >
                    <span aria-hidden="true" />
                  </button>
                ))}
              </div>
              <div className="checkout-summary__range-labels">
                <span>{plano.mesesMinimos} meses</span>
                <span>{plano.mesesMaximos} meses</span>
              </div>
            </div>

            <div className="checkout-summary__price">
              <span>Mensalidade</span>
              <strong>{moeda(opcao.mensalidade)}</strong>
              <em>/mês</em>
            </div>

            <dl className="checkout-summary__details">
              <div>
                <dt>{checkoutPagina.resumo.recorrencia}</dt>
                <dd>{opcao.meses} meses</dd>
              </div>
              <div>
                <dt>{checkoutPagina.resumo.total}</dt>
                <dd>{moeda(opcao.total)}</dd>
              </div>
              {plano.descontoAVista > 0 && (
                <div className="checkout-summary__avista">
                  <dt>
                    {checkoutPagina.resumo.aVista}
                    <span>
                      economize {moeda(economiaAVista)} · {descontoAVistaPct}% de
                      desconto
                    </span>
                  </dt>
                  <dd>{moeda(totalAVista)}</dd>
                </div>
              )}
              <div>
                <dt>{checkoutPagina.resumo.dominio}</dt>
                <dd>{checkoutPagina.resumo.dominioValor}</dd>
              </div>
            </dl>

            {!revisado ? (
              <button className="btn btn--solido" type="submit" form="checkout-form">
                Revisar e continuar
                <span aria-hidden="true">↗</span>
              </button>
            ) : checkoutConfigurado ? (
              <a className="btn btn--solido" href={CHECKOUT.pagamentoUrl}>
                Ir para o pagamento
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <div className="checkout-summary__pending" role="status">
                <strong>Pedido revisado.</strong>
                <p>Falta conectar o meio de pagamento para concluir a compra online.</p>
              </div>
            )}

            {!checkoutConfigurado && import.meta.env.DEV && (
              <p className="checkout-summary__dev">
                Configure <code>CHECKOUT.pagamentoUrl</code> em <code>src/data/site.ts</code>.
              </p>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}

function Campo({
  label,
  largo = false,
  required = false,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string
  largo?: boolean
}) {
  return (
    <label className={`campo ${largo ? 'campo--largo' : ''}`}>
      <span className="campo__rotulo">
        {label}
        {required && <span className="campo__req">obrigatório</span>}
      </span>
      <input className="campo__input" required={required} {...inputProps} />
    </label>
  )
}
