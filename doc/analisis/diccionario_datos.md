# Diccionario de Datos - Sprint 1

## Tabla: ROLES

| Campo    | Tipo         | Clave | Nulo | Descripción                |
|----------|--------------|-------|------|----------------------------|
| id_rol   | VARCHAR(20)  | PK    | NO   | Identificador del rol      |
| nombre   | VARCHAR(50)  |       | NO   | Nombre del rol (Admin, ...)|
| desc_rol | VARCHAR(100) |       | SÍ   | Descripción del rol        |

## Tabla: USUARIOS

| Campo        | Tipo         | Clave | Nulo | Descripción                  |
|--------------|--------------|-------|------|------------------------------|
| id_usuario   | INT          | PK    | NO   | Identificador único          |
| email        | VARCHAR(100) |       | NO   | Correo electrónico           |
| password     | VARCHAR(255) |       | NO   | Contraseña cifrada           |
| id_rol       | VARCHAR(20)  | FK    | NO   | Rol del usuario (referencia a ROLES) |

## Tabla: COMEDORES

| Campo      | Tipo          | Clave | Nulo | Descripción                  |
|------------|---------------|-------|------|------------------------------|
| id_comedor | INT           | PK    | NO   | Identificador único          |
| nombre     | VARCHAR(100)  |       | NO   | Nombre del comedor           |
| direccion  | VARCHAR(255)  |       | NO   | Dirección                    |
| latitud    | DECIMAL(9,6)  |       | NO   | Coordenada geográfica        |
| longitud   | DECIMAL(9,6)  |       | NO   | Coordenada geográfica        |
| telefono   | VARCHAR(20)   |       | SÍ   | Teléfono de contacto         |
| normas     | TEXT          |       | SÍ   | Normas del comedor           |
| visible    | BOOLEAN       |       | NO   | Visible en la plataforma     |

## Tabla: HORARIOS

| Campo      | Tipo         | Clave | Nulo | Descripción                  |
|------------|--------------|-------|------|------------------------------|
| id_horario | INT          | PK    | NO   | Identificador único          |
| id_comedor | INT          | FK    | NO   | Comedor asociado             |
| dia        | VARCHAR(20)  |       | NO   | Día de la semana             |
| hora_ini   | TIME         |       | NO   | Hora de apertura             |
| hora_fin   | TIME         |       | NO   | Hora de cierre               |
