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
            AI-powered digital memory assistant for people with Alzheimer's and Dementia
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
            <Badge variant="outline">Raspberry Pi 3</Badge>
            <Badge variant="outline">OpenCV</Badge>
            <Badge variant="outline">Flask REST API</Badge>
            <Badge variant="outline">MongoDB</Badge>
            <Badge variant="outline">OpenAI Whisper</Badge>
            <Badge variant="outline">Grok-3</Badge>
            <Badge variant="outline">ElevenLabs</Badge>
            <Badge variant="outline">Next.js</Badge>
            <Badge variant="outline">Python</Badge>
          </div>
        </div>

        <CaseStudySection title="Overview">
          <p>
            Recall is a digital memory assistant designed to help people with Alzheimer&apos;s and Dementia maintain their sense of identity and independence. Built during HackPrinceton 2025, Recall won Best Use of Grok (xAI) and Best Use of Arm (MLH) awards for its innovative approach to assistive technology.
          </p>
          <p>
            The system acts as a fully autonomous memory journal that passively captures significant events throughout the day, recognizes loved ones through facial recognition, and creates contextually relevant conversation summaries—all without manual intervention. Running 24/7 on a Raspberry Pi with a Logitech Brio webcam, Recall works silently in the background, eliminating the burden of note-taking while respecting user privacy.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Demo Video">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg border border-border"
              src="https://www.youtube.com/embed/fHIO8pLaHdE"
              title="Recall Demo - HackPrinceton F25"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Watch Recall in action: autonomous facial recognition, conversation capture, and AI-powered memory summaries delivered via text-to-speech.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Problem">
          <p>
            Memory loss affects millions of people with Alzheimer's and Dementia, creating a gap between their daily experiences and what they can recall. These individuals often face the heartbreaking reality of forgetting loved ones and losing their sense of autonomy and connection.
          </p>
          <p>
            Traditional memory aids require constant manual intervention—writing notes, setting reminders, relying on caregivers. This strips users of their independence and dignity. The challenge was to create a system that could:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Operate completely autonomously without user intervention</li>
            <li>Recognize familiar faces and distinguish them from strangers</li>
            <li>Capture and summarize conversations intelligently</li>
            <li>Run on portable edge hardware for real-world deployment</li>
            <li>Respect privacy by not storing raw video or audio data</li>
            <li>Provide both visual and audible outputs for accessibility</li>
          </ul>
        </CaseStudySection>

        <CaseStudySection title="Solution">
          <p>
            I built Recall as a complete multimodal AI system running on a Raspberry Pi 3 with a Logitech Brio webcam. The system operates fully autonomously, intelligently deciding when to record based on visual and audio cues—no buttons to press, no apps to open.
          </p>
          <p>
            <strong>Core Architecture:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Edge Computing:</strong> Raspberry Pi captures live video, offloading heavy processing to custom Flask REST API endpoints (deployed via ngrok) for facial detection and environment awareness</li>
            <li><strong>Facial Recognition Pipeline:</strong> OpenCV detects faces and generates 128-dimensional embeddings stored in MongoDB. Cosine similarity search matches faces against known profiles, triggering conversation recording only for familiar faces</li>
            <li><strong>Smart Audio Capture:</strong> Voice Activity Detection (VAD) with silence detection captures complete conversations without wasting storage on insignificant audio</li>
            <li><strong>AI Processing:</strong> OpenAI Whisper transcribes audio, Grok-3 generates contextual summaries, and ElevenLabs TTS (Matilda voice) converts summaries to speech delivered through wired earbuds</li>
            <li><strong>Privacy-First Design:</strong> All video processing happens in temporary batches—no livestream data is saved, only transcribed summaries</li>
            <li><strong>Timeline Dashboard:</strong> Next.js web app (deployed on Vercel) displays detailed, informative timelines of daily events and interactions</li>
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
              <h4 className="font-semibold text-foreground mb-2">First-Time Hardware Integration</h4>
              <p>
                This was our team's first experience working with hardware. Setting up the Raspberry Pi was time-intensive—we had to upgrade from an 8GB to 32GB SD card due to memory constraints when installing heavy ML libraries, re-flash the OS multiple times, and configure SSH for wireless operation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Unstable Connectivity</h4>
              <p>
                WiFi issues made SSH connections unreliable. We pivoted to using a mobile hotspot for all Raspberry Pi programming, ensuring stable remote development while maintaining the portability of the device.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Privacy-Conscious Architecture</h4>
              <p>
                We didn't want to save raw images or audio files due to privacy concerns. The solution was to process everything in temporary batches and store only captioned conversation summaries, eliminating long-term storage of sensitive data while preserving contextual information.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Platform-Specific Compatibility</h4>
              <p>
                Debugging Python 3.14 and ARM Mac compatibility issues required careful dependency management and testing across different environments to ensure consistent performance.
              </p>
            </div>
          </div>
        </CaseStudySection>

        <CaseStudySection title="Impact & Recognition">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <p className="text-sm">Fully autonomous operation without user intervention</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">128D</div>
              <p className="text-sm">Face embedding dimensions for accurate matching</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">2 Awards</div>
              <p className="text-sm">Best Use of Grok (xAI) & Best Use of Arm (MLH)</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">Zero Storage</div>
              <p className="text-sm">Privacy-first design: no raw video/audio saved</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">5 Services</div>
              <p className="text-sm">Integrated APIs: OpenCV, Whisper, Grok, ElevenLabs, MongoDB</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">Millions</div>
              <p className="text-sm">Potential users affected by Alzheimer's & Dementia</p>
            </div>
          </div>
        </CaseStudySection>

        <CaseStudySection title="What I Learned">
          <p>
            Building Recall from scratch in 36 hours taught me end-to-end system architecture for production-grade AI applications. Key technical skills gained:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Hardware Integration:</strong> First experience working with Raspberry Pi hardware, from OS flashing to SSH configuration and peripheral management</li>
            <li><strong>Edge Computing:</strong> Learned to offload computation strategically—extracting embeddings on Pi while handling heavy inference on remote servers via Flask APIs</li>
            <li><strong>ML in Production:</strong> Designed MongoDB schemas for storing 128-dimensional face embeddings, implemented cosine similarity search for real-time matching</li>
            <li><strong>API Orchestration:</strong> Coordinated 5 different services (OpenCV, Whisper, Grok, ElevenLabs, MongoDB) into a seamless pipeline with proper error handling</li>
            <li><strong>Multipart File Handling:</strong> Mastered Flask multipart/form-data uploads for video frames and audio streams</li>
            <li><strong>Prompt Engineering:</strong> Crafted prompts for Grok-3 to generate concise, contextually relevant conversation summaries</li>
            <li><strong>Privacy-First Design:</strong> Architected a system that provides powerful memory assistance without compromising user privacy</li>
            <li><strong>Cross-Platform Development:</strong> Debugged Python 3.14 + ARM Mac compatibility issues, managed dependencies across different environments</li>
          </ul>
          <p>
            Most importantly, I learned the value of building for real social impact. Designing for users with Alzheimer's and Dementia required deep empathy and a commitment to preserving dignity and autonomy through technology.
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
