import { CaseStudySection } from "@/components/CaseStudySection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { ParallaxImage } from "@/components/ParallaxImage";
import bikeshareArchitecture from "@/assets/bikeshare-architecture.png";

const Bikeshare = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-20">
      <div className="section-container max-w-5xl">
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="mb-4">Bikeshare Trip Analysis</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Comprehensive SQL-Based Analytics System
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge>September 2025</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">SQL</Badge>
            <Badge variant="outline">SQLite</Badge>
            <Badge variant="outline">Python</Badge>
            <Badge variant="outline">Data Analysis</Badge>
            <Badge variant="outline">Pandas</Badge>
          </div>
        </div>

        <CaseStudySection title="Overview">
          <p>
            The Bikeshare Trip Analysis project is a comprehensive database system designed to analyze bikeshare operations, identify usage patterns, and uncover optimization opportunities. The project demonstrates advanced SQL techniques and data-driven decision making.
          </p>
          <p>
            By designing a normalized database schema and implementing complex analytical queries, the system provides actionable insights for operational scaling and resource allocation.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Problem">
          <p>
            Bikeshare operators need to understand usage patterns to optimize operations, but raw trip data is difficult to analyze without proper structure. Key challenges include:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Identifying high-volume users and peak usage times</li>
            <li>Detecting operational anomalies and inefficiencies</li>
            <li>Understanding station-level demand patterns</li>
            <li>Making data-driven decisions for fleet and station management</li>
          </ul>
          <p>
            Manual analysis of large trip datasets is time-consuming and prone to errors, necessitating an automated, scalable solution.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Solution">
          <p>
            I designed and implemented a SQLite database with normalized tables for trips, users, and stations, then developed complex SQL queries to extract meaningful insights from the data.
          </p>
          <p>
            Key features include:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Normalized database schema for efficient data storage</li>
            <li>Advanced SQL queries for trip metrics and user analysis</li>
            <li>Anomaly detection for trips exceeding 30 minutes</li>
            <li>Peak hour identification and temporal analysis</li>
            <li>Station-level demand profiling</li>
            <li>Automated reporting pipeline with Python integration</li>
          </ul>
        </CaseStudySection>

        <CaseStudySection title="Technical Architecture">
          <ParallaxImage 
            src={bikeshareArchitecture} 
            alt="Bikeshare Analysis Architecture" 
            className="w-full"
          />
          <p className="text-sm text-muted-foreground mt-4">
            Data flow from raw trip data through SQLite database to analytical queries producing insights on usage patterns, peak hours, and anomalies.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Key Challenges">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Database Design</h4>
              <p>
                Creating an efficient schema required careful consideration of normalization principles and query patterns. I designed a structure that minimizes redundancy while optimizing for common analytical queries, balancing storage efficiency with query performance.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Complex Query Optimization</h4>
              <p>
                Analytical queries on large datasets can be slow. I implemented indexing strategies, optimized JOIN operations, and used appropriate aggregation techniques to ensure fast query execution even on datasets with millions of trips.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Anomaly Detection Logic</h4>
              <p>
                Defining meaningful anomalies required domain understanding. I implemented logic to detect trips exceeding 30 minutes, which could indicate issues like forgotten returns or system problems, providing actionable insights for operations teams.
              </p>
            </div>
          </div>
        </CaseStudySection>

        <CaseStudySection title="Impact & Recognition">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">100%</div>
              <p className="text-sm">Normalized database structure</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">10+</div>
              <p className="text-sm">Analytical queries developed</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">Automated</div>
              <p className="text-sm">Anomaly detection system</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">Open</div>
              <p className="text-sm">Published for reproducibility</p>
            </div>
          </div>
        </CaseStudySection>

        <CaseStudySection title="What I Learned">
          <p>
            This project reinforced fundamental database principles and advanced SQL techniques:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Database normalization and schema design best practices</li>
            <li>Complex SQL query construction for analytical workloads</li>
            <li>Query optimization and indexing strategies</li>
            <li>Temporal data analysis and time-series patterns</li>
            <li>Integration of SQL databases with Python for automation</li>
            <li>Data-driven decision making for operational insights</li>
          </ul>
          <p>
            The experience of turning raw data into actionable insights demonstrated the power of well-structured databases and thoughtful query design. Publishing the code and results also taught me the importance of reproducibility in data analysis.
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
    </PageTransition>
  );
};

export default Bikeshare;
