# Diagrama Entidad-Relación

Este diagrama representa la estructura de base de datos actual implementada en el Sprint 3.

```mermaid
erDiagram
    ROLES {
        string id_rol PK "admin, gestor, ciudadano"
        string nombre
        string desc_rol
    }

    USERS {
        bigint id PK
        string name
        string email UK
        string password
        string id_rol FK
        timestamp email_verified_at
    }

    COMEDORES {
        bigint id_comedor PK
        string nombre
        string direccion
        decimal latitud
        decimal longitud
        enum estado "pendiente, activo, rechazado"
        enum estado_actual "abierto, cerrado, completo"
        boolean visible
        int aforo_disponible
    }

    COMEDOR_USER {
        bigint id PK
        bigint user_id FK
        bigint id_comedor FK
    }

    HORARIOS {
        bigint id_horario PK
        bigint id_comedor FK
        enum dia_semana
        time hora_apertura
        time hora_cierre
        enum tipo_servicio
    }

    NECESIDADES {
        bigint id_necesidad PK
        bigint id_comedor FK
        string tipo
        text descripcion
        enum urgencia
    }

    COMENTARIOS {
        bigint id_comentario PK
        bigint user_id FK
        bigint id_comedor FK
        text texto
        enum estado
    }

    %% Relaciones
    ROLES ||--|{ USERS : "tiene asignados"
    USERS ||--|{ COMEDOR_USER : "gestiona"
    COMEDORES ||--|{ COMEDOR_USER : "es gestionado por"
    
    COMEDORES ||--|{ HORARIOS : "tiene"
    COMEDORES ||--|{ NECESIDADES : "publica"
    COMEDORES ||--|{ COMENTARIOS : "recibe"
    
    USERS ||--|{ COMENTARIOS : "escribe"
```

## Relaciones Clave

1.  **Gestión de Comedores (N:M)**: Implementada a través de la tabla pivote `comedor_user`. Un usuario (Gestor) puede administrar múltiples comedores, y un comedor podría tener múltiples gestores.
2.  **Roles (1:N)**: Cada usuario tiene un único rol asignado desde la tabla `roles`.
3.  **Dependencias Fuertes (1:N)**: Horarios, Necesidades y Comentarios dependen directamente de un comedor (eliminación en cascada).
