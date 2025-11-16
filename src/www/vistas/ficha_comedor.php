<?php
// src/www/vistas/ficha_comedor.php
class FichaComedorVista {
    private $config;
    private $comedor;
    private $tablaHorarios;
    public function __construct($config, $comedor, $horarios) {
        $this->config = $config;
        $this->comedor = $comedor;
        $this->tablaHorarios = $this->generarTablaHorarios($horarios);
    }
    private function generarTablaHorarios($horarios) {
        if (empty($horarios)) {
            return '<p>No hay horarios registrados.</p>';
        }
        $html = '<table border="1" cellpadding="6" style="border-collapse:collapse;"><thead><tr><th>Día</th><th>Apertura</th><th>Cierre</th></tr></thead><tbody>';
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
        $comedor = $this->comedor;
        $tablaHorarios = $this->tablaHorarios;
        include $this->config['dir_html'] . 'ficha_comedor.html';
    }
}
