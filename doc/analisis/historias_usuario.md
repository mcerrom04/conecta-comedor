# Historias de Usuario - Conecta Comedor

Este documento contiene las definiciones completas de todas las Historias de Usuario identificadas para el proyecto.

---

## HU-001: Búsqueda geolocalizada (Ciudadano)

**Como** ciudadano en situación de vulnerabilidad alimentaria  
**Quiero** buscar comedores sociales cercanos a mi ubicación actual  
**Para** encontrar rápidamente el comedor más próximo donde pueda acceder a servicios de alimentación

### Criterios de Aceptación

- El sistema debe solicitar permisos de geolocalización al usuario
- Debe mostrar un mapa interactivo con marcadores de comedores cercanos
- Los marcadores deben indicar visualmente el estado del comedor (abierto/cerrado)
- Debe mostrar la distancia aproximada desde la ubicación del usuario
- El mapa debe permitir zoom y navegación
- Debe funcionar en dispositivos móviles y escritorio

### Notas Técnicas

- Usar Leaflet.js para el mapa interactivo
- Integración con API de geolocalización del navegador
- Calcular distancias usando fórmula de Haversine
- Marcadores personalizados según estado del comedor

---

## HU-002: Filtrado avanzado (Ciudadano)

**Como** ciudadano  
**Quiero** filtrar los comedores por diferentes criterios (horarios, servicios específicos, tipo de público)  
**Para** encontrar el comedor que mejor se adapte a mis necesidades específicas

### Criterios de Aceptación

- Debe permitir filtrar por horario de apertura (mañana, tarde, noche)
- Debe permitir filtrar por servicios ofrecidos (desayuno, comida, cena)
- Debe permitir filtrar por tipo de público (familias, personas sin hogar, mayores, etc.)
- Los filtros deben actualizarse en tiempo real en el mapa
- Debe mostrar el número de resultados encontrados
- Debe permitir resetear todos los filtros

### Notas Técnicas

- Componente React con checkboxes/selects para filtros
- Filtrado en frontend si el conjunto de datos es pequeño
- Considerar paginación si hay muchos resultados

---

## HU-003: Ver ficha detallada (Ciudadano)

**Como** ciudadano  
**Quiero** ver información detallada de un comedor específico  
**Para** conocer sus servicios, horarios, ubicación exacta y cómo contactar con ellos

### Criterios de Aceptación

- Debe mostrar nombre, dirección completa y teléfono
- Debe mostrar horarios de apertura para cada día de la semana
- Debe mostrar servicios ofrecidos (desayuno, comida, cena, duchas, etc.)
- Debe incluir botón para obtener direcciones (integración con mapas)
- Debe incluir botón para llamar directamente (en móviles)
- Debe mostrar el estado actual (abierto/cerrado)
- Debe ser responsive y accesible

### Notas Técnicas

- Vista detallada con información completa del comedor
- Links tel: para llamadas en móviles
- Integración con Google Maps/Apple Maps para direcciones
- Diseño mobile-first

---

## HU-004: Ver estado en tiempo real (Ciudadano)

**Como** ciudadano  
**Quiero** ver el estado actualizado de un comedor (abierto/cerrado, aforo disponible)  
**Para** saber si puedo acudir en ese momento sin desplazarme en vano

### Criterios de Aceptación

- Debe mostrar estado actual (abierto/cerrado) basado en horario y actualizaciones del gestor
- Debe mostrar información de aforo si está disponible
- La información debe actualizarse automáticamente sin recargar la página
- Debe indicar la última vez que se actualizó la información
- Debe funcionar en tiempo real o con actualización frecuente

### Notas Técnicas

- Implementar con polling periódico (cada 30-60 segundos) o WebSockets
- Campo en BD: estado_actual, aforo_disponible, ultima_actualizacion
- Considerar Laravel Broadcasting + Pusher/Laravel Echo para tiempo real

---

## HU-005: Ver lista de necesidades (Ciudadano)

