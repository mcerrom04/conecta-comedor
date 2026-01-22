<?php
/**
 * Vista para mostrar el panel de administración de comedores.
 */
class PanelAdministracionVista {
    /**
     * Configuración global de la aplicación.
     * @var array
     */
    private $config;

    /**
     * Lista de comedores pendientes.
     * @var array
     */
    private $comedores;

    /**
     * Constructor.
     * @param array $config Configuración global
     * @param array $comedores Lista de comedores pendientes
     */
    public function __construct($config, $comedores) {
        $this->config = $config;
        $this->comedores = $comedores;
    }

    /**
     * Muestra el panel de administración con las tarjetas de comedores pendientes.
     * @return void
     */
    public function mostrar() {
        // Preparamos una lista de tarjetas HTML para cada comedor pendiente
        $tarjetas = [];
        foreach ($this->comedores as $comedor) {
                $tarjetas[] = '<a href="index.php?controlador=admin&metodo=verSolicitud&id=' . $comedor['id_comedor'] . '" style="text-decoration:none;">'
                    . '<div class="card">'
                    . '<span class="card-title">' . htmlspecialchars($comedor['nombre']) . '</span>'
                    . '</div>'
                    . '</a>';
        }
        $noHayPendientes = empty($tarjetas);
        include $this->config['dir_html'] . 'panel_administracion.html';
    }
}
