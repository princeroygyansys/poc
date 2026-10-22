import { useState } from 'react'

export default function useTheme() {
  const [mode, setMode] = useState(null)
  const toggle = () => {
    const dark = mode ? mode === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches
    const next = dark ? 'light' : 'dark'
    setMode(next)
    document.documentElement.dataset.theme = next
  }
  return [mode, toggle]
}
