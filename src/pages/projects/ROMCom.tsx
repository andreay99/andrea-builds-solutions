import { CaseStudySection } from "@/components/CaseStudySection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";

const ROMCom = () => {
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
            <h1 className="mb-4">KineticLab ROM-COM</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Webcam-based stroke & TBI upper-extremity rehabilitation system — HackPrinceton SP2026
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge>HackPrinceton SP2026</Badge>
              <Badge variant="secondary">Healthcare Track</Badge>
              <Badge variant="secondary">Hardware Track</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">FastAPI</Badge>
              <Badge variant="outline">WebSocket</Badge>
              <Badge variant="outline">MediaPipe</Badge>
              <Badge variant="outline">Python</Badge>
              <Badge variant="outline">Three.js</Badge>
              <Badge variant="outline">Arduino</Badge>
              <Badge variant="outline">Random Forest</Badge>
            </div>
          </div>

          <CaseStudySection title="Overview">
            <p>
              KineticLab ROM-COM is a $0-hardware rehabilitation system for stroke and TBI patients recovering upper-extremity motor function. Using only a laptop webcam, it runs a full clinical-grade rehab session — adaptive ROM calibration, real-time exercise guidance, and automated Fugl-Meyer Assessment (FMA-UE) subscale scoring for the therapist dashboard.
            </p>
            <p>
              Built in 24 hours at HackPrinceton SP2026, competing in the Best Healthcare Hack and Best Hardware Hack tracks.
            </p>
          </CaseStudySection>

          <CaseStudySection title="Problem">
            <p>
              795,000 Americans suffer strokes every year. Upper-extremity rehabilitation is critical for recovery, but existing solutions are expensive and inaccessible:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>FitMi — $349 hardware required</li>
              <li>Saebo — $300–600 per device</li>
              <li>Neofect — $99/month or $15K clinic installation</li>
              <li>Tyromotion — $75K clinical system</li>
            </ul>
            <p>
              Patients with limited mobility or range of motion can't use systems calibrated for healthy users. And therapists lack automated, validated scoring between sessions.
            </p>
          </CaseStudySection>

          <CaseStudySection title="Solution">
            <p>
              KineticLab differentiates on three axes no competitor stacks together:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><span className="font-semibold">$0 hardware floor</span> — runs on any laptop webcam, no purchased equipment needed</li>
              <li><span className="font-semibold">Adaptive ROM normalization</span> — 30-second calibration maps each patient's personal range of motion to a 0–1 scale, so a patient with 45° max shoulder flexion completes the same exercise as a healthy user at 180°</li>
              <li><span className="font-semibold">Automated FMA-UE scoring</span> — every session generates a clinically interpretable Fugl-Meyer score (36/66 visible items) validated at r ≈ 0.99 against clinical raters</li>
            </ul>
          </CaseStudySection>

          <CaseStudySection title="Technical Architecture">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Motion Pipeline</h4>
                <p>
                  MediaPipe Pose + Hands extracts joint landmarks from the webcam feed. A Random Forest classifier trained on normalized ROM data classifies gestures and tracks exercise completion in real time.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Frontend (React + Three.js)</h4>
                <p>
                  React + TypeScript frontend renders 3D exercise scenes via Three.js. Real-time pose data streams from the FastAPI backend over WebSocket, driving visual feedback in under 2 seconds end-to-end.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Backend (FastAPI + WebSocket)</h4>
                <p>
                  FastAPI handles WebSocket connections, session management, and FMA-UE score computation. Session data is persisted and exposed via REST for the therapist dashboard.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Arduino Haptics</h4>
                <p>
                  Tri-modal haptic feedback (buzz + vibrate + LED) via Arduino bridge provides tactile cues during exercises — the creative hardware integration enrolled for the Best Hardware Hack track.
                </p>
              </div>
            </div>
          </CaseStudySection>

          <CaseStudySection title="Impact">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-secondary/30 rounded-lg">
                <div className="text-2xl font-bold text-accent mb-1">$0</div>
                <p className="text-sm font-semibold mb-1">Hardware Floor</p>
                <p className="text-xs text-muted-foreground">Webcam-only — undercuts every competitor by $99–$75K</p>
              </div>
              <div className="p-6 bg-secondary/30 rounded-lg">
                <div className="text-2xl font-bold text-accent mb-1">r ≈ 0.99</div>
                <p className="text-sm font-semibold mb-1">FMA-UE Scoring Accuracy</p>
                <p className="text-xs text-muted-foreground">Validated against clinical raters in published research</p>
              </div>
              <div className="p-6 bg-secondary/30 rounded-lg">
                <div className="text-2xl font-bold text-accent mb-1">30s</div>
                <p className="text-sm font-semibold mb-1">Adaptive Calibration</p>
                <p className="text-xs text-muted-foreground">Personalizes range-of-motion targets per patient in 30 seconds</p>
              </div>
              <div className="p-6 bg-secondary/30 rounded-lg">
                <div className="text-2xl font-bold text-accent mb-1">795K</div>
                <p className="text-sm font-semibold mb-1">US Strokes / Year</p>
                <p className="text-xs text-muted-foreground">Target population that could benefit from accessible rehab</p>
              </div>
            </div>
          </CaseStudySection>

          <CaseStudySection title="What I Built">
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Real-time motion pipeline: MediaPipe → Random Forest gesture classifier</li>
              <li>Adaptive ROM calibration system normalizing per-patient range of motion</li>
              <li>FastAPI WebSocket backend streaming pose data to React frontend</li>
              <li>Three.js 3D exercise scene rendering with real-time feedback</li>
              <li>Automated FMA-UE subscale scoring and therapist dashboard</li>
              <li>Arduino haptic feedback bridge (buzz + vibrate + LED)</li>
            </ul>
          </CaseStudySection>

          <div className="flex gap-4 pt-8">
            <Button asChild>
              <a href="https://github.com/tomiwaaluko/ROM-com" target="_blank" rel="noopener noreferrer">
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

export default ROMCom;
