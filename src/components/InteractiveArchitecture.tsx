import { useState } from "react";
import { Camera, Server, Brain, Database, Monitor, Volume2, Zap, Clock, HardDrive } from "lucide-react";
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
            className={`${position} absolute transition-all duration-300 ${
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

const DataFlowArrow = ({ label, delay = 0 }: { label: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="text-xs text-muted-foreground flex items-center gap-1"
  >
    <Zap className="h-3 w-3 text-accent" />
    <span>{label}</span>
  </motion.div>
);

export const InteractiveArchitecture = () => {
  return (
    <div className="relative w-full min-h-[700px] p-8 bg-gradient-to-br from-background via-background to-secondary/10 rounded-lg border border-border/50 overflow-hidden">
      {/* Title */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-2">End-to-End Architecture</h3>
        <p className="text-sm text-muted-foreground">Hover over components to see technical specifications</p>
      </div>

      {/* Row 1: Capture Layer */}
      <ArchitectureNode
        icon={<Camera className="h-6 w-6" />}
        title="Raspberry Pi 3"
        description="Edge device running 24/7. Captures live video via Logitech Brio webcam. Processes frames on-device and streams to backend."
        position="top-24 left-8"
        tech="Python + OpenCV"
        specs={[
          { label: "FPS", value: "30 fps" },
          { label: "Resolution", value: "1920x1080" },
          { label: "Uptime", value: "24/7" },
        ]}
      />

      {/* Row 1: Processing Layer */}
      <ArchitectureNode
        icon={<Server className="h-6 w-6" />}
        title="Flask REST API"
        description="Central orchestrator receiving video frames. Coordinates facial detection, embedding extraction, and database queries."
        position="top-24 left-[300px]"
        tech="Flask + Python"
        specs={[
          { label: "Latency", value: "<200ms" },
          { label: "Endpoints", value: "3 routes" },
          { label: "Upload", value: "Multipart/form-data" },
        ]}
      />

      {/* Row 1: ML Layer */}
      <ArchitectureNode
        icon={<Brain className="h-6 w-6" />}
        title="OpenCV + Facial Recognition"
        description="Detects faces, extracts 128-D embeddings. Performs cosine similarity search against MongoDB profiles (threshold: 0.6)."
        position="top-24 left-[600px]"
        tech="OpenCV + NumPy"
        specs={[
          { label: "Embedding Dim", value: "128D" },
          { label: "Algorithm", value: "FaceNet" },
          { label: "Accuracy", value: "~98%" },
        ]}
      />

      {/* Row 2: Data Layer */}
      <ArchitectureNode
        icon={<Database className="h-6 w-6" />}
        title="MongoDB"
        description="NoSQL database storing face embeddings, user profiles, and conversation history. Optimized for cosine similarity queries."
        position="top-[260px] left-[150px]"
        tech="MongoDB Atlas"
        specs={[
          { label: "Index", value: "Cosine" },
          { label: "Query Time", value: "<50ms" },
          { label: "Storage", value: "~1MB/user" },
        ]}
      />

      {/* Row 2: LLM Layer */}
      <ArchitectureNode
        icon={<Brain className="h-6 w-6" />}
        title="Grok-3 LLM"
        description="Advanced language model synthesizing context. Generates natural conversational memory summaries with specific details about recognized person."
        position="top-[260px] left-[480px]"
        tech="Grok-3 API"
        specs={[
          { label: "Context", value: "Streaming" },
          { label: "Latency", value: "~1-2s" },
          { label: "Model", value: "Grok-3" },
        ]}
      />

      {/* Row 3: Output Layer */}
      <ArchitectureNode
        icon={<Monitor className="h-6 w-6" />}
        title="Web Dashboard"
        description="Real-time timeline display showing recognized people, memories, and AI-generated summaries. Built with Next.js on Vercel."
        position="top-[480px] left-[250px]"
        tech="Next.js + React"
        specs={[
          { label: "Framework", value: "Next.js 15" },
          { label: "Updates", value: "Real-time" },
          { label: "Hosting", value: "Vercel" },
        ]}
      />

      {/* Row 3: Audio Output */}
      <ArchitectureNode
        icon={<Volume2 className="h-6 w-6" />}
        title="ElevenLabs TTS"
        description="Converts text summaries to natural speech. Outputs via wired earbuds for hands-free operation. Voice: Matilda."
        position="top-[480px] left-[550px]"
        tech="ElevenLabs API"
        specs={[
          { label: "Latency", value: "~1s" },
          { label: "Voice", value: "Matilda" },
          { label: "Quality", value: "Ultra" },
        ]}
      />

      {/* Data Flow Indicators */}
      <div className="absolute top-[110px] left-[180px] text-xs text-muted-foreground flex items-center gap-1">
        <Zap className="h-3 w-3 text-accent" />
        <span>Video Stream</span>
      </div>

      <div className="absolute top-[110px] left-[480px] text-xs text-muted-foreground flex items-center gap-1">
        <Zap className="h-3 w-3 text-accent" />
        <span>Face Frames</span>
      </div>

      <div className="absolute top-[350px] left-[320px] text-xs text-muted-foreground flex items-center gap-1">
        <Clock className="h-3 w-3 text-accent" />
        <span>Cosine Similarity</span>
      </div>

      <div className="absolute top-[350px] left-[600px] text-xs text-muted-foreground flex items-center gap-1">
        <Brain className="h-3 w-3 text-accent" />
        <span>LLM Summary</span>
      </div>

      <div className="absolute bottom-8 left-8 right-8 p-4 bg-secondary/30 rounded-lg border border-border/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-semibold text-accent mb-1">🎯 Real-time Processing</p>
            <p className="text-xs text-muted-foreground">24/7 autonomous operation without user intervention</p>
          </div>
          <div>
            <p className="font-semibold text-accent mb-1">🔒 Privacy-First</p>
            <p className="text-xs text-muted-foreground">No raw video/audio stored, only summaries</p>
          </div>
          <div>
            <p className="font-semibold text-accent mb-1">⚡ Edge Computing</p>
            <p className="text-xs text-muted-foreground">Offloads heavy ML to cloud, lightweight inference on device</p>
          </div>
        </div>
      </div>

      {/* Connecting lines (simplified with CSS) */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <defs>
          <marker
            id="arrowhead"
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
        {/* Camera to Flask */}
        <line x1="150" y1="130" x2="300" y2="130" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        {/* Flask to OpenCV */}
        <line x1="420" y1="130" x2="600" y2="130" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        {/* To DB and LLM */}
        <line x1="700" y1="160" x2="700" y2="240" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        <line x1="300" y1="240" x2="300" y2="350" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        <line x1="550" y1="240" x2="550" y2="350" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
      </svg>
    </div>
  );
};
