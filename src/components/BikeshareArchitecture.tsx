import { useState } from "react";
import { Database, Filter, BarChart3, TrendingUp, Map, Clock, Zap, FileJson } from "lucide-react";
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

export const BikeshareArchitecture = () => {
  return (
    <div className="relative w-full min-h-[850px] pb-32 p-8 bg-gradient-to-br from-background via-background to-secondary/10 rounded-lg border border-border/50 overflow-hidden">
      {/* Title */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-2">SQL-Driven Analytics Pipeline</h3>
        <p className="text-sm text-muted-foreground">Hover over components to see technical specifications and data flow</p>
      </div>

      {/* Row 1: Data Sources & Ingestion */}
      <ArchitectureNode
        icon={<FileJson className="h-6 w-6" />}
        title="Raw Trip Data"
        description="CSV files containing bikeshare trip records: user_id, start_time, end_time, start_station, end_station, trip_duration. Normalized for consistent schema."
        position="top-24 left-8"
        tech="CSV/JSON"
        specs={[
          { label: "Records", value: "100K+" },
          { label: "File Size", value: "~50MB" },
          { label: "Schema", value: "7 columns" },
        ]}
      />

      <ArchitectureNode
        icon={<Database className="h-6 w-6" />}
        title="SQLite Database"
        description="Normalized relational database with tables for trips, users, and stations. Enforces referential integrity and enables complex analytical queries."
        position="top-24 left-[300px]"
        tech="SQLite"
        specs={[
          { label: "Tables", value: "3" },
          { label: "Size", value: "~100MB" },
          { label: "Queries", value: "<50ms" },
        ]}
      />

      <ArchitectureNode
        icon={<Filter className="h-6 w-6" />}
        title="Data Cleaning"
        description="ETL pipeline that validates data integrity, removes duplicates, handles missing values, and normalizes timestamps. Implements data quality checks."
        position="top-24 left-[600px]"
        tech="Python + Pandas"
        specs={[
          { label: "Validation", value: "100%" },
          { label: "Duplicates", value: "Removed" },
          { label: "Processing", value: "<1s" },
        ]}
      />

      {/* Row 2: SQL Analysis */}
      <ArchitectureNode
        icon={<TrendingUp className="h-6 w-6" />}
        title="Trip Metrics"
        description="Advanced SQL queries analyzing individual trip patterns: duration distributions, distance metrics, speed calculations, anomaly detection for trips >30min."
        position="top-[280px] left-[80px]"
        tech="SQL Aggregations"
        specs={[
          { label: "Queries", value: "15+" },
          { label: "Metrics", value: "25+" },
          { label: "Anomalies", value: "Detected" },
        ]}
      />

      <ArchitectureNode
        icon={<Map className="h-6 w-6" />}
        title="Station Analysis"
        description="Identifies high-demand stations, analyzes inbound/outbound flow, calculates rebalancing needs, and reveals demand patterns by time-of-day."
        position="top-[280px] left-[380px]"
        tech="JOIN + GROUP BY"
        specs={[
          { label: "Stations", value: "50+" },
          { label: "Flow Analysis", value: "Real-time" },
          { label: "Hotspots", value: "Identified" },
        ]}
      />

      <ArchitectureNode
        icon={<Clock className="h-6 w-6" />}
        title="Temporal Analysis"
        description="Breakdown of usage by hour, day, season. Identifies peak hours and off-peak periods. Correlates usage with external factors."
        position="top-[280px] left-[680px]"
        tech="Window Functions"
        specs={[
          { label: "Time Buckets", value: "Hourly" },
          { label: "Periods", value: "365 days" },
          { label: "Patterns", value: "Extracted" },
        ]}
      />

      {/* Row 3: Insights & Visualization */}
      <ArchitectureNode
        icon={<BarChart3 className="h-6 w-6" />}
        title="Analytics Dashboard"
        description="Visualizations of KPIs: total trips, average duration, peak hours, station utilization, user segments. Interactive filters for custom analysis."
        position="top-[520px] left-[150px]"
        tech="React + D3"
        specs={[
          { label: "Charts", value: "8+" },
          { label: "KPIs", value: "12+" },
          { label: "Update", value: "On-demand" },
        ]}
      />

      <ArchitectureNode
        icon={<Zap className="h-6 w-6" />}
        title="Operational Insights"
        description="Actionable recommendations: fleet rebalancing strategies, optimal station placement, maintenance schedules. Data-driven decision support."
        position="top-[520px] left-[550px]"
        tech="Business Logic"
        specs={[
          { label: "Recommendations", value: "Auto-generated" },
          { label: "Accuracy", value: "~92%" },
          { label: "Freshness", value: "Daily" },
        ]}
      />

      {/* Data Flow Labels */}
      <div className="absolute top-[110px] left-[180px] text-xs text-muted-foreground flex items-center gap-1">
        <FileJson className="h-3 w-3 text-accent" />
        <span>Trip Records</span>
      </div>

      <div className="absolute top-[110px] left-[480px] text-xs text-muted-foreground flex items-center gap-1">
        <Database className="h-3 w-3 text-accent" />
        <span>Normalized</span>
      </div>

      <div className="absolute top-[360px] left-[240px] text-xs text-muted-foreground flex items-center gap-1">
        <Zap className="h-3 w-3 text-accent" />
        <span>SQL Queries</span>
      </div>

      <div className="absolute top-[360px] left-[590px] text-xs text-muted-foreground flex items-center gap-1">
        <TrendingUp className="h-3 w-3 text-accent" />
        <span>Aggregations</span>
      </div>

      <div className="absolute bottom-8 left-8 right-8 p-4 bg-secondary/30 rounded-lg border border-border/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-semibold text-accent mb-1">📊 Data Normalization</p>
            <p className="text-xs text-muted-foreground">Structured schema for efficient querying</p>
          </div>
          <div>
            <p className="font-semibold text-accent mb-1">🔍 Advanced Queries</p>
            <p className="text-xs text-muted-foreground">JOINs, window functions, aggregations</p>
          </div>
          <div>
            <p className="font-semibold text-accent mb-1">💡 Actionable Insights</p>
            <p className="text-xs text-muted-foreground">Data-driven operational recommendations</p>
          </div>
        </div>
      </div>

      {/* Connecting SVG lines */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <defs>
          <marker
            id="arrowhead-bikeshare"
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
        {/* Data sources to Database */}
        <line x1="150" y1="130" x2="300" y2="130" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        {/* Database to Cleaning */}
        <line x1="420" y1="130" x2="600" y2="130" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        {/* To Analysis services */}
        <line x1="150" y1="160" x2="150" y2="260" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        <line x1="400" y1="160" x2="400" y2="260" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        <line x1="750" y1="160" x2="750" y2="260" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        {/* To Visualization */}
        <line x1="250" y1="340" x2="250" y2="500" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
        <line x1="650" y1="340" x2="650" y2="500" stroke="currentColor" strokeWidth="1" className="stroke-accent/20" />
      </svg>
    </div>
  );
};
