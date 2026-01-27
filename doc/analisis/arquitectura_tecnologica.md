# Arquitectura Tecnológica - Conecta Comedor

## 1. Introducción

La arquitectura tecnológica del proyecto "Conecta Comedor" se basa en un enfoque de **Monolito Moderno** utilizando **Laravel 12** como framework principal. Esta arquitectura permite un desarrollo ágil, seguro y mantenible, aprovechando la potencia de PHP en el backend y la interactividad de React en el frontend, unidos de forma transparente mediante **Inertia.js**.

## 2. Stack Tecnológico

### Backend
- **Framework**: Laravel 12 (PHP 8.2+).
- **Autenticación**: Laravel Breeze / Sanctum.
- **Base de Datos**: MySQL / MariaDB (Gestionada mediante Eloquent ORM y migraciones).
- **Motor de Plantillas/Enrutado**: Inertia.js (Sustituye a Blade para la capa de vista, sirviendo componentes React).

### Frontend
- **Librería UI**: React 19.
- **Estilos**: Tailwind CSS 4.0 (Utility-first CSS framework).
- **Componentes**: Headless UI (para componentes accesibles y sin estilos base).
- **Mapas**: Leaflet y React-Leaflet (para la visualización de comedores).
- **Iconografía**: Lucide React.
- **Comunicación**: Axios (gestión de peticiones HTTP interna de Inertia).

### Herramientas de Desarrollo y Construcción
- **Bundler**: Vite (construcción rápida de assets frontend).
- **Gestión de Dependencias**: Composer (PHP) y NPM (Node.js).
- **Testing**: PHPUnit / Pest (Backend).

## 3. Arquitectura de Software

El sistema sigue el patrón **Modelo-Vista-Controlador (MVC)**, adaptado a la arquitectura de Inertia:

- **Modelos (`app/Models/`)**: 
  - Representan la estructura de datos y la lógica de negocio (ej: `Comedor`, `User`, `Necesidad`).
  - Utilizan Eloquent ORM para interactuar con la base de datos de forma expresiva.

- **Vistas (`resources/js/Pages/`)**: 
  - Componentes **React** que renderizan la interfaz de usuario.
  - Reciben datos desde los controladores como "props", sin necesidad de una API REST compleja.
  - Organizadas por dominios o funcionalidades (ej: `Comedor/Show.jsx`, `Profile/Edit.jsx`).

- **Controladores (`app/Http/Controllers/`)**: 
  - Gestionan el flujo de la aplicación.
  - Reciben peticiones, validan datos, invocan lógica de negocio y devuelven respuestas `Inertia::render()`.
  - Ejemplos: `ComedorController`, `ComentarioController`.

- **Middleware**:
  - Gestionan el acceso y roles (`auth`, `role:admin`, `role:gestor`).

## 4. Estructura de Directorios Clave

```text
/src/
  ├── app/
  │   ├── Http/
  │   │   ├── Controllers/  # Lógica decontroladores
  │   │   ├── Middleware/   # Filtros de peticiones (Roles)
  │   │   └── Requests/     # Validaciones de formularios
  │   ├── Models/           # Modelos Eloquent
  │
  ├── database/
  │   ├── migrations/       # Definición de esquema de BD
  │   └── seeders/          # Datos de prueba iniciales
  │
  ├── resources/
  │   ├── css/              # Estilos globales y configuración de Tailwind
  │   ├── js/
  │   │   ├── Components/   # Componentes reutilizables (Botones, Inputs)
  │   │   ├── Layouts/      # Plantillas de diseño (AuthenticatedLayout, GuestLayout)
  │   │   ├── Pages/        # Vistas principales (vistas de ruta)
  │   │   └── app.jsx       # Punto de entrada frontend
  │
  ├── routes/
  │   ├── web.php           # Definición de rutas y middleware
  │   └── auth.php          # Rutas de autenticación
  │
  └── tests/                # Pruebas automatizadas
```

## 5. Integraciones Externas

- **Mapas**: Integración con OpenStreetMap vía Leaflet para geolocalización de comedores.
