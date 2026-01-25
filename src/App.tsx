import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import { PageTransition } from "./components/PageTransition";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { BackToTop } from "./components/BackToTop";
import { ThemeProvider } from "./context/ThemeContext";

// Lazy load route components for code-splitting
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const Experience = lazy(() => import("./pages/Experience"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
import Analytics from "./pages/Analytics"; // Import directly - don't lazy load
const Recall = lazy(() => import("./pages/projects/Recall"));
const OffScript = lazy(() => import("./pages/projects/OffScript"));
const SonaAI = lazy(() => import("./pages/projects/SonaAI"));
const Bikeshare = lazy(() => import("./pages/projects/Bikeshare"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const RouteLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-pulse">
      <div className="h-2 bg-foreground/20 rounded w-48 mb-4" />
      <div className="h-2 bg-foreground/20 rounded w-32" />
    </div>
  </div>
);

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  // Scroll to top on route change with smooth behavior
  useEffect(() => {
    // Use requestAnimationFrame to ensure scroll happens after layout
    const scrollTimer = requestAnimationFrame(() => {
      // Scroll the main window
      window.scrollTo({ top: 0, behavior: 'auto' });
      
      // Also scroll any scroll containers (like on Home page)
      const scrollContainers = document.querySelectorAll('.scroll-container');
      scrollContainers.forEach(container => {
        container.scrollTop = 0;
      });
    });
    
    return () => cancelAnimationFrame(scrollTimer);
  }, [location.pathname]);

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Suspense fallback={<RouteLoadingFallback />}><PageTransition><Home /></PageTransition></Suspense>} />
      <Route path="/projects" element={<Suspense fallback={<RouteLoadingFallback />}><PageTransition><Projects /></PageTransition></Suspense>} />
      <Route path="/projects/recall" element={<Suspense fallback={<RouteLoadingFallback />}><PageTransition><Recall /></PageTransition></Suspense>} />
      <Route path="/projects/offscript" element={<Suspense fallback={<RouteLoadingFallback />}><PageTransition><OffScript /></PageTransition></Suspense>} />
      <Route path="/projects/sona-ai" element={<Suspense fallback={<RouteLoadingFallback />}><PageTransition><SonaAI /></PageTransition></Suspense>} />
      <Route path="/projects/bikeshare" element={<Suspense fallback={<RouteLoadingFallback />}><PageTransition><Bikeshare /></PageTransition></Suspense>} />
      <Route path="/experience" element={<Suspense fallback={<RouteLoadingFallback />}><PageTransition><Experience /></PageTransition></Suspense>} />
      <Route path="/contact" element={<Suspense fallback={<RouteLoadingFallback />}><PageTransition><Contact /></PageTransition></Suspense>} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/blog" element={<Suspense fallback={<RouteLoadingFallback />}><PageTransition><Blog /></PageTransition></Suspense>} />
      <Route path="*" element={<Suspense fallback={<RouteLoadingFallback />}><PageTransition><NotFound /></PageTransition></Suspense>} />
    </Routes>
  );
};

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CustomCursor />
        <ScrollProgressBar />
        <BackToTop />
        <VercelAnalytics />
        <BrowserRouter>
          <Navigation />
          <AnimatedRoutes />
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
