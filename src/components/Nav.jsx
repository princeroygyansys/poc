import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useTheme from '../hooks/useTheme'
import { NAV } from '../data'

export default function Nav() {
  const [, toggle] = useTheme()
  const [open, setOpen] = useState(false)
  return (
    <header className="nav">
      <div className="wrap">
        <Link className="logo" to="/" onClick={() => setOpen(false)}>Loudbird</Link>
        <nav className={`links menu${open ? ' open' : ''}`} aria-label="Main">
          {NAV.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>
          ))}
        </nav>
        <div className="right">
          <button className="icon" onClick={toggle} aria-label="Toggle light and dark theme">◐</button>
          <Link className="btn pink" to="/contact" style={{ padding: '8px 18px' }}>Start a project</Link>
          <button className="icon burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu">{open ? '✕' : '☰'}</button>
        </div>
      </div>
    </header>
  )
}
