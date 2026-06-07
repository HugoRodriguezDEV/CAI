---
name: clean-code
description: Apply clean code principles (meaningful naming, small and focused functions, clean comments, formatting standards, data abstractions, try-catch-finally error handling, TDD rules, and code smells).
source: Código Limpio (Clean Code) — Robert C. Martin
---

# Clean Code Skill

This skill outlines the core principles of agile software craftsmanship based on Robert C. Martin's *Clean Code* (`CodigoLimpio.md`). It provides actionable guidelines to write readable, maintainable, and testable code, along with a detailed code smells quick reference.

---

## When to Use

Trigger this skill when:
- Writing new code (variables, functions, classes, modules)
- Refactoring existing legacy code or complex methods
- Reviewing Pull Requests for code readability, style, and structure
- Designing error-handling structures or writing unit tests
- Evaluating structural architecture (objects vs. data structures)

---

## 1. Meaningful Names (Nombres con sentido)

Names are everywhere. Choosing good names takes time but saves much more.

### Guidelines:
1. **Reveal Intent:** A name should tell you why it exists, what it does, and how it is used. If a name requires a comment, it does not reveal its intent.
   - *Bad:* `let d; // elapsed time in days`
   - *Good:* `let elapsedTimeInDays;` or `let daysSinceCreation;`
2. **Avoid Disinformation:** Avoid names that refer to specific types if the variable is not of that type, or names that carry false clues (e.g., calling a collection `accountList` if it is not actually a List).
3. **Make Meaningful Distinctions:** Do not use noise words like `Info`, `Data`, or `Object` to make similar names different.
   - *Bad:* `getActiveAccount()`, `getActiveAccounts()`, `getActiveAccountInfo()`
4. **Use Pronounceable & Searchable Names:** If you can't pronounce it, you can't discuss it. Single-letter names (like `e` or `i`) should only be used as local variables inside tiny loops.
5. **Class Names:** Should be nouns or noun phrases (e.g., `Customer`, `WikiPage`, `AccountAddressParser`). Avoid generic suffixes like `Manager`, `Processor`, `Data`, or `Info`.
6. **Method Names:** Should be verbs or verb phrases (e.g., `postPayment()`, `deletePage()`, `isReady()`). Accessors/mutators should be prefixed with `get`, `set`, and `is`.

---

## 2. Function Design (Funciones)

Functions should be small, focused, and represent a single level of abstraction.

### Rules:
1. **Small!:** Functions should be very small (hardly ever 20 lines long, and rarely more than 10).
2. **Do One Thing (SRP):** A function should do only one thing, do it well, and do it only. If a function does only those steps that are one level below its stated name, it is doing one thing.
3. **One Level of Abstraction per Function:** To make sure our functions do "one thing," the statements within our function should all be at the same level of abstraction.
4. **The Stepdown Rule (Paso Descendente):** Read code from top to bottom. Every function should be followed by those at the next level of abstraction.
5. **Switch Statements:** Switch statements are hard to make small and inherently violate SRP/OCP. Bury them in an Abstract Factory, hiding them behind inheritance/polimorphism.
6. **Minimal Arguments:**
   - **0 (Niladic):** Ideal.
   - **1 (Monadic):** Passing a query, or transforming an input into an output.
   - **2 (Dyadic):** Order of arguments is easy to confuse (e.g., `Point(x, y)` is fine, but `writeField(outputStream, name)` has an implicit order).
   - **3 (Triadic):** Hard to read and test. Avoid if possible.
   - **Polyadic (4+):** Requires wrapping arguments into a concept/object.
7. **No Side Effects:** Do not make hidden changes to the state of the system or instance variables.
8. **Command Query Separation (CQS):** Functions should either do something (command) or answer something (query), but not both.
   - *Bad:* `if (set("username", "unclebob")) ...` (Sets a value and returns a boolean).
   - *Good:* `if (attributeExists("username")) { set("username", "unclebob"); }`
9. **Prefer Exceptions to Returning Error Codes:** Returning error codes leads to deeply nested if/else statements. Throwing exceptions isolates error handling from the happy path.

---

## 3. Comments & Formatting (Comentarios y formato)

### Comments
Comments are usually a failure to express ourselves in code. Code should explain itself.

