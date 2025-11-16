<?php
/**
 * index.php
 * Responsabilidades:
 *      - Cargar la configuración
 *      - Middleware: autenticación, logging, etc.
 *      - Routing: Procesar la petición
 */

try {
    // Configuración inicial
    $config = require_once(__DIR__ . '/config.php');
    if ($config['debug']) {
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);
    } else {
        ini_set('display_errors', 0);
        ini_set('display_startup_errors', 0);
        error_reporting(0);
    }

    // Middlewares

    // Routing general por controlador y método
    $controlador = $_GET['controlador'] ?? null;
    $metodo = $_GET['metodo'] ?? null;

    if ($controlador && $metodo) {
        require_once($config['dir_controladores'] . strtolower($controlador) . '.php');
        $clase = ucfirst($controlador);
        if (class_exists($clase)) {
            $controlador = new $clase($config);
            if (method_exists($controlador, $metodo)) {
                $controlador->$metodo();
            } else {
                throw new Exception("Método '$metodo' no encontrado en el controlador '$clase'.");
            }
        } else {
            throw new Exception("Controlador '$clase' no encontrado.");
        }
    } else {
        // Página principal pública
        echo '<h1>Bienvenido a Conecta Comedor</h1>';
        echo '<a href="index.php?controlador=login&metodo=index">Acceso Administrador</a>';
    }
} catch (Throwable $exception) {
    header('HTTP/2 500 Internal Server Error');
    if (!empty($config['debug'])) {
        echo "Error en index.php: " . $exception;
    }
}
