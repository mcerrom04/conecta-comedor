<?php
require_once __DIR__ . '/../modelos/usuario.php';

/**
 * Controlador para la autenticación de administradores.
 */
class Login {
    /**
     * Configuración global de la aplicación.
     * @var array
     */
    private $config;

    /**
     * Constructor. Inicia la sesión.
     * @param array $config Configuración global
     */
    public function __construct($config) {
        $this->config = $config;
        session_start();
    }

    /**
     * Muestra el formulario de login.
     * @return void
     */
    public function index() {
        $error = $_SESSION['login_error'] ?? '';
        unset($_SESSION['login_error']);
        require_once $this->config['dir_vistas'] . 'login.php';
        $vista = new LoginVista($this->config, $error);
        $vista->mostrar();
    }

    /**
     * Procesa el login del administrador.
     * @return void
     */
    public function autenticar() {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
        $usuario = Usuario::autenticarAdmin($email, $password);
        if ($usuario) {
            $_SESSION['admin'] = $usuario;
            header('Location: index.php?controlador=admin&metodo=panel');
            exit;
        } else {
            $_SESSION['login_error'] = 'Credenciales incorrectas o no es administrador.';
            header('Location: index.php?controlador=login&metodo=index');
            exit;
        }
    }

    /**
     * Cierra la sesión del usuario.
     * @return void
     */
    public function logout() {
        session_destroy();
        header('Location: index.php?controlador=login&metodo=index');
        exit;
    }
}
