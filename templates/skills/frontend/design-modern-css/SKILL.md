---
name: design-modern-css
description: Write clean, performant, and modern CSS and Tailwind styles using modern layout algorithms, custom properties, utility classes, and Open Props design tokens. Use when styling UIs, configuring Tailwind, implementing CSS resets, or building custom theme variables.
source: Josh W. Comeau (CSS Reset & Layouts), Tailwind CSS Official Core Concepts, Open Props
---

# Modern CSS and Tailwind Styling Skill

This skill guides you in applying modern CSS layout algorithms, styling patterns, utility-first concepts (Tailwind CSS), and design tokens (Open Props and custom properties) to construct resilient, responsive, and maintainable user interfaces.

---

## When to Use

Trigger this skill when:
- Writing or refactoring CSS/Tailwind rules for a layout or component
- Setting up or tuning a global style reset or configuration
- Integrating CSS Custom Properties (variables) or Design Tokens (Open Props)
- Debugging unexpected styling behaviors (z-index leaks, broken layouts, margin collapses)
- Reviewing UI layouts for responsiveness, fluid design, and clean styling patterns

---

## 1. The Modern CSS Reset (Josh W. Comeau)

A modern web project must establish a sensible, minimal baseline reset to eliminate browser inconsistencies and avoid redundant overrides.

```css
/* 1. Use a more-intuitive box-sizing model */
*, *::before, *::after {
  box-sizing: border-box;
}

/* 2. Remove default margin for common layout elements */
* {
  margin: 0;
}

/* 3. Ensure HTML & body occupy full viewport height */
html, body {
  height: 100%;
}

/* 4. Improve line-height and rendering for text */
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
}

/* 5. Make media elements responsive and align correctly */
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

/* 6. Form elements inherit typography */
input, button, textarea, select {
  font: inherit;
}

/* 7. Prevent overflow of very long words/strings */
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

/* 8. Create a root stacking context (prevents z-index leaks) */
#root, #__next {
  isolation: isolate;
}
```

### Rationale Behind Key Rules:
- **`box-sizing: border-box`**: Forces width and height calculations to include borders and padding.
- **`margin: 0`**: Avoids unexpected spacing from default User Agent styles on headers, paragraphs, and list elements, allowing layout containers (Flex/Grid) to handle spacing cleanly.
- **`isolation: isolate`**: Creates a local stacking context at the application root level. This guarantees that elements inside the application (such as absolute menus or modals) will not overlap or be overlapped by elements outside this context.

---

## 2. Layout Algorithms

Layout in modern CSS is not about modifying isolated properties (like `width` or `margin` in a vacuum), but about choosing the correct **Layout Algorithm** (layout mode) and configuring it.

### Layout Algorithm Matrix

| Algorithm | Stacking / Dimension | Spacing & Alignment | Best Used For |
|:---|:---|:---|:---|
| **Flow Layout**<br>*(Default)* | Block elements stack vertically; Inline elements flow horizontally. | Handles margin-collapsing natively on block elements. | Text documents, content-heavy articles, standard vertical layouts. |
| **Flexbox Layout**<br>*(One-dimensional)* | Elements lay out in a single axis (row or column). | Dynamic space distribution using `justify-content` and `align-items`. | Navigation bars, button groups, linear sidebars, card body alignments. |
| **Grid Layout**<br>*(Two-dimensional)* | Elements align in rows and columns concurrently. | Cells are defined by track templates. Uses the `gap` property for both axes. | Complex dashboard grids, multi-column cards, page templates, asymmetric layouts. |

### Core Rules for Layout Modes:
1. **Flow Layout Collapse**: In normal flow layout, adjacent vertical margins collapse into one. To prevent margin collapse, either change the layout algorithm (e.g. use Flexbox/Grid), apply padding, or add borders.
2. **Flex Dimension Control**: Use `flex-grow`, `flex-shrink`, and `flex-basis` explicitly to prevent flex items from shrinking or growing unexpectedly.
   - `flex-basis` defines the initial size of the element before distribution.
   - `flex-shrink: 0` prevents the element from shrinking below its contents.
3. **Grid Fluidity**: Prefer fluid columns over fixed breakpoints.
   ```css
   /* Auto-fitting fluid columns that automatically wrap on smaller viewports */
   grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
   ```

---

## 3. Utility-First CSS (Tailwind CSS)

Tailwind CSS provides low-level utility classes to construct custom designs. It enforces design constraints and eliminates custom class naming battles.

### Utility-First Rules:
1. **Never build custom class abstractions prematurely**: Avoid using `@apply` to bundle styles into classes like `.btn` or `.card` without a strong reuse requirement. Prefer reusing component files (React, Vue, etc.) over creating custom CSS classes.
2. **Design responsively using mobile-first**: Tailwind media queries apply from the specified breakpoint *and up*.
   - **Correct**: Mobile styles by default, enhanced at larger screens (e.g., `flex flex-col md:flex-row`).
   - **Incorrect**: Designing for desktop first and trying to override down.
