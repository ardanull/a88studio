'use client'

import { useEffect, useRef, useState } from 'react'

interface ParallaxOptions {
  speed?: number // 0.1 to 1 (slower to faster)
  direction?: 'up' | 'down'
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.5, direction = 'up' } = options
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const scrolled = window.scrollY
      const elementTop = rect.top + scrolled
      const windowHeight = window.innerHeight

      // Only calculate if element is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (scrolled - elementTop + windowHeight) / (windowHeight + rect.height)
        const movement = progress * 100 * speed
        setOffset(direction === 'up' ? -movement : movement)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [speed, direction])

  return { ref, offset }
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = (scrolled / scrollHeight) * 100
      setProgress(progress)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}

interface MouseParallaxOptions {
  strength?: number // How much to move (pixels)
  reverse?: boolean
}

export function useMouseParallax(options: MouseParallaxOptions = {}) {
  const { strength = 20, reverse = false } = options
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) / rect.width
      const deltaY = (e.clientY - centerY) / rect.height

      const multiplier = reverse ? -1 : 1

      setPosition({
        x: deltaX * strength * multiplier,
        y: deltaY * strength * multiplier,
      })
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }

    const element = ref.current
    if (element) {
      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove)
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [strength, reverse])

  return { ref, position }
}
