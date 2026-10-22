import { Link } from 'react-router-dom'
import { NAV } from '../data'

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap" style={{ display: 'block' }}>
        <p className="big">Let’s build something<br />that lasts.</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <span>© 2026 Loudbird Studio · hello@loudbird.dev</span>
          <span style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
            {NAV.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
            <Link to="/admin">Admin</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
