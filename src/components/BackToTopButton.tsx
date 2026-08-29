import { useScrolledPast } from '../hooks'

export function BackToTopButton() {
  const visivel = useScrolledPast(520)

  function voltarAoTopo() {
    const reduzirMovimento = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduzirMovimento ? 'auto' : 'smooth',
    })
  }

  return (
    <button
      type="button"
      className={`backtop-fab ${visivel ? 'is-visible' : ''}`}
      onClick={voltarAoTopo}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >
      <span aria-hidden="true">↑</span>
    </button>
  )
}
