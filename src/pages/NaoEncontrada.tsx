import { Link } from 'react-router-dom'
import { useTituloPagina } from '../hooks'

export default function NaoEncontrada() {
  useTituloPagina('Página não encontrada — Fábrica de Sites')

  return (
    <section className="section nf">
      <div className="shell nf__inner">
        <p className="eyebrow">Erro 404</p>
        <h1 className="nf__titulo">Essa página não existe.</h1>
        <p className="lead">
          O endereço pode ter mudado ou o link estar errado. O caminho de volta está logo abaixo.
        </p>
        <Link to="/" className="btn btn--solido">
          <span className="btn__labels">
            <span className="btn__label">Voltar para a home</span>
            <span className="btn__label btn__label--ghost" aria-hidden="true">
              Voltar para a home
            </span>
          </span>
        </Link>
      </div>
    </section>
  )
}
