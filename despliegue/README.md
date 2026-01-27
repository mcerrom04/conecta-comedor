# Guía de Despliegue - Conecta Comedor

Este directorio contiene los archivos necesarios para desplegar la aplicación Laravel en producción usando Docker y Caddy como reverse proxy.

## Prerrequisitos

1. **Docker y Docker Compose** instalados en el servidor.
2. **Red de Caddy (`red_caddy`)**: Debe existir una red externa llamada `red_caddy` donde Caddy esté corriendo.
   ```bash
   docker network create red_caddy
   # (O asegúrate de que tu contenedor Caddy esté conectado a ella)
   ```

## Estructura

- **`compose.yml`**: Define los servicios (App Laravel y Base de datos MariaDB).
- **`Dockerfile`**: Define cómo se construye la imagen de la aplicación (copiando el código de `../src`).
- **`deploy.sh`**: Script para automatizar el proceso de build y deploy.
- **`.env.example`**: Plantilla de configuración para producción.

## Pasos para Desplegar

1. **Entrar al directorio de despliegue**:
   ```bash
   cd despliegue
   ```

2. **Configurar entorno**:
   Copia el archivo de ejemplo y edítalo con tus credenciales seguras.
   ```bash
   cp .env.example .env
   nano .env
   ```
   **Importante**:
   - Cambia `DB_PASSWORD` por una contraseña segura.
   - Asegúrate de que `APP_URL` sea `https://conecta-comedor.mariocm.dev`.
   - `DB_HOST` debe ser `db` (nombre del servicio en compose).

3. **Ejecutar script de despliegue**:
   Da permisos de ejecución y corre el script.
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

   Este script realizará lo siguiente:
   - Construirá la imagen Docker usando el código actual en `../src`.
   - Levantará los contenedores.
   - Creará los directorios persistentes necesarios en `./storage_data` y ajustará permisos.
   - Copiará el archivo `.env` dentro del contenedor `app` si existe en la carpeta `despliegue`.
   - Generará la `APP_KEY` si falta.
   - Ejecutará las migraciones de base de datos (`php artisan migrate`).
   - (Opcional) Ejecutará los seeders si se exporta la variable de entorno `SEED=true` antes de ejecutar el script.
   - Optimizará las cachés de Laravel.

## Notas Adicionales

- **Persistencia de Datos**:
  - La base de datos se guarda en un volumen de Docker llamado `db_data`.
  - Los archivos de `storage` de Laravel (uploads, logs) se mapean a la carpeta `./storage_data` dentro de `despliegue`.

## Opciones útiles

- Ejecutar deploy y poblar la base de datos con seeders:

```bash
SEED=true ./deploy.sh
```

Nota: el script intentará cambiar la propiedad de `./storage_data` a `www-data:www-data`. Si tu usuario no tiene permisos para ejecutar `chown` sobre esas rutas, ejecuta el script como `root` o ajusta los permisos manualmente.

- **Actualizaciones**:
  Para actualizar la aplicación, simplemente haz `git pull` en la raíz del proyecto y vuelve a ejecutar `./deploy.sh` desde la carpeta `despliegue`.
