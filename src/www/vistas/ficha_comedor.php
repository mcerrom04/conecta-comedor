<?php
// src/www/vistas/ficha_comedor.php
class FichaComedorVista {
    private $config;
    public function __construct($config) {
        $this->config = $config;
    }
    public function mostrar() {
        include $this->config['dir_html'] . 'ficha_comedor.html';
    }
}
