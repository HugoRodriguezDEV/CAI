---
name: information-architecture
description: Structure, organize, and label digital information so users can find and understand it. Use when designing navigation, content hierarchies, taxonomies, labeling systems, search systems, or multi-channel information structures.
source: Information Architecture for the Web and Beyond (4th ed.) — Rosenfeld, Morville & Arango
---

# Information Architecture Skill

> "Structure and organization are about building rooms. Navigation design is about adding doors and windows."

IA = how you organize, label, and connect information so users can find what they need, understand where they are, and accomplish their goals — across web, mobile, and beyond.

## When to Use

Trigger this skill when:
- Designing site navigation (global nav, local nav, breadcrumbs)
- Defining content hierarchy or taxonomy
- Choosing category names / labels for menus, headings, buttons
- Planning search functionality or filters
- Structuring multi-channel content (web + mobile + wearable)
- Performing a content audit or sitemap review
- Deciding how to group or classify content items

---

## The Four Core Systems

| System | What it does | Key question |
|--------|-------------|--------------|
| **Organization** | Groups content into categories and hierarchies | *How is content classified and structured?* |
| **Labeling** | Names and represents categories, links, headings | *What words do we use to communicate structure?* |
| **Navigation** | Lets users browse and move through the environment | *How do users get from A to B?* |
| **Search** | Lets users query and retrieve content dynamically | *How do users find specific items by asking?* |

These four systems are interdependent. You organize content into groups, then label those groups; navigation exposes the organization structure; search provides an alternative path when browsing fails.

---

## 1. Organization Systems

### Organization schemes (how content is classified)

**Exact schemes** — mutually exclusive, unambiguous. Easy to design, easy to use. Require users to know what they're looking for.

| Scheme | Example use | When to choose |
|--------|------------|----------------|
| Alphabetical | A-Z index, glossary | Known-item searching |
| Chronological | Press releases, blog archives | When date/sequence is intrinsically meaningful |
| Geographical | Store locators, region-specific content | Location is a primary variable |

**Ambiguous schemes** — more intellectually meaningful, support serendipitous discovery. Require more design effort and ongoing maintenance.

| Scheme | Example use | When to choose |
|--------|------------|----------------|
| **Topical** | News sections, encyclopedia, e-commerce categories | Primary use case is subject browsing |
| **Task-oriented** | App toolbars, wizard flows, intranets | Limited, high-priority tasks dominate |
| **Audience-specific** | CERN (Scientists / Students / Journalists) | Clearly different audiences with non-overlapping needs |
| **Metaphor-based** | Desktop OS (files/folders/trash) | Bridging unfamiliar concepts to known mental models |
| **Hybrid** | Most real sites (topic + task + audience) | Almost always — rarely one pure scheme alone |

### Organization structures (how items relate)

| Structure | Description | Trade-off |
|-----------|-------------|-----------|
| **Hierarchy** | Parent → child trees | Familiar, scalable; items can only live in one branch |
| **Database** | Records + fields + queries | Flexible retrieval; requires structured, homogeneous content |
| **Hypertext** | Free associative links | Maximum flexibility; risk of disorientation ("M.C. Escher architecture") |
| **Faceted** | Multiple independent dimensions simultaneously | Powerful for complex catalogs; expensive to build and maintain |

> **Rule:** Hierarchy + hypertext + search together outperform any single structure. Use hierarchy as the backbone, hypertext for lateral connections, search as the escape hatch.

### Organization challenges to anticipate

- **Ambiguity** — language is inherently ambiguous ("pitch" has 15+ definitions). Words mean different things to different users.
- **Heterogeneity** — mixed content types (articles, videos, apps, PDFs) resist one-size-fits-all schemes.
- **Perspective bias** — org charts bleed into navigation. Design for user mental models, not internal politics.
- **Politics** — departments fight for visibility. Anchor decisions in user research, not org hierarchy.

---

## 2. Labeling Systems

Labels are the most visible manifestation of your IA. A label is a shortcut that triggers the right association without displaying all the underlying information.

### Common label types

| Type | Examples |
|------|---------|
| Contextual links | "Learn more about accessibility" embedded in body text |
| Headings | `<h1>`, `<h2>` — label the content that follows |
| Navigation labels | "Products", "Support", "About" in the global nav |
| Index terms | Tags, keywords, subject headings used for search/filtering |
| Iconographic labels | Hamburger menu, magnifying glass (search), home icon |

### Good label design rules

1. **Speak the user's language** — not internal jargon. If your org calls it "Order Processing System," users call it "Buy."
2. **Labels should differentiate** — "Coffee," "Coffeehouse," and "Menu" on the same navbar cause confusion. Each label must clearly contrast with its siblings.
3. **Successful labels are invisible** — they don't get in the way; users click without hesitation.
4. **Consistency within a system** — use the same term across all touchpoints. Mixing "cart," "bag," and "basket" fractures mental models.
5. **Scope notes for ambiguous terms** — when a term might be misread, add a short descriptor (tooltip, sub-label) rather than forcing a click-through to understand.
6. **Context changes meaning** — "Menu" means navigation on mobile; it means food on a restaurant desktop site. Test labels in their actual rendering context.

### How to source better labels

- Card sorting (users group and name categories themselves)
- Competitor and analogous-site audits
- Existing controlled vocabularies in the domain (medical, legal, engineering)
- Search query logs — what words do users actually type?
- Interviews and surveys

---

## 3. Navigation Systems

Navigation goal: give users both **context** (where am I?) and **flexibility** (where can I go?).

