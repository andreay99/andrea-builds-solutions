import { PageTransition } from "@/components/PageTransition";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Briefcase, GraduationCap, Trophy, ExternalLink } from "lucide-react";

const ACCENT   = '#00C9D8';
const EDU      = '#a78bfa';
const GOLD     = '#ffd232';

/* ── Data ─────────────────────────────────────────────────── */
const EXPERIENCE = [
  {
    type: 'work',
    title: 'NASA-Funded AI Solar Eruption Research',
    org: 'NASA MIRO Program · NJIT',
    period: 'Nov 2025 – Present',
    description: 'Selected for prestigious NASA-funded research conducting AI-powered solar eruption analysis using satellite data.',
    highlights: [
      'Applying ML to analyze solar flare activity from NASA satellite data',
      'Developing prediction models for solar eruptions',
      'Working under Dr. Qin Li on cutting-edge space weather research',
    ],
    tags: ['Python', 'ML', 'NASA', 'Space Weather'],
  },
  {
    type: 'work',
    title: 'Training Lead',
    org: 'Apple · Edison, NJ',
    period: 'Jul 2025 – Dec 2025',
    description: 'Led technical training programs and mentored team members on Apple products and services.',
    highlights: [
      'Led training program that improved launch sales performance',
      'Delivered performance metrics to leadership, accelerating tool adoption',
      'Structured mentorship pipeline for new technicians',
    ],
    tags: ['Leadership', 'Training', 'Mentorship'],
  },
  {
    type: 'work',
    title: 'Technical Specialist',
    org: 'Apple · Edison, NJ',
    period: 'Aug 2024 – Mar 2026',
    description: "Expert technical support across Apple's full ecosystem — troubleshooting, mentoring, and improving team KPIs.",
    highlights: [
      'Raised customer satisfaction 15% through effective problem resolution',
      'Mentored peers in structured problem-solving, increasing team efficiency 40%',
    ],
    tags: ['Technical Support', 'Mentorship', 'Apple Ecosystem'],
    metrics: [{ val: '15%', label: 'CSAT lift' }, { val: '40%', label: 'team efficiency' }],
  },
  {
    type: 'education',
    title: 'B.S. in Computer Science',
    org: 'New Jersey Institute of Technology',
    period: 'Expected Aug 2027',
    description: 'Specializing in AI/ML and full-stack development. Transfer student from Middlesex County College.',
    highlights: [],
    tags: ['AI / ML', 'Full-Stack', 'Data Structures'],
  },
  {
    type: 'education',
    title: 'Associate of Computer Science',
    org: 'Middlesex County College',
    period: 'Graduated Aug 2025',
    description: 'Foundational coursework in Data Structures and Database Systems.',
    highlights: [],
    tags: ['Data Structures', 'Databases', 'Algorithms'],
  },
];

const HACKATHONS = [
  {
    event: 'HackPrinceton SP2026',
    location: 'Princeton, NJ',
    project: 'ROM-COM',
    subtitle: 'Stroke & TBI Rehabilitation System',
    description: 'Gesture classification pipeline (Random Forest), feature extractor, and FMA-UE scoring engine. MediaPipe-based motion tracking and adaptive ROM calibration with FastAPI WebSocket endpoints for real-time rehab feedback.',
    tags: ['Python', 'MediaPipe', 'FastAPI', 'scikit-learn', 'React', 'TypeScript'],
    awards: [],
  },
  {
    event: 'HackPrinceton 2025',
    location: 'Princeton, NJ',
    project: 'Recall',
    subtitle: 'Assistive Memory System',
    description: 'AI-powered face recognition and contextual memory system designed to help users with memory challenges identify people and recall context in real time.',
    tags: ['Python', 'OpenCV', 'DeepFace', 'MongoDB', 'Grok', 'ElevenLabs'],
    awards: ['Best Use of Grok (xAI)', 'Best Use of Arm (MLH)'],
  },
  {
    event: 'HackHarvard 2025',
    location: 'Cambridge, MA',
    project: 'OffScript',
    subtitle: 'AI Interview Simulator',
    description: 'Led a team of 3 engineers to build a full-stack AI-powered interview simulator with real-time evaluation and personalized feedback in 36 hours.',
    tags: ['Next.js', 'FastAPI', 'Gemini AI', 'TypeScript'],
    awards: [],
  },
];

