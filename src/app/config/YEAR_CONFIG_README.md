# Sistema de Configuración por Año - Animanga Wrapped

Sistema automático de configuración basado en el año del wrapped. **No es seleccionable por el usuario** - se determina automáticamente según el año de los datos del wrapped.

## 🎯 Concepto

Este sistema permite que cada año del wrapped tenga:
- **Colores diferentes** (paletas únicas por año)
- **Componentes completamente diferentes** (no solo cambios de estilo)
- **Configuración automática** basada en el año del backend

## 📁 Estructura

```
src/app/
├── config/
│   └── themes.js                 # Configuraciones por año (2024, 2025, etc.)
├── contexts/
│   ├── ThemeContext.jsx         # Contexto (solo lectura)
│   └── ThemeProvider.jsx        # Provider automático
└── hooks/
    └── useTheme.js              # Hook para acceder a config
```

## 🚀 Uso Básico

### En WrappedClient

El `ThemeProvider` se usa automáticamente en `WrappedClient.jsx`:

```jsx
const year = wrappedData?.year || new Date().getFullYear();

return (
  <ThemeProvider year={year}>
    <WrappedContainer slides={slides} {...props} />
  </ThemeProvider>
);
```

### En Componentes

```jsx
import { useTheme } from '@/app/hooks/useTheme';

function MiComponente() {
  const { year, config } = useTheme();
  
  return (
    <div style={{ color: config.colors.primary }}>
      Wrapped {year}
    </div>
  );
}
```

### Con CSS Variables

```scss
.mi-componente {
  background-color: var(--theme-color-primary);
  color: var(--theme-color-text-on-dark);
  
  &__header {
    background: var(--theme-gradient-chapter1);
  }
}
```

## 🎨 Configuraciones Disponibles

### 2024
- **Primario**: Hot Pink (#e91e9e)
- **Secundario**: Purple (#7b5cff)
- **Estilo**: Clásico, vibrante

### 2025
- **Primario**: Lime Green (#a8d93e)
- **Secundario**: Purple Arc (#8b7fc8)
- **Estilo**: Spotify-inspired, moderno

## 📝 API

### `useTheme()`

Hook que retorna la configuración del año actual:

```typescript
{
  year: number,           // Año del wrapped (ej: 2025)
  config: {
    colors: {...},        // Paleta de colores
    gradients: {...},     // Gradientes
    tokens: {...}         // Tokens de diseño
  }
}
```

### Estructura de Config

```javascript
{
  year: 2025,
  colors: {
    primary: '#a8d93e',
    secondary: '#8b7fc8',
    bgDark: '#2c2c2c',
    textOnDark: '#ffffff',
    // ... más colores
  },
  gradients: {
    chapter1: 'linear-gradient(...)',
    chapter2: 'linear-gradient(...)',
    // ... más gradientes
  },
  tokens: {
    ctaBg: '#111111',
    ctaText: '#ffffff',
    ctaBorder: '#a8d93e',
    // ... más tokens
  }
}
```

## 🎯 Variables CSS Disponibles

### Colores
- `--theme-color-primary`
- `--theme-color-secondary`
- `--theme-color-bg-dark`
- `--theme-color-text-on-dark`
- Y más...

### Gradientes
- `--theme-gradient-chapter1` a `chapter9`
- `--theme-gradient-orange`
- `--theme-gradient-pink`
- Y más...

### Tokens
- `--theme-token-cta-bg`
- `--theme-token-cta-text`
- `--theme-token-cta-border`
- Y más...

## 🔧 Agregar Nuevo Año

1. Edita `src/app/config/themes.js`:

```javascript
export const YEAR_CONFIGS = {
  // ... años existentes
  2026: {
    year: 2026,
    colors: {
      primary: '#tu-color',
      // ... más colores
    },
    gradients: {
      // ... gradientes
    },
    tokens: {
      // ... tokens
    }
  }
};
```

2. ¡Listo! El sistema lo detectará automáticamente.

## 🎨 Componentes Diferentes por Año

Para componentes que varían completamente entre años, usa condicionales:

```jsx
function MiSlide() {
  const { year } = useTheme();
  
  if (year === 2024) {
    return <Slide2024 />;
  }
  
  return <Slide2025 />;
}
```

O crea archivos separados:
```
slides/
├── 2024/
│   └── S01_Opening.jsx
├── 2025/
│   └── S01_Opening.jsx
```

## ⚙️ Características

✅ **Automático**: Se determina por el año del wrapped
✅ **No seleccionable**: El usuario no puede cambiar el tema
✅ **Flexible**: Soporta componentes completamente diferentes
✅ **CSS Variables**: Actualización dinámica de estilos
✅ **Type-safe**: Con JSDoc/TypeScript
✅ **SSR Compatible**: Funciona con Next.js

## 🔍 Diferencias con Sistema Anterior

### Antes (Sistema de Temas)
- ❌ Usuario podía seleccionar tema
- ❌ localStorage para persistir selección
- ❌ Función `setTheme()` para cambiar
- ❌ Solo cambios de colores

### Ahora (Sistema de Configuración)
- ✅ Automático según año del wrapped
- ✅ No hay persistencia (no es necesaria)
- ✅ Solo lectura (`year` y `config`)
- ✅ Soporta componentes completamente diferentes

## 📚 Ejemplos

### Acceso a Colores

```jsx
const { config } = useTheme();
const primaryColor = config.colors.primary;
```

### Acceso a Gradientes

```jsx
const { config } = useTheme();
const gradient = config.gradients.chapter1;
```

### Renderizado Condicional

```jsx
const { year } = useTheme();

return year === 2024 ? (
  <ComponenteClasico />
) : (
  <ComponenteModerno />
);
```

### En SCSS

```scss
.slide {
  background: var(--theme-gradient-chapter1);
  
  &__title {
    color: var(--theme-color-primary);
  }
  
  &__button {
    background: var(--theme-token-cta-bg);
    color: var(--theme-token-cta-text);
    border: 2px solid var(--theme-token-cta-border);
  }
}
```

---

**Versión**: 2.0.0 (Refactorizado)  
**Última actualización**: Diciembre 2024
