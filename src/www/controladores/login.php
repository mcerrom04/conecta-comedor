<?php
require_once __DIR__ . '/../modelos/usuario.php';

class Login {
    private $config;
    public function __construct($config) {
        $this->config = $config;
        session_start();
    }

    // Muestra el formulario de login
    public function index() {
        $error = $_SESSION['login_error'] ?? '';
        unset($_SESSION['login_error']);
        require_once $this->config['dir_vistas'] . 'login.php';
        $vista = new LoginVista($this->config, $error);
        $vista->mostrar();
    }

    // Procesa el login
    public function autenticar() {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
        $usuario = Usuario::autenticarAdmin($email, $password);
        if ($usuario) {
            $_SESSION['admin'] = $usuario;
            header('Location: index.php?controlador=login&metodo=dashboard');
            exit;
        } else {
            $_SESSION['login_error'] = 'Credenciales incorrectas o no es administrador.';
            header('Location: index.php?controlador=login&metodo=index');
            exit;
        }
    }

    // Dashboard simple para admin autenticado
    public function dashboard() {
        if (!isset($_SESSION['admin'])) {
            header('Location: index.php?controlador=login&metodo=index');
            exit;
        }
        echo '<h2>Bienvenido, Administrador</h2>';
        echo '<a href="index.php?controlador=login&metodo=logout">Cerrar sesión</a>';
    }

    // Cerrar sesión
    public function logout() {
        session_destroy();
        header('Location: index.php?controlador=login&metodo=index');
        exit;
    }
}