/* ── Helpers ───────────────────────────────────────────────── */
const glass: React.CSSProperties = {
  background: 'rgba(8,9,14,0.45)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 16,
};

const Tag = ({ label, color = ACCENT }: { label: string; color?: string }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center',
    padding: '3px 10px', borderRadius: 40,
    fontSize: 11, fontWeight: 500, letterSpacing: '0.04em',
    background: `${color}14`, color, border: `1px solid ${color}28`,
    fontFamily: 'Inter, sans-serif',
  }}>{label}</span>
);

const AwardBadge = ({ text }: { text: string }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 5,
    padding: '4px 10px', borderRadius: 40,
    fontSize: 11, fontWeight: 600, letterSpacing: '0.03em',
    background: 'rgba(255,210,50,0.1)', color: GOLD,
    border: '1px solid rgba(255,210,50,0.25)',
    fontFamily: 'Inter, sans-serif',
  }}>🏆 {text}</span>
);

/* ── TimelineCard ───────────────────────────────────────────── */
interface ExpItem {
  type: string; title: string; org: string; period: string;
  description: string; highlights: string[]; tags: string[];
  metrics?: { val: string; label: string }[];
}

const TimelineCard = ({ item, last }: { item: ExpItem; last: boolean }) => {
  const isWork = item.type === 'work';
  const dotColor = isWork ? ACCENT : EDU;
  const Icon = isWork ? Briefcase : GraduationCap;

  return (
    <div style={{ display: 'flex', gap: 20, paddingBottom: last ? 0 : 36 }}>
      {/* Spine */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 24 }}>
        <div style={{
          width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
          background: `${dotColor}18`, border: `1.5px solid ${dotColor}`,
          boxShadow: `0 0 14px ${dotColor}60`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={12} color={dotColor} />
        </div>
        {!last && (
          <div style={{
            width: 1, flex: 1, marginTop: 6,
            background: `linear-gradient(to bottom, ${dotColor}40, rgba(255,255,255,0.04))`,
          }}/>
        )}
      </div>

      {/* Card */}
      <div style={{ ...glass, flex: 1, padding: '20px 22px', marginTop: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
          <div>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#f0f0f5', marginBottom: 3 }}>{item.title}</h3>
            <p style={{ fontSize: 13, color: dotColor, fontWeight: 600 }}>{item.org}</p>
          </div>
          <span style={{
            fontSize: 11, color: 'rgba(240,240,245,0.3)', whiteSpace: 'nowrap',
            background: 'rgba(255,255,255,0.04)', padding: '4px 10px', borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.06)', letterSpacing: '0.03em',
          }}>{item.period}</span>
        </div>

        {/* Description */}
        <p style={{ fontSize: 13.5, color: 'rgba(240,240,245,0.5)', lineHeight: 1.65, marginBottom: item.highlights.length || item.metrics ? 12 : 4 }}>
          {item.description}
        </p>

        {/* Metrics */}
        {item.metrics && item.metrics.length > 0 && (
          <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
            {item.metrics.map(m => (
              <div key={m.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: ACCENT, fontFamily: 'Space Grotesk, sans-serif' }}>{m.val}</div>
                <div style={{ fontSize: 10, color: 'rgba(240,240,245,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Highlights */}
        {item.highlights.length > 0 && (
          <ul style={{ paddingLeft: 14, marginBottom: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {item.highlights.map((h, i) => (
              <li key={i} style={{ fontSize: 13, color: 'rgba(240,240,245,0.45)', lineHeight: 1.55 }}>{h}</li>
            ))}
          </ul>
        )}

        {/* Tags */}
        {item.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
            {item.tags.map(t => <Tag key={t} label={t} color={dotColor} />)}
          </div>
        )}
      </div>
    </div>
  );
};

/* ── HackathonCard ──────────────────────────────────────────── */
interface HackItem {
  event: string; location: string; project: string;
  subtitle: string; description: string; tags: string[]; awards: string[];
}

const HackCard = ({ h }: { h: HackItem }) => (
  <div style={{ ...glass, padding: '24px 26px', position: 'relative', overflow: 'hidden' }}>
    {/* Glow accent */}
    {h.awards.length > 0 && (
      <div style={{
        position: 'absolute', top: 0, right: 0, width: 160, height: 160,
        background: `radial-gradient(circle, ${GOLD}12 0%, transparent 70%)`,
        pointerEvents: 'none',
      }}/>
    )}

    {/* Event row */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Trophy size={14} color={h.awards.length > 0 ? GOLD : ACCENT} />
        <span style={{ fontSize: 11, color: h.awards.length > 0 ? GOLD : ACCENT, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h.event}</span>
      </div>
      <span style={{ fontSize: 11, color: 'rgba(240,240,245,0.25)', letterSpacing: '0.03em' }}>{h.location}</span>
    </div>

    {/* Project name */}
    <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.05rem', fontWeight: 700, color: '#f0f0f5', marginBottom: 2 }}>{h.project}</h3>
    <p style={{ fontSize: 12, color: 'rgba(240,240,245,0.4)', marginBottom: 10, fontStyle: 'italic' }}>{h.subtitle}</p>

    {/* Awards */}
    {h.awards.length > 0 && (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {h.awards.map(a => <AwardBadge key={a} text={a} />)}
      </div>
    )}

    {/* Description */}
    <p style={{ fontSize: 13, color: 'rgba(240,240,245,0.45)', lineHeight: 1.65, marginBottom: 14 }}>{h.description}</p>

    {/* Tech tags */}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {h.tags.map(t => <Tag key={t} label={t} color={ACCENT} />)}
    </div>
  </div>
);

/* ── Page ───────────────────────────────────────────────────── */
const Experience = () => (
  <PageTransition>
    <AuroraBackground />
    <div style={{ background: 'transparent', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="page-enter" style={{ paddingTop: 120, paddingBottom: 100 }}>
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 32px' }}>

          {/* Header */}
          <p style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: ACCENT, marginBottom: 14, fontWeight: 600 }}>Career</p>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 700, color: '#f0f0f5', marginBottom: 14, lineHeight: 1.1 }}>Experience</h2>
          <p style={{ color: 'rgba(240,240,245,0.45)', fontSize: 15, marginBottom: 56, maxWidth: 480 }}>
            From NASA research to Apple — building and shipping across the stack.
          </p>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 20, marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }}/>
              <span style={{ fontSize: 12, color: 'rgba(240,240,245,0.4)' }}>Work</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: EDU, boxShadow: `0 0 8px ${EDU}` }}/>
              <span style={{ fontSize: 12, color: 'rgba(240,240,245,0.4)' }}>Education</span>
            </div>
          </div>

          {/* Timeline */}
          {EXPERIENCE.map((item, i) => (
            <TimelineCard key={item.title} item={item} last={i === EXPERIENCE.length - 1} />
          ))}

          {/* ── Hackathons ─────────────────────────────────── */}
          <div style={{ marginTop: 80 }}>
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,210,50,0.2), transparent)', marginBottom: 48 }}/>
            <p style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD, marginBottom: 14, fontWeight: 600 }}>Competitions</p>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700, color: '#f0f0f5', marginBottom: 8, lineHeight: 1.1 }}>Hackathons</h2>
            <p style={{ color: 'rgba(240,240,245,0.4)', fontSize: 14, marginBottom: 36 }}>3 events · 2 awards</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {HACKATHONS.map(h => <HackCard key={h.event} h={h} />)}
            </div>
          </div>

        </div>
      </div>
    </div>
  </PageTransition>
);

export default Experience;
