import { useState } from 'react'
import usePageTitle from '../hooks/usePageTitle'
import { CATEGORIES, PROJECTS } from '../data'
import ProjectCard from '../components/ProjectCard'
import CtaBand from '../components/CtaBand'

export default function Work() {
  usePageTitle('Work')
  const [f, setF] = useState('All')
  const list = PROJECTS.filter((p) => f === 'All' || p.category === f)
  return (
    <>
      <div className="ph wrap">
        <p className="eyebrow work-eyebrow"><span /> Selected campaigns · 2017—2026</p>
        <h1>Growth, in action.</h1>
        <p>Real-world digital marketing campaigns across search, paid media, social and email.</p>
      </div>
      <section style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="filters" role="group" aria-label="Filter campaigns">
            {CATEGORIES.map((c) => <button key={c} className="chip" aria-pressed={f === c} onClick={() => setF(c)}>{c}</button>)}
            <span className="filter-count" aria-live="polite">{String(list.length).padStart(2, '0')} campaigns</span>
          </div>
          <div className="grid work-grid">{list.map((p, i) => <ProjectCard key={p.slug} p={p} featured index={i} />)}</div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
