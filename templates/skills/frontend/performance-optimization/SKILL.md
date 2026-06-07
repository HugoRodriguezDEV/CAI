---
name: performance-optimization
description: Optimize web page load speeds, resource sizes, and user interaction responsiveness. Apply Google Core Web Vitals targets (LCP, INP, CLS) and smart image delivery strategies.
source: Core Web Vitals Guidelines (web.dev), Image Optimization Best Practices (ImageKit)
---

# Frontend Performance Optimization Skill

This skill guides you in diagnosing and improving frontend performance, optimizing initial page load times, ensuring layout stability, and maximizing responsiveness. It details implementations for Google's Core Web Vitals (LCP, INP, CLS) and advanced image delivery strategies.

---

## When to Use

Trigger this skill when:
- Auditing web page load performance or Core Web Vitals (LCP, INP, CLS)
- Configuring assets delivery (images, fonts, scripts)
- Writing or refactoring React components/HTML tags to display images and media
- Optimizing main thread bottlenecks and long-running JavaScript execution tasks
- Reviewing PRs for load-performance compliance, responsive images, or visual shifts

---

## 1. Core Web Vitals (75th Percentile Targets)

Google uses three core metrics captured from real users (Field Data / CrUX) to evaluate user experience. All three must hit the "Good" threshold at the 75th percentile of page loads.

| Metric | Target | Rationale | Common Causes of Failure | Primary Optimizations |
|:---|:---|:---|:---|:---|
| **LCP**<br>*(Largest Contentful Paint)* | **≤ 2.5s** | Measures perceived loading speed. Marks when the main content loads. | Slow server response; Render-blocking JS/CSS; Slow resource load times (large hero images); Client-side rendering frameworks. | - Use `<link rel="preload">` on LCP image.<br>- Add `fetchpriority="high"` to LCP image tag.<br>- Cache assets at the Edge (CDN).<br>- Defer non-critical CSS/JS. |
| **INP**<br>*(Interaction to Next Paint)* | **≤ 200ms** | Measures page responsiveness to all user interactions. | Long-running JavaScript tasks blocking the main thread; Large DOM tree size; Complex style calculations. | - Split long tasks (>50ms) using `requestIdleCallback` or yield patterns.<br>- Debounce/throttle heavy input listeners.<br>- Defer non-critical scripts. |
| **CLS**<br>*(Cumulative Layout Shift)* | **≤ 0.1** | Measures visual stability. Detects unexpected jumps in content. | Images, videos, or iframes without explicit dimensions; Dynamically inserted content; Late web font loading. | - Declare explicit `width` and `height` (or CSS `aspect-ratio`).<br>- Reserve layout space for ads/widgets.<br>- Use `font-display: swap` for custom web fonts. |

---

## 2. Image Optimization (ImageKit & CDN Best Practices)

Images typically account for the largest percentage of page weight. Apply these principles to minimize bandwidth and rendering latency.

