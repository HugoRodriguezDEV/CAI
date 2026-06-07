---
name: frontend-architecture
description: Structure frontend code for long-term maintainability using Clean Architecture principles. Use when organizing React components, separating presentation from logic, applying SOLID to UI code, or deciding how to structure dependencies between layers.
source: Arquitectura Limpia (Clean Architecture) — Robert C. Martin
---

# Frontend Architecture Skill

> "The architecture of your application should scream what it does — not what frameworks it uses."
> — Robert C. Martin

Good frontend architecture separates what changes often (UI details) from what changes rarely (business rules). Frameworks, databases, and rendering engines are details. Business logic is the core. This distinction determines every structural decision.

## When to Use

Trigger this skill when:
- Structuring a new React/Vue feature or module
- Deciding where logic lives: component, hook, service, or domain
- A component is doing too many things (fetching + formatting + rendering)
- Adding testability to UI code without a running browser
- Refactoring a "fat component" that knows too much
- Evaluating whether a dependency direction is correct

---

## The Dependency Rule

The single rule that makes Clean Architecture work:

> **Source code dependencies must point inward only. Inner layers know nothing about outer layers.**

```
┌─────────────────────────────────────────┐
│  Frameworks & Drivers (outermost)       │  React, DOM, fetch, localStorage
│  ┌───────────────────────────────────┐  │
│  │  Interface Adapters               │  │  Presenters, Controllers, ViewModels
│  │  ┌─────────────────────────────┐  │  │
│  │  │  Use Cases                  │  │  │  Application-specific business rules
│  │  │  ┌───────────────────────┐  │  │  │
│  │  │  │  Entities             │  │  │  │  Core business rules (most stable)
│  │  │  └───────────────────────┘  │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

Dependencies: ←  (always inward)
Never: Entities → Use Cases, Use Cases → Adapters, etc.
```

**What this means in React:**
- A custom hook (Use Case) must not import a React component (Adapter/Framework)
- Business logic must not import React, fetch, or localStorage
- Only the outermost layer wires everything together

### The four layers applied to frontend

| Layer | What it contains | What it CANNOT know about |
|-------|-----------------|--------------------------|
| **Entities** | Pure business rules, domain types, calculations | Everything in outer layers |
| **Use Cases** | Orchestrate entities; define app-specific workflows | UI, framework, HTTP, storage |
| **Interface Adapters** | Presenters, ViewModels, Controllers, Mappers | Framework details (React internals) |
| **Frameworks & Drivers** | React components, API calls, routing, localStorage | Nothing — it wires others |

---

## Humble Object Pattern: View vs Presenter

Split every UI behavior into two classes: **one humble, one testable**.

### View (humble object)
- Hard to unit test — tied to the DOM/React lifecycle
- Contains the minimum code possible
- Just moves data from ViewModel onto the screen
- Has NO logic: no formatting, no conditionals about data values, no calculations

```tsx
// View — humble, untestable in isolation, no logic
function InvoiceView({ vm }: { vm: InvoiceViewModel }) {
  return (
    <div>
      <span>{vm.totalLabel}</span>
      <span style={{ color: vm.totalColor }}>{vm.formattedTotal}</span>
      <button disabled={vm.submitDisabled}>{vm.submitLabel}</button>
    </div>
  );
}
```

### Presenter (testable object)
- Accepts raw data from Use Cases (dates, numbers, Money objects)
- Formats it for display: strings, booleans, CSS values
- Produces a **ViewModel** — a plain data structure the View reads
- All display logic lives here and is fully unit testable without a browser

```ts
// Presenter — fully testable, no React dependency
function buildInvoiceViewModel(invoice: Invoice, locale: string): InvoiceViewModel {
  const total = invoice.calculateTotal();
  return {
    totalLabel: 'Total due',
    formattedTotal: formatCurrency(total, locale),
    totalColor: total < 0 ? 'var(--color-danger)' : 'var(--color-default)',
    submitDisabled: invoice.status !== 'ready',
    submitLabel: invoice.status === 'submitted' ? 'Submitted' : 'Submit Invoice',
  };
}
```

### ViewModel
- Plain data structure: strings and booleans only
- No business objects, no Money/Date instances — those have already been transformed
- View reads ViewModel directly, zero processing

```ts
interface InvoiceViewModel {
  totalLabel: string;
  formattedTotal: string;
  totalColor: string;
  submitDisabled: boolean;
  submitLabel: string;
}
```

