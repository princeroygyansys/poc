import { Link } from 'react-router-dom'

export default function ProjectCard({ p }) {
  return (
    <Link className="proj" to={`/work/${p.slug}`}>
      <div className="art" style={{ background: p.color }} aria-hidden="true">{p.client[0]}</div>
      <div className="b">
        <h3>{p.client}</h3>
        <p>{p.summary}</p>
        <div className="tags">{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
      </div>
    </Link>
  )
}
