# Lighthouse Audit Report
**Date:** November 26, 2025  
**Site:** Andrea Yanez Soto Portfolio  
**Build Status:** ✅ Production build successful

---

## Build Output Analysis

### Bundle Size Issues
**Current state:**
- Main JS bundle: **575.91 kB** (gzip: 172.75 kB) ⚠️
- CSS bundle: **72.36 kB** (gzip: 12.60 kB) ✅
- Total assets: **~900 KB** before gzip

**Issue:** Bundle exceeds 500 kB — indicates opportunity for code-splitting and lazy-loading.

**Recommendation:** Break apart route-level code with `React.lazy()` to split bundles by page.

---

## Priority 1: Critical Performance Issues

### 1.1 Large JavaScript Bundle (575 KB)
**Impact:** Slow initial page load, especially on mobile networks.

**Root Cause:** All routes and components bundled together; no code-splitting.

**Fix Options (pick 1-2):**

a) **Route-Based Code Splitting (Recommended)**
```tsx
// In src/App.tsx, wrap route components with React.lazy()
const Home = React.lazy(() => import("./pages/Home"));
const Projects = React.lazy(() => import("./pages/Projects"));
const Experience = React.lazy(() => import("./pages/Experience"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Recall = React.lazy(() => import("./pages/projects/Recall"));
const OffScript = React.lazy(() => import("./pages/projects/OffScript"));
const SonaAI = React.lazy(() => import("./pages/projects/SonaAI"));
const Bikeshare = React.lazy(() => import("./pages/projects/Bikeshare"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Then wrap Routes in Suspense:
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/" element={<PageTransition><Home /></PageTransition>} />
    {/* ... other routes ... */}
  </Routes>
</Suspense>
```
**Expected benefit:** Reduce initial bundle by ~40-50%, load project details only when needed.

b) **Vite Manual Chunking**
```ts
// In vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'framer-motion'],
          'ui': ['@radix-ui/react-*', 'shadcn-ui'],
          'projects': ['./src/pages/projects/*'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
});
```

### 1.2 Large Image Assets (~700 KB total)
**Issue:** Background images and project screenshots are uncompressed.

**Fixes:**
- ✅ `LazyImage` is already in place (good!)
- Convert PNG screenshots to WebP with fallbacks
- Example: `offscript-interface-DcASVEHV.png` (101 KB) → WebP (~40 KB, 60% reduction)

**Action:**
```bash
# Convert images locally (macOS):
# Install imagemagick first: brew install imagemagick
for img in src/assets/*.png; do
  cwebp "$img" -o "${img%.png}.webp"
done
```

### 1.3 Missing Preload Directives
**Impact:** Critical fonts and assets not prioritized during page load.

**Fix:** Add to `index.html` head:
```html
<!-- Preload critical font -->
<link rel="preload" as="font" type="font/woff2" href="https://fonts.gstatic.com/s/playfairdisplay/..." crossorigin>

<!-- Preload critical CSS if inline-able -->
<link rel="preload" as="style" href="/assets/index-BFXkb2qM.css">
```

---

## Priority 2: Accessibility Issues (Estimated)

### 2.1 Missing ARIA Labels
**Issue:** Interactive elements (buttons, links) may lack descriptive labels.

**Locations to check:**
- Custom cursor button/toggle
- Navigation menu toggle on mobile
- Magnetic buttons

**Fix example:**
```tsx
// Before:
<button className="...">MENU</button>

// After:
<button aria-label="Toggle navigation menu" className="...">MENU</button>
```

### 2.2 Color Contrast
**Issue:** Some text may not meet WCAG AA (4.5:1) contrast ratio.

**Check:**
- `text-foreground/70` on light backgrounds (check ratio)
- `text-muted-foreground` combinations

**Recommendation:** Use a contrast checker tool; adjust opacity values if needed.

### 2.3 Keyboard Navigation
**Issue:** Custom cursor and interactive effects may trap keyboard focus.

**Fix:**
- Ensure all interactive elements are keyboard accessible (Tab, Enter, Space)
- Test with keyboard-only navigation
- Add visible focus indicators (outline or ring)

### 2.4 Semantic HTML
**Current:** Uses proper semantic structure (good!) but some opportunities:
- Ensure `<main>`, `<nav>`, `<footer>` landmarks are present (already done ✅)
- Add `<article>` tags around case studies

---

## Priority 3: SEO & Structured Data