**Como** ciudadano o donante potencial  
**Quiero** ver las necesidades actuales de un comedor (alimentos, productos de higiene, voluntarios)  
**Para** saber cómo puedo ayudar o colaborar con ellos

### Criterios de Aceptación

- Debe mostrar lista de necesidades actuales del comedor
- Cada necesidad debe indicar tipo (alimento, producto, voluntariado) y urgencia
- Debe mostrar información de contacto para realizar donaciones
- Debe permitir ver las necesidades desde la ficha del comedor
- La lista debe estar actualizada por los gestores del comedor

### Notas Técnicas

- Tabla necesidades en BD con: tipo, descripcion, urgencia (baja/media/alta), fecha_actualizacion
- Relación con tabla comedores
- Los gestores pueden CRUD las necesidades

---

## HU-006: Autenticación de Gestor (Gestor de Comedor)

**Como** gestor de un comedor social  
**Quiero** iniciar sesión en el sistema con mis credenciales  
**Para** acceder a las funcionalidades de gestión de mi comedor

### Criterios de Aceptación

- Debe tener formulario de login con email y contraseña
- Debe validar credenciales contra la base de datos
- Debe crear sesión persistente al iniciar sesión
- Debe redirigir al panel de gestión tras login exitoso
- Debe mostrar mensajes de error claros si las credenciales son incorrectas
- Debe permitir cerrar sesión
- Las contraseñas deben estar hasheadas en la base de datos

### Notas Técnicas

- Usar Laravel Sanctum o Laravel Breeze para autenticación
- Roles: 'gestor' asociado a un comedor específico
- Middleware para proteger rutas del panel de gestor
- Hash con bcrypt

---

## HU-007: Actualizar estado del día (Gestor de Comedor)

**Como** gestor  
**Quiero** actualizar el estado actual de mi comedor (abierto/cerrado, aforo disponible)  
**Para** informar en tiempo real a los ciudadanos sobre la disponibilidad del servicio

### Criterios de Aceptación

- Debe tener acceso desde el panel de gestor
- Debe permitir cambiar estado: abierto/cerrado
- Debe permitir actualizar aforo disponible (opcional)
- Debe permitir añadir observaciones (ej: "hoy solo cenas")
- Los cambios deben reflejarse inmediatamente en la vista pública
- Debe mostrar la última actualización realizada

### Notas Técnicas

- Formulario simple en panel de gestor
- Actualizar campos: estado_actual, aforo_disponible, observaciones, ultima_actualizacion
- Considerar notificaciones en tiempo real a los usuarios

---

## HU-008: Gestionar lista de necesidades (Gestor de Comedor)

**Como** gestor  
**Quiero** crear, editar y eliminar las necesidades actuales de mi comedor  
**Para** mantener informada a la comunidad sobre cómo pueden colaborar

### Criterios de Aceptación

- Debe permitir crear nuevas necesidades (tipo, descripción, urgencia)
- Debe permitir editar necesidades existentes
- Debe permitir eliminar necesidades ya cubiertas
- Debe permitir marcar urgencia: baja, media, alta
- Debe mostrar la fecha de última actualización
- Los cambios deben reflejarse en la vista pública del comedor

### Notas Técnicas

- CRUD completo para modelo Necesidad
- Relación: Necesidad belongsTo Comedor
- Validación: gestor solo puede gestionar necesidades de su propio comedor
- Soft deletes opcional

---

## HU-009: Aprobar un nuevo comedor (Administrador del Sistema)

**Como** administrador del sistema  
**Quiero** revisar y aprobar/rechazar solicitudes de nuevos comedores  
**Para** mantener la calidad y veracidad de la información en la plataforma

### Criterios de Aceptación

- Debe mostrar lista de comedores pendientes de aprobación
- Debe permitir ver toda la información del comedor solicitado
- Debe permitir aprobar el comedor (pasa a estado 'activo')
- Debe permitir rechazar el comedor con motivo
- Debe notificar al solicitante de la decisión
- Solo administradores deben tener acceso a esta funcionalidad

### Notas Técnicas

