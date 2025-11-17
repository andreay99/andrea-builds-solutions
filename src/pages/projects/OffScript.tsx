import { CaseStudySection } from "@/components/CaseStudySection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { VideoPlayer } from "@/components/VideoPlayer";
import { OffScriptArchitecture } from "@/components/OffScriptArchitecture";
import offscriptInterface from "@/assets/offscript-interface.png";

const OffScript = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="section-container max-w-5xl">
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="mb-4">OffScript</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Voice-based technical interview simulator - practice coding while speaking your thought process aloud
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary" className="bg-orange-light text-orange-dark">
              <Award className="h-3 w-3 mr-1" />
              HackHarvard 2025
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Next.js 15</Badge>
            <Badge variant="outline">TypeScript</Badge>
            <Badge variant="outline">Vapi AI</Badge>
            <Badge variant="outline">Monaco Editor</Badge>
            <Badge variant="outline">FastAPI</Badge>
            <Badge variant="outline">SQLite</Badge>
            <Badge variant="outline">Gemini AI</Badge>
            <Badge variant="outline">ElevenLabs</Badge>
            <Badge variant="outline">Tailwind CSS</Badge>
          </div>
        </div>

        <CaseStudySection title="Overview">
          <p>
            OffScript is a voice-based technical interview simulator that helps engineers practice the way interviews actually happen—through conversation. Built during HackHarvard 2025, OffScript addresses a critical gap: talented engineers who can solve problems but struggle to explain their solutions in real-time interviews.
          </p>
          <p>
            The platform combines real-time voice interaction with a professional code editor, allowing candidates to practice coding while speaking their thought process aloud. Using Vapi AI for voice, Gemini AI for automated assessment, and a sophisticated FastAPI backend, OffScript provides the most realistic technical interview practice available.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Demo Video">
          <VideoPlayer
            videoId="vRH8DOrgPo8"
            title="OffScript Demo - HackHarvard 2025"
            posterImage={offscriptInterface}
          />
          <p className="text-sm text-muted-foreground mt-4">
            Watch OffScript in action: voice-based interview simulation with real-time code editing, AI feedback, and comprehensive performance analytics.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Problem">
          <p>
            The painful reality: talented engineers were failing interviews not because they couldn&apos;t solve problems, but because they couldn&apos;t explain their solutions. Friends who aced LeetCode problems in silence would freeze when asked to talk through their approach in real interviews.
          </p>
          <p>
            Traditional platforms prepare you for the problems, but not the performance. Key challenges candidates face:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Speaking thought process aloud while coding (unnatural for most engineers)</li>
            <li>Articulating technical concepts clearly under pressure</li>
            <li>Experiencing realistic interview environments with immediate feedback</li>
            <li>Understanding communication patterns and areas for improvement</li>
            <li>Accessing affordable practice that mimics real interview conditions</li>
          </ul>
          <p>
            Landing your dream job shouldn&apos;t depend on whether you&apos;re naturally good at thinking out loud.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Solution">
          <p>
            As technical lead, I architected OffScript from the ground up—building a production-grade voice-based interview platform with breakthrough conversational coding technology.
          </p>
          <p>
            <strong>Key Innovations:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Invisible Code Context Streaming:</strong> Solved the problem of maintaining AI awareness of code changes without cluttering conversation transcripts. Used Vapi AI&apos;s metadata fields to stream live code updates (debounced to 2 seconds) invisibly to the AI while keeping conversations natural</li>
            <li><strong>Three-Panel Interview Environment:</strong> Monaco Code Editor for professional coding experience, real-time transcript visualization, and collapsible problem panels—all synchronized in real-time</li>
            <li><strong>Real-Time State Coordination:</strong> Complex state management coordinating voice AI (speaking/listening), live code editing, and transcript updates using React refs and debounced hooks</li>
            <li><strong>Intelligent Rating System:</strong> Gemini AI automatically analyzes complete interview transcripts, generating structured feedback with letter grades across Communication, Problem Solving, and Implementation</li>
            <li><strong>Company-Specific Problem Sets:</strong> Curated questions from Google, Meta, Amazon, and other top tech companies</li>
            <li><strong>FastAPI Backend Orchestration:</strong> Four specialized endpoints handling random problem generation, Vapi webhook processing, transcript management, and AI-powered ratings with SQLite persistence</li>
            <li><strong>Production Polish:</strong> Mobile detection with desktop warnings, dark/light theme switching, Cloudflare CDN caching, comprehensive error handling</li>
          </ul>
        </CaseStudySection>

        <CaseStudySection title="Technical Architecture">
          <OffScriptArchitecture />
          <p className="text-sm text-muted-foreground mt-4">
            Hover over each component to learn more about its role in the system. The diagram shows the complete flow from user interaction through voice AI, code editing, and automated assessment.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Key Challenges">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">The Invisible Code Context Problem</h4>
              <p>
                Biggest technical hurdle: maintaining AI awareness of code changes without disrupting natural conversation. Traditional approaches spammed transcripts with code updates, making conversations unreadable. Solution: discovered Vapi&apos;s metadata field capabilities, allowing invisible code streaming to AI while keeping conversations clean. Required extensive experimentation with debounce timing and state coordination.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Real-Time State Synchronization</h4>
              <p>
                Coordinating state between voice AI (speaking/listening), Monaco Editor (live typing), and transcript management was incredibly complex. Had to prevent code updates while AI was speaking, handle rapid typing without overwhelming the system, and maintain conversation continuity. Solution involved React refs, custom debounced hooks, and careful effect dependency management across multiple components.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Voice AI Integration Complexity</h4>
              <p>
                Getting Vapi to work seamlessly with custom interview flow required deep understanding of their event system. Faced issues with call initialization timing, metadata handling, transcript formatting, and error recovery. The 81 commits in the repository tell the story of iterative debugging to achieve smooth voice interactions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Cross-Service Architecture</h4>
              <p>
                Building reliable communication between Next.js frontend, FastAPI backend, Vapi AI, and Gemini rating services created numerous integration challenges. Implemented comprehensive error handling, automatic transcript uploads, rating pipeline automation, and database transaction management to ensure zero data loss.
              </p>
            </div>
          </div>
        </CaseStudySection>

        <CaseStudySection title="Impact & Recognition">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">First</div>
              <p className="text-sm">Platform maintaining natural conversation while tracking live code changes</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">45min</div>
              <p className="text-sm">Session length with graceful handling of interruptions and errors</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">81</div>
              <p className="text-sm">Commits during HackHarvard showing rapid iteration cycle</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">3 Grades</div>
              <p className="text-sm">Communication, Problem Solving, Implementation scores</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">5 Companies</div>
              <p className="text-sm">Google, Meta, Amazon, and more problem sets available</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">4 Services</div>
              <p className="text-sm">Vapi AI, Gemini, FastAPI, SQLite orchestrated seamlessly</p>
            </div>
          </div>
        </CaseStudySection>

        <CaseStudySection title="What I Learned">
          <p>
            Building OffScript taught me advanced system integration and real-time coordination challenges I&apos;d never encountered before:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Voice UI Design Principles:</strong> Crafting interfaces that support simultaneous voice and visual interaction requires completely different design paradigms than traditional UIs</li>
            <li><strong>Real-Time AI Coordination:</strong> Managing multiple AI services (Vapi voice, Gemini ratings) while maintaining data consistency and smooth UX required sophisticated state management patterns</li>
            <li><strong>Interview Psychology:</strong> Through testing, learned how UI elements affect candidate stress—collapsible panels reduce overwhelm, timer placement impacts anxiety, and transcript visibility provides reassurance</li>
            <li><strong>Production Voice Integration:</strong> Deep dive into Vapi AI&apos;s Web SDK, understanding event systems, metadata streaming, and building robust error recovery for 45-minute sessions</li>
            <li><strong>Invisible Context Sharing:</strong> Discovered creative solutions for maintaining AI context without disrupting user experience—a pattern applicable to many AI applications</li>
            <li><strong>FastAPI Backend Architecture:</strong> Built webhook handlers, implemented SQLite with transaction management, and created automated rating pipelines</li>
            <li><strong>Hackathon-Scale Engineering:</strong> Delivered production-quality integrations under extreme time pressure by prioritizing modular architecture and rapid iteration (81 commits)</li>
          </ul>
          <p>
            Most importantly, I learned that the hardest technical challenges often have elegant solutions—the invisible code context problem seemed insurmountable until we discovered Vapi&apos;s metadata fields.
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
  );
};

export default OffScript;
