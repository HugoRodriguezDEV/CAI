# Plan: Skills UX/UI

Target path: `templates/skills/uxui/`
Source material: `info/uxui/`

---

## Skills a crear (5)

### 1. `design-systems.md`
**Fuente:** `AtomicDesign.md` — Brad Frost  
**Dominio:** Construcción y arquitectura de sistemas de diseño  
**Cubre:**
- Metodología Atomic Design: átomos → moléculas → organismos → plantillas → páginas
- Principios de UI reutilizable y composable
- Metodologías CSS modulares: BEM, OOCSS, SMACSS
- Diseño responsivo orientado a componentes
- Herramientas: Pattern Lab, style guides vivos
- Traducción diseño → código (design tokens, librerías de componentes)

**Trigger:** Crear/revisar componentes UI, construir design system, definir librería de componentes

---

### 2. `information-architecture.md`
**Fuente:** `InformationArquitectureForWebAndBeyingFourth.md` — Rosenfeld, Morville, Arango  
**Dominio:** Estructura y organización de información digital  
**Cubre:**
- Sistemas de organización (exactos vs ambiguos: tópico, tarea, audiencia, metáfora)
- Sistemas de navegación (global, local, contextual, suplementaria)
- Sistemas de etiquetado (terminología consistente, vocabularios controlados)
- Sistemas de búsqueda (algoritmos, zonas, tipos de consulta)
- Tesauros, ontologías y metadatos
- Coherencia multi-canal (web, móvil, wearables)

**Trigger:** Diseñar navegación, organizar contenido, estructurar flujos de información, definir taxonomías

---

### 3. `ux-laws.md`
**Fuente:** `lawsofux.md` — Jon Yablonski  
**Dominio:** Psicología aplicada a diseño de interfaces  
**Cubre:**
- Ley de Fitts: tamaño y distancia de targets interactivos
- Ley de Hick: reducción de opciones para acelerar decisiones
- Ley de Jakob: conformidad con patrones conocidos
- Ley de Miller: límite cognitivo de 7±2 elementos
- Umbral de Doherty: feedback dentro de 400ms
- Efecto Estético-Usabilidad: diseño atractivo percibido como más usable
- Implicaciones éticas del uso de psicología en diseño
- Aplicación a AI y spatial computing

**Trigger:** Evaluar decisiones de diseño, justificar patrones, revisar flujos cognitivos, accesibilidad

---

### 4. `usability.md`
**Fuente:** `Steve_Krug_Dont_Make_Me_Think.md` — Steve Krug  
**Dominio:** Usabilidad web práctica y sentido común  
**Cubre:**
- Primera Ley de Krug: interfaces que no requieren pensamiento
- Comportamiento real de usuarios: escaneo vs lectura, satisficing
- Convenciones de navegación y wayfinding
- Mobile First: constraints, tradeoffs, diseño para pantallas pequeñas
- Accesibilidad como práctica ética y funcional
- Usability testing: cuándo, cómo, con cuántos usuarios
- Trunk test para evaluar páginas

**Trigger:** Review de UI, evaluar navegación, diseño mobile, accesibilidad, testing con usuarios

---

### 5. `frontend-architecture.md`
**Fuente:** `ArquitecturaLimpia.md` — Robert C. Martin (Uncle Bob)  
**Dominio:** Arquitectura de código en capa de presentación  
**Cubre:**
- Patrón Humble Object/Presenter: vistas sin lógica (Cap. 23)
- SOLID aplicado a componentes UI:
  - SRP: un componente, una razón para cambiar
  - OCP: componentes extensibles sin modificar
  - LSP: componentes intercambiables por contrato
  - ISP: props/interfaces mínimas y específicas
  - DIP: dependencias hacia abstracciones, no implementaciones
- Cohesión de componentes (Cap. 13): REP, CCP, CRP
- Acoplamiento de componentes (Cap. 14): dependencias estables y abstracciones
- Regla de dependencia: UI → Use Cases → Entities (nunca al revés)
- Independencia del framework: React/Vue son detalles, no arquitectura
- Diseño para testabilidad

**Trigger:** Estructurar componentes React, definir responsabilidades, refactoring, separar lógica de presentación

---

