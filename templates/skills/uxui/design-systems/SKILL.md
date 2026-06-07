---
name: design-systems
description: Build and review reusable UI component systems using Atomic Design (atoms→pages), modular CSS, and design tokens. Use when creating UI components, defining a component library, structuring a design system, or deciding where a UI pattern belongs in the hierarchy.
source: Atomic Design — Brad Frost
---

# Design Systems Skill

Methodology: **Atomic Design** (Brad Frost). Think of interfaces as both a cohesive whole and a collection of parts simultaneously. We're not designing pages — we're designing systems of components.

## When to Use

Trigger this skill when:
- Creating or refactoring a UI component
- Deciding where a new pattern fits in the component hierarchy
- Building or extending a component library / design system
- Reviewing a PR that adds UI components
- Naming or documenting UI patterns for a team
- Evaluating if a component is too large or doing too much

---

## The Five Stages

| Stage | Definition | Concrete example | React equivalent |
|-------|-----------|-----------------|-----------------|
| **Atom** | UI element that can't be broken down further without losing function | `<input>`, `<label>`, `<Button>`, `<Icon>` | Primitive component, no children composition |
| **Molecule** | Simple group of atoms functioning together as a unit | Search form = Label + Input + Button | Component that composes 2–4 atoms with a single responsibility |
| **Organism** | Relatively complex component forming a distinct interface section | Site header = Logo atom + Nav molecule + Search molecule | Feature-level component; may repeat a molecule N times (product grid) |
| **Template** | Page-level layout that places components and defines content structure | Homepage skeleton with slots for header, hero, article list | Layout component with placeholder/skeleton regions; no real data |
| **Page** | Specific template instance with real representative content | Actual homepage with real headlines, images, users | Route/view component that injects real data into a template |

### Concrete chain example

```
<Input />           ← atom
<Label />           ← atom
<Button />          ← atom
        ↓ combine
<SearchForm />      ← molecule (label + input + button, one job: search)
        ↓ combine
<SiteHeader />      ← organism (logo + nav + search form)
        ↓ place in layout
<HomepageTemplate>  ← template (skeleton: header slot, hero slot, articles slot)
        ↓ fill with real data
<HomePage />        ← page (real content, real users, real variants)
```

---

## Mental Model

Atomic Design is **not a linear process** — it's a mental model for dancing between abstract and concrete:

- When crafting a component → painter at the canvas (detailed strokes, isolated focus)
- When viewing the full layout → painter steps back (how parts affect the whole)

Parts influence the whole. The whole influences the parts. Both views are always necessary.

---

## Decision Rules

### Atom or Molecule?
- **Atom**: Can't decompose further without the element ceasing to be functional. `<Button>` alone has meaning. Remove the label from a search form and the input loses purpose.
- **Molecule**: 2+ atoms with a single clear job. If it does one thing and that thing requires cooperation between atoms → molecule.

### Molecule or Organism?
- **Molecule** = simple, portable, single responsibility ("do one thing well"). Easily dropped anywhere.
- **Organism** = forms a distinct, standalone **section** of the interface. May contain dissimilar molecules (logo + nav + search) or repeat the same molecule (product grid repeating `<ProductCard />`).

### Organism or Template?
- **Organism** = reusable section that works anywhere.
- **Template** = layout structure for a specific page type. Articulates *content structure* (image size constraints, character limits) — NOT the final content.

### Template or Page?
- **Template** = skeleton. Placeholder content, no real data. Design system accounts for dynamic content here.
- **Page** = template + real representative content + **all variations**:
  - Cart with 1 item vs 10 items
  - First-time user (no history) vs returning user
  - Headline 40 chars vs 340 chars
  - Admin dashboard vs read-only dashboard

> Pages are where you test if the design system actually works. If something breaks at the page stage, loop back and fix molecules/organisms/templates.

---

## Modular CSS

Atomic Design pairs with modular CSS methodologies to keep styles scalable and maintainable.

