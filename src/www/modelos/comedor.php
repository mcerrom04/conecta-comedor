<?php
require_once __DIR__ . '/bd.php';

/**
 * Modelo para operaciones relacionadas con comedores.
 */
class Comedor {
    /**
     * Obtiene los comedores visibles en el sistema.
     * @return array Lista de comedores visibles
     */
    public static function obtenerVisibles() {
        $bd = (new BD())->obtenerConexion();
        $stmt = $bd->prepare('SELECT id_comedor, nombre, latitud, longitud FROM comedores WHERE visible = 1');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Obtiene los comedores pendientes de aprobación.
     * @return array Lista de comedores pendientes
     */
    public static function obtenerPendientes() {
        $bd = (new BD())->obtenerConexion();
        $stmt = $bd->prepare('SELECT * FROM comedores WHERE visible = 0');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Obtiene los datos de un comedor por su ID.
     * @param int $id ID del comedor
     * @return array|null Datos del comedor o null si no existe
     */
    public static function obtenerPorId($id) {
        $bd = (new BD())->obtenerConexion();
        $stmt = $bd->prepare('SELECT * FROM comedores WHERE id_comedor = ?');
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Obtiene los horarios de un comedor.
     * @param int $id_comedor ID del comedor
     * @return array Lista de horarios
     */
    public static function obtenerHorarios($id_comedor) {
        $bd = (new BD())->obtenerConexion();
        $stmt = $bd->prepare('SELECT dia, hora_ini, hora_fin FROM horarios WHERE id_comedor = ? ORDER BY FIELD(dia, "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo")');
        $stmt->execute([$id_comedor]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Aprueba un comedor (lo hace visible).
     * @param int $id ID del comedor
     * @return void
     */
    public static function aprobar($id) {
        $bd = (new BD())->obtenerConexion();
        $stmt = $bd->prepare('UPDATE comedores SET visible = 1 WHERE id_comedor = ?');
        $stmt->execute([$id]);
    }

    /**
     * Rechaza (elimina) un comedor.
     * @param int $id ID del comedor
     * @return void
     */
    public static function rechazar($id) {
        $bd = (new BD())->obtenerConexion();
        $stmt = $bd->prepare('DELETE FROM comedores WHERE id_comedor = ?');
        $stmt->execute([$id]);
    }
}
