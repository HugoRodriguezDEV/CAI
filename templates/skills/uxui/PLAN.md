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

## Relaciones entre skills

```
design-systems ──── qué construir (jerarquía visual)
frontend-architecture ── cómo construirlo (dependencias, lógica)
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
