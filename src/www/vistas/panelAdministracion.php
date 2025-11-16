<?php
class PanelAdministracionVista {
    private $config;
    private $comedores;
    public function __construct($config, $comedores) {
        $this->config = $config;
        $this->comedores = $comedores;
    }
    public function mostrar() {
        // Preparamos una lista de tarjetas HTML para cada comedor pendiente
        $tarjetas = [];
        foreach ($this->comedores as $comedor) {
            $tarjetas[] = '<div class="card" style="margin-bottom:1em;">'
                . '<strong>' . htmlspecialchars($comedor['nombre']) . '</strong><br>'
                . '<a href="index.php?controlador=admin&metodo=verSolicitud&id=' . $comedor['id_comedor'] . '" class="btn" style="margin-top:0.5em;">Ver datos</a>'
                . '</div>';
        }
        $noHayPendientes = empty($tarjetas);
        include $this->config['dir_html'] . 'panel_administracion.html';
    }
}
