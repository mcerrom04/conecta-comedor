<?php
// src/www/vistas/ficha_comedor.php
class FichaComedorVista {
    private $config;
    private $nombreComedor;
    private $datosGenerales;
    private $tablaHorarios;
    
    public function __construct($config, $comedor, $horarios) {
        $this->config = $config;
        $this->nombreComedor = htmlspecialchars($comedor['nombre']);
        $this->datosGenerales = $this->generarDatosGenerales($comedor);
        $this->tablaHorarios = $this->generarTablaHorarios($horarios);
    }
    
    private function generarDatosGenerales($comedor) {
        $html = '<div class="info-item">';
        $html .= '<span class="info-label">Dirección:</span>';
        $html .= '<span class="info-value">' . htmlspecialchars($comedor['direccion']) . '</span>';
        $html .= '</div>';
        
        $html .= '<div class="info-item">';
        $html .= '<span class="info-label">Teléfono:</span>';
        $html .= '<span class="info-value">' . htmlspecialchars($comedor['telefono']) . '</span>';
        $html .= '</div>';
        
        $html .= '<div class="info-item">';
        $html .= '<span class="info-label">Normas:</span>';
        $html .= '<span class="info-value">' . htmlspecialchars($comedor['normas']) . '</span>';
        $html .= '</div>';
        
        return $html;
    }
    
    private function generarTablaHorarios($horarios) {
        if (empty($horarios)) {
            return '<p>No hay horarios registrados.</p>';
        }
        $html = '<table><thead><tr><th>Día</th><th>Apertura</th><th>Cierre</th></tr></thead><tbody>';
        foreach ($horarios as $h) {
            $html .= '<tr>';
            $html .= '<td>' . htmlspecialchars($h['dia']) . '</td>';
            $html .= '<td>' . htmlspecialchars(substr($h['hora_ini'],0,5)) . '</td>';
            $html .= '<td>' . htmlspecialchars(substr($h['hora_fin'],0,5)) . '</td>';
            $html .= '</tr>';
        }
        $html .= '</tbody></table>';
        return $html;
    }
    
    public function mostrar() {
        $nombreComedor = $this->nombreComedor;
        $datosGenerales = $this->datosGenerales;
        $tablaHorarios = $this->tablaHorarios;
        include $this->config['dir_html'] . 'ficha_comedor.html';
    }
}
