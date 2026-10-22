import { PROCESS } from '../data'

export default function Process() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <h2>How we work</h2>
        <div className="steps">
          {PROCESS.map(([t, d], i) => (
            <div className="step" key={t}><b>{i + 1}</b><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </div>
    </section>
  )
}
