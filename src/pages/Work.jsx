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
        <h1>Our work.</h1>
        <p>A few recent projects. Click any to read the full story.</p>
      </div>
      <section style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="filters" role="group" aria-label="Filter projects">
            {CATEGORIES.map((c) => <button key={c} className="chip" aria-pressed={f === c} onClick={() => setF(c)}>{c}</button>)}
          </div>
          <div className="grid">{list.map((p) => <ProjectCard key={p.slug} p={p} />)}</div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
