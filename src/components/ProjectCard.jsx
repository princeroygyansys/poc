import { Link } from 'react-router-dom'

export default function ProjectCard({ p, featured = false, index = 0 }) {
  return (
    <Link className={`proj${featured ? ' proj--featured' : ''}`} style={featured ? { '--card-index': index } : undefined} to={`/work/${p.slug}`}>
      <div className="art" style={{ '--project-color': p.color }} aria-hidden="true">
        <span className="art-orbit art-orbit--one" />
        <span className="art-orbit art-orbit--two" />
        <span className="art-mark">{p.icon}</span>
        <span className="art-label">{p.category} / case study</span>
        {featured && p.results?.[0] && (
          <span className="art-result"><strong>{p.results[0][0]}</strong><small>{p.results[0][1]}</small></span>
        )}
      </div>
      <div className="b">
        <div className="proj-heading">
          <div><span className="proj-category">{p.category}</span><h3>{p.client}</h3></div>
          <span className="proj-arrow" aria-hidden="true">↗</span>
        </div>
        <p>{p.summary}</p>
        <div className="proj-bottom">
          <div className="tags">{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
          {featured && <span className="proj-cta">Explore case <span aria-hidden="true">→</span></span>}
        </div>
      </div>
    </Link>
  )
}
