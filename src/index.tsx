import { RefObject, useEffect, useRef, useState } from 'react'

type Size = {
  width: number
  height: number
  entry: ResizeObserverEntry | null
}

export function useChildSizes<T extends HTMLElement>(): [RefObject<T>, Size[]] {
  const ref = useRef<T>(null)
  const [sizes, setSizes] = useState<Size[]>([])

  useEffect(() => {
    if (!ref.current) return

    let sizes: Size[] = Array.from(ref.current.children).map(() => ({
      width: 0,
      height: 0,
      entry: null
    }))

    const ro = new ResizeObserver((entries) => {
      if (!ref.current) return

      const children = Array.from(ref.current.children)

      for (const entry of entries) {
        const index = children.indexOf(entry.target)
        const { width, height } = entry.contentRect
        sizes = [
          ...sizes.slice(0, index),
          { width, height, entry },
          ...sizes.slice(index + 1)
        ]
      }
      setSizes(sizes)
    })

    for (const el of (ref.current.children as unknown) as Element[]) {
      ro.observe(el)
    }

    const mo = new MutationObserver(() => {
      if (!ref.current) return

      ro.disconnect()
      sizes = Array.from(ref.current.children).map(() => ({
        width: 0,
        height: 0,
        entry: null
      }))
      setSizes(sizes)
      for (const child of (ref.current.children as unknown) as Element[]) {
        ro.observe(child)
      }
    })
    mo.observe(ref.current, { childList: true })

    return () => {
      ro.disconnect()
      mo.disconnect()
    }
  }, [])

  return [ref, sizes]
}
