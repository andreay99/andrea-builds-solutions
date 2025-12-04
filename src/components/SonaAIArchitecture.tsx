import { useState } from "react";
import { Mic, Brain, Database, BarChart3, Zap, Cpu, Activity, Server } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ArchitectureNodeProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  position: string;
  tech?: string;
  specs?: { label: string; value: string }[];
  color?: string;
}

const ArchitectureNode = ({ icon, title, description, position, tech, specs, color = "accent" }: ArchitectureNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <motion.div
            className={`${position === "static" ? "relative" : `${position} absolute`} transition-all duration-300 ${
              isHovered ? "scale-110 z-10" : "scale-100"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.1 }}
          >
            <div
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 bg-gradient-to-br from-background to-background/80 cursor-pointer transition-all duration-300 ${
                isHovered
                  ? "border-accent shadow-lg shadow-accent/30"
                  : "border-border hover:border-accent/50"
              }`}
            >
              <div
                className={`p-3 rounded-full transition-colors duration-300 ${
                  isHovered ? "bg-accent/20 text-accent" : "bg-secondary text-muted-foreground"
                }`}
              >
                {icon}
              </div>
              <span className="text-sm font-semibold text-center">{title}</span>
              {tech && (
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  {tech}
                </Badge>
              )}
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-sm">
          <p className="font-semibold mb-2">{title}</p>
          <p className="text-sm mb-3">{description}</p>
          {specs && (
            <div className="space-y-1 border-t border-border pt-2">
              {specs.map((spec, i) => (
                <div key={i} className="text-xs flex justify-between gap-4">
                  <span className="text-muted-foreground">{spec.label}:</span>
                  <span className="font-mono font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const SonaAIArchitecture = () => {
  return (
    <>
      {/* Desktop Layout - Absolute Positioning */}
      <div className="hidden md:block relative w-full min-h-[850px] pb-32 p-8 bg-gradient-to-br from-background via-background to-secondary/10 rounded-lg border border-border/50 overflow-hidden">
        {/* Title */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-2">Real-Time Emotion Detection Pipeline</h3>
          <p className="text-sm text-muted-foreground">Hover over components to see technical specifications and data flow</p>
        </div>

      {/* Row 1: Input & Signal Processing */}
      <ArchitectureNode
        icon={<Mic className="h-6 w-6" />}
        title="Audio Input"
        description="Captures voice audio in real-time from microphone or streaming sources. Normalizes audio levels and handles variable sample rates for consistent preprocessing."
        position="top-24 left-8"
        tech="PyAudio/Librosa"
        specs={[
          { label: "Sample Rate", value: "44.1kHz" },
          { label: "Bit Depth", value: "16-bit" },
          { label: "Channels", value: "Mono" },
        ]}
      />

      <ArchitectureNode
        icon={<Activity className="h-6 w-6" />}
        title="Signal Processing"
        description="Decomposes audio into frequency and time-domain features. Applies Fourier Transform and Mel-scale spectrograms to extract acoustic characteristics for ML."
        position="top-24 left-[300px]"
        tech="Librosa + SciPy"
        specs={[
          { label: "FFT Size", value: "2048" },
          { label: "Hop Length", value: "512" },
          { label: "Mel Bands", value: "128" },
        ]}
      />

      <ArchitectureNode
        icon={<Cpu className="h-6 w-6" />}
        title="Feature Extraction"
        description="Computes 40+ acoustic features: MFCC, spectral centroid, zero-crossing rate, energy, F0, formants. Normalizes features for model compatibility."
        position="top-24 left-[600px]"
        tech="NumPy/Pandas"
        specs={[
          { label: "Features", value: "40+" },
          { label: "Normalization", value: "Z-score" },
          { label: "Latency", value: "<200ms" },
        ]}
      />

      {/* Row 2: ML Processing */}
      <ArchitectureNode
        icon={<Brain className="h-6 w-6" />}
        title="Deep Learning Model"
        description="TensorFlow-based neural network trained on emotion-labeled datasets. Architecture: Conv1D layers + LSTM + Dense layers for temporal pattern recognition."
        position="top-[280px] left-[80px]"
        tech="TensorFlow"
        specs={[
          { label: "Layers", value: "6" },
          { label: "Trainable Params", value: "500K" },
          { label: "Accuracy", value: "~88%" },
        ]}
      />

      <ArchitectureNode
        icon={<Database className="h-6 w-6" />}
        title="Model Cache"
        description="Stores trained model weights for sub-100ms inference. Supports model versioning and A/B testing of different architectures and training approaches."
        position="top-[280px] left-[380px]"
        tech="TensorFlow SavedModel"
        specs={[
          { label: "Model Size", value: "~2MB" },
          { label: "Inference", value: "<100ms" },
          { label: "Versions", value: "5+" },
        ]}
      />

      <ArchitectureNode
        icon={<Zap className="h-6 w-6" />}
        title="Emotion Classification"
        description="Outputs probability distribution across emotion classes: Happy, Sad, Angry, Neutral, Surprised, Fearful. Includes confidence scores for filtering unreliable predictions."
        position="top-[280px] left-[680px]"
        tech="Softmax Output"
        specs={[
          { label: "Classes", value: "6" },
          { label: "Confidence", value: ">0.7" },
          { label: "Outputs", value: "Probabilities" },
        ]}
      />

      {/* Row 3: Backend & Analytics */}
      <ArchitectureNode
        icon={<Server className="h-6 w-6" />}
        title="FastAPI Server"
        description="Production-ready REST API handling real-time inference requests. Implements request batching, async processing, and rate limiting for scalability."
        position="top-[520px] left-[150px]"
        tech="FastAPI + Uvicorn"
        specs={[
          { label: "Endpoints", value: "3" },
          { label: "QPS", value: "100+" },
          { label: "Latency", value: "<500ms" },
        ]}
      />

      <ArchitectureNode
        icon={<BarChart3 className="h-6 w-6" />}
        title="Analytics & Insights"
        description="Tracks emotion trends over time, identifies patterns in speech, and correlates emotional states with contextual data. Enables personalized mental health insights."
        position="top-[520px] left-[550px]"
        tech="Pandas + Visualization"
        specs={[
          { label: "Metrics", value: "15+" },
          { label: "Retention", value: "1 year" },
          { label: "Queries", value: "<1s" },
        ]}
      />

      {/* Data Flow Labels */}
      <div className="absolute top-[110px] left-[180px] text-xs text-muted-foreground flex items-center gap-1">
        <Mic className="h-3 w-3 text-accent" />
        <span>Audio Stream</span>
      </div>

      <div className="absolute top-[110px] left-[480px] text-xs text-muted-foreground flex items-center gap-1">
        <Activity className="h-3 w-3 text-accent" />
        <span>Feature Space</span>
      </div>

      <div className="absolute top-[360px] left-[240px] text-xs text-muted-foreground flex items-center gap-1">
        <Zap className="h-3 w-3 text-accent" />
        <span>Inference</span>
      </div>

      <div className="absolute top-[360px] left-[590px] text-xs text-muted-foreground flex items-center gap-1">
        <Brain className="h-3 w-3 text-accent" />
        <span>Classification</span>
      </div>

      <div className="absolute bottom-8 left-8 right-8 p-4 bg-secondary/30 rounded-lg border border-border/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-semibold text-accent mb-1">🎵 Signal Processing</p>
            <p className="text-xs text-muted-foreground">Acoustic feature extraction from raw audio</p>
          </div>
          <div>
            <p className="font-semibold text-accent mb-1">🧠 Deep Learning</p>
            <p className="text-xs text-muted-foreground">TensorFlow model for emotion classification</p>
          </div>
          <div>
            <p className="font-semibold text-accent mb-1">⚡ Real-Time</p>
            <p className="text-xs text-muted-foreground">Sub-500ms latency for live streaming</p>
          </div>
        </div>
      </div>

      {/* Connecting SVG lines */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <defs>
          <marker
            id="arrowhead-sona"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            className="fill-accent/30"
          >
            <polygon points="0 0, 10 3, 0 6" />
          </marker>
        </defs>
        {/* Audio Input to Signal Processing */}
        <line x1="150" y1="130" x2="300" y2="130" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        {/* Signal Processing to Feature Extraction */}
        <line x1="420" y1="130" x2="600" y2="130" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        {/* To Backend services */}
        <line x1="150" y1="160" x2="150" y2="260" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        <line x1="400" y1="160" x2="400" y2="260" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        <line x1="750" y1="160" x2="750" y2="260" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        {/* To Analytics */}
        <line x1="250" y1="340" x2="250" y2="500" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        <line x1="650" y1="340" x2="650" y2="500" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
      </svg>
      </div>

      {/* Mobile Layout - Grid */}
      <div className="md:hidden w-full p-4 bg-gradient-to-br from-background via-background to-secondary/10 rounded-lg border border-border/50">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">Real-Time Emotion Detection Pipeline</h3>
          <p className="text-xs text-muted-foreground">Components shown below</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><ArchitectureNode icon={<Mic className="h-5 w-5" />} title="Audio Input" description="Real-time voice" position="static" tech="Microphone" /></div>
          <div><ArchitectureNode icon={<Zap className="h-5 w-5" />} title="Signal Processing" description="Audio normalization" position="static" tech="Python" /></div>
          <div><ArchitectureNode icon={<Brain className="h-5 w-5" />} title="Feature Extraction" description="MFCC analysis" position="static" tech="Librosa" /></div>
          <div><ArchitectureNode icon={<Server className="h-5 w-5" />} title="ML Model" description="Emotion classifier" position="static" tech="TensorFlow" /></div>
          <div><ArchitectureNode icon={<Activity className="h-5 w-5" />} title="Real-Time Processing" description="Streaming inference" position="static" tech="FastAPI" /></div>
          <div><ArchitectureNode icon={<Database className="h-5 w-5" />} title="Database" description="Store results" position="static" tech="PostgreSQL" /></div>
          <div><ArchitectureNode icon={<BarChart3 className="h-5 w-5" />} title="Analytics" description="Trend analysis" position="static" tech="Charts" /></div>
          <div><ArchitectureNode icon={<Cpu className="h-5 w-5" />} title="Insights" description="Personalized data" position="static" tech="ML" /></div>
        </div>
      </div>
    </>
  );
};
