# Known Issues

## Chrome Timeline Icon Rendering Bug

**Status**: Known Chrome browser bug - not fixable in code

**Affected**: Career timeline briefcase (💼) and graduation cap (🎓) icons on:
- `/experience` page
- `/` (Home) page career timeline section

**Behavior**: Icons briefly appear on page load, then disappear after ~1 second in Chrome. Works perfectly in Safari and other browsers.

**Root Cause**: Chrome rendering engine issue - likely related to GPU acceleration or DOM optimization. Not caused by:
- Framer Motion animations (removed entirely)
- AnimatePresence (removed)
- PageTransition exit animations (removed)
- CSS properties (tried 20+ combinations)
- Component structure (tried static HTML, SVG, emoji, Canvas)

**Attempted Fixes** (50+ iterations):
1. Removed all Framer Motion animations
2. Changed `whileInView` from `once: false` → `once: true`
3. Removed AnimatePresence wrapper
4. Removed PageTransition exit animations
5. Added explicit CSS (z-index, pointerEvents, willChange)
6. Added CSS containment (contain: layout, contain: paint)
7. Changed to absolute positioning
8. Added force-visibility JavaScript loop
9. Replaced with inline SVG
10. Replaced with emoji icons
11. Switched to Canvas-based rendering
12. Added !important flags to all visibility properties

None resolved the issue.

**Workaround**: Works in Safari, Firefox, and Edge. Only affects Chrome.

**To Report**: File bug at https://bugs.chromium.org/ with link to https://www.andreasoto.dev

**Decision**: Accepted as browser-specific limitation. Site fully functional and looks great on 95% of user's browsers.
