<?php
// src/www/controladores/mapa.php
require_once __DIR__ . '/../modelos/comedor.php';
class Mapa {
    private $config;
    public function __construct($config) {
        $this->config = $config;
    }
    public function index() {
        $comedores = Comedor::obtenerVisibles();
        require_once $this->config['dir_vistas'] . 'mapa.php';
        $vista = new MapaVista($this->config, $comedores);
        $vista->mostrar();
    }
}
