<?php
// src/www/controladores/mapa.php
class Mapa {
    private $config;
    public function __construct($config) {
        $this->config = $config;
    }
    public function index() {
        require_once $this->config['dir_vistas'] . 'mapa.php';
        $vista = new MapaVista($this->config);
        $vista->mostrar();
    }
}
