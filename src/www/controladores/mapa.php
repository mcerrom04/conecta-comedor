<?php
// src/www/controladores/mapa.php
require_once __DIR__ . '/../modelos/comedor.php';

/**
 * Controlador para mostrar el mapa de comedores.
 */
class Mapa {
    /**
     * Configuración global de la aplicación.
     * @var array
     */
    private $config;

    /**
     * Constructor.
     * @param array $config Configuración global
     */
    public function __construct($config) {
        $this->config = $config;
    }

    /**
     * Muestra el mapa con los comedores visibles.
     * @return void
     */
    public function index() {
        $comedores = Comedor::obtenerVisibles();
        require_once $this->config['dir_vistas'] . 'mapa.php';
        $vista = new MapaVista($this->config, $comedores);
        $vista->mostrar();
    }
}
