# Diccionario de Datos

Este documento describe la estructura de la base de datos operativa de Conecta Comedor, actualizada según las migraciones de Laravel.

## 1. Tabla: `roles`
Define los perfiles de acceso al sistema.

| Campo | Tipo | Atributos | Descripción |
| :--- | :--- | :--- | :--- |
| `id_rol` | VARCHAR(20) | **PK** | Identificador único del rol (ej: `admin`, `gestor`, `ciudadano`). |
| `nombre` | VARCHAR(50) | Not Null | Nombre legible del rol para mostrar en interfaz. |
| `desc_rol` | VARCHAR(100) | Nullable | Descripción breve de los permisos o funciones del rol. |

## 2. Tabla: `users`
Almacena la información de autenticación y perfil de todos los usuarios.

| Campo | Tipo | Atributos | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | **PK**, Auto | Identificador único del usuario. |
| `name` | VARCHAR(255) | Not Null | Nombre completo del usuario. |
| `email` | VARCHAR(255) | **Unique**, Not Null | Correo electrónico usado para login y notificaciones. |
| `email_verified_at` | TIMESTAMP | Nullable | Fecha de confirmación del correo. Si es NULL, no está verificado. |
| `password` | VARCHAR(255) | Not Null | Hash de la contraseña del usuario. |
| `id_rol` | VARCHAR(20) | **FK** | Referencia a `roles.id_rol`. Define permisos del usuario. |
| `remember_token` | VARCHAR(100) | Nullable | Token para "recordar sesión". |
| `created_at` | TIMESTAMP | Nullable | Fecha de registro. |
| `updated_at` | TIMESTAMP | Nullable | Fecha de última modificación del perfil. |

## 3. Tabla: `comedores`
Tabla central que contiene la información de los comedores sociales.

| Campo | Tipo | Atributos | Descripción |
| :--- | :--- | :--- | :--- |
| `id_comedor` | BIGINT | **PK**, Auto | Identificador único del comedor. |
| `nombre` | VARCHAR(100) | Not Null | Nombre oficial de la institución o comedor. |
| `direccion` | VARCHAR(255) | Not Null | Dirección física completa. |
| `latitud` | DECIMAL(9,6) | Not Null | Coordenada GPS para geolocalización. |
| `longitud` | DECIMAL(9,6) | Not Null | Coordenada GPS para geolocalización. |
| `telefono` | VARCHAR(20) | Nullable | Teléfono de contacto público. |
| `email` | VARCHAR(100) | Nullable | Email de contacto público. |
| `descripcion` | TEXT | Nullable | Descripción detallada de servicios ofrecidos. |
| `normas` | TEXT | Nullable | Reglas de acceso o comportamiento. |
| `estado` | ENUM | Default: `pendiente` | Estado administrativo (`pendiente`, `activo`, `rechazado`). |
| `estado_actual` | ENUM | Default: `cerrado` | Estado operativo en tiempo real (`abierto`, `cerrado`, `completo`). |
| `visible` | BOOLEAN | Default: `true` | Si `false`, no aparece en mapas ni búsquedas. |
| `aforo_disponible` | INT | Nullable | Número de plazas libres en tiempo real (si aplica). |
| `observaciones` | TEXT | Nullable | Notas temporales (ej: "Hoy servimos cocido"). |
| `ultima_actualizacion`| TIMESTAMP | Nullable | Fecha/hora del último cambio de estado operativo. |
| `created_at` | TIMESTAMP | Nullable | Fecha de alta en el sistema. |
| `updated_at` | TIMESTAMP | Nullable | Fecha de última edición administrativa. |

## 4. Tabla: `comedor_user` (Pivote)
Relaciona a los Gestores con los Comedores (Relación N:M).

| Campo | Tipo | Atributos | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | **PK**, Auto | Identificador de la relación. |
| `user_id` | BIGINT | **FK** | Referencia a `users.id`. El gestor. |
| `id_comedor` | BIGINT | **FK** | Referencia a `comedores.id_comedor`. El comedor gestionado. |

## 5. Tabla: `horarios`
Define los turnos de apertura de un comedor.

| Campo | Tipo | Atributos | Descripción |
| :--- | :--- | :--- | :--- |
| `id_horario` | BIGINT | **PK**, Auto | Identificador único del horario. |
| `id_comedor` | BIGINT | **FK** | Referencia a `comedores.id_comedor`. |
| `dia_semana` | ENUM | Not Null | Día de la semana (`lunes`, `martes`...). |
| `hora_apertura` | TIME | Not Null | Hora de inicio del servicio. |
| `hora_cierre` | TIME | Not Null | Hora de fin del servicio. |
| `tipo_servicio` | ENUM | Nullable | Tipo de turno (`desayuno`, `comida`, `cena`). |

## 6. Tabla: `necesidades`
Lista de artículos o recursos que necesita el comedor.

| Campo | Tipo | Atributos | Descripción |
| :--- | :--- | :--- | :--- |
| `id_necesidad` | BIGINT | **PK**, Auto | Identificador de la necesidad. |
| `id_comedor` | BIGINT | **FK** | Referencia a `comedores.id_comedor`. |
| `tipo` | VARCHAR(100) | Not Null | Título del recurso (ej: "Aceite", "Voluntarios"). |
| `descripcion` | TEXT | Nullable | Detalles adicionales (ej: "Preferiblemente de oliva"). |
| `urgencia` | ENUM | Default: `media` | Nivel de prioridad (`baja`, `media`, `alta`). |

## 7. Tabla: `comentarios`
Opiniones o feedback de los usuarios sobre los comedores.

| Campo | Tipo | Atributos | Descripción |
| :--- | :--- | :--- | :--- |
| `id_comentario` | BIGINT | **PK**, Auto | Identificador del comentario. |
| `user_id` | BIGINT | **FK** | Referencia a `users.id`. Autor del comentario. |
| `id_comedor` | BIGINT | **FK** | Referencia a `comedores.id_comedor`. Destinatario. |
| `texto` | TEXT | Not Null | Contenido del comentario. |
| `estado` | ENUM | Default: `pendiente`| Estado de moderación (`pendiente`, `aprobado`, `rechazado`). |
