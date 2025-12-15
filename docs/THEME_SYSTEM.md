# Sistema de Temas y Configuración Anual

Este documento describe la arquitectura del sistema de temas de Animanga Wrapped. A diferencia de un sistema de temas tradicional (modo claro/oscuro), este sistema está diseñado para gestionar la identidad visual y estructural única de cada año ("Wrapped 2024", "Wrapped 2025", etc.).

## 🧠 Filosofía de Diseño

1.  **Detección Automática**: El tema no es una elección del usuario. Se determina automáticamente por el año de los datos que se están visualizando (`wrappedData.year`).
2.  **Identidad Única**: Cada año no solo cambia de colores, sino que puede tener componentes, estructuras y tokens de diseño completamente diferentes.
3.  **Inmutabilidad**: Dentro de una sesión de visualización de un año específico, el tema es constante.

## 🏗 Arquitectura

El sistema consta de cuatro piezas fundamentales:

```mermaid
graph TD
    A[Year Configs (themes.js)] -->|Configuración| B[ThemeProvider]
    C[WrappedClient] -->|year prop| B
    B -->|Context| D[useTheme Hook]
    B -->|CSS Variables| E[DOM (Variables Globales)]
    D -->|JS Config| F[Componentes React]
    E -->|CSS| F
```

### 1. Definición de Configuración (`src/app/config/themes.js`)

Es la fuente de la verdad. Define los valores estáticos para cada año.

```javascript
export const YEAR_CONFIGS = {
  2024: {
    year: 2024,
    colors: { primary: '#e91e9e', ... }, // Paleta específica 2024
    gradients: { chapter1: '...', ... }, // Gradientes 2024
    tokens: { ctaBorder: '#ffd64d', ... } // Tokens estructurales
  },
  2025: {
    year: 2025,
    colors: { primary: '#a8d93e', ... }, // Paleta específica 2025 (Spotify-inspired)
    // ...
  }
};
```

### 2. Provider Automático (`src/app/contexts/ThemeProvider.jsx`)

El `ThemeProvider` ya no gestiona estado de selección. Simplemente recibe un `year` y aplica la configuración correspondiente.

- **Entrada**: Prop `year` (proviene del backend/URL).
- **Acción JS**: Expone la configuración completa vía Context API.
- **Acción DOM**: Inyecta variables CSS en `:root` (e.g., `--theme-color-primary`).

### 3. Consumo en Componentes (`useTheme` hook)

Los componentes acceden a la configuración actual mediante `useTheme()`.

```javascript
const { year, config } = useTheme();

// Lógica condicional estructural
if (year === 2025) return <NewLayout />;

// Acceso directo a valores
const color = config.colors.primary;
```

### 4. Capa de Estilos (CSS Variables)

Para mantener los estilos limpios y performantes, usamos variables CSS que cambian dinámicamente según el provider.

- `src/app/_theme-variables.scss`: Define la interfaz de variables.
- Uso en SCSS: `color: var(--theme-color-primary);`

## 🛠 Guía de Implementación

### Cómo agregar un nuevo año (e.g., 2026)

1.  Abre `src/app/config/themes.js`.
2.  Agrega una nueva entrada en `YEAR_CONFIGS` con la clave `2026`.
3.  Define los colores, gradientes y tokens requeridos.

El sistema detectará automáticamente el año cuando lleguen datos de 2026 y aplicará los estilos.

### Manejo de Cambios Estructurales

Cuando el diseño de un componente cambia drásticamente entre años (no solo colores), se recomienda una de estas dos estrategias:

**Estrategia A: Ramificación Intracomponente (Cambios menores)**
```jsx
const MyComponent = () => {
  const { year } = useTheme();
  return (
    <div className={year === 2025 ? 'modern-grid' : 'classic-flex'}>
      {/* ... */}
    </div>
  );
};
```

**Estrategia B: Componentes Específicos (Cambios mayores)**
Se recomienda crear versiones específicas en directorios por año si la lógica diverge mucho.
```jsx
// WrappedClient o un Resolutor de Slides
const SlideComponent = year === 2025 ? Slide2025 : Slide2024;
```

## 🎨 Referencia de Variables CSS

El sistema expone automáticamente las siguientes claves como variables CSS (`--theme-[tipo]-[clave]`):

| Categoría | Prefijo JS | Variable CSS Ejemplo |
|-----------|------------|----------------------|
| **Colors** | `colors.primary` | `--theme-color-primary` |
| **Gradients** | `gradients.chapter1` | `--theme-gradient-chapter1` |
| **Tokens** | `tokens.ctaBg` | `--theme-token-cta-bg` (kebab-case) |

## ✅ Buenas Prácticas

1.  **Preferir CSS Variables**: Siempre que sea posible, usa `var(--theme-...)` en tus archivos SCSS en lugar de importar colores hardcodeados. Esto asegura compatibilidad automática con todos los años.
2.  **Evitar lógica de año dispersa**: Si un componente tiene muchos `if (year === ...)` anidados, probablemente debería dividirse en dos componentes distintos.
3.  **Tokens Semánticos**: Usa tokens como `ctaBg` (fondo de llamada a la acción) en lugar de nombres de color específicos, para permitir que el diseño cambie drásticamente (e.g., de botón sólido a botón con borde) solo cambiando el config.
