import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, FileText } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="text-xl font-bold text-foreground hover:text-accent transition-colors">
            AYS
          </NavLink>
          
          <div className="hidden md:flex items-center gap-8">
            <NavLink 
              to="/" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground"
            >
              Home
            </NavLink>
            <NavLink 
              to="/projects" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground"
            >
              Projects
            </NavLink>
            <NavLink 
              to="/experience" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground"
            >
              Experience
            </NavLink>
            <NavLink 
              to="/contact" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground"
            >
              Contact
            </NavLink>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/andreay99" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://linkedin.com/in/andreayanezsoto" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
