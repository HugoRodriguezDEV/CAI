---
name: usability
description: Evaluate and improve web/app usability using common sense principles. Use when reviewing UI flows, assessing navigation, applying Mobile First design, evaluating accessibility, or planning lean usability testing.
source: Don't Make Me Think, Revisited — Steve Krug
---

# Usability Skill

> "Your job is to get rid of the question marks."
> — Steve Krug, First Law of Usability

Usability = how easily users accomplish their goals without expending unnecessary mental effort. Not about making things "user-friendly" in the abstract — about eliminating friction that doesn't serve the user.

## When to Use

Trigger this skill when:
- Reviewing a UI flow or page for friction points
- Auditing navigation and wayfinding
- Designing mobile experiences or applying Mobile First
- Evaluating accessibility
- Planning or running a lean usability test
- Arbitrating design debates with evidence
- Writing or reviewing microcopy (labels, errors, empty states)

---

## Krug's Three Laws

| Law | Statement | Implication |
|-----|-----------|-------------|
| **First Law** | Don't make me think | Every question mark = cognitive tax. Eliminate them. |
| **Second Law** | It doesn't matter how many times I have to click | Tapping/clicking is fine as long as each step is mindless and confident |
| **Third Law** | Get rid of half the words, then get rid of half of what's left | Every extra word is noise that users have to scan past |

**Self-evident vs self-explanatory:**
- Goal = self-evident: users "get it" without thinking at all
- Minimum acceptable = self-explanatory: requires a little thought, but only a little
- If you can't reach self-evident, reach for self-explanatory. Never leave it at "just figure it out"

**Clarity trumps consistency.** If making something clearer requires a small inconsistency, choose clarity.

---

## How Users Actually Use the Web

Three facts that destroy most assumptions designers make:

### Fact 1: Users don't read — they scan

Users act like sharks: they keep moving. They glance at a page, scan for trigger words, and click the first thing that seems relevant. The designer's mental image of users "reading my carefully crafted text" is almost always wrong.

**Why they scan:**
- On a mission to complete a task quickly
- Know they don't need to read everything — looking for the relevant bits
- Good at scanning from years of reading newspapers, feeds, search results

**Design response:** Pages must work like billboards at 60 mph, not like product brochures.

### Fact 2: Users don't make optimal choices — they satisfice

Users don't evaluate all options and choose the best one. They click the first thing that seems like it might work (satisficing = satisfying + sufficing). Back button is the most-used browser button for a reason.

**Why they satisfice:**
- Optimizing takes time; satisficing is faster
- Penalty for a wrong click is just Back button — very low cost
- On poorly designed sites, more analysis doesn't improve outcomes anyway

**Design response:** Make the right answer the first plausible answer users see. Don't hide the correct path behind clever naming.

### Fact 3: Users don't figure out how things work — they muddle through

Most users never build an accurate mental model of how a system works. They use things effectively with completely wrong internal models and never correct them.

**Design response:** Design for muddlers. Don't expect users to RTFM. Don't rely on tooltips or tutorials to cover for confusing UI. If something confuses people, fix the UI.

---

## Billboard Design Principles

Design for scanning. Every page should pass the "billboard at 60 mph" test.

### 1. Create a clear visual hierarchy

Three traits of a scannable visual hierarchy:
- **Prominence = importance** — most important elements are larger, bolder, distinct color, more whitespace, or near the top
- **Related = grouped** — visually similar things are logically related
- **Nested = part-of** — visual nesting shows parent/child relationships

Flat pages (everything looks equally important) force users to do the visual hierarchy work themselves — much slower, and they'll often give up.

### 2. Break pages into clearly defined areas

Users decide in the first glance which areas of a page are worth attention and which to skip entirely. Banner blindness is an extreme form of this — users ignore anything that looks like an ad area.

**Each area should communicate its purpose at a glance:**
- Navigation
- Main content
- Search
- "Things you can do here"
- "What this site sells"

### 3. Make clickable things obvious

Users are constantly looking for the next thing to click. Clickable things must be identifiable by shape (button, tab), location (nav bar), or formatting (color + underline for links).

**Red flag:** Same color for links and non-clickable headings; flat buttons with no visual affordance; ghost buttons with insufficient contrast.

### 4. Eliminate noise

Three types of visual noise to cut:
- **Shouting** — everything is bold/big/colorful → nothing reads as important
- **Disorganization** — random placement, unclear groupings
- **Clutter** — more things than the page needs to accomplish its purpose

### 5. Omit needless words

Remove: happy talk ("Welcome to our site!"), instructions that explain obvious things, excessive marketing copy.