- Estado del comedor: 'pendiente', 'activo', 'rechazado'
- Panel de administración con lista filtrable
- Middleware para rol 'admin'
- Considerar sistema de notificaciones por email

---

## HU-010: Moderar comentarios (Administrador del Sistema)

**Como** administrador  
**Quiero** revisar, aprobar o eliminar comentarios de usuarios sobre comedores  
**Para** evitar contenido inapropiado o falso en la plataforma

### Criterios de Aceptación

- Debe mostrar lista de comentarios pendientes de moderación
- Debe permitir ver el comentario completo y el comedor asociado
- Debe permitir aprobar el comentario (se hace visible)
- Debe permitir rechazar/eliminar el comentario
- Debe permitir eliminar comentarios ya publicados si son reportados
- Solo administradores deben tener acceso

### Notas Técnicas

- Tabla comentarios con: usuario, comedor, texto, estado (pendiente/aprobado/rechazado)
- Panel de moderación con acciones rápidas
- Considerar sistema de reportes de usuarios

---

## HU-011: Autenticación de Administrador (Administrador del Sistema)

**Como** administrador del sistema  
**Quiero** iniciar sesión con credenciales de administrador  
**Para** acceder a las funcionalidades de administración y moderación de la plataforma

### Criterios de Aceptación

- Debe tener formulario de login independiente o validación de rol
- Debe validar credenciales de administrador
- Debe redirigir al panel de administración tras login exitoso
- Debe tener permisos superiores a gestores y ciudadanos
- Debe permitir cerrar sesión
- Las credenciales deben estar protegidas

### Notas Técnicas

- Usar Laravel Breeze/Sanctum con roles
- Rol 'admin' con permisos completos
- Middleware para proteger rutas de administración
- Seeders con usuario admin inicial

---

## HU-012: Registro de nuevo comedor (Gestor/Comedor)

**Como** representante de un comedor social  
**Quiero** registrar mi comedor en la plataforma  
**Para** que los ciudadanos puedan encontrarlo y conocer nuestros servicios

### Criterios de Aceptación

- Formulario público para solicitar registro de comedor
- Debe solicitar: nombre, dirección, teléfono, email, servicios, horarios
- Debe crear usuario gestor asociado al comedor
- El comedor queda en estado 'pendiente' hasta aprobación del admin
- Debe enviar confirmación por email
- Debe validar datos obligatorios

### Notas Técnicas

- Formulario de registro público
- Crear comedor (estado: pendiente) + usuario gestor (inactivo hasta aprobación)
- Validación de datos en backend
- Email de confirmación

---

## HU-013: Gestionar horarios del comedor (Gestor de Comedor)

**Como** gestor  
**Quiero** actualizar los horarios de apertura de mi comedor  
**Para** mantener la información actualizada para los ciudadanos

### Criterios de Aceptación

- Debe permitir configurar horarios para cada día de la semana
- Debe permitir indicar si está cerrado un día específico
- Debe permitir múltiples franjas horarias por día (ej: desayuno y cena)
- Debe validar que los horarios sean coherentes
- Los cambios deben reflejarse inmediatamente en la ficha pública

### Notas Técnicas

- Tabla horarios: comedor_id, dia_semana, hora_apertura, hora_cierre, tipo_servicio
- CRUD desde panel de gestor
- Validación de formato horario

---

## HU-014: Búsqueda por dirección (Ciudadano)

**Como** ciudadano  
**Quiero** buscar comedores cerca de una dirección específica (no solo mi ubicación actual)  
**Para** planificar mis desplazamientos o ayudar a otras personas

### Criterios de Aceptación

- Debe tener campo de búsqueda por dirección o código postal
- Debe geocodificar la dirección y centrar el mapa en ella
- Debe mostrar comedores cercanos a esa ubicación
- Debe funcionar aunque el usuario no comparta su ubicación
- Debe manejar errores si la dirección no existe

### Notas Técnicas

- Usar API de geocodificación (Nominatim, Google Geocoding, etc.)
- Alternativa a geolocalización del navegador
- Búsqueda por texto libre