**Rule:** If the View has an `if` that depends on a business value (not a UI state), it belongs in the Presenter.

---

## SOLID Applied to UI Components

### SRP — Single Reason to Change

A component changes for only one actor (one team, one business reason). When a component serves multiple actors, accidental duplication and coordination debt appear.

**Violation:**
```tsx
// UserCard changes when: (1) billing team changes invoice format,
// (2) marketing changes profile layout, (3) admin changes permissions UI
function UserCard({ user }) {
  return (
    <>
      <ProfileSection user={user} />       {/* marketing owns this */}
      <InvoiceSection user={user} />       {/* billing owns this */}
      <AdminPanel user={user} />           {/* admin owns this */}
    </>
  );
}
```

**Fix — Facade pattern:**
```tsx
// UserCard is now a Facade; each section has its own reason to change
function UserCard({ user }) {
  return (
    <>
      <UserProfile user={user} />
      <UserInvoices userId={user.id} />
      <UserAdminControls userId={user.id} />
    </>
  );
}
```

### OCP — Open for Extension, Closed for Modification

Add new variants by adding code, not changing existing code.

```tsx
// Closed: adding new ButtonVariant requires modifying this
function Button({ variant }) {
  if (variant === 'primary') return <button className="btn-primary" />;
  if (variant === 'danger') return <button className="btn-danger" />;
  // every new variant = open this file again
}

// Open: extend via props/composition, never by modifying internals
function Button({ className, children, ...props }) {
  return <button className={`btn ${className}`} {...props}>{children}</button>;
}
```

### LSP — Liskov Substitution

Any component that fulfills a contract can replace another. Design to interfaces (prop shapes), not to implementations.

```ts
// Contract: anything with onSubmit + isLoading can be used as a FormAction
interface FormActionProps {
  onSubmit: () => void;
  isLoading: boolean;
  label: string;
}

// Both are interchangeable — caller only knows the contract
function PrimaryFormAction(props: FormActionProps) { ... }
function AccessibleFormAction(props: FormActionProps) { ... }
```

### ISP — Interface Segregation

Components should not depend on props they don't use. Fat interfaces force unnecessary coupling.

```tsx
// Violation: UserAvatar gets the entire User object but uses only 2 fields
function UserAvatar({ user }: { user: User }) {
  return <img src={user.avatarUrl} alt={user.displayName} />;
}

// Correct: minimal interface, decoupled from full User shape
function UserAvatar({ avatarUrl, displayName }: { avatarUrl: string; displayName: string }) {
  return <img src={avatarUrl} alt={displayName} />;
}
```

### DIP — Dependency Inversion

Depend on abstractions (interfaces, contracts), not on concretions (implementations, specific APIs).

```tsx
// Violation: component is coupled to fetch + specific API shape
function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('/api/users').then(r => r.json()).then(setUsers);
  }, []);
  return users.map(u => <UserCard key={u.id} user={u} />);
}

// Correct: component depends on abstraction; data source is injected
function UserList({ loadUsers }: { loadUsers: () => Promise<User[]> }) {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => { loadUsers().then(setUsers); }, [loadUsers]);
  return users.map(u => <UserCard key={u.id} user={u} />);
}
// Caller wires the actual implementation:
<UserList loadUsers={() => fetch('/api/users').then(r => r.json())} />
```

---

## Component Cohesion

Three principles for deciding what belongs in the same module:

| Principle | Rule | Analogy |
|-----------|------|---------|
| **REP** — Reuse/Release Equivalence | Classes grouped together must be releasable together (same version, same release notes) | Don't mix authentication logic with reporting — they release independently |
| **CCP** — Common Closure Principle | Classes that change for the same reason belong together. Classes that change for different reasons belong apart. | SRP applied at the component level |
| **CRP** — Common Reuse Principle | Don't force users of a component to depend on things they don't use | ISP applied at the component level |

**Tension:** REP + CCP make components bigger (include related things). CRP makes them smaller (exclude unrelated things). A healthy architecture balances all three.

**Applied to React:**
- `useCheckout.ts` contains all checkout logic — same reason to change
- Don't put `useUserProfile` and `usePayment` in the same hook — they change for different actors
- If your `Button` exports 3 unrelated utilities that importers don't use, split them

---

## Component Coupling: Stable Dependencies

> **Depend in the direction of stability.**

Stability = amount of work required to change something. A component with many dependents is stable (hard to change) — many things rely on it. A component with no dependents is unstable (easy to change) — nothing relies on it.

