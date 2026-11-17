import { useNavigate } from "react-router-dom";
import { ArrowLeft, Satellite } from "lucide-react";
import { AuroraBackground } from "@/components/AuroraBackground";

const ACCENT = '#00C9D8';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <AuroraBackground />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 32px 80px', position: 'relative', zIndex: 1 }}>
        <Satellite size={44} color={ACCENT} style={{ animation: 'drift 6s ease-in-out infinite', marginBottom: 28, filter: `drop-shadow(0 0 18px ${ACCENT}80)` }} />
        <p style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: ACCENT, marginBottom: 14, fontWeight: 600 }}>Signal lost</p>
        <h1 style={{ fontSize: 'clamp(5rem,18vw,11rem)', lineHeight: 0.9, marginBottom: 20, color: 'transparent', WebkitTextStroke: '1.5px rgba(240,240,245,0.55)' }}>404</h1>
        <p style={{ color: 'rgba(240,240,245,0.5)', fontSize: 15, maxWidth: 380, marginBottom: 36 }}>
          This page drifted out of orbit. Nothing here but stars.
        </p>
        <button onClick={() => navigate('/')} className="btn-primary">
          <ArrowLeft size={16} /> Back to home
        </button>
      </div>
    </>
  );
};

export default NotFound;
