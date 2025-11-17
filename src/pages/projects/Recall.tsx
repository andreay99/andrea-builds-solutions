import { CaseStudySection } from "@/components/CaseStudySection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { InteractiveArchitecture } from "@/components/InteractiveArchitecture";

const Recall = () => {
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
          <h1 className="mb-4">Recall</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Assistive Memory with Facial Recognition
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary" className="bg-orange-light text-orange-dark">
              <Award className="h-3 w-3 mr-1" />
              Best Use of Grok (xAI)
            </Badge>
            <Badge variant="secondary" className="bg-orange-light text-orange-dark">
              <Award className="h-3 w-3 mr-1" />
              Best Use of Arm (MLH)
            </Badge>
            <Badge>HackPrinceton 2025</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Flask</Badge>
            <Badge variant="outline">MongoDB</Badge>
            <Badge variant="outline">OpenCV</Badge>
            <Badge variant="outline">Python</Badge>
            <Badge variant="outline">ElevenLabs TTS</Badge>
            <Badge variant="outline">Raspberry Pi</Badge>
          </div>
        </div>

        <CaseStudySection title="Overview">
          <p>
            Recall is an assistive memory system designed to help users remember people through real-time facial recognition technology. Built during HackPrinceton 2025, the project won two major awards for innovative use of Grok (xAI) and Arm technologies.
          </p>
          <p>
            The system combines computer vision, machine learning, and text-to-speech capabilities to provide a seamless memory aid that runs on edge devices like Raspberry Pi, making it accessible and portable.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Problem">
          <p>
            Many individuals, particularly those with memory challenges or professionals who meet numerous people daily, struggle to remember names and faces. Traditional solutions like manual note-taking are intrusive and impractical in real-time social situations.
          </p>
          <p>
            The challenge was to create a system that could:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Accurately detect and recognize faces in real-time</li>
            <li>Maintain a reliable database of profiles with minimal false positives</li>
            <li>Work on edge devices with limited computational resources</li>
            <li>Provide information discreetly without disrupting social interactions</li>
          </ul>
        </CaseStudySection>

        <CaseStudySection title="Solution">
          <p>
            I developed a comprehensive facial recognition pipeline using OpenCV for face detection and feature extraction, integrated with a MongoDB backend for efficient profile storage and retrieval. The system streams camera frames from a Raspberry Pi to recognition endpoints built with Flask.
          </p>
          <p>
            Key features include:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Real-time face detection and matching with optimized thresholds</li>
            <li>Profile management system with photo augmentation for improved accuracy</li>
            <li>ElevenLabs TTS integration for spoken prompts and reminders</li>
            <li>RESTful API endpoints for setup and recognition workflows</li>
            <li>Edge deployment optimization for low-latency inference</li>
          </ul>
        </CaseStudySection>

        <CaseStudySection title="Technical Architecture">
          <InteractiveArchitecture />
          <p className="text-sm text-muted-foreground mt-4">
            Hover over each component to learn more about its role in the system. The diagram shows the complete data flow from camera capture to audio output.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Key Challenges">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">False Positive Reduction</h4>
              <p>
                Initial tests showed high false positive rates in face matching. I implemented threshold tuning based on precision/recall evaluation and added data augmentation techniques to improve model robustness. This reduced false positives by 40%.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Edge Device Optimization</h4>
              <p>
                Running inference on Raspberry Pi required significant optimization. I measured and reduced latency by implementing efficient feature extraction pipelines and optimizing the MongoDB query structure, achieving sub-second recognition times.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Real-Time Streaming</h4>
              <p>
                Streaming camera frames efficiently while maintaining recognition accuracy was challenging. I implemented a buffering system and optimized frame processing to balance speed and accuracy, ensuring smooth real-time operation.
              </p>
            </div>
          </div>
        </CaseStudySection>

        <CaseStudySection title="Impact & Recognition">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">40%</div>
              <p className="text-sm">Reduction in false positives through threshold optimization</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">&lt;1s</div>
              <p className="text-sm">Recognition latency on edge devices</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">2</div>
              <p className="text-sm">Major hackathon awards won</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">36hrs</div>
              <p className="text-sm">Development time at HackPrinceton</p>
            </div>
          </div>
        </CaseStudySection>

        <CaseStudySection title="What I Learned">
          <p>
            This project deepened my understanding of computer vision pipelines and the challenges of deploying ML models on edge devices. I learned the importance of:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Balancing accuracy and performance in real-time systems</li>
            <li>Systematic evaluation using precision/recall metrics</li>
            <li>Edge computing optimization techniques</li>
            <li>API design for streaming applications</li>
            <li>Integration of multiple services (CV, database, TTS) into a cohesive system</li>
          </ul>
          <p>
            The experience of rapid prototyping under time constraints at a hackathon taught me to make quick architectural decisions while maintaining code quality and documentation.
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

export default Recall;
