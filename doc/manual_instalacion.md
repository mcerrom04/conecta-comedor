
# Manual de Instalación

## Requisitos previos

- **PHP 8.2** o superior
- **Composer** (gestor de dependencias de PHP)
- **Node.js y npm** (para compilar los activos de React)
- **MySQL/MariaDB**
- **Servidor web** (vía `php artisan serve` o configurando un host virtual con Apache/Nginx)

## Pasos de instalación

1. **Clona o descarga el proyecto** en tu máquina local.

2. **Instala las dependencias de Backend**:
   ```bash
   cd src
   composer install
   ```

3. **Instala las dependencias de Frontend**:
   ```bash
   npm install
   ```

4. **Configura el entorno**:
   - Copia el archivo `.env.example` a `.env`:
     ```bash
     cp .env.example .env
     ```
   - Abre el archivo `.env` y configura tus credenciales de base de datos (`DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).

5. **Genera la clave de la aplicación**:
   ```bash
   php artisan key:generate
   ```

6. **Configura la base de datos y carga datos iniciales**:
   ASEGÚRATE de tener creada la base de datos en tu servidor antes de este paso.
   ```bash
   php artisan migrate:fresh --seed
   ```

7. **Inicia el entorno de desarrollo**:
   Laravel 12 utiliza `concurrently` para ejecutar el servidor de Backend y Vite simultáneamente con un solo comando:
   ```bash
   composer run dev
   ```

8. **Accede a la aplicación**:
   - Una vez que el comando anterior esté en ejecución, abre tu navegador y accede a: [http://127.0.0.1:8000](http://127.0.0.1:8000)

## Usuarios de prueba

El comando `--seed` crea los siguientes usuarios por defecto:

- **Administrador**: `admin@admin.com` / `admin123`
- **Gestor**: `gestor@gestor.com` / `gestor123`
- **Ciudadano**: `user@user.com` / `user123`

---
