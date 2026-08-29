import { useEffect, useRef } from 'react'
import { useFinePointer, useReducedMotion } from '../hooks'

type Particle = {
  x: number
  y: number
  originX: number
  originY: number
  velocityX: number
  velocityY: number
  radius: number
  opacity: number
  phase: number
}

export function GreenParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const reduced = useReducedMotion()
  const finePointer = useFinePointer()

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    const context = canvas?.getContext('2d')

    if (!canvas || !host || !context) return

    let width = 0
    let height = 0
    let animationFrame = 0
    let visible = true
    let particles: Particle[] = []

    const cursor = {
      x: -9999,
      y: -9999,
      active: false,
    }

    const createRandom = () => {
      let seed = 918273
      return () => {
        seed = (seed * 16807) % 2147483647
        return (seed - 1) / 2147483646
      }
    }

    const buildParticles = () => {
      const random = createRandom()
      const amount = Math.min(
        620,
        Math.max(180, Math.round((width * height) / 2600)),
      )

      particles = Array.from({ length: amount }, () => {
        const x = random() * width
        const y = random() * height

        return {
          x,
          y,
          originX: x,
          originY: y,
          velocityX: 0,
          velocityY: 0,
          radius: 0.45 + random() * 1.45,
          opacity: 0.1 + random() * 0.38,
          phase: random() * Math.PI * 2,
        }
      })
    }

    const draw = (time: number, animate: boolean) => {
      context.clearRect(0, 0, width, height)

      particles.forEach((point) => {
        let influence = 0

        if (animate) {
          point.velocityX +=
            Math.sin(time * 0.00038 + point.phase) * 0.006
          point.velocityY +=
            Math.cos(time * 0.00032 + point.phase) * 0.006

          if (cursor.active) {
            const deltaX = point.x - cursor.x
            const deltaY = point.y - cursor.y
            const distance = Math.max(1, Math.hypot(deltaX, deltaY))
            const radius = 210

            if (distance < radius) {
              influence = 1 - distance / radius
              const force = influence * influence * 0.42

              point.velocityX += (deltaX / distance) * force
              point.velocityY += (deltaY / distance) * force
            }
          }

          point.velocityX += (point.originX - point.x) * 0.008
          point.velocityY += (point.originY - point.y) * 0.008
          point.velocityX *= 0.91
          point.velocityY *= 0.91
          point.x += point.velocityX
          point.y += point.velocityY
        }

        const opacity = Math.min(
          0.92,
          point.opacity + influence * 0.55,
        )
        const radius = point.radius * (1 + influence * 1.5)

        context.beginPath()
        context.arc(point.x, point.y, radius, 0, Math.PI * 2)
        context.fillStyle = `rgba(0, 255, 0, ${opacity})`
        context.fill()
      })
    }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)

      width = rect.width
      height = rect.height

      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      buildParticles()
      draw(performance.now(), false)
    }

    const animate = (time: number) => {
      if (!visible) {
        animationFrame = 0
        return
      }

      draw(time, !reduced)
      animationFrame = requestAnimationFrame(animate)
    }

    const startAnimation = () => {
      if (!animationFrame && visible && !reduced) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer) return

      const rect = host.getBoundingClientRect()
      cursor.x = event.clientX - rect.left
      cursor.y = event.clientY - rect.top
      cursor.active = true
      startAnimation()
    }

    const onPointerLeave = () => {
      cursor.active = false
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting

        if (visible) {
          startAnimation()
        } else if (animationFrame) {
          cancelAnimationFrame(animationFrame)
          animationFrame = 0
        }
      },
      { rootMargin: '150px' },
    )

    resize()
    observer.observe(host)
    host.addEventListener('pointermove', onPointerMove, { passive: true })
    host.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('resize', resize, { passive: true })

    if (!reduced) startAnimation()

    return () => {
      observer.disconnect()
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('resize', resize)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [finePointer, reduced])

  return (
    <canvas
      ref={canvasRef}
      className="green-particle-field"
      aria-hidden="true"
    />
  )
}