- **Good Comments:**
  - Legal comments (copyright, licensing).
  - Informative comments (e.g., explaining a regex pattern format).
  - Explanation of intent (why a specific non-obvious decision was made).
  - Warnings of consequences (e.g., `// Don't run unless you have 15 minutes`).
  - `// TODO` comments (for future work, but review and clean them regularly).
- **Bad Comments (Smells):**
  - Redundant comments (restating what the code says).
  - Misleading/Obsolete comments (comments that tell lies because the code changed).
  - Noise comments (e.g., Javadocs on private variables that say nothing new).
  - Commented-out code (delete it! Source control remembers it).

### Formatting
Code formatting is about communication. The way your code looks communicates its logical relationships.

- **Vertical Formatting:**
  - **File Size:** Files should be small (generally 200–500 lines maximum).
  - **Vertical Openness:** Separate concepts (functions, imports, variable groups) with blank lines.
  - **Vertical Density:** Keep lines that are closely related tightly packed vertically.
  - **Vertical Distance:** Declare variables close to their usage. Dependent functions should be close vertically (the caller directly above the callee).
- **Horizontal Formatting:**
  - Keep line length short (ideally under 100–120 characters).
  - Use horizontal spacing to emphasize operator precedence or separate terms.

---

## 4. Objects vs. Data Structures & Law of Demeter

### The Anti-Symmetry:
- **Objects** hide their data behind abstractions and expose functions that operate on that data.
- **Data Structures** expose their data and have no meaningful functions.

| Style | Adding new classes/data structures | Adding new functions/methods |
|-------|------------------------------------|------------------------------|
| **Procedural (Data Structures)** | Hard (must edit all functions to support new type) | Easy (just write a new function that inspects data) |
| **Object-Oriented (Objects)** | Easy (just write a new subclass implementing the interface) | Hard (must add the method to all existing classes) |

> [!TIP]
> Choose the right paradigm: use pure Data Structures (like DTOs or database entities) when you want to write functions operating on them. Use Objects when you want to protect data invariants and hide implementation details.

### Law of Demeter (LoD):
A module should not know about the innards of the *objects* it manipulates. An object should not expose its internal structure through accessors.
A method `f` of class `C` should only call methods of:
- `C` itself
- An object created by `f`
- An object passed as an argument to `f`
- An object held in an instance variable of `C`

**Train Wrecks (Choque de trenes):** Avoid long chains of method calls on returned objects.
- *Bad:* `const outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();` (LoD violation if options/scratchDir are objects).
- *Good if data structures:* If options, scratchDir, and ctxt are just data structures exposing public properties, it's fine: `const outputDir = ctxt.options.scratchDir.absolutePath;`.
- *Good if objects:* `const outputDir = ctxt.getScratchDirectoryPath();`.

---

## 5. Error Handling (Procesamiento de errores)

Clean error handling keeps your main algorithm clear of error checks.

### Rules:
1. **Write Try-Catch-Finally First:** This defines the scope and transaction of your block.
2. **Use Unchecked Exceptions:** Checked exceptions violate encapsulation because throwing an exception from a low-level method forces modifications up the call chain.
3. **Provide Context with Exceptions:** Create informative error messages that mention the failed operation and the type of failure.
4. **Don't Return Null:** Returning `null` forces the caller to write endless null checks. If you are tempted to return `null`, return an empty collection, throw an exception, or use the *Special Case / Null Object Pattern*.
5. **Don't Pass Null:** Passing `null` to methods is even worse. Avoid it completely.

---

## 6. Unit Testing (Pruebas unitarias)

Tests are as important as production code. They preserve and enable the flexibility, maintainability, and reusability of the production code.

### The Three Laws of TDD (DGP):
1. **First Law:** You may not write production code until you have written a failing unit test.
2. **Second Law:** You may not write more of a unit test than is sufficient to fail (and not compiling is failing).
3. **Third Law:** You may not write more production code than is sufficient to pass the currently failing test.

### Keeping Tests Clean:
- **Readability is key:** The readability of tests is even more important than the readability of production code. Clarify through simplicity and build utility functions for assertions.
- **One Assert per Test:** Keep assertions in a test to a minimum (ideally one).
- **Single Concept per Test:** Test only one logical concept per test function.

### F.I.R.S.T. Rules:
- **F**ast: Tests must run quickly. If they are slow, developers won't run them.
- **I**ndependent: Tests must not depend on each other or run in a specific order.
- **R**epeatable: Tests should be runnable in any environment (dev laptop, CI server, offline).
- **S**elf-Validating: Tests must have a boolean output (either they pass or they fail). No manual log inspection.
- **T**imely: Tests should be written *just before* the production code that makes them pass.