### 6. `design-modern-css.md`
**Fuente:** Josh W. Comeau (Reset y Layouts), Tailwind CSS Official Core Concepts, Open Props  
**Dominio:** Estilos web modernos, layouts y tokens de diseño  
**Cubre:**
- El reset moderno de CSS y justificación de sus reglas.
- Algoritmos de layout: Flow, Flexbox y Grid, y sus modelos mentales.
- Metodología utility-first con Tailwind, estados de interacción y diseño mobile-first.
- Tokens de diseño en CSS nativo y el ecosistema Open Props.
- Encapsulación de propiedades customizadas por componente.

**Trigger:** Escribir/refactorizar CSS y Tailwind, definir variables de estilo y diseño fluido.

---

### 7. `react-typescript-patterns.md`
**Fuente:** React Patterns (patterns.dev), TypeScript Official Handbook (v4.9)  
**Dominio:** Patrones de diseño de React y tipado estricto en TypeScript  
**Cubre:**
- Tipado de componentes, children, referencias forwardRef y extensión de elementos HTML nativos.
- Patrón Provider (Contexto seguro con control de nulidad).
- Compound Components (Componentes compuestos fuertemente tipados).
- Tipado de hooks (useState, useRef, useReducer con uniones discriminadas) y eventos sintéticos de React.
- Componentes genéricos reutilizables y tuplas con `as const`.

**Trigger:** Escribir/refactorizar componentes React, estructurar Contexts, Hooks personalizados o reducer actions.

---

### 8. `performance-optimization.md`
**Fuente:** Core Web Vitals Guidelines (web.dev), Image Optimization Best Practices (ImageKit)  
**Dominio:** Rendimiento frontend y optimización de cargas  
**Cubre:**
- Métricas LCP, INP, CLS y sus objetivos de percentil 75.
- Formatos de imagen modernos (AVIF, WebP), compresión y responsive delivery (`srcset`).
- Políticas de carga (eager vs lazy loading, fetchpriority).
- Optimización de ejecución de scripts y renderizado de layouts (`content-visibility`).

**Trigger:** Auditar velocidad de carga, optimizar assets y scripts, o solucionar problemas de respuesta al usuario.

---

### 9. `clean-code.md`
**Fuente:** `CodigoLimpio.md` — Robert C. Martin  
**Dominio:** Buenas prácticas de programación, legibilidad y diseño de código  
**Cubre:**
- Nombres significativos que revelen intención.
- Diseño de funciones pequeñas con una sola responsabilidad y nivel de abstracción (paso descendente).
- Comentarios limpios y formato vertical/horizontal adecuado.
- Ley de Demeter y separación entre Objetos y Estructuras de Datos.
- Manejo de excepciones en lugar de códigos de error.
- Leyes de TDD (DGP) y principios F.I.R.S.T. para pruebas unitarias.
- Catálogo de Heurísticas y Smells (comentarios, entorno, funciones, general, nombres, pruebas).

**Trigger:** Escribir nuevas funciones o variables, refactorizar código enrevesado, estructurar error handling o diseñar tests.

---

## Relaciones entre skills

```
design-systems ──── qué construir (jerarquía visual)
frontend-architecture ── cómo construirlo (dependencias, lógica de capas)
react-typescript-patterns ── cómo implementar componentes seguros (patrones React + TS)
design-modern-css ─── cómo maquetar con estilos modernos (layout, variables, utilidades)
performance-optimization ─ cómo optimizar la carga del frontend (Core Web Vitals, imágenes)
clean-code ───────────── cómo escribir lógica legible y mantenible (craftsmanship)
information-architecture ─ cómo organizar el contenido
ux-laws ──────────── por qué tomar decisiones así (psicología)
usability ────────── si funciona para usuarios reales (validación)
```

---

## Estado

| Skill | Formato | Estado |
|-------|---------|--------|
| `design-systems/SKILL.md` | carpeta + SKILL.md | ✅ hecho |
| `information-architecture/SKILL.md` | carpeta + SKILL.md | ✅ hecho |
| `ux-laws/SKILL.md` | carpeta + SKILL.md | ✅ hecho |
| `usability/SKILL.md` | carpeta + SKILL.md | ✅ hecho |
| `frontend-architecture/SKILL.md` | carpeta + SKILL.md | ✅ hecho |
| `design-modern-css/SKILL.md` | carpeta + SKILL.md | ✅ hecho |
| `react-typescript-patterns/SKILL.md` | carpeta + SKILL.md | ✅ hecho |
| `performance-optimization/SKILL.md` | carpeta + SKILL.md | ✅ hecho |
| `cleancode/clean-code/SKILL.md` | carpeta + SKILL.md | ✅ hecho |
