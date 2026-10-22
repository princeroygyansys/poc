import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)

    const elements = document.querySelectorAll([
      '.ph',
      '.hero .herogrid > *',
      'section .wrap > h2',
      'section .wrap > .svcs > *',
      'section .wrap > .grid > *',
      'section .wrap > .steps > *',
      'section .wrap > .stats > *',
      'section .wrap > .quotes > *',
      'section .wrap > .team > *',
      '.formbox',
      '.cs-hero',
      '.prose',
      '.band .cta-band > *',
    ].join(','))

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        currentObserver.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' })

    elements.forEach((element, index) => {
      element.setAttribute('data-reveal', '')
      element.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 70}ms`)
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [pathname])

  return (
    <>
      <Nav />
      <main key={pathname} className="page-enter"><Outlet /></main>
      <Footer />
    </>
  )
}
