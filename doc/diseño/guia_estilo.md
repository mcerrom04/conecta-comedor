# Guía de Estilo - Conecta Comedor

## 1. Identidad Visual

### Logotipo y Concepto
Se utiliza el logo conceptual que combina la conexión global (globo), ubicación (pines) y el servicio (comida, hogar).

### Filosofía de Diseño
- **Confianza**: Diseño limpio y profesional.
- **Calma**: Uso de espacios en blanco y colores serenos.
- **Eficiencia**: Acciones claras y directas.

---

## 2. Paleta de Colores

Actualmente la aplicación utiliza la paleta de colores predeterminada de **Laravel / Tailwind CSS** (Zinc & Indigo), priorizando la limpieza y la familiaridad.

### Colores Principales

| Color | Muestra | Hex (Tailwind) | Variable | Uso Principal |
| :--- | :---: | :--- | :--- | :--- |
| **Indigo Primario** | ![#4F46E5](https://placehold.co/20x20/4F46E5/4F46E5.png) | `#4F46E5` | `bg-indigo-600` | Botones principales, enlaces activos, filtros |
| **Indigo Claro** | ![#E0E7FF](https://placehold.co/20x20/E0E7FF/E0E7FF.png) | `#E0E7FF` | `bg-indigo-100` | Fondos de selección, hovers suaves |
| **Gris Oscuro** | ![#1F2937](https://placehold.co/20x20/1F2937/1F2937.png) | `#1F2937` | `bg-gray-800` | Botones secundarios, pies de página |

### Colores de Estado

| Estado | Muestra | Hex | Variable | Uso |
| :--- | :---: | :--- | :--- | :--- |
| **Éxito** | ![#16A34A](https://placehold.co/20x20/16A34A/16A34A.png) | `#16A34A` | `bg-green-600` | Ubicación encontrada, Estado "Abierto" |
| **Peligro / Error** | ![#EF4444](https://placehold.co/20x20/EF4444/EF4444.png) | `#EF4444` | `bg-red-500` | Errores, Botón cerrar, Estado "Cerrado" |
| **Alerta / Info** | ![#EAB308](https://placehold.co/20x20/EAB308/EAB308.png) | `#EAB308` | `bg-yellow-500` | Estado "Completo" o "Pendiente" |

### Texto y Fondos

| Tipo | Muestra | Hex | Variable | Descripción |
| :--- | :---: | :--- | :--- | :--- |
| **Texto Principal** | ![#111827](https://placehold.co/20x20/111827/111827.png) | `#111827` | `text-gray-900` | Títulos, contenido principal |
| **Texto Secundario** | ![#4B5563](https://placehold.co/20x20/4B5563/4B5563.png) | `#4B5563` | `text-gray-600` | Metadatos, etiquetas |
| **Fondo App** | ![#F3F4F6](https://placehold.co/20x20/F3F4F6/F3F4F6.png) | `#F3F4F6` | `bg-gray-100` | Fondo general |
| **Fondo Tarjetas** | ![#FFFFFF](https://placehold.co/20x20/FFFFFF/FFFFFF.png) | `#FFFFFF` | `bg-white` | Contenedores, modales |

---

## 3. Tipografía

La aplicación utiliza **Figtree** como tipografía unificada, una fuente moderna, legible y optimizada para interfaces web, incluida por defecto en el ecosistema Laravel.

### Familia Principal: **Figtree**

| Estilo | Peso | Variable Tailwind | Uso Principal |
| :--- | :--- | :--- | :--- |
| **Regular** | 400 | `font-normal` | Cuerpo de texto, párrafos |
| **Medium** | 500 | `font-medium` | Enlaces, subtítulos pequeños |
| **SemiBold** | 600 | `font-semibold` | Botones, títulos de tarjetas, destacados |
| **Bold** | 700 | `font-bold` | Encabezados principales (H1, H2) |

> **Nota**: Se utiliza la pila de fuentes del sistema (`sans-serif`) como respaldo para garantizar la carga rápida si Figtree no está disponible.

---

## 4. Componentes UI

### Botones

| Tipo | Estilo Visual | Interacción (Hover) |
| :--- | :--- | :--- |
| **Primario** | Fondo `#3C8DBC`, Texto Blanco, Bordes redondeados (`rounded-md`) | Oscurecer fondo 10% |
| **Secundario** | Fondo Blanco, Borde `#3C8DBC`, Texto `#3C8DBC` | Fondo `#F4F4F4` |
| **Peligro** | Fondo `#DD4B39`, Texto Blanco | Oscurecer fondo 10% |

### Tarjetas (Cards)
- **Fondo**: Blanco (`#FFFFFF`).
- **Sombra**: Sombra suave (`shadow-sm` o `shadow-md`).
- **Bordes**: `rounded-lg`.
- **Padding**: Espaciado interno generoso (`p-4` o `p-6`).

---

## 5. Iconografía

Se utiliza la librería **Lucide React** por su consistencia y limpieza.
- **Tamaño estándar**: 20px o 24px (`w-5 h-5` o `w-6 h-6`).
- **Grosor**: 1.5px o 2px.

**Ejemplos Comunes:**
- 🏠 `Home`: Inicio.
- 📍 `MapPin`: Ubicación de comedores.
- 🕒 `Clock`: Horarios.
- 🍔 `Utensils`: Tipo de servicio.

---

## 6. Layout y Espaciado

Basado en el sistema de grid de Tailwind CSS.
- **Contenedor Principal**: Centrado con `max-w-7xl` y `mx-auto`.
- **Separación Vertical**: Uso consistente de `gap-4` (16px) y `gap-8` (32px).
- **Móvil First**: Diseño adaptable utilizando breakpoints estándar (`sm`, `md`, `lg`).
