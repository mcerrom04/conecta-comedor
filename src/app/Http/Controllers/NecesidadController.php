<?php

namespace App\Http\Controllers;

use App\Models\Comedor;
use App\Models\Necesidad;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NecesidadController extends Controller
{
    /**
     * Mostrar la gestión de necesidades de un comedor
     */
    public function index(Comedor $comedor)
    {
        // Verificar permisos
        if (!auth()->user()->comedores->contains($comedor->id_comedor)) {
            abort(403);
        }

        return Inertia::render('Gestor/GestionarNecesidades', [
            'comedor' => $comedor->load('necesidades'),
        ]);
    }

    /**
     * Guardar una nueva necesidad
     */
    public function store(Request $request, Comedor $comedor)
    {
        if (!auth()->user()->comedores->contains($comedor->id_comedor)) {
            abort(403);
        }

        $validated = $request->validate([
            'tipo' => 'required|string|max:100', // Ejemplo: Alimentos, Higiene, Voluntariado
            'descripcion' => 'required|string|max:500',
            'urgencia' => 'required|in:baja,media,alta',
        ]);

        $comedor->necesidades()->create($validated);

        return redirect()->back()->with('success', 'Necesidad publicada correctamente.');
    }

    /**
     * Eliminar una necesidad
     */
    public function destroy(Comedor $comedor, Necesidad $necesidad)
    {
        if (!auth()->user()->comedores->contains($comedor->id_comedor)) {
            abort(403);
        }

        if ($necesidad->id_comedor !== $comedor->id_comedor) {
            abort(404);
        }

        $necesidad->delete();

        return redirect()->back()->with('success', 'Necesidad eliminada correctamente.');
    }
}
