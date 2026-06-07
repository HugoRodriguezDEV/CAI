---
name: react-typescript-patterns
description: Apply type-safe React design patterns (Compound Components, Context Provider, Container-Presenter, Custom Hooks) using strict TypeScript types, event definitions, and generic components.
source: React Patterns (patterns.dev), TypeScript Official Handbook (v4.9)
---

# React and TypeScript Design Patterns Skill

This skill outlines how to implement React design patterns safely and elegantly using strict static typing. It links patterns from *patterns.dev* with key type-system concepts from the *TypeScript Handbook* (generics, union types, narrowing, and type safety).

---

## When to Use

Trigger this skill when:
- Creating or refactoring React components using TypeScript
- Declaring component props, state, or context APIs
- Setting up state machines with `useReducer` or writing custom hooks
- Building generic reusable UI components (e.g., list views, tables, selects)
- Reviewing React/TypeScript codebases for type safety, avoiding `any` bypasses, and ensuring proper hook usage

---

## 1. Component & Prop Typing

Typing React components and props correctly prevents runtime crashes and ensures IDE autocomplete.

### Base Component Typing Rules:
1. **Prefer standard function signatures** over `React.FC` or `React.FunctionComponent` when you want standard function declarations.
2. **Explicitly type children** if a component accepts child nodes. Use `React.ReactNode` for children.
3. **Extend native HTML elements** using `React.ComponentPropsWithoutRef<T>` when building wrappers around native tags.

### Example: Prop Typing and Ref Forwarding

```tsx
import React from 'react';

// 1. Extend native HTML element properties safely
interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode; // Explicitly declared
}

// 2. Ref forwarding with strict typing
// Order of generics: <RefType, PropsType>
export const SafeButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', children, className, ...rest }, ref) => {
    const baseClass = variant === 'primary' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black';
    return (
      <button
        ref={ref}
        className={`${baseClass} px-4 py-2 rounded ${className || ''}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

SafeButton.displayName = 'SafeButton';
```

---

## 2. Provider Pattern (React Context)

The Provider pattern shares state across a component tree. In TypeScript, initial context values are typically `null` before the provider mounts. Rather than bypassing type checks using `as any` or non-null assertions `!`, use custom consumer hooks that assert context availability safely.

### Safe Context Pattern:

```tsx
import React, { createContext, useContext, useState } from 'react';

interface AuthUser {
  id: string;
  name: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (name: string) => void;
  logout: () => void;
}

// 1. Initialize Context with a null default value
const AuthContext = createContext<AuthContextType | null>(null);

// 2. Custom consumer hook with runtime check to enforce provider context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context; // Context type is now narrowed to AuthContextType (non-null)
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (name: string) => setUser({ id: '1', name });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 3. Compound Components Pattern

Compound components are components that work together to manage shared state implicitly (like `<Select>` and `<Select.Option>`).

### Example: Multi-tab Component with Shared State

```tsx
import React, { createContext, useContext, useState } from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs subcomponents must be rendered inside <Tabs>');
  return context;
}

// Parent Component
interface TabsProps {
  defaultTab: string;
  children: React.ReactNode;
}

export function Tabs({ defaultTab, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="flex flex-col border border-gray-200 rounded-lg">{children}</div>
    </TabsContext.Provider>
  );
}

// Subcomponent: Tab List (Container)
Tabs.List = function TabsList({ children }: { children: React.ReactNode }) {
  return <div class="flex border-b border-gray-200 bg-gray-50">{children}</div>;
};

// Subcomponent: Tab Trigger (Button)
interface TriggerProps {
  id: string;
  children: React.ReactNode;
}
Tabs.Trigger = function TabsTrigger({ id, children }: TriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 text-sm font-medium ${
        isActive ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {children}
    </button>
  );
};

// Subcomponent: Tab Panel (Content)
interface PanelProps {
  id: string;
  children: React.ReactNode;
}
Tabs.Panel = function TabsPanel({ id, children }: PanelProps) {
  const { activeTab } = useTabsContext();
  if (activeTab !== id) return null;
  return <div className="p-4">{children}</div>;
};
```

---

## 4. Hooks & Events Typing

Typing core hooks and event handlers avoids type narrowing bugs and enforces compiler safety.

### Hook Spacing Rules:
- **`useState`**: If initial state is `null` or a primitive that changes, use generic parameters: `const [data, setData] = useState<Data | null>(null);`.
- **`useRef`**: Provide `null` for DOM elements. Read-only DOM refs use `useRef<HTMLInputElement>(null)`. Mutable value refs use `useRef<number>(0)` (no initial `null`).
- **`useReducer`**: Use **Discriminated Unions** to enforce reducer action types.

### Reducer Example using Discriminated Unions

```tsx
import React, { useReducer } from 'react';

interface CounterState {
  count: number;
}

// 1. Discriminated Union representing actions
type CounterAction =
  | { type: 'INCREMENT'; payload: number }
  | { type: 'DECREMENT' }
  | { type: 'RESET' };

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + action.payload };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

export function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  // 2. Event Handlers explicitly typed
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    dispatch({ type: 'INCREMENT', payload: value });
  };

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <input type="number" onChange={handleInputChange} className="border p-1 ml-2" placeholder="Add custom value" />
    </div>
  );
}
```

---

## 5. Advanced Patterns: Generics & Tuple Returns

### Reusable Generic Components:
Generics allow components to render lists or dropdowns containing arbitrary item shapes without resorting to `any`.

```tsx
import React from 'react';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onItemClick?: (item: T) => void;
}

// Declare a generic React function component
export function GenericList<T>({ items, renderItem, onItemClick }: ListProps<T>) {
  return (
    <ul className="divide-y divide-gray-200">
      {items.map((item, index) => (
        <li
          key={index}
          onClick={() => onItemClick?.(item)}
          className="py-3 px-4 hover:bg-gray-50 cursor-pointer"
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
```

### Custom Hooks with Tuple Returns (`as const`):
When returning arrays or tuples from custom hooks (like React's `useState`), type inference will widen the return to a union array (e.g. `(string | (() => void))[]`). Use `as const` to freeze the return value as a read-only tuple.

```typescript
import { useState } from 'react';

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue((prev) => !prev);
  
  // Freeze tuple structure so destructuring assigns correct types
  return [value, toggle] as const;
}

// Usage:
// const [isDark, toggleDark] = useToggle(true); 
// isDark is typed as boolean, toggleDark is typed as () => void
```

---

## 6. Review Checklist

Use this checklist during code review or code generation:

- [ ] **No `any` Bypasses:** Are all props, state variables, and parameters typed without using `any` or explicit casting exceptions?
- [ ] **Props Extension:** Do wrappers of HTML elements extend `React.ComponentPropsWithoutRef<T>`?
- [ ] **Ref Forwarding Order:** Does `forwardRef` order its generics properly? (i.e. `<HTMLButtonElement, ButtonProps>` where RefType is first, Props is second).
- [ ] **Context Nulidad Controlada:** Does the custom consumer hook for React context raise an explicit runtime error when used outside its Provider?
- [ ] **Reducer Union Discrimination:** Are reducer actions represented as discriminated union types to prevent illegal dispatch payloads?
- [ ] **Hook Return Tuples:** Do custom hooks that return array tuples freeze their type inference using `as const`?
- [ ] **Generics for Collections:** Do items collections components (Dropdown, List, Carousel) use TypeScript generics (`<T>`) to guarantee layout code compatibility?
