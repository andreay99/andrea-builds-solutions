import { useState } from "react";
import { Code, Mic, Server, Brain, Database, MessageSquare, BarChart3 } from "lucide-react";
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

export const OffScriptArchitecture = () => {
  return (
    <div className="relative w-full min-h-[600px] p-8 bg-gradient-to-br from-background to-secondary/20 rounded-lg border border-border">
      {/* Row 1: Frontend Layer */}
      <ArchitectureNode
        icon={<Code className="h-6 w-6" />}
        title="Monaco Editor"
        description="Professional-grade code editor integrated with Next.js. Supports syntax highlighting, auto-completion, and real-time code synchronization with debounced updates (2-second delay)."
        position="top-8 left-[80px]"
      />

      <ArchitectureNode
        icon={<Mic className="h-6 w-6" />}
        title="Vapi Voice AI"
        description="Real-time voice interaction SDK embedded in React contexts. Handles bidirectional conversation, speaking detection, and invisible metadata streaming for code context sharing."
        position="top-8 left-[380px]"
      />

      <ArchitectureNode
        icon={<MessageSquare className="h-6 w-6" />}
        title="Transcript Display"
        description="Live conversation transcript with timestamped entries. Shows natural dialogue without code clutter thanks to metadata-based context streaming."
        position="top-8 left-[680px]"
      />

      {/* Row 2: Backend Orchestration */}
      <ArchitectureNode
        icon={<Server className="h-6 w-6" />}
        title="FastAPI Backend"
        description="Python backend with 4 specialized endpoints: random problem generation, Vapi webhook handling, transcript management, and AI rating coordination. Handles SQLite transactions."
        position="top-[220px] left-[230px]"
      />

      <ArchitectureNode
        icon={<Database className="h-6 w-6" />}
        title="SQLite Database"
        description="Stores complete interview sessions with metadata, full transcripts, code submissions, and performance ratings. Enables searchable interview history and progress tracking."
        position="top-[220px] left-[530px]"
      />

      {/* Row 3: AI Services */}
      <ArchitectureNode
        icon={<Brain className="h-6 w-6" />}
        title="Gemini AI Ratings"
        description="Analyzes complete interview transcripts to generate structured feedback. Provides letter grades for Communication, Problem Solving, and Implementation with specific improvement suggestions."
        position="top-[420px] left-[180px]"
      />

      <ArchitectureNode
        icon={<BarChart3 className="h-6 w-6" />}
        title="Analytics Dashboard"
        description="Personalized performance tracking showing progress over time, strengths/weaknesses analysis, and company-specific preparation recommendations."
        position="top-[420px] left-[580px]"
      />

      {/* Connecting arrows */}
      <div className="absolute top-[70px] left-[250px] w-[110px] h-[2px] bg-accent"></div>
      <div className="absolute top-[70px] left-[360px] w-0 h-0 border-l-[8px] border-l-accent border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent"></div>

      <div className="absolute top-[70px] left-[550px] w-[110px] h-[2px] bg-accent"></div>
      <div className="absolute top-[70px] left-[660px] w-0 h-0 border-l-[8px] border-l-accent border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent"></div>

      <div className="absolute top-[140px] left-[180px] w-[2px] h-[60px] bg-accent"></div>
      <div className="absolute top-[200px] left-[177px] w-0 h-0 border-t-[8px] border-t-accent border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent"></div>

      <div className="absolute top-[140px] left-[460px] w-[2px] h-[60px] bg-accent"></div>
      <div className="absolute top-[200px] left-[457px] w-0 h-0 border-t-[8px] border-t-accent border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent"></div>

      <div className="absolute top-[140px] left-[740px] w-[2px] h-[60px] bg-accent"></div>
      <div className="absolute top-[200px] left-[737px] w-0 h-0 border-t-[8px] border-t-accent border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent"></div>

      <div className="absolute top-[280px] left-[340px] w-[2px] h-[120px] bg-accent"></div>
      <div className="absolute top-[400px] left-[337px] w-0 h-0 border-t-[8px] border-t-accent border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent"></div>

      <div className="absolute top-[280px] left-[620px] w-[2px] h-[120px] bg-accent"></div>
      <div className="absolute top-[400px] left-[617px] w-0 h-0 border-t-[8px] border-t-accent border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent"></div>

      {/* Data flow labels */}
      <div className="absolute top-[180px] left-[120px] text-xs text-muted-foreground">
        Code Updates
      </div>
      <div className="absolute top-[180px] left-[400px] text-xs text-muted-foreground">
        Voice Stream
      </div>
      <div className="absolute top-[180px] left-[680px] text-xs text-muted-foreground">
        Transcript
      </div>
      <div className="absolute top-[320px] left-[280px] text-xs text-muted-foreground">
        Assessment
      </div>
      <div className="absolute top-[320px] left-[560px] text-xs text-muted-foreground">
        Metrics
      </div>
    </div>
  );
};