### Embedded navigation (lives inside pages)

| Type | Purpose | Typical form |
|------|---------|-------------|
| **Global** | Present on every page; access to key areas site-wide | Top nav bar, logo → home |
| **Local** | Navigation within a sub-section of the site | Left sidebar, secondary nav |
| **Contextual** | Links to related content embedded in page content | "See also", "Related products", inline text links |

**Placemaking rules** — users always need to know:
1. Which site/app am I in? (logo + visual identity persistent everywhere)
2. Where am I within the hierarchy? (breadcrumbs, highlighted nav item, current-page indicator)
3. Where can I go next? (links descriptive enough to predict destination)

**Navigation stress test** — run users through this:
1. Ignore the homepage, jump into a random deep page
2. Can they tell which site they're in? Which section? What's the parent?
3. Are links descriptive enough to choose between them?

### Supplemental navigation (lives outside pages)

| Type | When to use |
|------|------------|
| **Sitemap** | Bird's-eye overview of the whole structure; valuable for large, complex sites |
| **A-to-Z index** | Direct alphabetical access; best when exact known-item searching dominates |
| **Guided tours / wizards** | Linear flows for specific audiences, tasks, or topics; step 3 of 8 |
| **Fat footer** | Abridged sitemap at page bottom; provides safety net and secondary access |

### Navigation anti-patterns

- Pure deep hierarchy without lateral links → "Gopherspace" trap: users can only go up/down, never across
- Too many navigation aids → buries hierarchy, overwhelms users
- Navigation labels that mirror the org chart → confuses users who don't know internal structure
- Inconsistent navigation across pages → destroys the mental model of structure

---

## 4. Search Systems

Search = dynamic alternative to browsing. Design it when users have specific, hard-to-browse-to needs.

### Search anatomy

| Component | Design decision |
|-----------|----------------|
| **Search interface** | Where to place it, how visible, what placeholder text |
| **Query language** | Boolean (AND/OR/NOT), phrase search, field-specific search |
| **Query builders** | Autocomplete, spell check, stemming (runs → run), synonym expansion |
| **Search zones** | Subsets of content indexed separately (e.g., only search tech support area) |
| **Results presentation** | What metadata to show per result, how many results, sort/filter options |
| **Best bets** | Manually curated top results for high-frequency queries |

### When to add search

- Large content volume (50+ pages of heterogeneous content)
- Users have specific known-item needs
- Browsing paths are too deep or ambiguous
- Content changes frequently (dynamic)

### When browsing beats search

- Small, well-organized content
- Users are exploratory ("I don't know exactly what I want")
- Content has strong topical hierarchy users already understand

---

## "Invisible" Components (Background Architecture)

These components users never see but power the systems above:

| Component | What it does |
|-----------|-------------|
| **Controlled vocabulary** | Predetermined preferred terms for a domain (e.g., "automobile" not "car/auto/vehicle") |
| **Thesaurus** | Controlled vocab + broader/narrower/related terms + scope notes |
| **Metadata** | Structured data attached to content items (author, date, topic, format, audience) |
| **Retrieval algorithms** | Determine relevance ranking in search results |

**Metadata strategy:**
```
Content item
  ├── Descriptive: title, author, description, keywords
  ├── Administrative: created, modified, permissions, format
  ├── Structural: order, parent/child relationships, navigation placement
  └── Domain-specific: price, size, SKU (e-commerce) / specialty, level (education)
```

---

## Multi-Channel IA

IA must stay coherent across channels. Same content, different contexts:

| Channel | IA consideration |
|---------|----------------|
| Desktop web | Full navigation visible; mega-menus OK |
| Mobile web | Progressive disclosure; hamburger menus collapse global nav |
| Native app | OS navigation conventions (iOS vs Android) override web patterns |
| Wearable | Extreme brevity; 1–2 actions max per screen |
| Voice | Sequential, no visual hierarchy — labeling becomes audio scripting |

> **Rule:** Build the semantic structure (organization, labeling, metadata) independent of any single channel's rendering. The structure feeds all surfaces; the surface layer adapts.

---

## IA Review Checklist

**Organization**
- [ ] Content is grouped by user mental models, not internal org chart
- [ ] Organization scheme is identified (topical / task / audience / hybrid) and documented
- [ ] Items at the same level of the hierarchy are truly peers (same type, same granularity)
- [ ] Ambiguous content has been resolved (or multiple placements provided)

**Labeling**
- [ ] Labels use user language, not internal jargon
- [ ] No two sibling labels could be confused for the same category
- [ ] Labels are consistent across all touchpoints (web, mobile, email, docs)
- [ ] Ambiguous labels have supporting context (scope notes, sub-labels, tooltips)

**Navigation**
- [ ] Users can always answer: which site am I in? Where in the hierarchy? Where can I go?
- [ ] Global nav is consistent across all pages
- [ ] Contextual links connect related content laterally (not just up/down)
- [ ] Supplemental nav (sitemap / index) exists for large or complex structures
- [ ] Navigation stress test has been run (parachute into deep page, check orientation)

**Search**
- [ ] Search is present when content exceeds browsing capacity
- [ ] Results show enough metadata to evaluate before clicking
- [ ] Zero-results page provides next steps (suggestions, fallback browse)
- [ ] High-frequency queries have best bets

**Multi-channel**
- [ ] Semantic structure (org + labels + metadata) is channel-independent
- [ ] Navigation pattern adapts appropriately per device/context
- [ ] Labels work in audio/voice context if applicable
