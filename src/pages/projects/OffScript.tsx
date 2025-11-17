import { CaseStudySection } from "@/components/CaseStudySection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Award } from "lucide-react";
import { Link } from "react-router-dom";
import offscriptArchitecture from "@/assets/offscript-architecture.png";

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
            AI-Powered Technical Interview Simulator
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary" className="bg-orange-light text-orange-dark">
              <Award className="h-3 w-3 mr-1" />
              HackHarvard 2025
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Next.js</Badge>
            <Badge variant="outline">TypeScript</Badge>
            <Badge variant="outline">FastAPI</Badge>
            <Badge variant="outline">Gemini AI</Badge>
            <Badge variant="outline">React</Badge>
          </div>
        </div>

        <CaseStudySection title="Overview">
          <p>
            OffScript is a real-time AI interview simulator designed to help software engineers prepare for technical interviews. Built during HackHarvard 2025, the platform provides dynamic question generation, real-time feedback, and comprehensive interview practice across multiple domains.
          </p>
          <p>
            The system leverages Gemini AI to create realistic interview scenarios and provide instant, actionable feedback on responses, helping candidates improve their technical communication and problem-solving skills.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Problem">
          <p>
            Preparing for technical interviews is challenging and often lacks realistic practice environments. Many candidates struggle with:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Access to quality practice interviews with immediate feedback</li>
            <li>Understanding how to articulate technical concepts clearly</li>
            <li>Experiencing the pressure of real-time technical discussions</li>
            <li>Getting personalized feedback on communication patterns</li>
          </ul>
          <p>
            Existing solutions either lack interactivity, provide generic feedback, or are prohibitively expensive for most candidates.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Solution">
          <p>
            I spearheaded the development of OffScript as the technical lead, building a full-stack application that simulates realistic technical interviews using cutting-edge AI technology.
          </p>
          <p>
            Core features include:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Dynamic question generation across multiple technical domains</li>
            <li>Real-time AI evaluation of responses with detailed feedback</li>
            <li>Interactive frontend built with Next.js and TypeScript</li>
            <li>Robust backend API using FastAPI for low-latency responses</li>
            <li>Session management and progress tracking</li>
          </ul>
        </CaseStudySection>

        <CaseStudySection title="Technical Architecture">
          <img 
            src={offscriptArchitecture} 
            alt="OffScript System Architecture" 
            className="w-full rounded-lg border border-border"
          />
          <p className="text-sm text-muted-foreground mt-4">
            Architecture showing the Next.js frontend, FastAPI backend, Gemini AI integration, and bidirectional real-time feedback pipeline.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Key Challenges">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Real-Time Feedback Latency</h4>
              <p>
                Achieving sub-second response times for AI evaluation was critical for user experience. I optimized the API pipeline and implemented efficient caching strategies, improving feedback latency by 60% compared to initial benchmarks.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Team Coordination</h4>
              <p>
                As the technical lead, I coordinated three engineers across frontend and backend development during a 36-hour hackathon. I established clear communication protocols, defined API contracts early, and implemented parallel development workflows to maximize efficiency.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">AI Prompt Engineering</h4>
              <p>
                Crafting prompts that generate realistic interview questions and provide constructive feedback required extensive iteration. I developed a prompt template system that ensures consistency while maintaining flexibility across different technical domains.
              </p>
            </div>
          </div>
        </CaseStudySection>

        <CaseStudySection title="Impact & Recognition">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">60%</div>
              <p className="text-sm">Improvement in feedback latency</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">36hrs</div>
              <p className="text-sm">MVP development time</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">3</div>
              <p className="text-sm">Engineers coordinated</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">100%</div>
              <p className="text-sm">Functional MVP delivered</p>
            </div>
          </div>
        </CaseStudySection>

        <CaseStudySection title="What I Learned">
          <p>
            Leading the development of OffScript taught me valuable lessons in full-stack development and team leadership:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Effective team coordination and parallel development strategies</li>
            <li>API design principles for real-time applications</li>
            <li>Modern frontend development with Next.js and TypeScript</li>
            <li>Integration of large language models into production systems</li>
            <li>Rapid prototyping under tight time constraints</li>
            <li>Balancing feature scope with delivery timelines</li>
          </ul>
          <p>
            The experience reinforced the importance of clear communication, well-defined interfaces, and agile decision-making in fast-paced development environments.
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