### Format & Compression
1. **Serve Next-Gen Formats:** Prefer **AVIF** (best compression) or **WebP** over PNG/JPEG. AVIF offers up to 50% savings compared to standard JPEGs with identical visual quality.
   - Configure CDNs to automatically rewrite formats based on browser support (e.g. ImageKit's `f-auto` transformation parameter).
2. **Apply Smart Quality Steps:** Compress images to a balance point of `q-80` or `q-75`. Going below `q-70` can cause visible compression artifacts, while going above `q-85` yields diminishing returns in quality at the cost of high file sizes.

### Responsive Dimensions
Avoid serving full-resolution desktop images to mobile clients. Generate scaled variants and serve them using `srcset` and `sizes` in combination with CDN width parameters (`w-`).

```html
<!-- Responsive Image Implementation -->
<img 
  src="https://ik.imagekit.io/demo/tr:w-800,q-80/hero.jpg"
  srcset="
    https://ik.imagekit.io/demo/tr:w-400,q-80/hero.jpg 400w,
    https://ik.imagekit.io/demo/tr:w-800,q-80/hero.jpg 800w,
    https://ik.imagekit.io/demo/tr:w-1200,q-80/hero.jpg 1200w
  "
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  width="800"
  height="450"
  loading="eager"
  fetchpriority="high"
  alt="Company Hero Banner"
  class="w-full h-auto object-cover"
/>
```

---

## 3. Loading Strategies: Above vs. Below the Fold

Apply different loading priorities depending on whether an asset is immediately visible to the user (above-the-fold) or requires scrolling to view (below-the-fold).

```
┌──────────────────────────────────────────────┐  ▲
│ Above-the-fold (Visible immediately)          │  │
│  - loading="eager"                           │  │ LCP Critical Zone
│  - fetchpriority="high"                      │  │
│  - Preload images/fonts in head              │  ▼
├──────────────────────────────────────────────┤  
│ Below-the-fold (Off-screen, requires scroll)  │  ▲
│  - loading="lazy" (Images & Iframes)         │  │ Bandwidth Saving Zone
│  - content-visibility: auto                  │  ▼
└──────────────────────────────────────────────┘
```

1. **Above-The-Fold (LCP Critical):**
   - **Do not lazy load!** Setting `loading="lazy"` on LCP images delays their fetch and hurts performance.
   - Use `loading="eager"` and `fetchpriority="high"` to tell the browser to prioritize this request.
   - Preload the resource in the HTML `<head>`:
     ```html
     <link rel="preload" fetchpriority="high" as="image" href="hero-mobile.webp" type="image/webp" media="(max-width: 600px)">
     <link rel="preload" fetchpriority="high" as="image" href="hero-desktop.webp" type="image/webp" media="(min-width: 601px)">
     ```
2. **Below-The-Fold (Deferred):**
   - Always use `loading="lazy"` on off-screen `<img>` and `<iframe>` elements to defer loading.
   - Apply this rule to cards, avatar grids, footers, and supplementary visual content.

---

## 4. Frontend Performance Coding Patterns

### Non-blocking Scripts
Ensure non-critical third-party scripts (analytics, chat widgets) do not block DOM parsing.
- Use `defer` for scripts that depend on the DOM or execution order (scripts run in order after parsing is complete).
- Use `async` for independent scripts (analytics) that can run out of order without blocking parsing.

```html
<!-- Correct script tags declaration -->
<script defer src="/js/app.js"></script>
<script async src="https://www.google-analytics.com/analytics.js"></script>
```

### Yielding to the Browser (INP Optimization)
If a user interaction triggers a heavy calculation, do not run it synchronously. Yield execution to the browser to paint the next frame first.

```typescript
// Optimizing INP by yielding main thread
function handleUserClick() {
  // 1. Immediately update visual feedback (paint next frame)
  setLoadingState(true);
  
  // 2. Yield the expensive work to the next browser frame
  setTimeout(() => {
    runExpensiveCalculation();
    setLoadingState(false);
  }, 0);
}
```

### Deferring Off-screen Layout Rendering
Skip rendering calculations for off-screen components (like long menus, footer content, or list pages) using the CSS `content-visibility` property. Use `contain-intrinsic-size` to prevent layout shifts when the element enters the viewport.

```css
.offscreen-section {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px; /* Establishes placeholder height */
}
```

---

## 5. Performance Review Checklist

Use this checklist during PR reviews and performance optimizations:

- [ ] **LCP Fetch Priority:** Is the LCP element identified? Does it use `fetchpriority="high"` and `loading="eager"`? Is it preloaded if dynamic?
- [ ] **No Lazy-Loaded LCP:** Confirm that no lazy loading (`loading="lazy"`) is applied to LCP or above-the-fold media elements.
- [ ] **Media Dimensions:** Do all images, videos, and iframes specify explicit `width`/`height` attributes or CSS `aspect-ratio` to prevent layout shifts (CLS)?
- [ ] **Modern Image Formats:** Are images served in AVIF/WebP formats? Are they compressed at a reasonable quality scale (`q-75` or `q-80`)?
- [ ] **Responsive Sizes (`srcset`):** Are large images delivering custom responsive sizes (`srcset` and `sizes`) to prevent serving desktop resolutions to mobile displays?
- [ ] **Asset Preloading:** Are custom web fonts preloaded with `crossorigin` to prevent FOIT (Flash of Invisible Text) layout shifts?
- [ ] **Non-blocking Scripts:** Are scripts deferred (`defer`) or loaded asynchronously (`async`)?
- [ ] **Yielding Long Tasks:** Do heavy interaction click/input handlers yield computation using `setTimeout`, `requestAnimationFrame`, or custom Hooks to preserve low INP?
- [ ] **Off-screen Layout Optimization:** Is `content-visibility: auto` used for off-screen sections or footers to skip unnecessary layout calculations?