---

## 7. Smells & Heuristics Quick Reference (Síntomas y heurística)

Use these short codes to label review feedback or identify issues.

### Comments (C)
- **C1 (Inappropriate Information):** Comments containing metadata (author, history logs, ticket IDs) that belong in git or trackers.
- **C2 (Obsolete Comment):** Old or incorrect comments. Delete or update them.
- **C3 (Redundant Comment):** Explaining code that is already obvious.
- **C4 (Poorly Written Comment):** Comments with bad grammar, typos, or unnecessary verbosity.
- **C5 (Commented-Out Code):** Code left commented out. Delete it immediately.

### Environment (E)
- **E1 (Build Requires Multi-step):** Building the project should take one command (e.g., `npm run build` or `make`).
- **E2 (Tests Require Multi-step):** Running all tests should take one command (e.g., `npm test`).

### Functions (F)
- **F1 (Too Many Arguments):** Functions with 4+ arguments.
- **F2 (Output Arguments):** Arguments used as output instead of modifying the state of the object.
- **F3 (Flag Arguments):** Passing boolean flags (`isTrue`) that split the function's internal path (violates SRP).
- **F4 (Dead Function):** Discard uncalled functions.

### General (G)
- **G1 (Multiple Languages in One File):** Mixing too many formats (e.g., massive HTML, CSS, SQL strings in JS).
- **G2 (Obvious Behavior Unimplemented):** Failing to implement predictable behaviors (e.g., ignoring case in string matchers).
- **G3 (Incorrect Behavior at Boundaries):** Failing to write tests for edge cases, nulls, limits, or overflows.
- **G4 (Safety Overridden):** Overriding linter checks, bypassing typescript compilation warnings, or disabling tests.
- **G5 (Duplication):** Violating DRY. Extract duplicate logic to reusable helper functions or abstractions.
- **G6 (Code at Wrong Level of Abstraction):** Placing low-level implementation details in high-level modules/base classes.
- **G7 (Base Class Depending on Derivatives):** High-level classes knowing about specific implementations.
- **G8 (Too Much Information / Tight Coupling):** Classes exposing too many fields or helper functions. Keep interfaces tiny.
- **G9 (Dead Code):** Unused variables, unreachable `if/else` paths, unused classes. Delete them.
- **G10 (Vertical Separation):** Defining variables or private functions far from their usage.
- **G11 (Inconsistency):** Doing things differently in similar places (e.g., mixing `fetchData` and `loadData` namespaces).
- **G12 (Clutter):** Dead code, empty constructors, useless comments. Keep files clean.
- **G13 (Artificial Coupling):** Coupling things that don't belong together (e.g., nesting general utilities inside specific domains).
- **G14 (Feature Envy):** A class method that accesses the fields of another object more than its own.
- **G15 (Selector Arguments):** Similar to flag arguments (e.g., passing numbers or enums to select behavior).
- **G16 (Obscured Intent):** Writing complex, clever code that is hard to read (e.g., inline nested ternary operations).
- **G17 (Misplaced Responsibility):** Putting code in the wrong class/module (e.g., placing string formatter code in a mathematical parser).
- **G18 (Inappropriate Static):** Declaring methods static when they should be dynamic / polymorphically overrides.
- **G19 (Use Explanatory Variables):** Break down long mathematical or logical formulas using intermediate descriptive variables.
- **G20 (Function Names Should Say What They Do):** If names don't match behavior, rename them.
- **G21 (Understand the Algorithm):** Write code because you understand how the algorithm works, not by copy-pasting until it works.
- **G22 (Make Logical Dependencies Physical):** If a module depends on another logically (e.g., expects a page size constant), import it physically.
- **G23 (Prefer Polymorphism to If/Else or Switch):** Use polymorphism to split behaviors instead of chains of type/conditional checks.
- **G24 (Follow Standard Conventions):** Adhere to the project's linter, style guides, and formatting standards.
- **G25 (Replace Magic Numbers with Constants):** Use named constants instead of raw strings/numbers in code.
- **G26 (Be Precise):** Avoid ambiguity. Handle all potential failures, float precisions, lock conditions.
- **G27 (Structure Over Convention):** Enforce rules structurally (e.g., through interfaces/types) rather than naming agreements alone.
- **G28 (Encapsulate Conditionals):** Extract complex logic in conditionals to named boolean methods.
  - *Bad:* `if (shouldBeDeleted && !isProcessing && user.role === 'admin')`
  - *Good:* `if (canDelete(user))`
