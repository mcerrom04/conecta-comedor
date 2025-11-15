# Arquitectura Tecnológica - Conecta Comedor (Fase Inicial)

## 1. Introducción

La arquitectura tecnológica inicial del proyecto "Conecta Comedor" se basa en un stack tradicional, robusto y fácil de desplegar. El enfoque principal es un desarrollo con PHP "puro" (vanilla) y una estructura que sigue el patrón Modelo-Vista-Controlador (MVC).

## 2. Stack Tecnológico (Sprint 1-2)

- **Backend**: PHP 8.x (Puro, sin frameworks).
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla, ES6+).
- **Base de Datos**: MySQL 8 o MariaDB 10.x.
- **Servidor de Desarrollo**: Apache (integrado en XAMPP, WAMP, MAMP o similar).

## 3. Arquitectura de Software

Se seguirá una implementación del patrón **Modelo-Vista-Controlador (MVC)**:

- **Modelos (`/src/www/modelos/`)**: Contendrán la lógica de negocio y la interacción con la base de datos. Habrá clases o scripts para `usuario.php`, `comedor.php`, etc., y un script de conexión `bd.php`.
- **Vistas (`/src/www/vistas/`)**: Serán plantillas HTML/PHP. Contendrán la mínima lógica posible, dedicada exclusivamente a mostrar los datos (bucles, condicionales simples).
- **Controladores (`/src/www/controladores/`)**: Scripts PHP que actúan como intermediarios. Reciben las peticiones del usuario (ej. `login.php`), llaman a los modelos para obtener/guardar datos, y cargan la vista adecuada pasándole esos datos.
- **Punto de Entrada (`/src/www/index.php`)**: Actuará como enrutador principal, decidiendo qué controlador cargar basado en la URL o parámetros (ej. `?controlador=comedor&accion=listar`).

## 4. Estructura de Directorios (Definida)

```text
/doc/
/src/
  ├── sql/
  │   ├── bbdd.sql
  │   ├── datos_iniciales.sql
  │   └── datos_pruebas.sql
  └── www/
      ├── index.php
      ├── modelos/
      ├── vistas/
      ├── controladores/
      ├── js/
      └── css/
/despliegue/
```
