---
name: ux-laws
description: Apply psychological principles to evaluate and justify UI/UX design decisions. Use when reviewing interaction patterns, validating design choices, evaluating cognitive load, sizing/placing targets, or applying heuristics to a design problem.
source: Laws of UX (2nd ed.) — Jon Yablonski
---

# UX Laws Skill

Psychology is the single most valuable non-design skill a designer can have. These laws explain *why* certain design patterns work — enabling you to make principled decisions and defend them with evidence.

## When to Use

Trigger this skill when:
- Evaluating whether a design decision will confuse or help users
- Deciding how many options to show in a menu, form, or flow
- Sizing and placing interactive targets (buttons, links, touch areas)
- Reviewing response times, loading states, or animation feedback
- Justifying a design choice to stakeholders
- Performing a heuristic review of a UI
- Designing onboarding, checkout flows, or multi-step processes

---

## Quick Reference

| Law | One-liner | Core implication |
|-----|-----------|-----------------|
| **Jakob's Law** | Users expect your site to work like every other site they know | Follow conventions in high-cognition zones |
| **Fitts's Law** | Time to hit a target ∝ distance / size | Make important targets big and close |
| **Miller's Law** | Working memory holds ~7 (±2) chunks | Chunk information; don't limit nav to 7 items |
| **Hick's Law** | Decision time increases with number and complexity of choices | Reduce options at critical decision points |
| **Postel's Law** | Accept anything; output reliably | Design for real, messy, inconsistent human input |
| **Peak–End Rule** | Experience judged by peak moment + ending | Nail the most intense moment and the final step |
| **Aesthetic–Usability Effect** | Beautiful = feels more usable | Visual quality affects perceived trustworthiness |
| **Von Restorff Effect** | Different item is remembered best | Use visual distinction sparingly and intentionally |
| **Tesler's Law** | Complexity is conserved — it goes somewhere | Absorb complexity in the system, not the user |
| **Doherty Threshold** | Feedback within 400 ms keeps users in flow | Treat speed as a design feature, not a tech concern |

---

## Laws in Detail

### 1. Jakob's Law
> Users spend most of their time on *other* sites. They expect your site to work like the ones they already know.

**Psychology concept: Mental models** — users apply past experience to new systems. Mismatched mental models cause frustration and abandonment.

**Design implications:**
- Follow established conventions for: logo top-left → home, search top-right, nav hamburger mobile
- Don't innovate in navigation or critical workflows — innovate in content and value, not wayfinding
- When departing from convention, give users a transition period with the familiar version still available

**When convention applies more:** High-traffic, task-critical flows (checkout, login, search, nav)  
**When you can break it:** Branding moments, delight interactions, clearly labeled novel features

---

### 2. Fitts's Law
> Time to acquire a target = f(distance to target, size of target). Bigger + closer = faster.

**Formula (for reference):** `MT = a + b · log₂(2D/W)` where D = distance, W = width of target

**Design implications:**
- Primary CTAs: large, placed near where the user's cursor/thumb naturally rests
- Destructive actions (delete, cancel): small and/or distant from primary flow
- Mobile: minimum 44×44px touch targets (Apple HIG); 48×48dp (Material Design)
- Spacing between targets matters as much as target size — close-together small buttons are hard to hit
- Infinite edges (screen corners, edges) are "infinitely large" → put important actions there (OS dock, browser back button)
- Spatial computing / AR: Fitts still applies — distance and target size in 3D space

**Red flag:** Tiny icon-only buttons with no padding; close-together destructive/confirm actions

---

### 3. Miller's Law
> The average person can hold ~7 (±2) items in working memory at once.

**Important caveat:** This is about *chunks* of familiar information, not a hard limit on nav items. Do NOT use "7 items max in nav" as dogma — that misreads Miller.

**What Miller actually means for design:**
- **Chunking** is the real takeaway: group related information into meaningful units to reduce cognitive load
- Phone numbers (555-867-5309) vs (5558675309) — same digits, very different memorability
- Credit card fields: chunk into 4-digit groups
- Long forms: break into sections with clear headings
- Navigation: group by meaning, not by count

