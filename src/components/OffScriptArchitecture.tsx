import { useState } from "react";
import { Code, Mic, Server, Brain, Database, MessageSquare, BarChart3, Zap, Clock } from "lucide-react";
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

export const OffScriptArchitecture = () => {
  return (
    <>
      {/* Desktop Layout - Absolute Positioning */}
      <div className="hidden md:block relative w-full min-h-[850px] pb-32 p-8 bg-gradient-to-br from-background via-background to-secondary/10 rounded-lg border border-border/50 overflow-hidden">
        {/* Title */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-2">AI-Powered Code Learning Platform</h3>
          <p className="text-sm text-muted-foreground">Hover over components to see technical specifications and integrations</p>
        </div>

      {/* Row 1: Frontend/Voice Interface */}
      <ArchitectureNode
        icon={<Code className="h-6 w-6" />}
        title="Monaco Editor"
        description="Embedded code editor with syntax highlighting, IntelliSense, and real-time validation. Supports Python, JavaScript, SQL, HTML/CSS for full-stack coding challenges."
        position="top-24 left-8"
        tech="Monaco (VS Code)"
        specs={[
          { label: "Languages", value: "6+" },
          { label: "Themes", value: "Dark/Light" },
          { label: "Auto-save", value: "Yes" },
        ]}
      />

      <ArchitectureNode
        icon={<Mic className="h-6 w-6" />}
        title="Vapi Voice Interface"
        description="Real-time voice I/O for hands-free interaction. Users speak coding questions and hints. Integrates with Gemini AI for intelligent voice responses."
        position="top-24 left-[300px]"
        tech="Vapi + WebRTC"
        specs={[
          { label: "Latency", value: "<500ms" },
          { label: "Languages", value: "30+" },
          { label: "Accuracy", value: "~95%" },
        ]}
      />

      <ArchitectureNode
        icon={<MessageSquare className="h-6 w-6" />}
        title="Transcript Viewer"
        description="Real-time transcript showing user voice commands and AI responses. Helps debug voice commands and provides audit trail of interaction."
        position="top-24 left-[600px]"
        tech="React Streaming"
        specs={[
          { label: "Update Rate", value: "Real-time" },
          { label: "Storage", value: "Session only" },
          { label: "Export", value: "JSON/TXT" },
        ]}
      />

      {/* Row 2: Backend Processing */}
      <ArchitectureNode
        icon={<Server className="h-6 w-6" />}
        title="FastAPI Backend"
        description="High-performance orchestrator handling code execution, request routing, and response formatting. Manages sandboxed code environments with timeout protection."
        position="top-[280px] left-[80px]"
        tech="FastAPI + Python"
        specs={[
          { label: "Timeout", value: "5s per code" },
          { label: "Sandbox", value: "Docker" },
          { label: "Endpoints", value: "8 routes" },
        ]}
      />

      <ArchitectureNode
        icon={<Database className="h-6 w-6" />}
        title="SQLite Database"
        description="Persistent storage for user sessions, code submissions, test results, and learning analytics. Enables personalized recommendations and progress tracking."
        position="top-[280px] left-[380px]"
        tech="SQLite + SQLAlchemy"
        specs={[
          { label: "Queries", value: "<50ms" },
          { label: "Size", value: "~10MB" },
          { label: "Backup", value: "Daily" },
        ]}
      />

      <ArchitectureNode
        icon={<Brain className="h-6 w-6" />}
        title="Gemini AI Evaluator"
        description="Google's advanced language model evaluating code quality. Provides detailed feedback on correctness, efficiency, best practices, and offers personalized learning hints."
        position="top-[280px] left-[680px]"
        tech="Google Gemini Pro"
        specs={[
          { label: "Model", value: "Gemini 2.0" },
          { label: "Context", value: "500K tokens" },
          { label: "Rating", value: "1-5 stars" },
        ]}
      />

      {/* Row 3: Analytics & Insights */}
      <ArchitectureNode
        icon={<BarChart3 className="h-6 w-6" />}
        title="Analytics Dashboard"
        description="Real-time visualization of learning metrics: submission stats, success rates, common mistakes, performance trends. Recommends next topics based on weak areas."
        position="top-[520px] left-[200px]"
        tech="React Charts + D3"
        specs={[
          { label: "Metrics", value: "12+" },
          { label: "Chart Types", value: "5" },
          { label: "Update", value: "Real-time" },
        ]}
      />

      <ArchitectureNode
        icon={<Zap className="h-6 w-6" />}
        title="AI Recommendations"
        description="ML-powered personalized learning path. Suggests next challenges based on difficulty, success history, and learning goals. Tracks knowledge gaps."
        position="top-[520px] left-[550px]"
        tech="Decision Trees + LLM"
        specs={[
          { label: "Accuracy", value: "~88%" },
          { label: "Freshness", value: "Per session" },
          { label: "Topics", value: "50+" },
        ]}
      />

      {/* Data Flow Labels */}
      <div className="absolute top-[110px] left-[200px] text-xs text-muted-foreground flex items-center gap-1">
        <Zap className="h-3 w-3 text-accent" />
        <span>Code Input</span>
      </div>

      <div className="absolute top-[110px] left-[480px] text-xs text-muted-foreground flex items-center gap-1">
        <Mic className="h-3 w-3 text-accent" />
        <span>Voice Commands</span>
      </div>

      <div className="absolute top-[360px] left-[240px] text-xs text-muted-foreground flex items-center gap-1">
        <Zap className="h-3 w-3 text-accent" />
        <span>Execution</span>
      </div>

      <div className="absolute top-[360px] left-[540px] text-xs text-muted-foreground flex items-center gap-1">
        <Clock className="h-3 w-3 text-accent" />
        <span>Evaluation</span>
      </div>

      <div className="absolute bottom-8 left-8 right-8 p-4 bg-secondary/30 rounded-lg border border-border/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-semibold text-accent mb-1">🎯 Voice + Code</p>
            <p className="text-xs text-muted-foreground">Unique dual-input for hands-free coding practice</p>
          </div>
          <div>
            <p className="font-semibold text-accent mb-1">🧠 Smart Feedback</p>
            <p className="text-xs text-muted-foreground">AI rates code and suggests improvements instantly</p>
          </div>
          <div>
            <p className="font-semibold text-accent mb-1">📊 Learning Analytics</p>
            <p className="text-xs text-muted-foreground">Track progress and identify areas for improvement</p>
          </div>
        </div>
      </div>

      {/* Connecting SVG lines */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <defs>
          <marker
            id="arrowhead-offscript"
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
        {/* Monaco to Vapi */}
        <line x1="150" y1="130" x2="300" y2="130" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        {/* Vapi to Transcript */}
        <line x1="420" y1="130" x2="600" y2="130" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        {/* To Backend services */}
        <line x1="200" y1="160" x2="200" y2="260" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        <line x1="450" y1="160" x2="450" y2="260" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        <line x1="750" y1="160" x2="750" y2="260" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        {/* To Analytics */}
        <line x1="300" y1="340" x2="300" y2="500" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        <line x1="650" y1="340" x2="650" y2="500" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
      </svg>
      </div>

      {/* Mobile Layout - Grid */}
      <div className="md:hidden w-full p-4 bg-gradient-to-br from-background via-background to-secondary/10 rounded-lg border border-border/50">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">AI-Powered Code Learning Platform</h3>
          <p className="text-xs text-muted-foreground">Components shown below</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><ArchitectureNode icon={<Code className="h-5 w-5" />} title="Monaco" description="Code editor" position="static" tech="Monaco" /></div>
          <div><ArchitectureNode icon={<Mic className="h-5 w-5" />} title="Vapi Voice" description="Voice I/O" position="static" tech="Vapi" /></div>
          <div><ArchitectureNode icon={<MessageSquare className="h-5 w-5" />} title="Transcript" description="Real-time" position="static" tech="React" /></div>
          <div><ArchitectureNode icon={<Server className="h-5 w-5" />} title="FastAPI" description="Backend" position="static" tech="FastAPI" /></div>
          <div><ArchitectureNode icon={<Database className="h-5 w-5" />} title="Database" description="SQLite" position="static" tech="SQLite" /></div>
          <div><ArchitectureNode icon={<Brain className="h-5 w-5" />} title="Gemini AI" description="Rating engine" position="static" tech="Gemini" /></div>
          <div><ArchitectureNode icon={<BarChart3 className="h-5 w-5" />} title="Analytics" description="Insights" position="static" tech="Charts" /></div>
          <div><ArchitectureNode icon={<Zap className="h-5 w-5" />} title="Recommendations" description="ML-powered" position="static" tech="ML" /></div>
        </div>
      </div>
    </>
  );
};
