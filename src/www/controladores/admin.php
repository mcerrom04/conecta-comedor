<?php
require_once __DIR__ . '/../modelos/comedor.php';

/**
 * Controlador para la administración de comedores.
 * Gestiona el panel de administración, aprobación y rechazo de solicitudes.
 */
class Admin {
    /**
     * Configuración global de la aplicación.
     * @var array
     */
    private $config;

    /**
     * Constructor. Inicia sesión y verifica acceso de administrador.
     * @param array $config Configuración global
     */
    public function __construct($config) {
        $this->config = $config;
        session_start();
        if (!isset($_SESSION['admin'])) {
            header('Location: index.php?controlador=login&metodo=index');
            exit;
        }
    }

    /**
     * Muestra el panel principal con la lista de comedores pendientes.
     * @return void
     */
    public function panel() {
        $comedores = Comedor::obtenerPendientes();
        require_once $this->config['dir_vistas'] . 'panelAdministracion.php';
        $vista = new PanelAdministracionVista($this->config, $comedores);
        $vista->mostrar();
    }

    /**
     * Muestra el detalle de una solicitud de comedor.
     * @return void
     */
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

    /**
     * Aprueba una solicitud de comedor.
     * @return void
     */
    public function aprobar() {
        $id = $_POST['id'] ?? null;
        if ($id) {
            Comedor::aprobar($id);
        }
        header('Location: index.php?controlador=admin&metodo=panel');
        exit;
    }

    /**
     * Rechaza una solicitud de comedor.
     * @return void
     */
    public function rechazar() {
        $id = $_POST['id'] ?? null;
        if ($id) {
            Comedor::rechazar($id);
        }
        header('Location: index.php?controlador=admin&metodo=panel');
        exit;
    }
}
