import usePageTitle from '../hooks/usePageTitle';
import { TEAM, VALUES } from '../data';
import CtaBand from '../components/CtaBand';

const VALUE_MARKS = ['✳', '↗', '◎'];

export default function About() {
  usePageTitle('About');
  return (
    <div className='about-page'>
      <section className='about-hero'>
        <div className='wrap about-hero-grid'>
          <div className='about-hero-copy'>
            <p className='eyebrow about-eyebrow'><span /> Independent by nature · Growth by design</p>
            <h1>Good marketing starts with <span>good people.</span></h1>
            <p className='about-intro'>
              Loudbird is an independent digital marketing agency based in XYZ City. Since 2017, we’ve
              helped businesses build visibility, connect with customers and grow through thoughtful
              strategy and measurable campaigns.
            </p>
            <div className='about-highlights' aria-label='About Loudbird'>
              <span><b>2017</b> <small>Founded</small></span>
              <span><b>Independent</b> <small>By design</small></span>
              <span><b>Digital-first</b> <small>Growth-minded</small></span>
            </div>
          </div>
          <div className='about-orbit' aria-hidden='true'>
            <span className='about-orbit-ring about-orbit-ring-one' />
            <span className='about-orbit-ring about-orbit-ring-two' />
            <span className='about-orbit-core'>L</span>
            <span className='about-orbit-note'>Strategy<br />meets momentum</span>
          </div>
        </div>
      </section>

      <section className='about-values-section'>
        <div className='wrap'>
          <div className='about-section-heading'>
            <div>
              <p className='about-kicker'>THE WAY WE WORK</p>
              <h2>What we believe.</h2>
            </div>
            <p>Good partnerships come from shared principles, honest conversations and work that makes a difference.</p>
          </div>
          <div className='about-values'>
            {VALUES.map(([title, description], i) => (
              <article className='about-value' key={title} style={{ '--value-index': i }}>
                <div className='about-value-top'>
                  <span className='about-value-mark' aria-hidden='true'>{VALUE_MARKS[i]}</span>
                  <span className='about-index'>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className='about-value-line' aria-hidden='true' />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='about-team-section'>
        <div className='wrap'>
          <div className='about-section-heading'>
            <div>
              <p className='about-kicker'>PEOPLE BEHIND THE WORK</p>
              <h2>Your growth team.</h2>
            </div>
            <p>A curious, collaborative team bringing strategy, performance, search and creative together.</p>
          </div>
          <div className='about-team'>
            {TEAM.map((member, i) => (
              <article className='about-person' key={member.name} style={{ '--person-color': member.color, '--person-index': i }}>
                <div className='about-person-art'>
                  <span className='about-person-orbit' aria-hidden='true' />
                  <span className='avatar' aria-hidden='true'>
                    {member.name.split(' ').map(word => word[0]).join('')}
                  </span>
                  <span className='about-person-number'>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className='about-person-copy'>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
