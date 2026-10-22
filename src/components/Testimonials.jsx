import { QUOTES } from '../data'

export default function Testimonials() {
  return (
    <section>
      <div className="wrap">
        <h2>Kind words</h2>
        <div className="quotes">
          {QUOTES.map((q) => (
            <figure className="q" key={q.name} style={{ margin: 0 }}>
              <p>“{q.text}”</p>
              <figcaption><strong>{q.name}</strong><br />{q.role}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
