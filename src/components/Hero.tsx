import { hero, mostrarProvaVisual, preco } from '../data/site'
import { useRotatingIndex } from '../hooks'
import { LinkButton, RouteButton } from './primitives'
import { DotField } from './DotField'

export function Hero() {
  const indice = useRotatingIndex(hero.palavrasDinamicas.length, 2600)

  return (
    <section className="hero" id="topo">
      <video
        className="hero__video"
        autoPlay
        muted
        loop
        playsInline
        onLoadedMetadata={(event) => {
          event.currentTarget.playbackRate = 0.65
        }}
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/home-hero.mp4" type="video/mp4" />
      </video>
      <div className="hero__video-overlay" aria-hidden="true" />
      <DotField gap={30} radius={520} base={0.08} glow={0.24} />

      <div className="shell hero__inner">
        <p className="eyebrow hero__eyebrow hero__step" style={{ ['--d' as string]: '0ms' }}>
          {hero.eyebrow}
        </p>

        <h1 className="hero__title hero__step" style={{ ['--d' as string]: '90ms' }}>
          {hero.titulo}
        </h1>

        <p className="hero__rotator hero__step" style={{ ['--d' as string]: '180ms' }}>
          <span className="hero__rotator-fixo">Um endereço próprio que gera</span>{' '}
          <span className="rotator">
            {/* espaçador invisível: reserva a largura da maior palavra e evita reflow */}
            <span className="rotator__spacer" aria-hidden="true">
              {hero.palavrasDinamicas.reduce((a, b) => (a.length >= b.length ? a : b))}
            </span>
            {hero.palavrasDinamicas.map((palavra, i) => (
              <span
                key={palavra}
                className={`rotator__word ${i === indice ? 'is-active' : ''}`}
                aria-hidden={i !== indice}
              >
                {palavra}
              </span>
            ))}
          </span>
        </p>

        <p className="lead hero__lead hero__step" style={{ ['--d' as string]: '260ms' }}>
          {hero.apoio}
        </p>

        <div className="hero__price hero__step" style={{ ['--d' as string]: '340ms' }}>
          <span className="hero__price-prefixo">{preco.prefixo}</span>
          <span className="hero__price-valor">{preco.valor}</span>
          <span className="hero__price-periodo">{preco.periodo}</span>
          <span className="hero__price-observacao">{preco.observacao}</span>
        </div>

        <div className="hero__ctas hero__step" style={{ ['--d' as string]: '420ms' }}>
          <RouteButton to="/checkout" variante="solido">
            {hero.ctaPrincipal}
          </RouteButton>
          <LinkButton
            href={mostrarProvaVisual ? '#nosso-trabalho' : '/servicos'}
            variante="contorno"
          >
            {mostrarProvaVisual ? hero.ctaSecundario : 'Conhecer os serviços'}
          </LinkButton>
        </div>
      </div>

      <div className="hero__scroll hero__step" style={{ ['--d' as string]: '600ms' }} aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-text">role</span>
      </div>
    </section>
  )
}
