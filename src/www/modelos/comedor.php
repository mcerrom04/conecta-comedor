<?php
require_once __DIR__ . '/bd.php';

class Comedor {
    public static function obtenerPendientes() {
        $bd = (new BD())->obtenerConexion();
        $stmt = $bd->prepare('SELECT * FROM comedores WHERE visible = 0');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function obtenerPorId($id) {
        $bd = (new BD())->obtenerConexion();
        $stmt = $bd->prepare('SELECT * FROM comedores WHERE id_comedor = ?');
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function aprobar($id) {
        $bd = (new BD())->obtenerConexion();
        $stmt = $bd->prepare('UPDATE comedores SET visible = 1 WHERE id_comedor = ?');
        $stmt->execute([$id]);
    }

    public static function rechazar($id) {
        $bd = (new BD())->obtenerConexion();
        $stmt = $bd->prepare('DELETE FROM comedores WHERE id_comedor = ?');
        $stmt->execute([$id]);
    }
}
