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
