<?php
// src/www/vistas/mapaVista.php

/**
 * Vista para mostrar el mapa de comedores.
 */
class MapaVista {
    /**
     * Configuración global de la aplicación.
     * @var array
     */
    private $config;

    /**
     * Lista de comedores a mostrar.
     * @var array
     */
    private $comedores;

    /**
     * Constructor.
     * @param array $config Configuración global
     * @param array $comedores Lista de comedores
     */
    public function __construct($config, $comedores) {
        $this->config = $config;
        $this->comedores = $comedores;
    }

    /**
     * Muestra el mapa con los comedores.
     * @return void
     */
    public function mostrar() {
        $script_comedores = '<script>var comedores = ' . json_encode($this->comedores) . ';</script>';
        include $this->config['dir_html'] . 'mapa.html';
    }
}