**Cognitive load theory (from Miller's work):**
- Intrinsic load = complexity of the content itself
- Extraneous load = complexity added by poor design (unnecessary steps, confusing labels)
- Germane load = productive cognitive effort that builds understanding

> Minimize extraneous load. You can't reduce intrinsic load of truly complex tasks — but you can stop adding noise on top of it.

---

### 4. Hick's Law
> Decision time = a + b · log₂(n choices). More choices = slower decisions.

**Design implications:**
- Reduce options at critical decision points (signup, checkout, primary CTA)
- Highlight a recommended option — one clear winner reduces the choice set cognitively
- Progressive disclosure: reveal options only when relevant, not all at once
- Break complex tasks into sequential smaller steps — each step has fewer options
- Onboarding: don't present all features at once; surface what matters now

**Misapplication warning:** Don't oversimplify to the point of hiding things users need. Hick's Law applies to *decision points*, not to feature richness overall.

**Red flag:** Registration forms that ask for every possible field upfront; dashboards with 15+ equal-weight actions

---

### 5. Postel's Law (Robustness Principle)
> Be conservative in what you do; be liberal in what you accept.

**Origin:** Jon Postel's TCP specification — "be conservative in what you send, liberal in what you receive."

**Design implications:**
- **Input tolerance:** Accept phone numbers with spaces, dashes, parens — normalize after entry. Accept dates in multiple formats. Accept email case-insensitively.
- **Output consistency:** Always produce accessible, reliable, predictable output regardless of device, bandwidth, screen size, or assistive tech
- **Progressive enhancement:** Base experience works for everyone; enhanced experience for capable devices
- **Graceful degradation:** Site works without JS, without fast network, without mouse
- **Accessibility by default:** Whatever the input mechanism (mouse, touch, keyboard, voice, switch), it should work

**Forms specifically:** Never reject valid input because of formatting. Auto-format, auto-correct, accept variations. Show constraints *before* submission, not after.

---

### 6. Peak–End Rule
> People judge an experience by how they felt at the emotional peak and at the end — not the average.

**Research origin:** Kahneman et al. — patients preferred a *longer* painful colonoscopy because the final moments were slightly less painful. Memory of the end dominated.

**Design implications:**
- Map your user journey and identify: (1) the highest-stakes/most-emotional moment, (2) the final moment
- **Peak moment:** Make it the most helpful, delightful, or empowering moment possible
- **End moment:** Close loops cleanly. Confirmation screens, success states, and offboarding matter enormously
- Negative peaks are remembered more vividly than positive ones → fix painful moments before polishing pleasant ones
- **Onboarding:** First use is a peak; make it feel like success, not a tutorial
- **Checkout:** Payment confirmation is the end; make it celebratory and clear
- **Error states:** If errors are the peak (they often are), handle them with empathy and clear recovery paths

---

### 7. Aesthetic–Usability Effect
> Users perceive aesthetically pleasing design as more usable — even when it isn't.

**Research:** Kurosu & Kashimura (1995) — ATM layouts rated both for aesthetics and usability. Attractive layouts received higher usability ratings regardless of actual usability.

**Design implications:**
- Visual quality directly influences trust, credibility, and perceived reliability
- Users tolerate minor usability issues in beautiful products that they wouldn't in ugly ones
- **Danger:** Beautiful design can *mask* real usability problems — users may not report issues because they like how it looks. Require behavioral testing, not just satisfaction surveys.
- Aesthetics is not decoration — it's a functional layer that shapes user perception

**Don't use this as a shortcut:** "It looks good so usability doesn't matter" is the wrong takeaway. Use aesthetics to support usability, not replace it.

---

### 8. Von Restorff Effect (Isolation Effect)
> The item that differs from its surroundings is most likely to be remembered.

**Design implications:**
- Use visual distinction (color, size, shape, motion) to highlight the one most important action on a screen
- **Constraint:** One item per context gets the "different" treatment — if everything is highlighted, nothing is
- CTAs: primary button should be visually distinct from secondary and tertiary actions
- Pricing tables: highlight the recommended plan with visual differentiation
- **Accessibility warning:** Don't rely on color alone to communicate distinction — use shape, size, or text as well
- **Motion warning:** Animation draws attention powerfully — use for critical state changes, not decoration; users with vestibular disorders are harmed by excessive motion

---

### 9. Tesler's Law (Law of Conservation of Complexity)
> For any system, there is a certain amount of complexity that cannot be reduced — it can only be shifted.

**Origin:** Larry Tesler at Xerox PARC/Apple. "If a million users each waste a minute per day on complexity an engineer could have eliminated in a week, you're penalizing users to make engineers' jobs easier."

**Design implications:**
- Every process has irreducible core complexity — your job is to absorb it in the system, not expose it to users
- Auto-fill, smart defaults, saved preferences, format normalization = complexity absorbed by the system
- When you can't eliminate complexity, own it in the backend: pre-compute, pre-fetch, validate silently
- **Failure mode:** Over-simplifying the UI to the point of hiding necessary controls — users can't complete tasks
- **Balance:** Simplify the surface; don't remove the depth users legitimately need

---

### 10. Doherty Threshold
> Productivity soars when system and user interact at <400 ms — neither waiting on the other.

**Response time thresholds:**

| Response time | User experience |
|--------------|----------------|
| < 100 ms | Feels instantaneous |
| 100–300 ms | Perceptible, still feels responsive |
| 300–1000 ms | Noticeable delay; user stays focused |
| > 1 second | Attention wanders; cognitive continuity breaks |
| > 10 seconds | User likely abandons task |

**Design implications:**
- Optimistic UI: apply state changes immediately in UI, confirm with server in background
- Skeleton screens over spinners: show structure while content loads
- Progress bars: make wait times tolerable (accuracy doesn't matter as much as presence)
- Perceived performance > actual performance: animations and transitions can make waits feel shorter
- **Intentional delay:** Sometimes a process *should* feel like it's working (e.g., "Calculating your results…" adds trust even when the answer is instant)
- Treat performance as a design feature in every review — not just a backend concern

---

## Applying Multiple Laws Together

Most design decisions touch several laws at once:

**Example: Designing a primary CTA button**
- Fitts: large enough, placed where thumb/cursor lands naturally
- Von Restorff: visually distinct from secondary actions
- Jakob's Law: looks and behaves like a button (affordance from convention)

**Example: Designing a checkout flow**
- Hick's Law: one decision per step, highlight recommended shipping option
- Peak–End: payment confirmation screen is the *end* — make it celebratory
- Doherty: payment processing feedback within 400 ms; show progress during server wait
- Miller: chunked form fields (card number in groups of 4)

**Example: Designing a navigation menu**
- Jakob's: use conventional nav patterns for the structure
- Miller: group by meaning, not by limiting to 7 items
- Hick's: reduce visible top-level options for first-time users (progressive disclosure)

---

## Ethics of Applying Psychology in Design

These laws can be used to *help* users or to *exploit* them. The same psychological principles that improve usability can create dark patterns:

| Principle | Helpful use | Dark pattern |
|-----------|------------|--------------|
| Von Restorff | Highlight the recommended plan | Make "cancel subscription" tiny and gray |
| Peak–End | Celebratory checkout confirmation | Trap users in an unsubscribe flow that ends in frustration |
| Hick's Law | Reduce options to simplify decisions | Pre-select the most expensive option |
| Aesthetic–Usability | Beautiful design builds trust | Beautiful packaging conceals predatory terms |

> **Rule:** Design with these laws to reduce friction toward the user's goals — not to steer users away from their goals toward business goals.

---

## Review Checklist

**Cognitive load**
- [ ] Information is chunked meaningfully (Miller)
- [ ] No decision point presents more than necessary options (Hick)
- [ ] Complex tasks broken into sequential steps (Hick)
- [ ] System absorbs complexity rather than exposing it to the user (Tesler)

**Interaction targets**
- [ ] Primary actions are large and close to the natural resting position (Fitts)
- [ ] Destructive actions are distant or require confirmation (Fitts)
- [ ] Touch targets ≥ 44×44px on mobile (Fitts)
- [ ] Spacing between adjacent targets is sufficient (Fitts)

**Visual hierarchy**
- [ ] One primary visual emphasis per view (Von Restorff)
- [ ] Color distinction backed by shape/size/text for accessibility (Von Restorff)
- [ ] Motion used for meaningful state changes only (Von Restorff)

**Conventions and mental models**
- [ ] Navigation, search, and structural patterns follow established conventions (Jakob)
- [ ] Departures from convention are intentional and clearly signaled (Jakob)
- [ ] Input forms accept natural, messy human input and normalize it (Postel)

**Feedback and timing**
- [ ] All interactions provide visible feedback within 400 ms (Doherty)
- [ ] Loading/processing states are communicated (Doherty)
- [ ] Peak moment in user journey is identified and designed for (Peak–End)
- [ ] End/completion states are clean, clear, and satisfying (Peak–End)
- [ ] Beautiful design supplements usability — behavioral testing still required (Aesthetic–Usability)
