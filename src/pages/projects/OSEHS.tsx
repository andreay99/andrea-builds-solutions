import { CaseStudySection } from "@/components/CaseStudySection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";

const OSEHS = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-20">
        <div className="section-container max-w-5xl">
          <Button variant="ghost" asChild className="mb-8">
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="mb-4">OSEHS Digital Twin</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Orbital Solar Energy Harvesting Swarm — NASA ORBIT Challenge Phase 2
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge>2025 - Present</Badge>
              <Badge variant="secondary">NASA ORBIT Challenge</Badge>
              <Badge variant="secondary">Star Maker Team</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Python</Badge>
              <Badge variant="outline">NumPy</Badge>
              <Badge variant="outline">Matplotlib</Badge>
              <Badge variant="outline">Classical Orbital Elements</Badge>
              <Badge variant="outline">Kepler Solver</Badge>
              <Badge variant="outline">Swarm Coordination</Badge>
            </div>
          </div>

          <CaseStudySection title="Overview">
            <p>
              OSEHS is a high-fidelity digital twin simulation for the Star Maker team's submission to the NASA ORBIT Challenge Phase 2. It models an orbital swarm of solar energy harvesting panels operating in a heliocentric orbit, tracking Key Performance Parameters (KPPs) in real time through a 3D visualization interface.
            </p>
            <p>
              As the Software Programming Lead, I designed and built the entire simulation stack — orbital mechanics engine, swarm coordination logic, fault tolerance system, and real-time GUI — from scratch.
            </p>
          </CaseStudySection>

          <CaseStudySection title="Problem">
            <p>
              The NASA ORBIT Challenge required demonstrating that an orbital swarm of solar collectors can maintain safe formation, autonomously recover from unit failures, and sustain energy collection above defined KPP thresholds — all without ground intervention.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Simulate realistic heliocentric orbital mechanics at mission scale</li>
              <li>Maintain a pearl necklace formation across 12 collector units</li>
              <li>Prove ≥94% swarm functionality even after 10% unit dropout</li>
              <li>Achieve 95% autonomous error correction with no ground intervention</li>
              <li>Eliminate collision and shadow violations across 3-year simulation runs</li>
            </ul>
          </CaseStudySection>

          <CaseStudySection title="Solution">
            <p>
              I built a full simulation stack using Classical Orbital Elements (COE) as the state representation, with a Newton-Raphson Kepler solver for propagating true anomaly and ECI (Earth-Centered Inertial) rotation matrices for 3D position conversion.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>COE propagator with Kepler's equation via Newton-Raphson iteration</li>
              <li>Pearl necklace formation — units share semimajor axis, eccentricity, and inclination; distributed by RAAN</li>
              <li>Collision avoidance: nudges true anomaly outward when units approach closer than MIN_SAFE_DIST</li>
              <li>Shadow avoidance: nudges RAAN outward when angular separation drops below 10°</li>
              <li>Auto-rebalance on dropout: failed unit RAAN gaps are closed autonomously by redistributing remaining units</li>
              <li>Real-time 3D visualization with swarm health and energy collection plots</li>
            </ul>
          </CaseStudySection>

          <CaseStudySection title="Key Performance Parameters (KPPs)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-secondary/30 rounded-lg">
                <div className="text-2xl font-bold text-accent mb-1">≥94%</div>
                <p className="text-sm font-semibold mb-1">Swarm Functional Threshold</p>
                <p className="text-xs text-muted-foreground">Swarm remains operational if up to 10% of units fail. Logged and tracked in real time.</p>
              </div>
              <div className="p-6 bg-secondary/30 rounded-lg">
                <div className="text-2xl font-bold text-accent mb-1">99%</div>
                <p className="text-sm font-semibold mb-1">Safe Relative Distance</p>
                <p className="text-xs text-muted-foreground">99% of units maintain distance above MIN_SAFE_DIST. Zero collision violations recorded.</p>
              </div>
              <div className="p-6 bg-secondary/30 rounded-lg">
                <div className="text-2xl font-bold text-accent mb-1">95%</div>
                <p className="text-sm font-semibold mb-1">Autonomous Error Correction</p>
                <p className="text-xs text-muted-foreground">Formation rebalances and shadow avoidance execute without ground intervention.</p>
              </div>
              <div className="p-6 bg-secondary/30 rounded-lg">
                <div className="text-2xl font-bold text-accent mb-1">3 Years</div>
                <p className="text-sm font-semibold mb-1">Simulation Duration</p>
                <p className="text-xs text-muted-foreground">Full mission-length simulation with configurable dropout events and orbital parameters.</p>
              </div>
            </div>
          </CaseStudySection>

          <CaseStudySection title="Technical Architecture">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Orbital Mechanics Engine (sim/orbital.py)</h4>
                <p>
                  Implements COE ↔ ECI conversion using rotation matrices and propagates true anomaly using Newton-Raphson iteration on Kepler's equation. All physics use the Sun's gravitational parameter (μ = 1.327×10²⁰ m³/s²) and real solar irradiance (1361 W/m² at 1 AU).
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Swarm Coordination (sim/swarm.py)</h4>
                <p>
                  The Swarm class manages all 12 SwarmUnit instances, enforces formation constraints, detects violations, and triggers autonomous rebalancing. Dropout events are injected via config and the swarm self-heals by redistributing RAAN across surviving units.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Real-Time Visualization (main.py)</h4>
                <p>
                  A Matplotlib-based GUI renders a live 3D orbit view (cyan = healthy, orange = shadow risk, red = failed), a swarm health percentage chart against the 94% KPP threshold, and a cumulative energy harvested plot — all updating every simulation step.
                </p>
              </div>
            </div>
          </CaseStudySection>

          <CaseStudySection title="What I Built">
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Complete orbital mechanics engine using COE state representation</li>
              <li>Newton-Raphson Kepler solver for accurate mean-to-true anomaly conversion</li>
              <li>Pearl necklace swarm formation with RAAN-distributed collector units</li>
              <li>Autonomous collision and shadow avoidance algorithms</li>
              <li>Fault-tolerant dropout recovery with formation auto-rebalancing</li>
              <li>Real-time 3D visualization with live KPP metric dashboards</li>
              <li>Configurable simulation parameters for mission scenario testing</li>
            </ul>
          </CaseStudySection>

          <div className="flex gap-4 pt-8">
            <Button asChild>
              <a href="https://github.com/andreay99/OSEHS-simulation" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default OSEHS;
