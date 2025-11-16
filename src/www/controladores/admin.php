<?php
require_once __DIR__ . '/../modelos/comedor.php';

class Admin {
    private $config;
    public function __construct($config) {
        $this->config = $config;
        session_start();
        if (!isset($_SESSION['admin'])) {
            header('Location: index.php?controlador=login&metodo=index');
            exit;
        }
    }

    // Panel principal: lista de comedores pendientes
    public function panel() {
        $comedores = Comedor::obtenerPendientes();
        require_once $this->config['dir_vistas'] . 'panelAdministracion.php';
        $vista = new PanelAdministracionVista($this->config, $comedores);
        $vista->mostrar();
    }

    // Ver detalle de solicitud de comedor
    public function verSolicitud() {
        $id = $_GET['id'] ?? null;
        if (!$id) {
            header('Location: index.php?controlador=admin&metodo=panel');
            exit;
        }
        $comedor = Comedor::obtenerPorId($id);
        require_once $this->config['dir_vistas'] . 'comedorSolicitud.php';
        $vista = new ComedorSolicitudVista($this->config, $comedor);
        $vista->mostrar();
    }

    // Aprobar comedor
    public function aprobar() {
        $id = $_POST['id'] ?? null;
        if ($id) {
            Comedor::aprobar($id);
        }
        header('Location: index.php?controlador=admin&metodo=panel');
        exit;
    }

    // Rechazar comedor
    public function rechazar() {
        $id = $_POST['id'] ?? null;
        if ($id) {
            Comedor::rechazar($id);
        }
        header('Location: index.php?controlador=admin&metodo=panel');
        exit;
    }
}