```
I = Fan-out / (Fan-in + Fan-out)
I = 0  →  maximally stable (many dependents, no dependencies)
I = 1  →  maximally unstable (no dependents, many dependencies)
```

**Rule:** Volatile components (UI, views, adapters) should have I near 1. Core business components should have I near 0. Never let a stable component depend on a volatile one.

**Frontend implication:**
- `Button.tsx` (volatile: changes with design system) should depend on `tokens.ts` (stable: design tokens)
- Business logic (`calculateDiscount.ts`) should never import React components
- UI components may import hooks; hooks must not import UI components

### Dependency cycle = build/test failure

Cycles make components untestable in isolation:
```
ComponentA → ComponentB → ComponentA  ← cycle
```
**Fix options:**
1. Apply DIP — introduce an interface that A depends on; B implements it
2. Extract a third module both depend on

---

## Framework Independence

React, Vue, Next.js are details — they belong in the outermost layer.

**Signs you've coupled too tightly to the framework:**
- Business logic uses `useState`, `useEffect`, or React.Context directly
- You can't run a Use Case as a plain function in a unit test
- Changing the routing library requires touching business logic
- `next/router` is imported 10 files deep into the codebase

**Pattern: isolate framework at the boundary**

```ts
// Use Case — no framework dependency, fully testable
async function placeOrder(
  cart: Cart,
  paymentService: PaymentService,
  orderRepo: OrderRepository
): Promise<Order> {
  const order = cart.toOrder();
  await paymentService.charge(order);
  return orderRepo.save(order);
}

// Framework adapter wires it (Next.js route handler)
export async function POST(req: Request) {
  const cart = await req.json();
  return placeOrder(cart, stripePaymentService, supabaseOrderRepo);
}
```

The Use Case is testable with mocks. The adapter is so thin it barely needs testing.

---

## Screaming Architecture

Your folder structure should communicate what the system does, not which framework it uses.

```
// Bad — screams "we use React"
src/
  components/
  hooks/
  pages/
  contexts/

// Better — screams "this is an invoice system"
src/
  invoices/
    InvoiceList.tsx          ← View
    InvoicePresenter.ts      ← Presenter
    useInvoiceList.ts        ← Use Case / Controller
    Invoice.ts               ← Entity
  payments/
    ...
  shared/
    ...
```

New developers reading the repo understand the domain immediately. Framework choice becomes an implementation detail visible only at the leaves.

---

## Testability Checklist

Architecture is testable when:

- [ ] Unit tests for business logic run without React, without a browser, without a running server
- [ ] Use Cases can be tested by calling plain functions with mock dependencies
- [ ] Presenters are tested by passing domain objects and asserting ViewModel output
- [ ] Views are so thin they barely need testing (just moves ViewModel data to screen)
- [ ] No `fetch` or API client import appears in Entity or Use Case files
- [ ] Dependency cycles can be detected at import time (eslint-plugin-import or similar)

---

## Review Checklist

**Dependency Rule**
- [ ] No inner layer imports from an outer layer
- [ ] Business logic files have zero React/Vue/framework imports
- [ ] Only the outermost wiring files import concrete implementations (HTTP clients, storage adapters)
- [ ] Data crossing layer boundaries is plain objects (DTOs), not entity instances or framework objects

**Humble Object / Presenter**
- [ ] Views contain no conditional logic based on domain values
- [ ] All display formatting (dates, currency, labels, colors, disabled states) lives in Presenter/ViewModel
- [ ] ViewModel is plain data: strings and booleans only
- [ ] Presenter is unit testable without a browser

**SOLID**
- [ ] Each component has one reason to change (SRP)
- [ ] New variants added by extension, not by modifying existing code (OCP)
- [ ] Component props are minimal — no unused required fields passed through (ISP)
- [ ] Components depend on abstractions (prop contracts), not specific implementations (DIP)

**Cohesion & Coupling**
- [ ] Things that change together are co-located (CCP)
- [ ] No component forces consumers to depend on things they don't use (CRP)
- [ ] Stable components (tokens, entities, domain types) are not importing volatile components (views, adapters)
- [ ] No circular dependencies between modules

**Framework Independence**
- [ ] Framework imports confined to the outermost layer
- [ ] Core logic is runnable as plain TypeScript with no framework setup
- [ ] Replacing the routing or state library requires changing only the adapter layer
