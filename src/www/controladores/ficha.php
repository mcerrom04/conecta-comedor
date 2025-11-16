<?php
// src/www/controladores/ficha.php
class Ficha {
    private $config;
    public function __construct($config) {
        $this->config = $config;
    }
    public function ver() {
        require_once __DIR__ . '/../vistas/ficha_comedor.php';
        $vista = new FichaComedorVista($this->config);
        $vista->mostrar();
    }
}
