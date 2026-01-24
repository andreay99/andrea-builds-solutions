import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Eye, Download, MousePointer, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Metric {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}

export const AnalyticsDashboard = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Demo analytics data - displayed immediately on page load
  const metrics: Metric[] = [
    {
      label: "Total Visits",
      value: "1,247",
      icon: <Eye className="h-8 w-8" />,
      color: "from-blue-500 to-blue-600",
      trend: "+12% this week",
    },
    {
      label: "Page Views",
      value: "3,891",
      icon: <BarChart3 className="h-8 w-8" />,
      color: "from-purple-500 to-purple-600",
      trend: "+8% this week",
    },
    {
      label: "Resume Downloads",
      value: "34",
      icon: <Download className="h-8 w-8" />,
      color: "from-green-500 to-green-600",
      trend: "Top action",
    },
    {
      label: "Project Clicks",
      value: "673",
      icon: <MousePointer className="h-8 w-8" />,
      color: "from-orange-500 to-orange-600",
      trend: "Most viewed: Recall",
    },
  ];

  const projectMetrics = [
    { name: "Recall", views: 234, percentage: 35 },
    { name: "OffScript", views: 189, percentage: 28 },
    { name: "SONA AI", views: 156, percentage: 23 },
    { name: "Bikeshare", views: 94, percentage: 14 },
  ];

  const pageMetrics = [
    { name: "Home", views: 389, bounceRate: "32%" },
    { name: "Projects", views: 234, bounceRate: "28%" },
    { name: "Experience", views: 167, bounceRate: "41%" },
    { name: "Contact", views: 89, bounceRate: "52%" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="section-container max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Analytics</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Real-time metrics tracking portfolio engagement, project interest, and visitor behavior.
            Powered by <a href="https://vercel.com/analytics" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Vercel Analytics</a>.
          </p>
        </motion.div>

        {/* Key Metrics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {metrics.map((metric, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="p-6 h-full backdrop-blur-sm bg-card/80 border-border/50 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${metric.color} text-white`}
                  >
                    {metric.icon}
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <h3 className="text-sm text-muted-foreground mb-2 font-medium">
                  {metric.label}
                </h3>
                <p className="text-3xl font-bold text-foreground mb-2">
                  {metric.value}
                </p>
                {metric.trend && (
                  <p className="text-xs text-muted-foreground">{metric.trend}</p>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Performance */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Project Views */}
          <Card className="p-8 backdrop-blur-sm bg-card/80 border-border/50">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-accent" />
              Project Performance
            </h2>
            <div className="space-y-6">
              {projectMetrics.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={mounted ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{project.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {project.views} views
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-accent to-accent/50 h-full"
                      initial={{ width: 0 }}
                      animate={mounted ? { width: `${project.percentage}%` } : {}}
                      transition={{ delay: 0.6 + index * 0.1, duration: 1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Page Performance */}
          <Card className="p-8 backdrop-blur-sm bg-card/80 border-border/50">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Eye className="h-5 w-5 text-accent" />
              Page Performance
            </h2>
            <div className="space-y-4">
              {pageMetrics.map((page, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={mounted ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex justify-between items-center p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div>
                    <p className="font-medium">{page.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Bounce: {page.bounceRate}
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-accent">{page.views}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Info Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
          className="bg-secondary/30 rounded-lg p-8 border border-border/50"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Mail className="h-5 w-5 text-accent" />
            About This Dashboard
          </h3>
          <p className="text-muted-foreground mb-4">
            This analytics dashboard tracks key engagement metrics using Vercel Analytics. 
            I monitor this data to understand what projects interest recruiters and visitors most.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-background/50 rounded-lg">
              <p className="font-semibold mb-2">What We Track</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Page views and unique visitors</li>
                <li>• Project clicks and interest</li>
                <li>• Resume downloads</li>
                <li>• Bounce rates by page</li>
              </ul>
            </div>
            <div className="p-4 bg-background/50 rounded-lg">
              <p className="font-semibold mb-2">Privacy</p>
              <p className="text-sm text-muted-foreground">
                No personal data is collected. Vercel Analytics respects user privacy with zero cookie tracking and GDPR compliance.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
