<?php
class ComedorSolicitudVista {
    private $config;
    private $comedor;
    public function __construct($config, $comedor) {
        $this->config = $config;
        $this->comedor = $comedor;
    }
    public function mostrar() {
        $comedor = $this->comedor;
        $html = '';
        if ($comedor) {
            $html .= '<p><strong>Nombre:</strong> ' . htmlspecialchars($comedor['nombre']) . '</p>';
            $html .= '<p><strong>Dirección:</strong> ' . htmlspecialchars($comedor['direccion']) . '</p>';
            $html .= '<p><strong>ID comedor:</strong> ' . htmlspecialchars($comedor['id_comedor']) . '</p>';
            $html .= '<p><strong>Teléfono:</strong> ' . htmlspecialchars($comedor['telefono']) . '</p>';
            $html .= '<p><strong>Normas:</strong> ' . htmlspecialchars($comedor['normas']) . '</p>';
            $html .= '<form method="post" action="index.php?controlador=admin&metodo=aprobar" style="display:inline;">'
                . '<input type="hidden" name="id" value="' . $comedor['id_comedor'] . '">' 
                . '<button type="submit" class="btn">Aprobar</button>'
                . '</form>';
            $html .= '<form method="post" action="index.php?controlador=admin&metodo=rechazar" style="display:inline;">'
                . '<input type="hidden" name="id" value="' . $comedor['id_comedor'] . '">' 
                . '<button type="submit" class="btn" style="background:#DD4B39;">Rechazar</button>'
                . '</form>';
        } else {
            $html = '<p>No se encontró la solicitud.</p>';
        }
        include $this->config['dir_html'] . 'comedor_solicitud.html';
    }
}
