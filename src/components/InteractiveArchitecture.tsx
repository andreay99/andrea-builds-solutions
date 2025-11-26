import { useState } from "react";
import { Camera, Server, Brain, Database, Monitor, Volume2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ArchitectureNodeProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  position: string;
}

const ArchitectureNode = ({ icon, title, description, position }: ArchitectureNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div
            className={`${position} absolute transition-all duration-300 ${
              isHovered ? "scale-110 z-10" : "scale-100"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 bg-background cursor-pointer transition-all duration-300 ${
                isHovered
                  ? "border-accent shadow-lg shadow-accent/20"
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
              <span className="text-sm font-medium text-center whitespace-nowrap">{title}</span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <p className="font-semibold mb-1">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Arrow = ({ start, end, label }: { start: string; end: string; label?: string }) => {
  return (
    <div className={`absolute ${start} ${end}`}>
      <div className="relative">
        <svg
          className="w-full h-full"
          style={{ minWidth: "100px" }}
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
              className="fill-accent"
            >
              <polygon points="0 0, 10 3, 0 6" />
            </marker>
          </defs>
          <line
            x1="0"
            y1="10"
            x2="100"
            y2="10"
            className="stroke-accent"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
        </svg>
        {label && (
          <span className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

export const InteractiveArchitecture = () => {
  return (
    <div className="relative w-full min-h-[600px] p-8 bg-gradient-to-br from-background to-secondary/20 rounded-lg border border-border">
      {/* Row 1: Camera → Flask → Face Recognition */}
      <ArchitectureNode
        icon={<Camera className="h-6 w-6" />}
        title="Raspberry Pi Camera"
        description="Edge device that captures live video stream of people in real-time. Processes frames on-device before sending to the backend API."
        position="top-8 left-8"
      />

      <ArchitectureNode
        icon={<Server className="h-6 w-6" />}
        title="Flask REST API"
        description="Central backend orchestrator that receives camera frames via HTTP, coordinates ML model inference, database queries, and TTS generation."
        position="top-8 left-[280px]"
      />

      <ArchitectureNode
        icon={<Brain className="h-6 w-6" />}
        title="Face Recognition"
        description="OpenCV-powered computer vision pipeline that detects faces, extracts embeddings, and matches against stored profiles with optimized thresholds."
        position="top-8 left-[560px]"
      />

      {/* Row 2: MongoDB → LLM */}
      <ArchitectureNode
        icon={<Database className="h-6 w-6" />}
        title="MongoDB Database"
        description="NoSQL database storing user profiles, face embeddings, and contextual memory notes. Enables fast similarity search for face matching."
        position="top-[220px] left-[180px]"
      />

      <ArchitectureNode
        icon={<Brain className="h-6 w-6" />}
        title="LLM Reasoning"
        description="OpenAI/Grok language model that synthesizes retrieved context and current situation into natural, conversational memory summaries."
        position="top-[220px] left-[480px]"
      />

      {/* Row 3: Outputs */}
      <ArchitectureNode
        icon={<Monitor className="h-6 w-6" />}
        title="Written Output"
        description="Dashboard interface displaying recognized person's name, profile information, and AI-generated memory summary in text format."
        position="top-[420px] left-[360px]"
      />

      <ArchitectureNode
        icon={<Volume2 className="h-6 w-6" />}
        title="ElevenLabs TTS"
        description="Text-to-speech service that converts memory summaries into natural-sounding audio, enabling hands-free operation and accessibility."
        position="top-[420px] left-[600px]"
      />

      {/* Connecting arrows - simplified for visual clarity */}
      <div className="absolute top-[70px] left-[180px] w-[80px] h-[2px] bg-accent"></div>
      <div className="absolute top-[70px] left-[260px] w-0 h-0 border-l-[8px] border-l-accent border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent"></div>

      <div className="absolute top-[70px] left-[460px] w-[80px] h-[2px] bg-accent"></div>
      <div className="absolute top-[70px] left-[540px] w-0 h-0 border-l-[8px] border-l-accent border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent"></div>

      <div className="absolute top-[140px] left-[630px] w-[2px] h-[60px] bg-accent"></div>
      <div className="absolute top-[200px] left-[627px] w-0 h-0 border-t-[8px] border-t-accent border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent"></div>

      <div className="absolute top-[280px] left-[350px] w-[110px] h-[2px] bg-accent"></div>
      <div className="absolute top-[280px] left-[460px] w-0 h-0 border-l-[8px] border-l-accent border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent"></div>

      <div className="absolute top-[340px] left-[560px] w-[2px] h-[60px] bg-accent"></div>
      <div className="absolute top-[400px] left-[557px] w-0 h-0 border-t-[8px] border-t-accent border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent"></div>

      <div className="absolute top-[340px] left-[580px] w-[2px] h-[60px] bg-accent"></div>
      <div className="absolute top-[400px] left-[577px] w-0 h-0 border-t-[8px] border-t-accent border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent"></div>

      {/* Return path arrow */}
      <div className="absolute top-[500px] left-[100px] text-xs text-muted-foreground flex items-center gap-2">
        <div className="w-[500px] h-[2px] bg-accent/50 relative">
          <div className="absolute left-0 top-[-4px] w-0 h-0 border-r-[8px] border-r-accent/50 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent"></div>
        </div>
        <span className="whitespace-nowrap">Audio playback to device</span>
      </div>
    </div>
  );
};
