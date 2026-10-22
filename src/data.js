export const NAV = [
  ['/', 'Home'], ['/services', 'Services'], ['/work', 'Work'], ['/about', 'About'], ['/contact', 'Contact'],
]

export const CLIENTS = ['Kiln', 'Orbit', 'Tidewatch', 'Mango', 'Fernhill', 'Quarto', 'Northwind']

export const STATS = [['120+', 'projects launched'], ['9', 'years in business'], ['4.9/5', 'average client rating']]

export const SERVICES = [
  { slug: 'web', icon: '▣', title: 'Web & product', color: '#DCE6F5', desc: 'Fast, accessible websites and web apps built to convert.', items: ['Marketing sites', 'Web apps & dashboards', 'E-commerce', 'Performance & SEO'] },
  { slug: 'brand', icon: '✺', title: 'Brand identity', color: '#E8E3F3', desc: 'Names, logos and visual systems with a point of view.', items: ['Brand strategy', 'Logo & identity', 'Type & colour systems', 'Brand guidelines'] },
  { slug: 'content', icon: '◐', title: 'Content & social', color: '#DDEBE3', desc: 'Campaigns and content your audience actually shares.', items: ['Social campaigns', 'Video & motion', 'Copywriting', 'Email marketing'] },
  { slug: 'growth', icon: '↗', title: 'Growth & analytics', color: '#F2E9DA', desc: 'Data-led experiments that turn visitors into customers.', items: ['Conversion audits', 'A/B testing', 'Analytics setup', 'Paid media'] },
]

export const PROJECTS = [
  { slug: 'kiln', client: 'Kiln', title: 'A ceramics studio finds its glaze', category: 'Brand', color: '#E8E3F3', icon: '◐', tags: ['Identity', 'Shopify'],
    summary: 'New identity and online store for a Jaipur ceramics studio.',
    challenge: 'Kiln made beautiful pottery but sold it through a dated site and inconsistent branding. Online orders were a trickle.',
    solution: 'We built a warm, tactile identity from the studio’s own glaze colours, then a fast Shopify store with story-led product pages.',
    results: [['+212%', 'online sales in 6 months'], ['2.4s', 'faster page load'], ['38%', 'repeat customers']] },
  { slug: 'pulse', client: 'Orbit Transit', title: 'Making the bus map readable', category: 'Web', color: '#DCE6F5', icon: '◎', tags: ['React', 'Data viz'],
    summary: 'A live transit dashboard for a city bus network.',
    challenge: 'Riders couldn’t tell when the next bus would arrive. Support calls were piling up.',
    solution: 'A calm real-time map with arrival predictions, saved stops and clear delay alerts, built as a fast progressive web app.',
    results: [['-45%', 'support calls'], ['180k', 'monthly riders'], ['4.8★', 'app store rating']] },
  { slug: 'tidewatch', client: 'Tidewatch', title: 'Surf forecasts without the noise', category: 'Web', color: '#F2E9DA', icon: '≈', tags: ['Mobile', 'Product'],
    summary: 'Companion app for surfers with tide charts and session logs.',
    challenge: 'Existing forecast apps overloaded surfers with data they never used.',
    solution: 'We distilled the forecast into one clear “go or no-go” score and designed a fast logging flow for use on the beach.',
    results: [['60k', 'downloads in 90 days'], ['71%', '30-day retention'], ['Top 10', 'sports category']] },
  { slug: 'mango', client: 'Mango Mail', title: 'Email that small shops can build', category: 'Product', color: '#F0E3E3', icon: '✉', tags: ['SaaS', 'UX'],
    summary: 'A drag-and-drop newsletter builder for small businesses.',
    challenge: 'Small shops found email tools too complex and too expensive.',
    solution: 'We cut the product down to the 12 blocks owners actually use and designed onboarding that gets a first email out in 10 minutes.',
    results: [['10 min', 'to first send'], ['+90%', 'trial conversions'], ['3.1x', 'revenue growth']] },
  { slug: 'fernhill', client: 'Fernhill Foods', title: 'A snack brand with a loud voice', category: 'Brand', color: '#DDEBE3', icon: '✦', tags: ['Packaging', 'Social'],
    summary: 'Packaging, social and launch campaign for a snack startup.',
    challenge: 'A crowded shelf and zero brand awareness for a new product line.',
    solution: 'Bold packaging, a playful tone of voice and a creator-led social launch that made the brand unmissable.',
    results: [['2.1M', 'launch-week reach'], ['400', 'stores in 3 months'], ['+65%', 'brand recall']] },
  { slug: 'quarto', client: 'Quarto Bank', title: 'Banking that doesn’t feel like banking', category: 'Product', color: '#E3EBF0', icon: '▦', tags: ['Fintech', 'Design system'],
    summary: 'Design system and onboarding for a challenger bank.',
    challenge: 'Sign-up took 14 steps and most people gave up halfway.',
    solution: 'A shared design system and a 4-step onboarding flow tested with real customers every week.',
    results: [['4 steps', 'down from 14'], ['+58%', 'completed sign-ups'], ['-30%', 'dev time per feature']] },
]
export const CATEGORIES = ['All', 'Brand', 'Web', 'Product']

export const PROCESS = [
  ['Discover', 'We learn your business, audience and goals through workshops and research.'],
  ['Define', 'We agree on strategy, scope and success metrics before anything is designed.'],
  ['Design & build', 'Weekly demos keep you close while we design, build and test.'],
  ['Launch & grow', 'We ship, measure and keep improving based on real data.'],
]

export const TEAM = [
  { name: 'Manish Varma', role: 'Founder & Creative Director', color: '#DCE6F5' },
  { name: 'Sofia Alvarez', role: 'Head of Strategy', color: '#E8E3F3' },
  { name: 'Daniel Okafor', role: 'Lead Engineer', color: '#DDEBE3' },
  { name: 'Priya Nair', role: 'Senior Designer', color: '#F2E9DA' },
  { name: 'Leo Tanaka', role: 'Motion Designer', color: '#E3EBF0' },
  { name: 'Aisha Khan', role: 'Account Manager', color: '#F0E3E3' },
]

export const VALUES = [
  ['Be bold', 'Safe work is forgettable. We push every project one step further than expected.'],
  ['Be clear', 'Plain talk, honest timelines and no jargon, from the first call to launch.'],
  ['Be useful', 'Pretty isn’t enough. Everything we make has to move a number that matters.'],
]

export const QUOTES = [
  { text: 'They took a vague idea and handed back a product our customers actually fell for.', name: 'Arjun Mehta', role: 'Founder, Kiln' },
  { text: 'The most thoughtful team we’ve worked with. Zero hand-holding needed.', name: 'Rhea Kapoor', role: 'Product Lead, Orbit' },
  { text: 'They make hard problems look easy, and the results speak for themselves.', name: 'Tom Becker', role: 'CTO, Quarto' },
]

export const BUDGETS = ['Under $5k', '$5k – $15k', '$15k – $50k', '$50k+', 'Not sure yet']
export const TIMELINES = ['ASAP', '1 – 2 months', '3 – 6 months', 'Flexible']
