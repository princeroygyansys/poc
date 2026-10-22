import { useEffect } from 'react'

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} – Loudbird` : 'Loudbird – Digital Marketing Agency'
  }, [title])
}
