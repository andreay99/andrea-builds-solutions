import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, FileText } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/logo.png";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="section-container">
        <div className="flex items-center justify-between h-20 md:h-24">
          <NavLink to="/" className="hover:opacity-70 transition-opacity">
            <img src={logo} alt="Andrea Soto Logo" className="h-16 md:h-20 w-auto" />
          </NavLink>
          
          <div className="flex items-center gap-12">
            <div className="hidden md:flex items-center gap-12">
              <NavLink 
                to="/" 
                className="text-sm font-medium tracking-wider uppercase text-foreground hover:opacity-70 transition-opacity"
                activeClassName="opacity-100"
              >
                Home
              </NavLink>
              <NavLink 
                to="/projects" 
                className="text-sm font-medium tracking-wider uppercase text-foreground hover:opacity-70 transition-opacity"
                activeClassName="opacity-100"
              >
                Projects
              </NavLink>
              <NavLink 
                to="/experience" 
                className="text-sm font-medium tracking-wider uppercase text-foreground hover:opacity-70 transition-opacity"
                activeClassName="opacity-100"
              >
                Experience
              </NavLink>
              <NavLink 
                to="/contact" 
                className="text-sm font-medium tracking-wider uppercase text-foreground hover:opacity-70 transition-opacity"
                activeClassName="opacity-100"
              >
                Contact
              </NavLink>
            </div>

            {/* Resume CTA - place your resume at /public/resume.pdf or update the href to your hosted resume */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <Button asChild variant="default" className="rounded-none border-2 border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background transition-all">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open resume in new tab" className="flex items-center gap-2 px-4 py-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium tracking-wider uppercase">Resume</span>
                </a>
              </Button>
            </div>

            <button 
              aria-label="Toggle navigation menu" 
              className="text-sm font-medium tracking-widest uppercase text-foreground hover:opacity-70 transition-opacity md:hidden flex items-center gap-3"
            >
              <ThemeToggle />
              <span>MENU</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
