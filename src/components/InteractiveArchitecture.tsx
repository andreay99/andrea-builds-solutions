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
            className={`transition-all duration-300 ${
              isHovered ? "scale-110 z-10" : "scale-100"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.1 }}
          >
            <div
              className={`flex flex-col items-center gap-2 p-3 md:p-4 rounded-lg border-2 bg-gradient-to-br from-background to-background/80 cursor-pointer transition-all duration-300 ${
                isHovered
                  ? "border-accent shadow-lg shadow-accent/30"
                  : "border-border hover:border-accent/50"
              }`}
            >
              <div
                className={`p-2 md:p-3 rounded-full transition-colors duration-300 ${
                  isHovered ? "bg-accent/20 text-accent" : "bg-secondary text-muted-foreground"
                }`}
              >
                {icon}
              </div>
              <span className="text-xs md:text-sm font-semibold text-center">{title}</span>
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
    <div className="w-full bg-gradient-to-br from-background via-background to-secondary/10 rounded-lg border border-border/50 overflow-hidden p-4 md:p-8">
      {/* Title */}
      <div className="mb-6 md:mb-8">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">End-to-End Architecture</h3>
        <p className="text-xs md:text-sm text-muted-foreground">Hover over components to see technical specifications</p>
      </div>

      {/* Responsive Grid Layout */}
      <div className="space-y-6 md:space-y-0">
        {/* Row 1: Capture Layer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4">
          <div className="flex justify-center">
            <div className="w-full md:w-auto">
              <ArchitectureNode
                icon={<Camera className="h-6 w-6" />}
                title="Raspberry Pi 3"
                description="Edge device running 24/7. Captures live video via Logitech Brio webcam. Processes frames on-device and streams to backend."
                position="static md:absolute"
                tech="Python + OpenCV"
                specs={[
                  { label: "FPS", value: "30 fps" },
                  { label: "Resolution", value: "1920x1080" },
                  { label: "Uptime", value: "24/7" },
                ]}
              />
            </div>
          </div>

          <div className="flex justify-center hidden md:flex">
            <div className="text-xs text-muted-foreground flex items-center gap-1 self-center mb-8">
              <Zap className="h-3 w-3 text-accent" />
              <span>Video Stream</span>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full md:w-auto">
              <ArchitectureNode
                icon={<Server className="h-6 w-6" />}
                title="Flask REST API"
                description="Central orchestrator receiving video frames. Coordinates facial detection, embedding extraction, and database queries."
                position="static md:absolute"
                tech="Flask + Python"
                specs={[
                  { label: "Latency", value: "<200ms" },
                  { label: "Endpoints", value: "3 routes" },
                  { label: "Upload", value: "Multipart/form-data" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Row 1.5: ML Layer */}
        <div className="flex justify-center">
          <div className="w-full md:w-auto">
            <ArchitectureNode
              icon={<Brain className="h-6 w-6" />}
              title="OpenCV + Facial Recognition"
              description="Detects faces, extracts 128-D embeddings. Performs cosine similarity search against MongoDB profiles (threshold: 0.6)."
              position="static md:absolute"
              tech="OpenCV + NumPy"
              specs={[
                { label: "Embedding Dim", value: "128D" },
                { label: "Algorithm", value: "FaceNet" },
                { label: "Accuracy", value: "~98%" },
              ]}
            />
          </div>
        </div>

        {/* Row 2: Data Layer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="flex justify-center">
            <div className="w-full md:w-auto">
              <ArchitectureNode
                icon={<Database className="h-6 w-6" />}
                title="MongoDB"
                description="NoSQL database storing face embeddings, user profiles, and conversation history. Optimized for cosine similarity queries."
                position="static md:absolute"
                tech="MongoDB Atlas"
                specs={[
                  { label: "Index", value: "Cosine" },
                  { label: "Query Time", value: "<50ms" },
                  { label: "Storage", value: "~1MB/user" },
                ]}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full md:w-auto">
              <ArchitectureNode
                icon={<Brain className="h-6 w-6" />}
                title="Grok-3 LLM"
                description="Advanced language model synthesizing context. Generates natural conversational memory summaries with specific details about recognized person."
                position="static md:absolute"
                tech="Grok-3 API"
                specs={[
                  { label: "Context", value: "Streaming" },
                  { label: "Latency", value: "~1-2s" },
                  { label: "Model", value: "Grok-3" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Row 3: Output Layer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="flex justify-center">
            <div className="w-full md:w-auto">
              <ArchitectureNode
                icon={<Monitor className="h-6 w-6" />}
                title="Web Dashboard"
                description="Real-time timeline display showing recognized people, memories, and AI-generated summaries. Built with Next.js on Vercel."
                position="static md:absolute"
                tech="Next.js + React"
                specs={[
                  { label: "Framework", value: "Next.js 15" },
                  { label: "Updates", value: "Real-time" },
                  { label: "Hosting", value: "Vercel" },
                ]}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full md:w-auto">
              <ArchitectureNode
                icon={<Volume2 className="h-6 w-6" />}
                title="ElevenLabs TTS"
                description="Converts text summaries to natural speech. Outputs via wired earbuds for hands-free operation. Voice: Matilda."
                position="static md:absolute"
                tech="ElevenLabs API"
                specs={[
                  { label: "Latency", value: "~1s" },
                  { label: "Voice", value: "Matilda" },
                  { label: "Quality", value: "Ultra" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-4 md:p-6 bg-secondary/30 rounded-lg border border-border/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
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
    </div>
  );
};