Keep: words that tell users where they are, what this is, what they can do, and what happens next.

---

## Navigation Design

Navigation IS the website — it's not a feature of the site, it IS the site.

### What navigation must always communicate

Users dropped into any page (via search result, direct link, referral) must be able to answer:
1. **What site/app is this?** (persistent logo/branding)
2. **What page am I on?** (current location clearly indicated)
3. **What are the major sections?** (persistent global nav)
4. **What are my options at this level?** (local nav)
5. **Where have I been?** (visited link styling)
6. **How do I search?** (persistent search, if applicable)

### Persistent navigation (the Holy Trinity)

Every page should have: **Site ID** (logo → home) + **Way Home** + **Search** (or at minimum a way back to primary navigation)

Exception: forms and checkout flows — strip nav to reduce distraction and leakage.

### The trunk test

Krug's quick usability diagnostic. Grab any random interior page and check if users can answer:
1. What site is this?
2. What page am I on?
3. What are the major sections of this site?
4. What are my options at this level?
5. Where am I in the scheme of things?
6. How do I search?

If any of these require more than a glance, the navigation has a usability problem.

### Homepage specific requirements

Homepage must convey:
- What this is
- What they can do here
- Why they should be here (not a competitor's site)
- Where to start

**Common homepage anti-patterns:**
- Happy talk that says nothing ("Welcome to the future of...")
- Promotional content that buries the actual value proposition
- No obvious starting point for the primary user task

---

## Mobile First

### What Mobile First actually means

Design the mobile version first based on what's **most important** to users. Then add features for larger screens. Forces prioritization by making constraints explicit from the start.

**Common misconception:** "Mobile users are on the go and only need simple features." Wrong. Users access mobile sitting on the couch. They want everything. You still have to prioritize everything — just now you have to be ruthless about it.

### Mobile usability rules

**All desktop usability still applies — plus:**

1. **Real estate is precious** — every element competes harder. Cut more aggressively.
2. **Manage depth thoughtfully** — mobile sites go deeper (more taps to reach content). OK to tap more, NOT OK to feel lost or uncertain while tapping.
3. **Confident tap confidence** — users keep going as long as they're confident what they want is further down/behind that link. Lose their confidence → they stop.
4. **Touch targets ≥ 44×44px** — fingers are not cursors
5. **Don't disable zoom** — zooming is a crucial fallback for accessibility and small screens
6. **Don't redirect to mobile homepage** — deep links from email/social must land on the target content, not the mobile homepage
7. **Managing real estate ≠ removing usability** — never sacrifice wayfinding, affordances, or error recovery to save space

### Mobile tradeoffs are real

Most mobile usability failures = poor decisions about tradeoffs. Every constraint creates a tradeoff. Most serious usability problems are bad tradeoff decisions. Document tradeoffs explicitly — if you're removing a feature, say why and what the user impact is.

---

## Usability Testing (Lean)

### The core principle

"If you want to know whether something is easy to use, watch some people while they try to use it and note where they run into problems."

You don't need a lab. You don't need 20 participants. You need to watch real people try real tasks.

### The Krug testing protocol

| Parameter | Recommendation | Why |
|-----------|---------------|-----|
| **Frequency** | One morning per month | Simple enough to keep doing; fits any team schedule |
| **Participants per round** | 3 | Enough to find the most serious problems; you can fix more than 3 can find |
| **Participant type** | Loose fit, grade on a curve | Narrow recruiting delays testing; most core problems affect everyone |
| **Session length** | ~1 hour per participant | Enough time for multiple tasks |
| **What to fix** | The most serious problems first | You'll always find more problems than you can fix |

**"You can find more problems in half a day than you can fix in a month."** Focus beats completeness.

### Qualitative vs quantitative

- **This type of testing** = qualitative. Purpose is to identify and fix problems, not prove anything statistically.
- Quantitative testing requires large samples, controlled protocols, statistical analysis → expensive, infrequent.
- Most teams need qualitative testing done consistently more than quantitative testing done rarely.

### What to observe

- Where does the user hesitate or pause?
- Where do they click something wrong?
- Where do they express confusion or frustration?
- What do they say to themselves (thinking out loud)?
- Do they ever read instructions? (Hint: almost never)
- Do they find what they were looking for?

### What NOT to do during testing

- Do not explain what you meant — that's the problem
- Do not guide them toward the correct path
- Do not defend design decisions to participants
- Do not ask "what would you prefer" (users say; users do: different things)

---

## Accessibility

### The real argument

The most compelling reason to make your site accessible: **it's profoundly the right thing to do.** Blind users with a screen reader can now read any newspaper or magazine independently. That's extraordinary. Not a legal checkbox — a moral baseline.

> Legal compliance will be mandatory sooner or later. Do it because it's right, not because of the stick.

### Krug's practical accessibility principles

**The "three-second test":** Increase the browser text size. Does anything break? Fixed-size fonts (px instead of rem/em) fail this immediately.

**Four things that make the biggest difference:**

1. **Add appropriate alt text to images** — not "image of X" but descriptive text that conveys meaning. Decorative images get `alt=""`.
2. **Use proper heading structure** — `<h1>` through `<h6>` in logical order. Screen readers navigate by headings.
3. **Make forms work with keyboard** — every input, button, and interactive element reachable via Tab; visible focus states.
4. **Add captions to video** — benefits users with hearing impairments AND users in noisy/quiet environments AND non-native speakers.

**Accessibility often helps everyone:**
- Captions: useful for hearing impairment AND noisy environments
- Larger tap targets: useful for motor impairment AND fat thumbs
- Clear labels: useful for screen readers AND confused sighted users
- High contrast: useful for low vision AND bright sunlight

### Common accessibility failures

- Fixed px fonts that don't scale with user preferences
- Focus states removed with `outline: none` (keyboard navigation breaks)
- Images with missing or meaningless alt text
- Forms with inputs not associated with labels (`<label for="...">`)
- Color as the only indicator of state (links same color as body text, errors only shown in red)
- Videos without captions
- Non-semantic markup (divs for headings, no landmark roles)

---

## Goodwill and Courtesy

Users arrive with a reservoir of goodwill. Every friction drains it. Goodwill is fragile — one bad experience can override many good ones.

**Things that drain goodwill:**
- Hiding information users need (pricing, contact info, phone number buried)
- Punishing users for not knowing your rules (strict form validation without clear guidance)
- Asking for information you don't need
- Fake FAQs (questions the company wishes people would ask, not actual FAQs)
- Auto-playing audio or video
- Pop-ups on mobile that cover content
- No way to recover from errors gracefully

**Things that build goodwill:**
- Answering the questions users actually have (real FAQs, real support)
- Error messages that explain what happened and what to do next
- Forgiving input (accept phone numbers in any format)
- Apologizing when something went wrong and you can't fix it
- Making hard things easy, even if it costs you engineering time

---

## Review Checklist

**First Law (Don't make me think)**
- [ ] Every page/screen passes the "what is this?" test at a glance
- [ ] All clickable/tappable elements are visually obvious
- [ ] Labels use user language, not internal jargon or clever marketing copy
- [ ] No unnecessary question marks — no "where am I?", "is this clickable?", "why did they call it that?"
- [ ] Clarity chosen over consistency where they conflict

**Scanning**
- [ ] Clear visual hierarchy: prominence = importance; related = grouped; nested = part-of
- [ ] Page divided into clearly defined areas identifiable at a glance
- [ ] Needless words cut (happy talk, redundant instructions, marketing filler)
- [ ] Visual noise reduced (no shouting, no disorganization, no clutter)

**Navigation**
- [ ] Site ID / logo present and links to home on every page
- [ ] Current page/section clearly indicated
- [ ] Global nav persistent across all non-form pages
- [ ] Page passes the trunk test (6 questions answerable at a glance)
- [ ] Homepage communicates what this is, what you can do, why you should stay

**Mobile**
- [ ] Designed Mobile First (constraints drove prioritization, not afterthought)
- [ ] Touch targets ≥ 44×44px
- [ ] Zoom not disabled
- [ ] Deep links go to target content, not mobile homepage
- [ ] Usability not sacrificed for real estate management

**Usability testing**
- [ ] Test schedule exists (at least monthly)
- [ ] Testing with real users, not other designers/developers
- [ ] Most serious problems fixed before next round
- [ ] Qualitative observation (hesitation, confusion) over survey opinions

**Accessibility**
- [ ] Text scales with browser text size (rem/em, not px for fonts)
- [ ] All images have appropriate alt text
- [ ] Heading structure is logical (`<h1>` → `<h2>` → `<h3>`, not for style)
- [ ] Forms have associated labels; keyboard navigation works; focus states visible
- [ ] Color is not the only indicator of state/meaning
- [ ] Videos have captions

**Goodwill**
- [ ] Contact/pricing/key info is easy to find
- [ ] Error messages explain what happened and how to recover
- [ ] Input validation is forgiving (normalize, don't reject)
- [ ] No unnecessary data collection in forms
