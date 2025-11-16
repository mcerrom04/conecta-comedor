<?php
// src/www/vistas/ficha_comedor.php
class FichaComedorVista {
    private $config;
    private $comedor;
    public function __construct($config, $comedor) {
        $this->config = $config;
        $this->comedor = $comedor;
    }
    public function mostrar() {
        $comedor = $this->comedor;
        include $this->config['dir_html'] . 'ficha_comedor.html';
    }
}
