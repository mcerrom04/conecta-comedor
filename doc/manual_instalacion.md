
# Manual de Instalación

## Requisitos previos

- Servidor web Apache (XAMPP, WAMP, LAMP, etc.)
- PHP 8.0 o superior
- MySQL/MariaDB

## Pasos de instalación

1.**Clona o descarga el proyecto** en tu máquina local:

- Ubica los archivos en la carpeta pública de tu servidor web (por ejemplo, `htdocs` en XAMPP).

2.**Configura la base de datos**:

- Crea una base de datos en MySQL llamada `conecta_comedor`.
- Importa el script `src/sql/bbdd.sql` para crear la estructura.
- Importa también `src/sql/datos_iniciales.sql` y `src/sql/datos_pruebas.sql` para cargar datos de ejemplo y pruebas.

3.**Configura el archivo de conexión**:

- Edita `src/www/config.php` con los datos de tu base de datos (usuario, contraseña, nombre de la base de datos).

4.**Accede a la aplicación**:

- Abre tu navegador y entra en la URL correspondiente (por ejemplo, `http://localhost/conecta-comedor/src/www/index.php`).

## Usuario administrador de pruebas

- **Correo:** `admin@conecta.com`
- **Contraseña:** admin123
