import { useNavigate } from "react-router-dom";
import { OrbitButton } from "@/components/OrbitButton";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="sky-page" style={{ display: 'flex', alignItems: 'center' }}>
      <div className="sky-stars" aria-hidden />
      <div className="sky-head" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <p className="contact-label">404</p>
        <h1 className="contact-statement">Page not found</h1>
        <p style={{ marginTop: 22 }}>There’s nothing at this address. It may have moved when the site was rebuilt.</p>
        <div style={{ marginTop: 30 }}><OrbitButton onClick={() => navigate('/')} icon={false}>Back to home</OrbitButton></div>
      </div>
    </div>
  );
};

export default NotFound;
