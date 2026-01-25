<?php

namespace App\Http\Controllers;

use App\Models\Comedor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComedorController extends Controller
{
    /**
     * Mostrar el mapa con todos los comedores activos y visibles
     */
    public function mapa()
    {
        $comedores = Comedor::where('estado', 'activo')
            ->where('visible', true)
            ->with(['horarios'])
            ->get();

        return Inertia::render('Mapa/Index', [
            'comedores' => $comedores,
        ]);
    }

    /**
     * Mostrar la ficha detallada de un comedor
     */
    public function show($id)
    {
        $comedor = Comedor::with(['horarios', 'necesidades', 'comentarios.user'])
            ->findOrFail($id);

        return Inertia::render('Comedor/Ficha', [
            'comedor' => $comedor,
        ]);
    }

    /**
     * Obtener estado actual y aforo disponible (JSON)
     */
    public function estado($id)
    {
        $comedor = Comedor::select('id_comedor', 'estado_actual', 'aforo_disponible', 'ultima_actualizacion')
            ->findOrFail($id);

        return response()->json([
            'estado_actual' => $comedor->estado_actual,
            'aforo_disponible' => $comedor->aforo_disponible,
            'ultima_actualizacion' => $comedor->ultima_actualizacion?->toIso8601String(),
        ]);
    }

    /**
     * Listar comedores pendientes de aprobación (Admin)
     */
    public function pendientes()
    {
        $comedores = Comedor::where('estado', 'pendiente')
            ->with(['horarios'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/ComedoresPendientes', [
            'comedores' => $comedores,
        ]);
    }

    /**
     * Aprobar un comedor pendiente
     */
    public function aprobar($id)
    {
        $comedor = Comedor::findOrFail($id);
        
        if ($comedor->estado !== 'pendiente') {
            return redirect()->back()->with('error', 'Este comedor ya ha sido procesado');
        }

        $comedor->update([
            'estado' => 'activo',
            'visible' => true,
        ]);

        return redirect()->back()->with('success', 'Comedor aprobado correctamente');
    }

    /**
     * Rechazar un comedor pendiente
     */
    public function rechazar(Request $request, $id)
    {
        $comedor = Comedor::findOrFail($id);
        
        if ($comedor->estado !== 'pendiente') {
            return redirect()->back()->with('error', 'Este comedor ya ha sido procesado');
        }

        $comedor->update([
            'estado' => 'rechazado',
            'visible' => false,
        ]);

        // Aquí se podría enviar email de notificación al gestor
        // TODO: Implementar notificación por email (TT-S3-011)

        return redirect()->back()->with('success', 'Comedor rechazado');
    }
}
