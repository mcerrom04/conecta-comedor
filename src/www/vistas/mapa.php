<?php
// src/www/vistas/mapaVista.php
class MapaVista {
    private $config;
    public function __construct($config) {
        $this->config = $config;
    }
    public function mostrar() {
        include $this->config['dir_html'] . 'mapa.html';
    }
}
