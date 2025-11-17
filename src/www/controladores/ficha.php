<?php
// src/www/controladores/ficha.php

/**
 * Controlador para mostrar la ficha de un comedor.
 */
class Ficha {
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
     * Muestra la ficha de un comedor específico.
     * @return void
     */
    public function ver() {
        require_once __DIR__ . '/../modelos/comedor.php';
        require_once __DIR__ . '/../vistas/ficha_comedor.php';
        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        $comedor = Comedor::obtenerPorId($id);
        $horarios = Comedor::obtenerHorarios($id);
        $vista = new FichaComedorVista($this->config, $comedor, $horarios);
        $vista->mostrar();
    }
}
