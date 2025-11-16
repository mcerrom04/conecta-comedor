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
        $html .= '<button class="btn-action" title="Cómo llegar" aria-label="Cómo llegar">';
        $html .= '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
        $html .= '</button>';
        $html .= '</div>';
        
        $html .= '<div class="info-item">';
        $html .= '<span class="info-label">Teléfono:</span>';
        $html .= '<span class="info-value">' . htmlspecialchars($comedor['telefono']) . '</span>';
        $html .= '<button class="btn-action" title="Llamar" aria-label="Llamar">';
        $html .= '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
        $html .= '</button>';
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
