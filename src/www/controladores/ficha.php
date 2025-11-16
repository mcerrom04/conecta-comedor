<?php
// src/www/controladores/ficha.php
class Ficha {
    private $config;
    public function __construct($config) {
        $this->config = $config;
    }
    public function ver() {
        require_once __DIR__ . '/../modelos/comedor.php';
        require_once __DIR__ . '/../vistas/ficha_comedor.php';
        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        $comedor = Comedor::obtenerPorId($id);
        $vista = new FichaComedorVista($this->config, $comedor);
        $vista->mostrar();
    }
}
