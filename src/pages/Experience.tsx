import { PageTransition } from "@/components/PageTransition";

const ACCENT = '#00C9D8';

const EXPERIENCE = [
  {
    title: 'NASA-Funded AI Solar Eruption Research',
    organization: 'NASA MIRO Program · NJIT',
    period: 'Nov 2025 – Present',
    type: 'work',
    description: 'Selected for prestigious NASA-funded research conducting AI-powered solar eruption analysis using satellite data.',
    highlights: [
      'Applying ML to analyze solar flare activity from NASA satellite data',
      'Developing prediction models for solar eruptions',
      'Working under Dr. Qin Li on cutting-edge space weather research',
    ],
  },
  {
    title: 'Training Lead',
    organization: 'Apple · Edison, NJ',
    period: 'Jul 2025 – Dec 2025',
    type: 'work',
    description: 'Lead technical training programs and mentor team members on Apple products and services.',
    highlights: [
      'Led training program that improved launch sales performance',
      'Delivered performance metrics to leadership, accelerating tool adoption',
      'Structured mentorship to new technicians',
    ],
  },
  {
    title: 'Technical Specialist',
    organization: 'Apple · Edison, NJ',
    period: 'Aug 2024 – Mar 2026',
    type: 'work',
    description: "Expert technical support across Apple's full ecosystem — troubleshooting, mentoring, and improving team KPIs.",
    highlights: [
      'Raised customer satisfaction 15% through effective problem resolution',
      'Mentored peers in structured problem-solving, increasing team efficiency 40%',
    ],
  },
  {
    title: 'B.S. in Computer Science',
    organization: 'New Jersey Institute of Technology',
    period: 'Expected Aug 2027',
    type: 'education',
    description: 'Specializing in AI/ML and full-stack development. Transfer student.',
    highlights: [],
  },
  {
    title: 'Associate of Computer Science',
    organization: 'Middlesex County College',
    period: 'Graduated Aug 2025',
    type: 'education',
    description: 'Completed foundational coursework in Data Structures and Database Systems.',
    highlights: [],
  },
];

const HACKATHONS = [
  {
    event: 'HackPrinceton SP2026',
    project: 'ROM-COM — Stroke & TBI Rehabilitation System',
    bullets: [
      'Built gesture classification pipeline (Random Forest), feature extractor, and FMA-UE scoring engine',
      'Implemented MediaPipe-based motion tracking and adaptive ROM calibration',
      'Wired FastAPI WebSocket endpoints for real-time rehab feedback',
      'Tech: Python · MediaPipe · FastAPI · scikit-learn · React · TypeScript',
    ],
  },
  {
    event: 'HackPrinceton 2025',
    project: 'Recall — Assistive Memory System',
    bullets: ['🏆 Best Use of Grok (xAI)', '🏆 Best Use of Arm (MLH)'],
  },
  {
    event: 'HackHarvard 2025',
    project: 'OffScript — AI Interview Simulator',
    bullets: ['Led team of 3 engineers to build full-stack MVP in 36 hours'],
  },
];

interface ExperienceItem {
  title: string;
  organization: string;
  period: string;
  type: string;
  description: string;
  highlights: string[];
}

const TimelineItem = ({ item, last }: { item: ExperienceItem; last: boolean }) => (
  <div style={{ display: 'flex', gap: 20, paddingBottom: last ? 0 : 40 }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
      <div style={{
        width: 12, height: 12, borderRadius: '50%', marginTop: 4,
        background: item.type === 'work' ? ACCENT : 'rgba(255,255,255,0.2)',
        boxShadow: item.type === 'work' ? `0 0 12px ${ACCENT}80` : 'none',
        flexShrink: 0,
      }}/>
      {!last && <div style={{ width: 1, flex: 1, background: 'rgba(255,255,255,0.07)', marginTop: 6 }}/>}
    </div>
    <div style={{ flex: 1, paddingBottom: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
        <div>
          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', fontWeight: 600, color: '#f0f0f5', marginBottom: 2 }}>{item.title}</h3>
          <p style={{ fontSize: 13, color: ACCENT, fontWeight: 500 }}>{item.organization}</p>
        </div>
        <span style={{ fontSize: 12, color: 'rgba(240,240,245,0.22)', whiteSpace: 'nowrap' }}>{item.period}</span>
      </div>
      <p style={{ fontSize: 13.5, color: 'rgba(240,240,245,0.45)', lineHeight: 1.6 }}>{item.description}</p>
      {item.highlights.length > 0 && (
        <ul style={{ marginTop: 8, paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {item.highlights.map((h, i) => (
            <li key={i} style={{ fontSize: 13, color: 'rgba(240,240,245,0.45)', lineHeight: 1.5 }}>{h}</li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

const Experience = () => (
  <PageTransition>
    <div style={{ background: '#08090e', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="page-enter" style={{ paddingTop: 120, paddingBottom: 100 }}>
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 32px' }}>

          {/* Header */}
          <p style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: ACCENT, marginBottom: 14, fontWeight: 600 }}>Career</p>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 700, color: '#f0f0f5', marginBottom: 14, lineHeight: 1.1 }}>Experience</h2>
          <p style={{ color: 'rgba(240,240,245,0.45)', fontSize: 15, marginBottom: 56, maxWidth: 480 }}>
            From NASA research to Apple — building and shipping across the stack.
          </p>

          {/* Timeline */}
          {EXPERIENCE.map((item, i) => (
            <TimelineItem key={item.title} item={item} last={i === EXPERIENCE.length - 1} />
          ))}

          {/* Hackathons */}
          <div style={{ marginTop: 72 }}>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 48 }}/>
            <p style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: ACCENT, marginBottom: 14, fontWeight: 600 }}>Competitions</p>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700, color: '#f0f0f5', marginBottom: 36, lineHeight: 1.1 }}>Hackathons</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {HACKATHONS.map(h => (
                <div key={h.event} style={{ display: 'flex', gap: 20 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', marginTop: 4, background: ACCENT, boxShadow: `0 0 12px ${ACCENT}80`, flexShrink: 0 }}/>
                  <div>
                    <p style={{ fontSize: 12, color: ACCENT, fontWeight: 600, letterSpacing: '0.05em', marginBottom: 4 }}>{h.event}</p>
                    <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', fontWeight: 600, color: '#f0f0f5', marginBottom: 8 }}>{h.project}</h3>
                    <ul style={{ paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {h.bullets.map((b, i) => (
                        <li key={i} style={{ fontSize: 13, color: 'rgba(240,240,245,0.45)', lineHeight: 1.5 }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  </PageTransition>
);

export default Experience;
