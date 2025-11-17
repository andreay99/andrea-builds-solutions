import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Blog = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="section-container max-w-4xl">
        <div className="mb-12">
          <h1 className="mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Insights on AI/ML engineering, project development, and lessons learned along the way.
          </p>
        </div>

        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>
              This section will feature posts about:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Badge variant="outline" className="mt-1">AI/ML</Badge>
                <span className="text-muted-foreground">
                  Deep dives into machine learning experiments and findings
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Badge variant="outline" className="mt-1">Projects</Badge>
                <span className="text-muted-foreground">
                  Behind-the-scenes looks at how projects were built
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Badge variant="outline" className="mt-1">Tutorials</Badge>
                <span className="text-muted-foreground">
                  Technical guides and lessons learned
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Badge variant="outline" className="mt-1">Research</Badge>
                <span className="text-muted-foreground">
                  Updates from NASA solar eruption research
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blog;
