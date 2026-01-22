<?php
require_once __DIR__ . '/bd.php';

/**
 * Modelo para operaciones relacionadas con usuarios.
 */
class Usuario {
    /**
     * Autentica a un usuario administrador.
     * @param string $email Email del usuario
     * @param string $password Contraseña en texto plano
     * @return array|false Datos del usuario si es válido, false si no
     */
    public static function autenticarAdmin($email, $password) {
        $bd = (new BD())->obtenerConexion();
        $stmt = $bd->prepare('SELECT * FROM usuarios WHERE email = ? AND id_rol = ? LIMIT 1');
        $stmt->execute([$email, 'admin']);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($usuario && password_verify($password, $usuario['password'])) {
            return $usuario;
        }
        return false;
    }
}