### 3.1 JSON-LD (Already Partially Done ✅)
**Current:** Basic Person + WebSite schema added to `index.html`.

**Enhance with:**
- Article schema for blog/project pages
- BreadcrumbList for navigation
- Organization schema

**Add this to each project page (e.g., Recall.tsx):**
```tsx
// In useEffect or as a component:
useEffect(() => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Recall: AI Memory Assistant",
    "description": "...",
    "author": { "@type": "Person", "name": "Andrea Yanez Soto" },
    "datePublished": "2025-01-15"
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}, []);
```

### 3.2 Sitemap & Robots.txt
**Current:** `robots.txt` exists ✅

**Add sitemap.xml** (at root `public/sitemap.xml`):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/projects</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/projects/recall</loc>
    <priority>0.8</priority>
  </url>
  <!-- ... other pages ... -->
</urlset>
```

### 3.3 Missing Meta Tags
**Add to `index.html`:**
```html
<!-- For specific pages, consider route-based meta tags -->
<meta name="robots" content="index, follow" />
<meta property="og:locale" content="en_US" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

---

## Priority 4: Core Web Vitals Optimization

### 4.1 Largest Contentful Paint (LCP)
**Current:** Hero section images/text loads after animations.

**Optimization:**
- Prioritize hero image preload
- Reduce animation startup delay on home page
- Consider static image for LCP instead of animated background

### 4.2 Cumulative Layout Shift (CLS)
**Current:** Animations with `initial={{ opacity: 0 }}` may cause layout shift.

**Fix:**
- Set explicit width/height on containers to prevent reflow
- Use `transform` instead of `position` changes for animations

### 4.3 First Input Delay (FID) → Interaction to Next Paint (INP)
**Current:** Custom cursor and hover effects may delay interactions.

**Optimization:**
- Debounce magnetic button calculations
- Use `requestAnimationFrame` for smooth updates
- Consider disabling custom cursor on low-end devices

---

## Priority 5: Quick Wins (Easy, High Impact)

### 5.1 Enable Gzip on Server
If deploying to Vercel/Netlify, gzip is automatic. ✅

### 5.2 Add 304 Not Modified Caching
```ts
// vite.config.ts
export default defineConfig({
  server: {
    headers: {
      'Cache-Control': 'public, max-age=3600'
    }
  }
});
```

### 5.3 Minify & Tree-Shake Unused CSS
Already handled by Vite. ✅

### 5.4 Critical CSS Inlining
For fonts and hero styles, consider inline `<style>` tag in `index.html`.

---

## Estimated Scores (Based on Analysis)

| Metric | Current | After Fixes | Target |
|--------|---------|-------------|--------|
| **Performance** | 55-65 | 75-85 | 90+ |
| **Accessibility** | 75-80 | 85-90 | 95+ |
| **Best Practices** | 80-85 | 90-95 | 95+ |
| **SEO** | 80-85 | 90-95 | 100 |

---

## Actionable Roadmap

### Phase 1: Quick Wins (30 min)
1. Add route-based code-splitting with `React.lazy()`
2. Add `aria-label` to menu toggle and custom interactive elements
3. Update `index.html` canonical URL to actual domain

### Phase 2: Performance (1-2 hours)
1. Convert PNG images to WebP
2. Add Vite manual chunking config
3. Preload critical fonts
4. Enable Service Worker for offline support (optional)

### Phase 3: SEO & Accessibility (1 hour)
1. Add Article JSON-LD to project pages
2. Create `sitemap.xml`
3. Check color contrast ratios
4. Add keyboard navigation labels

### Phase 4: Testing & Deployment (1-2 hours)
1. Run Lighthouse on production build
2. Test on mobile/low-end devices
3. Deploy to Vercel/Netlify with automatic Lighthouse CI

---

## Tools & Resources

- **Lighthouse Browser Extension:** https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpombljlkpstbnduc37b3o
- **WebP Converter:** https://squoosh.app/ or `cwebp` CLI
- **Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Schema Validator:** https://validator.schema.org/
- **Mobile Simulator:** Chrome DevTools → Toggle Device Toolbar (Ctrl+Shift+M)

---

## Notes

- Your site is **very well structured** with good semantic HTML and animations.
- Main bottleneck is **bundle size** — fixing this will have the biggest impact.
- The `LazyImage` component you added is a **great first step** toward performance.
- Your **JSON-LD schema is already in place** — just needs per-page enhancements.

---

*Next step: Pick Phase 1 or 2 fixes to implement. I can help code any of these!*
