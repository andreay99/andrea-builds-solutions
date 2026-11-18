import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { Navigation } from "./components/Navigation";
import { CustomCursor } from "./components/CustomCursor";
import { PageTransition } from "./components/PageTransition";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { SiteFooter } from "./components/SiteFooter";
import { Preloader } from "./components/Preloader";
import { ThemeProvider } from "./context/ThemeContext";
import { TypeLab } from "./components/TypeLab";

// Lazy load route components for code-splitting
const Home = lazy(() => import("./pages/Home"));
const Experience = lazy(() => import("./pages/Experience"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
import Analytics from "./pages/Analytics"; // Import directly - don't lazy load
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const RouteLoadingFallback = () => (
  <div className="route-loading">Loading</div>
);

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  // Scroll to top on route change with smooth behavior
  // Home and an open project are the same page, so they share one key and never remount
  const routeKey = location.pathname.startsWith('/projects/') ? '/' : location.pathname;

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
  }, [routeKey]);

  return (
    <Routes location={location} key={routeKey}>
      <Route path="/" element={<Suspense fallback={<RouteLoadingFallback />}><PageTransition><Home /></PageTransition></Suspense>} />
      <Route path="/projects" element={<Navigate to="/#work" replace />} />
      <Route path="/projects/:slug" element={<Suspense fallback={<RouteLoadingFallback />}><PageTransition><Home /></PageTransition></Suspense>} />
      <Route path="/universe" element={<Navigate to="/" replace />} />
      <Route path="/experience" element={<Suspense fallback={<RouteLoadingFallback />}><PageTransition><Experience /></PageTransition></Suspense>} />
      <Route path="/contact" element={<Suspense fallback={<RouteLoadingFallback />}><PageTransition><Contact /></PageTransition></Suspense>} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/blog" element={<Suspense fallback={<RouteLoadingFallback />}><PageTransition><Blog /></PageTransition></Suspense>} />
      <Route path="*" element={<Suspense fallback={<RouteLoadingFallback />}><PageTransition><NotFound /></PageTransition></Suspense>} />
    </Routes>
  );
};

// Feeds the pointer position to whichever .card / .spot is under it (see index.css).
const useCardSpotlight = () => {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.<HTMLElement>('.card, .spot');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
};

const App = () => {
  useCardSpotlight();
  return (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CustomCursor />
        <ScrollProgressBar />
        <Preloader />
        <VercelAnalytics />
        <BrowserRouter>
          <Navigation />
          <TypeLab />
          <AnimatedRoutes />
          <SiteFooter />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
  );
};

export default App;
