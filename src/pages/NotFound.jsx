import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <div className="wrap notfound">
      <h1>404</h1>
      <p style={{ fontSize: 22 }}>That page doesn’t exist. Try heading back home.</p>
      <Link className="btn" to="/">Go home</Link>
    </div>
  )
}
