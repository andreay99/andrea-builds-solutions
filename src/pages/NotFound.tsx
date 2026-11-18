import { useNavigate } from "react-router-dom";
import { OrbitButton } from "@/components/OrbitButton";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="sky-page" style={{ display: 'flex', alignItems: 'center' }}>
      <div className="sky-stars" aria-hidden />
      <div className="sky-head" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <p className="contact-label">Error 404 · signal lost</p>
        <h1 className="contact-statement">This page drifted<br /><em>out of orbit.</em></h1>
        <p style={{ marginTop: 22 }}>Nothing here but stars. The rest of the site is right where you left it.</p>
        <div style={{ marginTop: 30 }}><OrbitButton onClick={() => navigate('/')} icon={false}>Back to home</OrbitButton></div>
      </div>
    </div>
  );
};

export default NotFound;
