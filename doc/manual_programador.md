# Manual del Programador - Documentación Técnica (API)

Este documento contiene la documentación técnica generada a partir del código fuente de Conecta Comedor.

## Namespace App\Http\Controllers

### Class ComedorController
Gestiona toda la lógica relacionada con los comedores sociales.

| Método | Descripción | Retorno |
| :--- | :--- | :--- |
| `mapa()` | Obtiene los comedores activos y visibles para mostrar en el mapa interactivo. | `Inertia\Response` |
| `show(int $id)` | Muestra la ficha detallada de un comedor específico con sus horarios, necesidades y comentarios. | `Inertia\Response` |
| `estado(int $id)` | Devuelve en formato JSON el estado de apertura y aforo actual de un comedor. | `JsonResponse` |
| `pendientes()` | Lista las solicitudes de registro de comedores que esperan aprobación del administrador. | `Inertia\Response` |
| `aprobar(int $id)` | Activa un comedor pendiente y lo hace visible en el mapa. | `RedirectResponse` |
| `rechazar(int $id)` | Deniega la solicitud de un nuevo comedor. | `RedirectResponse` |
| `create()` | Muestra el formulario de registro para un nuevo gestor de comedor. | `Inertia\Response` |
| `store(Request $request)` | Procesa y valida la creación de un nuevo comedor en la base de datos. | `RedirectResponse` |
| `editEstado(Comedor $comedor)` | Formulario para que el gestor actualice el estado de su comedor en tiempo real. | `Inertia\Response` |
| `updateEstado(Request $request, Comedor $comedor)` | Guarda los cambios en el aforo o disponibilidad del comedor. | `RedirectResponse` |

### Class ComentarioController
Controlador encargado de la gestión y moderación de comentarios de ciudadanos.

| Método | Descripción | Retorno |
| :--- | :--- | :--- |
| `index()` | Lista todos los comentarios con estado 'pendiente' para su revisión legal. | `Inertia\Response` |
| `store(Request $request)` | Almacena un comentario nuevo enviado por un ciudadano. | `RedirectResponse` |
| `aprobar(int $id)` | Cambia el estado del comentario a 'aprobado' para que sea visible públicamente. | `RedirectResponse` |
| `rechazar(int $id)` | Elimina o marca como rechazado un comentario inapropiado. | `RedirectResponse` |

### Class HorarioController
Gestiona las franjas horarias de apertura de los comedores.

| Método | Descripción | Retorno |
| :--- | :--- | :--- |
| `index(Comedor $comedor)` | Lista los horarios asignados a un comedor para su edición. | `Inertia\Response` |
| `store(Request $request, Comedor $comedor)` | Crea una nueva franja horaria (Ej: Lunes 12:00-15:00). | `RedirectResponse` |
| `destroy(Comedor $comedor, Horario $horario)` | Elimina un horario existente. | `RedirectResponse` |

### Class NecesidadController
Permite a los gestores publicar qué recursos necesitan (alimentos, voluntarios, etc).

| Método | Descripción | Retorno |
| :--- | :--- | :--- |
| `index(Comedor $comedor)` | Lista las necesidades actuales publicadas por el comedor. | `Inertia\Response` |
| `store(Request $request, Comedor $comedor)` | Publica una nueva necesidad de recursos. | `RedirectResponse` |
| `destroy(Comedor $comedor, Necesidad $necesidad)` | Marca una necesidad como resuelta o la elimina. | `RedirectResponse` |

### Class ProfileController
Gestiona el perfil personal y la seguridad de los usuarios registrados.

| Método | Descripción | Retorno |
| :--- | :--- | :--- |
| `edit(Request $request)` | Muestra el formulario de edición de perfil (nombre, email). | `Inertia\Response` |
| `update(ProfileUpdateRequest $request)` | Actualiza los datos del usuario autenticado. | `RedirectResponse` |
| `destroy(Request $request)` | Borra permanentemente la cuenta del usuario. | `RedirectResponse` |

---

## Namespace App\Models

### Class User
Extiende de Authenticatable. Representa a los usuarios del sistema (Administrador, Gestor, Ciudadano).

**Propiedades:**
- `name`: Nombre completo.
- `email`: Correo electrónico (identificador).
- `id_rol`: FK a la tabla roles (`admin`, `gestor`, `ciudadano`).

**Relaciones:**
- `role()`: BelongsTo Role.
- `comedores()`: BelongsToMany Comedor (solo para gestores).
- `comentarios()`: HasMany Comentario.

### Class Comedor
Representa un comedor social en el sistema.

**Propiedades:**
- `nombre`: Nombre de la institución.
- `estado`: Estado de registro (`pendiente`, `activo`, `rechazado`).
- `estado_actual`: Disponibilidad en tiempo real (`abierto`, `cerrado`, `desbordado`).
- `aforo_disponible`: Plazas libres actuales.

**Relaciones:**
- `horarios()`: HasMany Horario.
- `necesidades()`: HasMany Necesidad.
- `comentarios()`: HasMany Comentario.
- `gestores()`: BelongsToMany User.

### Class Comentario
Entrada de texto asociada a un usuario y un comedor.

**Propiedades:**
- `texto`: Contenido del comentario.
- `estado`: Moderación (`pendiente`, `aprobado`, `rechazado`).

### Class Horario
Define los tiempos de apertura.

**Propiedades:**
- `dia_semana`: Entero (0-6) o string con el día.
- `hora_inicio`, `hora_fin`: Horarios de servicio.

### Class Necesidad
Recursos requeridos por un comedor.

**Propiedades:**
- `titulo`: Nombre del recurso (Ej: "Aceite", "Voluntarios").
- `descripcion`: Detalles adicionales de la petición.

---

## Estructura de Rutas

Las rutas están definidas en `src/routes/web.php` y se dividen por middleware de rol:
- `auth`: Acciones comunes (perfil, cerrar sesión).
- `role:admin`: Gestión de la plataforma y moderación global.
- `role:gestor`: Gestión específica de los comedores asignados al usuario.
- `públicas`: Acceso al mapa y fichas de información.

---