3. **Utilize Interactive Modifiers (States)**: Structure classes logically starting with base layouts, followed by text, borders, colors, and lastly interactive/responsive modifiers.
   - Focus states: Always combine focus styles for keyboard users (`focus-visible:ring-2`) and remove default outline safely.
   - Group States: Use `group` on parent element to trigger styles in children on hover (e.g., `group-hover:opacity-100`).
   - Peer States: Use `peer` on sibling elements to react to sibling changes (e.g., form validation or checked states).

### Code Example: Interactive Card (Tailwind)

```html
<div class="group relative rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-sky-500 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
  <h3 class="text-lg font-semibold text-slate-900 transition-colors group-hover:text-sky-500 dark:text-white">
    Modern Web Card
  </h3>
  <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
    Styled entirely with utility classes, utilizing group hover states and transition classes.
  </p>
  <button class="mt-4 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2">
    Action Button
  </button>
</div>
```

---

## 4. Open Props & Design Tokens

[Open Props](https://open-props.style/) provides highly optimized CSS Custom Properties (Variables) that behave as "sub-atomic" design tokens.

### Common Open Props Variables (Quick Reference)

| Token Type | Variables | Description |
|:---|:---|:---|
| **Colors** | `var(--blue-5)`, `var(--indigo-7)`, `var(--surface-1)` | Consistent color palettes with curated steps. |
| **Spacing & Sizes**| `var(--size-3)`, `var(--size-fluid-4)` | Fluid sizing scales that adapt to screen size. |
| **Shadows** | `var(--shadow-1)` to `var(--shadow-6)` | Soft, layered natural shadows. |
| **Borders** | `var(--radius-2)`, `var(--border-size-2)` | Predictable rounding and line weights. |
| **Animations** | `var(--animation-fade-in)`, `var(--animation-slide-up)` | Fluid transitions and keyframes out of the box. |

### Component Custom Property Encapsulation:
To make components modular and prevent specificity leaks, decouple styles using local variables that override global defaults.

```css
/* button.css */
.custom-btn {
  /* Declare component API variables with fallbacks */
  background-color: var(--btn-bg, var(--blue-6));
  color: var(--btn-color, white);
  border-radius: var(--btn-radius, var(--radius-2));
  padding: var(--size-2) var(--size-4);
  font-weight: var(--font-weight-6);
  border: 1px solid transparent;
  transition: background-color 0.2s var(--ease-3);
}

.custom-btn:hover {
  background-color: var(--btn-bg-hover, var(--blue-7));
}

/* Specific button styles are overridden by simply updating the variable API */
.custom-btn--accent {
  --btn-bg: var(--pink-6);
  --btn-bg-hover: var(--pink-7);
}

.custom-btn--pill {
  --btn-radius: var(--radius-round);
}
```

---

## 5. Expert Combo: Tailwind + Open Props / Variables

You can combine the rapid styling of utility classes with the dynamic flexibility of CSS Custom Properties by using Tailwind arbitrary value syntax (`-[var(...)]`).

### Code Example: Hybrid Styling Component (React)

```tsx
import React from 'react';
import 'open-props/style'; // Import Open Props tokens

interface ButtonProps {
  children: React.ReactNode;
  themeColor?: string; // e.g. 'var(--pink-6)' or 'var(--teal-5)'
}

export const HybridButton: React.FC<ButtonProps> = ({ children, themeColor }) => {
  // Apply the themeColor prop dynamically through inline custom property
  const styleApi = themeColor ? { '--custom-theme': themeColor } as React.CSSProperties : undefined;

  return (
    <button
      style={styleApi}
      className="rounded-[var(--radius-3)] bg-[var(--custom-theme,var(--indigo-6))] px-[var(--size-3)] py-[var(--size-2)] text-white shadow-[var(--shadow-2)] transition-all hover:bg-[var(--custom-theme-hover,var(--indigo-7))] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--custom-theme,var(--indigo-6))]"
    >
      {children}
    </button>
  );
};
```

---

## 6. Review Checklist

Use this checklist during code review or styling iteration:

- [ ] **Reset Baseline:** Is there a modern CSS reset active in the project (preventing default headers margins, establishing `box-sizing: border-box`, etc.)?
- [ ] **Layout Algorithmic Fit:** Is the layout algorithm matching the use case (Flexbox for 1D, Grid for 2D, Flow for text)?
- [ ] **Flex/Grid Responsiveness:** Are layout containers responsive without hardcoding device breakpoints? (e.g. using `grid-template-columns: repeat(auto-fit, ...)` or flex wrap).
- [ ] **Tailwind Utility Formatting:** Are Tailwind classes grouped logically? (Layout/Flex -> Dimensions/Spacing -> Typography -> Colors -> Modifiers/Responsiveness).
- [ ] **State Modifiers & Accessibility:** Are focus states clearly styled (`focus-visible:`)? Do interactive elements have hover and transition properties?
- [ ] **Design Tokens Consistency:** Are spacing, shadows, and color steps using standardized design variables (custom variables or Open Props) instead of arbitrary hex codes or pixel sizes?
