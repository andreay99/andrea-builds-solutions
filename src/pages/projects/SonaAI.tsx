import { CaseStudySection } from "@/components/CaseStudySection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import sonaArchitecture from "@/assets/sona-architecture.png";

const SonaAI = () => {
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
          <h1 className="mb-4">SONA AI</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Real-Time Emotion Detection from Voice
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge>June 2025 - Present</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Python</Badge>
            <Badge variant="outline">TensorFlow</Badge>
            <Badge variant="outline">Librosa</Badge>
            <Badge variant="outline">FastAPI</Badge>
            <Badge variant="outline">NumPy</Badge>
            <Badge variant="outline">Pandas</Badge>
          </div>
        </div>

        <CaseStudySection title="Overview">
          <p>
            SONA AI is an advanced emotion detection system that analyzes vocal patterns in real-time to identify emotional states. The project combines signal processing, machine learning, and agentic systems to provide accurate emotion classification from audio input.
          </p>
          <p>
            This ongoing project explores cutting-edge techniques in audio ML, including statistical pattern recognition in vocal tone and continuous model improvement through agentic feedback loops.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Problem">
          <p>
            Understanding emotional states from voice is crucial for applications in mental health, customer service, and human-computer interaction. However, existing solutions face several challenges:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>High computational cost of real-time audio processing</li>
            <li>Variability in vocal patterns across individuals and contexts</li>
            <li>Limited accuracy in subtle emotion detection</li>
            <li>Difficulty capturing context-dependent emotional nuances</li>
          </ul>
          <p>
            The goal was to build a system that could accurately detect emotions in real-time while remaining computationally efficient enough for production deployment.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Solution">
          <p>
            I engineered a comprehensive ML pipeline that processes audio data in real-time, extracting acoustic features and classifying emotional states with high accuracy.
          </p>
          <p>
            Key innovations include:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Custom ETL pipeline for audio data preprocessing</li>
            <li>Advanced feature extraction using Librosa</li>
            <li>TensorFlow-based deep learning model for emotion classification</li>
            <li>Agentic system integration for continuous model improvement</li>
            <li>Real-time inference optimization achieving 30% efficiency gain</li>
            <li>FastAPI deployment for production-ready streaming</li>
          </ul>
        </CaseStudySection>

        <CaseStudySection title="Technical Architecture">
          <img 
            src={sonaArchitecture} 
            alt="SONA AI System Architecture" 
            className="w-full rounded-lg border border-border"
          />
          <p className="text-sm text-muted-foreground mt-4">
            Architecture showing audio input processing through Librosa, TensorFlow model classification with agentic feedback, and FastAPI real-time output.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Key Challenges">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Real-Time Processing Efficiency</h4>
              <p>
                Processing audio in real-time requires significant optimization. I implemented efficient ETL pipelines and model architecture improvements that achieved a 30% gain in inference efficiency, enabling smooth real-time operation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Feature Engineering</h4>
              <p>
                Identifying the right acoustic features for emotion detection required extensive experimentation. I explored statistical patterns in vocal tone, pitch, energy, and spectral features, ultimately developing a feature set that significantly improved classification accuracy.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Agentic System Integration</h4>
              <p>
                Implementing agentic systems for continuous model improvement was novel. I designed a feedback loop that uses prediction confidence and error patterns to identify areas for model refinement, creating a self-improving system.
              </p>
            </div>
          </div>
        </CaseStudySection>

        <CaseStudySection title="Impact & Recognition">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">30%</div>
              <p className="text-sm">Inference efficiency improvement</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">Real-time</div>
              <p className="text-sm">Emotion detection capability</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">6+</div>
              <p className="text-sm">Months of active development</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">Advanced</div>
              <p className="text-sm">Agentic system integration</p>
            </div>
          </div>
        </CaseStudySection>

        <CaseStudySection title="What I Learned">
          <p>
            Developing SONA AI has been an intensive learning experience in advanced ML engineering and audio processing:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Deep understanding of audio signal processing and feature extraction</li>
            <li>TensorFlow model architecture design for time-series data</li>
            <li>ETL pipeline development for audio data at scale</li>
            <li>Real-time ML inference optimization techniques</li>
            <li>Novel applications of agentic systems in ML pipelines</li>
            <li>Production deployment considerations for audio ML models</li>
          </ul>
          <p>
            The project continues to evolve, with ongoing work focused on improving accuracy across diverse vocal patterns and expanding the emotion taxonomy for more nuanced classification.
          </p>
        </CaseStudySection>

        <div className="flex gap-4 pt-8">
          <Button asChild>
            <a href="https://github.com/andreay99" target="_blank" rel="noopener noreferrer">
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

export default SonaAI;
