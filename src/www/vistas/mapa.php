<?php
// src/www/vistas/mapaVista.php
class MapaVista {
    private $config;
    private $comedores;
    public function __construct($config, $comedores) {
        $this->config = $config;
        $this->comedores = $comedores;
    }
    public function mostrar() {
        $script_comedores = '<script>var comedores = ' . json_encode($this->comedores) . ';</script>';
        include $this->config['dir_html'] . 'mapa.html';
    }
}
