# Manual del Programador

## Introducción

Este manual está dirigido a desarrolladores que deseen entender, mantener o ampliar el proyecto "Conecta Comedor". Aquí se describe la estructura del código, la arquitectura, y las convenciones utilizadas.

## Estructura del Proyecto

- `src/www/` — Código fuente principal de la aplicación
  - `controladores/` — Lógica de control (MVC)
  - `modelos/` — Acceso a datos y lógica de negocio
  - `vistas/` — Presentación y generación de HTML
  - `css/`, `js/` — Recursos estáticos
- `src/sql/` — Scripts de base de datos
- `doc/` — Documentación y manuales

## Arquitectura General

La aplicación sigue el patrón MVC (Modelo-Vista-Controlador):

- **Controladores**: Gestionan la lógica de flujo y peticiones del usuario.
- **Modelos**: Acceden y manipulan los datos (MySQL).
- **Vistas**: Generan la interfaz de usuario (HTML).

## Documentación del Código

Todo el código PHP está documentado usando el estándar PHPDoc. Puedes consultar la documentación directamente en los archivos fuente o generar documentación HTML con herramientas como phpDocumentor.

### Ejemplo de PHPDoc

```php
/**
 * Controlador para la autenticación de administradores.
 */
class Login {
    /**
     * Muestra el formulario de login.
     * @return void
     */
    public function index() { ... }
}
```

## Clases y Métodos Principales

- **Controladores**: `Admin`, `Login`, `Ficha`, `Mapa`
- **Modelos**: `Comedor`, `Usuario`, `BD`
- **Vistas**: `PanelAdministracionVista`, `LoginVista`, `FichaComedorVista`, `MapaVista`, `ComedorSolicitudVista`

Consulta cada archivo para ver la documentación detallada de cada clase y método.

## Buenas Prácticas y Convenciones

- Seguir el estándar PHPDoc para toda función, clase y método.
- Usar nombres descriptivos y en español.
- Mantener la separación de responsabilidades (MVC).

## Cómo contribuir

1. Realiza un fork o crea una rama para tus cambios.
2. Documenta tu código siguiendo PHPDoc.
3. Haz pull request o merge a la rama principal tras revisión.

---