| Methodology | Core idea | Best for |
|-------------|-----------|---------|
| **BEM** (Block Element Modifier) | `.block__element--modifier` — explicit hierarchy in class names | Component-scoped styles, large teams, clear ownership |
| **OOCSS** (Object-Oriented CSS) | Separate structure from skin; separate container from content | High reuse, performance-critical UIs |
| **SMACSS** (Scalable Modular Architecture) | 5 categories: Base, Layout, Module, State, Theme | Projects that need clear categorical separation of styles |

**Naming is a shared vocabulary.** Inconsistent names ("utility toolbar" vs "touch slider hero" vs "top bar widget") cause communication breakdowns. Pick one naming system, document it in your style guide, and enforce it across design AND code.

### BEM quick reference (most common)

```css
/* Block: standalone component */
.search-form {}

/* Element: part of the block */
.search-form__input {}
.search-form__button {}

/* Modifier: variation or state */
.search-form--compact {}
.search-form__button--disabled {}
```

---

## Design Tokens & Responsive

**Atoms have intrinsic properties** — these become your design tokens:

```ts
// tokens.ts — atom-level properties extracted
export const tokens = {
  color: {
    primary: '#0066CC',
    danger:  '#D32F2F',
  },
  fontSize: {
    sm: '0.875rem',  // body small
    base: '1rem',    // body
    lg: '1.25rem',   // heading 5
    xl: '1.5rem',    // heading 4
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
  },
  radius: {
    sm: '4px',
    md: '8px',
    full: '9999px',
  },
}
```

**Responsive components:** Build atoms and molecules as fluid units, not fixed-pixel designs per breakpoint. Static mockups showing every screen size are the most effective way to show clients what their site will never look like. Focus on:
1. Intrinsic sizing (min/max constraints, not hard pixel locks)
2. Fluid typography (clamp, relative units)
3. Component-level breakpoints (container queries > page breakpoints)

---

## Style Guide / Pattern Library

A pattern library is **not an auxiliary project** — bake it in from day one.

### Benefits
| Benefit | Why it matters |
|---------|---------------|
| Shared vocabulary | "SearchForm" means the same thing to designers, devs, and PMs |
| Isolation testing | Debug components without the noise of the full page context |
| Reuse velocity | After initial cost, subsequent work is significantly faster |
| Long-term value | Style guides increase in value over time — even a full redesign reuses structural building blocks |
| Stakeholder alignment | Eliminates "special snowflake syndrome" — makes the system visible |

### Common failure modes to avoid
- Treating the pattern library as separate from the final product (it IS the product)
- No governance → patterns diverge, library goes stale
- Skipping the style guide because "we're short on time" → creates the debt that costs the time
- Accessibility and performance treated as extras → they're structural, not optional

---

## Review Checklist

Use this when creating or reviewing a UI component:

**Hierarchy**
- [ ] Component is correctly classified (atom / molecule / organism / template / page)
- [ ] Atoms don't compose other custom components — only native elements or design tokens
- [ ] Molecules have a single, clear responsibility
- [ ] Organisms form a distinct, reusable interface section
- [ ] Templates define content structure without real data
- [ ] Pages cover representative content variations (empty states, long text, admin vs guest)

**Reusability**
- [ ] Component is portable — usable in multiple contexts without modification
- [ ] No hardcoded data or business logic in atom/molecule components
- [ ] Props/API is minimal and purpose-specific (no prop explosion)

**Naming**
- [ ] Name matches the shared vocabulary (style guide / Figma tokens)
- [ ] CSS class names follow the team's methodology (BEM / OOCSS / SMACSS)
- [ ] No generic names: `utils`, `misc`, `box2`, `newHeader`

**Design tokens**
- [ ] Colors, spacing, font sizes, radii use tokens — no magic numbers
- [ ] Responsive behavior is fluid, not a list of pixel breakpoints per device

**Style guide**
- [ ] New pattern is documented in the pattern library
- [ ] Existing pattern reused where possible — no duplication
