import { NavLink } from "@/components/NavLink";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Andrea Yanez Soto</h3>
            <p className="text-sm text-muted-foreground">
              CS student specializing in AI/ML and full-stack development.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="https://github.com/andreay99" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/andrea-yanez-soto-8b4653218" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                LinkedIn
              </a>
              <a href="https://devpost.com/andreay99" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                Devpost
              </a>
              <a href="mailto:andreayanez11@outlook.com" className="text-muted-foreground hover:text-accent transition-colors">
                Email
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Site</h4>
            <div className="flex flex-col gap-2 text-sm">
              <NavLink to="/" className="text-muted-foreground hover:text-accent transition-colors">
                Home
              </NavLink>
              <NavLink to="/projects" className="text-muted-foreground hover:text-accent transition-colors">
                Projects
              </NavLink>
              <NavLink to="/experience" className="text-muted-foreground hover:text-accent transition-colors">
                Experience
              </NavLink>
              <NavLink to="/blog" className="text-muted-foreground hover:text-accent transition-colors">
                Blog
              </NavLink>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Andrea Yanez Soto. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
