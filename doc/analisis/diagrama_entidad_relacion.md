# Diagrama Entidad-Relación - Sprint 1

**ROLES** (id_rol, nombre, desc_rol)
**USUARIOS** (id_usuario, email, password, id_rol [FK])
**COMEDORES** (id_comedor, nombre, direccion, latitud, longitud, telefono, normas, visible)
**HORARIOS** (id_horario, id_comedor [FK], dia, hora_ini, hora_fin)

Relaciones:

- Un **ROL** puede tener muchos **USUARIOS** (1:N)
- Un **COMEDOR** puede tener varios **HORARIOS** (1:N)
- Un **USUARIO** con `id_rol = 'admin'` puede gestionar varios **COMEDORES** (relación lógica, no física en este sprint)
