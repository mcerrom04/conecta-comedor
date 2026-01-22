<?php
/**
 * Vista para mostrar la solicitud de un comedor.
 */
class ComedorSolicitudVista {
    /**
     * Configuración global de la aplicación.
     * @var array
     */
    private $config;

    /**
     * Datos del comedor solicitado.
     * @var array
     */
    private $comedor;

    /**
     * Constructor.
     * @param array $config Configuración global
     * @param array $comedor Datos del comedor
     */
    public function __construct($config, $comedor) {
        $this->config = $config;
        $this->comedor = $comedor;
    }

    /**
     * Muestra la solicitud del comedor y los botones de acción.
     * @return void
     */
    public function mostrar() {
        $comedor = $this->comedor;
        $html = '';
        if ($comedor) {
            $html .= '<div class="solicitud-datos">';
            $html .= '<p><strong>Nombre:</strong> ' . htmlspecialchars($comedor['nombre']) . '</p>';
            $html .= '<p><strong>Dirección:</strong> ' . htmlspecialchars($comedor['direccion']) . '</p>';
            $html .= '<p><strong>ID comedor:</strong> ' . htmlspecialchars($comedor['id_comedor']) . '</p>';
            $html .= '<p><strong>Teléfono:</strong> ' . htmlspecialchars($comedor['telefono']) . '</p>';
            $html .= '<p><strong>Normas:</strong> ' . htmlspecialchars($comedor['normas']) . '</p>';
            $html .= '</div>';
            $html .= '<div class="solicitud-actions">';
            $html .= '<form method="post" action="index.php?controlador=admin&metodo=aprobar">'
                . '<input type="hidden" name="id" value="' . $comedor['id_comedor'] . '">' 
                . '<button type="submit" class="btn-aprobar">Aprobar</button>'
                . '</form>';
            $html .= '<form method="post" action="index.php?controlador=admin&metodo=rechazar">'
                . '<input type="hidden" name="id" value="' . $comedor['id_comedor'] . '">' 
                . '<button type="submit" class="btn-rechazar">Rechazar</button>'
                . '</form>';
            $html .= '</div>';
        } else {
            $html = '<p>No se encontró la solicitud.</p>';
        }
        include $this->config['dir_html'] . 'comedor_solicitud.html';
    }
}
