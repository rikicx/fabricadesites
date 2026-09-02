import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type InputHTMLAttributes,
} from 'react'
import { PageHero } from '../components/navigation'
import { Reveal } from '../components/primitives'
import {
  checkoutPagina,
  linkWhatsApp,
  obterPagamentoUrl,
  plano,
  valoresPlano,
  type FormaPagamento,
} from '../data/site'
import { useSearchParams } from 'react-router-dom'

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
  const [parametros] = useSearchParams()
  const pagamentoInicial: FormaPagamento =
    parametros.get('pagamento') === 'pix' ? 'pix' : 'cartao'
  const [dados, setDados] = useState<DadosCheckout>(dadosIniciais)
  const [formaPagamento, setFormaPagamento] =
    useState<FormaPagamento>(pagamentoInicial)
  const [revisado, setRevisado] = useState(false)
  const descontoAVistaPct = Math.round(plano.descontoAVista * 100)
  const pagamentoUrl = obterPagamentoUrl(formaPagamento)
  const pagamentoConfigurado = pagamentoUrl.trim().length > 0
  const continuarUrl = pagamentoConfigurado
    ? pagamentoUrl
    : linkWhatsApp('plano')

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

            <div className="checkout-summary__price">
              <span>
                {formaPagamento === 'pix'
                  ? `Pix à vista · ${descontoAVistaPct}% de desconto`
                  : `Cartão em ${plano.parcelas}x`}
              </span>
              <strong>
                {moeda(
                  formaPagamento === 'pix'
                    ? valoresPlano.totalAVista
                    : plano.valorParcela,
                )}
              </strong>
              <em>
                {formaPagamento === 'pix' ? 'pagamento único' : 'por parcela'}
              </em>
            </div>

            <fieldset className="checkout-payment">
              <legend>{checkoutPagina.resumo.pagamento}</legend>
              <label
                className={`checkout-payment__option ${
                  formaPagamento === 'cartao' ? 'is-selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="formaPagamento"
                  value="cartao"
                  checked={formaPagamento === 'cartao'}
                  onChange={() => {
                    setFormaPagamento('cartao')
                    setRevisado(false)
                  }}
                />
                <span>
                  <strong>Cartão</strong>
                  <small>
                    {plano.parcelas}x de {moeda(plano.valorParcela)}
                  </small>
                </span>
                <em>{moeda(valoresPlano.total)}</em>
              </label>
              <label
                className={`checkout-payment__option ${
                  formaPagamento === 'pix' ? 'is-selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="formaPagamento"
                  value="pix"
                  checked={formaPagamento === 'pix'}
                  onChange={() => {
                    setFormaPagamento('pix')
                    setRevisado(false)
                  }}
                />
                <span>
                  <strong>Pix à vista</strong>
                  <small>{descontoAVistaPct}% de desconto</small>
                </span>
                <em>{moeda(valoresPlano.totalAVista)}</em>
              </label>
            </fieldset>

            <dl className="checkout-summary__details">
              <div>
                <dt>{checkoutPagina.resumo.parcelamento}</dt>
                <dd>
                  {formaPagamento === 'pix'
                    ? 'À vista'
                    : `${plano.parcelas} parcelas`}
                </dd>
              </div>
              <div>
                <dt>{checkoutPagina.resumo.pagamento}</dt>
                <dd>
                  {formaPagamento === 'pix' ? 'Pix' : 'Cartão'}
                </dd>
              </div>
              <div>
                <dt>{checkoutPagina.resumo.total}</dt>
                <dd>
                  {moeda(
                    formaPagamento === 'pix'
                      ? valoresPlano.totalAVista
                      : valoresPlano.total,
                  )}
                </dd>
              </div>
              {formaPagamento === 'pix' && (
                <div className="checkout-summary__avista">
                  <dt>
                    {checkoutPagina.resumo.aVista}
                    <span>
                      economize {moeda(valoresPlano.economiaAVista)}
                    </span>
                  </dt>
                  <dd>− {moeda(valoresPlano.economiaAVista)}</dd>
                </div>
              )}
              <div>
                <dt>{checkoutPagina.resumo.manutencao}</dt>
                <dd>{moeda(plano.manutencaoMensal)}/mês, à parte</dd>
              </div>
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
            ) : (
              <a className="btn btn--solido" href={continuarUrl}>
                {pagamentoConfigurado
                  ? formaPagamento === 'pix'
                    ? 'Pagar à vista com Pix'
                    : 'Pagar em 10x no cartão'
                  : 'Continuar a contratação'}
                <span aria-hidden="true">↗</span>
              </a>
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
