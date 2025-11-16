<?php
// Servicio: Conexión a la base de datos (estilo Biblioteca Fantástica)
class BD {
    private $conexion;

    public function __construct() {
        try {
            $config = require(__DIR__ . '/../config.php');
            $host = $config['bd_host'];
            $nombre = $config['bd_nombre'];
            $usuario = $config['bd_usuario'];
            $clave = $config['bd_clave'];
            $stringConexion = "mysql:host=$host;dbname=$nombre";

            $this->conexion = new PDO($stringConexion, $usuario, $clave);
            $this->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $exception) {
            if ($config['debug'])
                echo "Error en modelos/bd.php: ".$exception;
            die();
        }
    }

    public function obtenerConexion() {
        return $this->conexion;
    }
}
