import { useCallback, useEffect, useRef, useState } from 'react'

export type Theme = 'dark' | 'light'

const THEME_KEY = 'fds-theme'

/* --------------------------------------------------------------------------
 *  TEMA — respeita a preferência do sistema na primeira visita e guarda a
 *  escolha manual depois.
 * ----------------------------------------------------------------------- */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
    const saved = window.localStorage.getItem(THEME_KEY)
    if (saved === 'dark' || saved === 'light') return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      window.localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* modo privado bloqueia storage — o tema continua funcionando na sessão */
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}

/* --------------------------------------------------------------------------
 *  REVEAL — adiciona .is-visible quando o elemento entra na viewport.
 * ----------------------------------------------------------------------- */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return { ref, visible }
}

/* --------------------------------------------------------------------------
 *  SCROLL PASSOU DE X — usado pelo header.
 * ----------------------------------------------------------------------- */
export function useScrolledPast(offset = 24) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        setPast(window.scrollY > offset)
        frame = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [offset])

  return past
}

/* --------------------------------------------------------------------------
 *  PREFERÊNCIA DE MOVIMENTO REDUZIDO — reativa a mudanças no sistema.
 * ----------------------------------------------------------------------- */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/* --------------------------------------------------------------------------
 *  PONTEIRO FINO (mouse) — desliga efeitos de cursor no toque.
 * ----------------------------------------------------------------------- */
export function useFinePointer() {
  const [fine, setFine] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const onChange = () => setFine(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return fine
}

/* --------------------------------------------------------------------------
 *  ABA VISÍVEL — usado para pausar loops (marquee, palavra dinâmica).
 * ----------------------------------------------------------------------- */
export function useTabVisible() {
  const [visible, setVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  )

  useEffect(() => {
    const onChange = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  return visible
}

/* --------------------------------------------------------------------------
 *  PARALLAX DE CURSOR — escreve --mx/--my (-1..1) no elemento.
 *  Desativado no toque e em prefers-reduced-motion.
 * ----------------------------------------------------------------------- */
export function usePointerParallax<T extends HTMLElement = HTMLDivElement>(strength = 1) {
  const ref = useRef<T | null>(null)
  const reduced = useReducedMotion()
  const fine = useFinePointer()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || !fine) return

    let frame = 0
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2 * strength
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2 * strength
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const tick = () => {
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      el.style.setProperty('--mx', cx.toFixed(4))
      el.style.setProperty('--my', cy.toFixed(4))
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        frame = requestAnimationFrame(tick)
      } else {
        frame = 0
      }
    }

    const onLeave = () => {
      tx = 0
      ty = 0
      if (!frame) frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [reduced, fine, strength])

  return ref
}

/* --------------------------------------------------------------------------
 *  PALAVRA DINÂMICA — troca em intervalo, pausa com aba oculta e com
 *  movimento reduzido (nesse caso mostra a primeira palavra e para).
 * ----------------------------------------------------------------------- */
export function useRotatingIndex(total: number, intervalMs = 2400) {
  const [index, setIndex] = useState(0)
  const tabVisible = useTabVisible()
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !tabVisible || total <= 1) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [total, intervalMs, tabVisible, reduced])

  return index
}

/* --------------------------------------------------------------------------
 *  PREENCHIMENTO POR SCROLL COM SUAVIZAÇÃO (scrub estilo GSAP ScrollTrigger)
 * ---------------------------------------------------------------------------
 *  Escreve `--p` (0..1) direto no elemento a cada frame — sem re-render — e
 *  persegue o alvo com interpolação exponencial: quando o scroll para, o
 *  valor continua deslizando suavemente até encostar no alvo.
 *
 *  Devolve `reached`: quantos passos o líquido já cobriu. Isso sim passa por
 *  estado, mas só muda uma vez por passo (≈5x na seção inteira), então não
 *  custa nada — é o que acende os números.
 * ----------------------------------------------------------------------- */
export function useScrollFill<T extends HTMLElement = HTMLDivElement>(
  steps: number,
  ease = 0.09,
) {
  const ref = useRef<T | null>(null)
  const [reached, setReached] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n)

    /* Alvo travado na posição de leitura: p=0 quando o 1º passo chega ao centro
       da viewport, p=1 quando o último passo chega ao centro. Assim o "líquido"
       anda junto com o passo que a pessoa está lendo — nunca dispara na frente. */
    const targetProgress = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const seg = r.height / steps
      const span = seg * (steps - 1)
      if (span <= 0) return r.top <= 0 ? 1 : 0
      const topAtStart = vh / 2 - seg * 0.5
      return clamp01((topAtStart - r.top) / span)
    }

    /* Acende o passo i quando a máscara verde chega nele. A máscara revela a
       fração p da altura do trilho, e o passo i está a (i + 0.5) / steps
       dessa altura — mesma referência, então batem visualmente. */
    const syncReached = (p: number) => {
      let n = 0
      for (let i = 0; i < steps; i += 1) {
        if (p + 1e-4 >= (i + 0.5) / steps) n += 1
      }
      setReached((prev) => (prev === n ? prev : n))
    }

    /* Movimento reduzido: sem perseguição, acompanha o scroll cru. */
    if (reduced) {
      const apply = () => {
        const p = targetProgress()
        el.style.setProperty('--p', p.toFixed(4))
        syncReached(p)
      }
      apply()
      window.addEventListener('scroll', apply, { passive: true })
      window.addEventListener('resize', apply, { passive: true })
      return () => {
        window.removeEventListener('scroll', apply)
        window.removeEventListener('resize', apply)
      }
    }

    let current = targetProgress()
    let raf = 0
    let running = false

    const frame = () => {
      const target = targetProgress()
      current += (target - current) * ease
      if (Math.abs(target - current) < 0.0006) current = target
      el.style.setProperty('--p', current.toFixed(4))
      syncReached(current)
      if (current !== target) {
        raf = requestAnimationFrame(frame)
      } else {
        running = false
        raf = 0
      }
    }

    const kick = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(frame)
    }

    el.style.setProperty('--p', current.toFixed(4))
    syncReached(current)
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', kick, { passive: true })
    kick()

    return () => {
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', kick)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [steps, ease, reduced])

  return { ref, reached }
}

/* --------------------------------------------------------------------------
 *  TÍTULO DA ABA POR PÁGINA
 *  Restaura o título da home ao desmontar, para o usuário nunca ficar com o
 *  título de uma página que já saiu.
 * ----------------------------------------------------------------------- */
export function useTituloPagina(titulo: string) {
  useEffect(() => {
    document.title = titulo
    return () => {
      document.title = 'Fábrica de Sites — Seu site, sem complicação'
    }
  }, [titulo])
}