- **G29 (Avoid Negative Conditionals):** Negative statements are harder to parse mentally.
  - *Bad:* `if (!isNotMember)`
  - *Good:* `if (isMember)`
- **G30 (Functions Should Do One Thing):** Ensure functions don't cross boundaries of their single task.
- **G31 (Hidden Temporal Couplings):** If methods must be called in sequence (e.g., `init()` then `execute()`), structure them so the output of the first is the input of the second.
- **G32 (Avoid Arbitrary Structures):** Structure files and code with a clear consistent hierarchy.
- **G33 (Encapsulate Boundary Conditions):** Keep boundary calculations inside one helper.
  - *Bad:* `let index = page + 1;` scattered everywhere.
  - *Good:* Keep it bounded inside a getter.
- **G34 (Functions Should Descend Only One Level of Abstraction):** Keep statement nesting levels low.
- **G35 (Keep Configurable Data at High Levels):** Don't bury settings or URLs inside low-level helper functions. Expose them at class/module boundaries.
- **G36 (Avoid Transitive Navigation):** Do not follow long paths (violation of Law of Demeter, e.g., `a.getB().getC().doSomething()`).

### Names (N)
- **N1 (Descriptive Names):** Avoid vague names (e.g., `data`, `item`, `temp`).
- **N2 (Names at Correct Level of Abstraction):** Don't name variables after their physical storage format if they represent a business entity.
- **N3 (Use Standard Nomenclature):** Use patterns names (e.g., `PageFactory`, `UserObserver`) if applicable.
- **N4 (Unambiguous Names):** Pick clear names that cannot be misinterpreted.
- **N5 (Long Names for Long Scopes):** Use longer names for variables that persist across many lines of code.
- **N6 (Avoid Encodings):** Don't prefix variables with type prefixes (e.g., `strName` or `iCount` in typed languages).
- **N7 (Names Should Describe Side Effects):** If a function initializes database caches when loading, don't name it `getUser()`. Name it `getUserAndInitializeCache()`.

### Tests (T)
- **T1 (Insufficient Tests):** Missing tests for edge conditions or code branches.
- **T2 (Use Coverage Tool):** Leverage visual coverage maps to spot untested paths.
- **T3 (Don't Skip Trivial Tests):** Write tests even for seemingly simple calculations.
- **T4 (An Ignored Test is a Question):** Don't leave `@Ignore` or `skip` comments on tests. Find out why they fail and fix them.
- **T5 (Test Boundary Conditions):** Test inputs like `0`, negative numbers, massive lists, null.
- **T6 (Exhaustively Test Near Bugs):** If you find a bug in a function, write multiple tests around it.
- **T7 (Patterns of Failure are Revealing):** Analyze why tests are failing collectively; it usually points to an architectural bug.
- **T8 (Test Coverage Patterns are Revealing):** Check which files are completely uncovered.
- **T9 (Tests Should Be Fast):** Slow tests discourage local runs.

---

## 8. Clean Code Review Checklist

Use this checklist during PR reviews or when writing code:

- [ ] **Descriptive Naming:** Do class, function, and variable names reveal clear intent without comments?
- [ ] **Focused Functions:** Are functions small (under 20 lines) and do they do exactly *one* thing?
- [ ] **Stepdown Rule:** Are files written in a top-down reading order, with callers above their callees?
- [ ] **No Side Effects:** Are query functions free of side effects? Do commands keep system mutations visible?
- [ ] **No Magic Constants:** Have all raw numbers and strings been extracted to descriptive constants or enums?
- [ ] **Clean Exceptions:** Is error handling separated from main logic? Are we throwing unchecked/domain exceptions instead of returning error status codes or `null`?
- [ ] **No Commented Code:** Are all commented-out code blocks deleted?
- [ ] **Encapsulated Conditionals:** Are complex conditionals extracted into readable boolean getters or functions?
- [ ] **DRY Compliance:** Is there any duplicated logic or algorithms that should be extracted?
- [ ] **Fast & Self-Validating Tests:** Are unit tests fast, independent, and written alongside production code (following TDD laws)?
