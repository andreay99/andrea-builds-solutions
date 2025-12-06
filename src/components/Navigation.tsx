import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, FileText, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/logo.png";
import { useState } from "react";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="section-container">
        <div className="flex items-center justify-between h-20 md:h-24">
          <NavLink 
            to="/" 
            className="hover:opacity-70 transition-opacity cursor-pointer flex items-center"
            onClick={() => setMobileMenuOpen(false)}
            title="Go to home page"
            aria-label="Andrea Soto - Home"
          >
            <img src={logo} alt="Andrea Soto Logo - Click to return home" className="h-16 md:h-20 w-auto hover:scale-105 transition-transform" />
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
              <NavLink 
                to="/analytics" 
                className="text-sm font-medium tracking-wider uppercase text-foreground hover:opacity-70 transition-opacity"
                activeClassName="opacity-100"
              >
                Analytics
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

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu" 
              className="md:hidden flex items-center gap-3"
            >
              <ThemeToggle />
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-foreground/10">
            <div className="flex flex-col gap-3 pt-4">
              <NavLink 
                to="/" 
                className="text-sm font-medium tracking-wider uppercase text-foreground hover:opacity-70 transition-opacity px-2 py-2"
                activeClassName="opacity-100 bg-foreground/10 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink 
                to="/projects" 
                className="text-sm font-medium tracking-wider uppercase text-foreground hover:opacity-70 transition-opacity px-2 py-2"
                activeClassName="opacity-100 bg-foreground/10 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </NavLink>
              <NavLink 
                to="/experience" 
                className="text-sm font-medium tracking-wider uppercase text-foreground hover:opacity-70 transition-opacity px-2 py-2"
                activeClassName="opacity-100 bg-foreground/10 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Experience
              </NavLink>
              <NavLink 
                to="/contact" 
                className="text-sm font-medium tracking-wider uppercase text-foreground hover:opacity-70 transition-opacity px-2 py-2"
                activeClassName="opacity-100 bg-foreground/10 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
              <NavLink 
                to="/analytics" 
                className="text-sm font-medium tracking-wider uppercase text-foreground hover:opacity-70 transition-opacity px-2 py-2"
                activeClassName="opacity-100 bg-foreground/10 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Analytics
              </NavLink>
              <Button asChild variant="default" className="rounded-none border-2 border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background transition-all mt-2">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open resume in new tab" className="flex items-center justify-center gap-2 px-4 py-2 w-full">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium tracking-wider uppercase">Resume</span>
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
