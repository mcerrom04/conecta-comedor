<?php

/**
 * Vista para mostrar el formulario de login.
 */
class LoginVista {
    /**
     * Mensaje de error de login.
     * @var string
     */
    private $error;

    /**
     * Configuración global de la aplicación.
     * @var array
     */
    private $config;

    /**
     * Constructor.
     * @param array $config Configuración global
     * @param string $error Mensaje de error (opcional)
     */
    public function __construct($config, $error = '') {
        $this->config = $config;
        $this->error = $error;
    }

    /**
     * Muestra el formulario de login.
     * @return void
     */
    public function mostrar() {
        $error = $this->error;
        include $this->config['dir_html'] . 'login.html';
    }
}
