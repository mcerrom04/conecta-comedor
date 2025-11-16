<?php
require_once __DIR__ . '/bd.php';

class Usuario {
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
