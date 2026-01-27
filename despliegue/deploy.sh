#!/bin/bash
# Script de despliegue para Conecta Comedor

echo "=== Despliegue de Conecta Comedor (Laravel 12) ==="

# Verificar si existe el archivo .env en la carpeta actual (despliegue)
if [ ! -f ".env" ]; then
    echo "⚠️  No se encontró el archivo .env en la carpeta 'despliegue'."
    echo "    Copiando .env.example a .env..."
    cp .env.example .env
    echo "    ⚠️ REVISA Y EDITA EL ARCHIVO .env ANTES DE CONTINUAR CON DATOS REALES."
    echo "    (Especialmente DB_PASSWORD y APP_KEY)"
    # Generamos key si no existe, pero necesitaríamos un contenedor php para eso o hacerlo local.
    # Lo haremos después de levantar el contenedor si está vacío.
fi

# 1. Construir la imagen
echo "Construyendo imagen Docker..."
docker compose build --no-cache

# 2. Levantar los servicios
echo "Levantando contenedores..."
docker compose down 2>/dev/null
docker compose up -d

echo "Esperando a que la base de datos inicie..."
sleep 15

# 3. Post-despliegue (host + dentro del contenedor)
echo "Ejecutando tareas de post-despliegue..."

# Asegurar directorios de storage en el host (persistidos en ./storage_data)
echo "Creando directorios persistentes en ./storage_data y ajustando permisos..."
mkdir -p ./storage_data/framework/{views,sessions,cache}
mkdir -p ./storage_data/logs
chown -R www-data:www-data ./storage_data 2>/dev/null || echo "Warning: chown failed, run as root if necessary"

# Obtener id del contenedor 'app' para copiar .env si existe localmente
container_id=$(docker compose ps -q app || true)
if [ -n "${container_id}" ] && [ -f ".env" ]; then
    echo "Copiando .env al contenedor..."
    docker cp .env "${container_id}:/var/www/html/.env" || echo "docker cp falló; verifica permisos"
    docker compose exec -T app chown www-data:www-data /var/www/html/.env || true
    docker compose exec -T app chmod 640 /var/www/html/.env || true
fi

# Generar APP_KEY si falta (no sobreescribe si ya existe en .env dentro del contenedor)
echo "Generando APP_KEY si es necesario..."
docker compose exec -T app bash -lc "php artisan key:generate --force --no-interaction || true"

# Migraciones y seeders (seed opcional con variable de entorno SEED=true)
echo "Ejecutando migraciones..."
docker compose exec -T app php artisan migrate --force
if [ "${SEED}" = "true" ]; then
    echo "SEED=true detectado — ejecutando seeders..."
    docker compose exec -T app php artisan db:seed --class=DatabaseSeeder --force || true
fi

# Limpieza y cache
echo "Limpiando y regenerando cachés de Laravel..."
docker compose exec -T app php artisan optimize:clear || true
docker compose exec -T app php artisan config:cache || true
docker compose exec -T app php artisan route:cache || true
docker compose exec -T app php artisan view:cache || true

# Asegurar permisos internos en la app
echo "Ajustando permisos dentro del contenedor (storage, bootstrap/cache)..."
docker compose exec -T app chown -R www-data:www-data storage bootstrap/cache || true

echo ""
echo "=== ¡Despliegue completado! ==="
echo "La aplicación debería estar accesible en: https://conecta-comedor.mariocm.dev"
