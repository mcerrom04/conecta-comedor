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
        $comedor = Comedor::select('id_comedor', 'estado_actual', 'aforo_disponible', 'ultima_actualizacion', 'observaciones')
            ->findOrFail($id);

        return response()->json([
            'estado_actual' => $comedor->estado_actual,
            'aforo_disponible' => $comedor->aforo_disponible,
            'ultima_actualizacion' => $comedor->ultima_actualizacion?->toIso8601String(),
            'observaciones' => $comedor->observaciones,
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

        return redirect()->back()->with('success', 'Comedor rechazado');
    }

    /**
     * Mostrar formulario para registrar un nuevo comedor (Gestor)
     */
    public function create()
    {
        return Inertia::render('Gestor/RegistrarComedor');
    }

    /**
     * Guardar un nuevo comedor y vincularlo al gestor
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'direccion' => 'required|string|max:500',
            'latitud' => 'required|numeric',
            'longitud' => 'required|numeric',
            'telefono' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
            'descripcion' => 'nullable|string',
            'normas' => 'nullable|string',
        ]);

        // Por defecto, se crea como pendiente y no visible hasta que el admin lo apruebe
        $comedor = Comedor::create(array_merge($validated, [
            'estado' => 'pendiente',
            'visible' => false,
            'estado_actual' => 'cerrado',
        ]));

        // Vincular al usuario autenticado (Gestor)
        $request->user()->comedores()->attach($comedor->id_comedor);

        return redirect()->route('gestor.dashboard')
            ->with('success', 'Comedor registrado correctamente. Está pendiente de aprobación por el administrador.');
    }

    /**
     * Mostrar formulario para actualizar estado (HU-007)
     */
    public function editEstado(Comedor $comedor)
    {
        // Verificar que el gestor tiene permiso sobre este comedor
        if (!auth()->user()->comedores->contains($comedor->id_comedor)) {
            abort(403, 'No tienes permiso para gestionar este comedor.');
        }

        return Inertia::render('Gestor/ActualizarEstado', [
            'comedor' => $comedor
        ]);
    }

    /**
     * Actualizar estado del día (HU-007)
     */
    public function updateEstado(Request $request, Comedor $comedor)
    {
        // Verificar que el gestor tiene permiso sobre este comedor
        if (!auth()->user()->comedores->contains($comedor->id_comedor)) {
            abort(403);
        }

        $validated = $request->validate([
            'estado_actual' => 'required|in:abierto,cerrado,completo',
            'aforo_disponible' => 'nullable|integer|min:0',
            'observaciones' => 'nullable|string|max:500',
        ]);

        $comedor->update(array_merge($validated, [
            'ultima_actualizacion' => now()
        ]));

        return redirect()->route('gestor.dashboard')
            ->with('success', 'Estado del comedor actualizado correctamente.');
    }
}
