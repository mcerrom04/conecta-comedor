<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Comedor;
use App\Models\Horario;
use Inertia\Inertia;

class HorarioController extends Controller
{
    /**
     * Mostrar la gestiÃ³n de horarios de un comedor
     */
    public function index(Comedor $comedor)
    {
        // Verificar permisos
        if (!auth()->user()->comedores->contains($comedor->id_comedor)) {
            abort(403);
        }

        return Inertia::render('Gestor/GestionarHorarios', [
            'comedor' => $comedor->load('horarios'),
        ]);
    }

    /**
     * Guardar un nuevo horario
     */
    public function store(Request $request, Comedor $comedor)
    {
        if (!auth()->user()->comedores->contains($comedor->id_comedor)) {
            abort(403);
        }

        $validated = $request->validate([
            'dia_semana' => 'required|in:lunes,martes,miercoles,jueves,viernes,sabado,domingo',
            'hora_apertura' => 'required|date_format:H:i',
            'hora_cierre' => 'required|date_format:H:i|after:hora_apertura',
            'tipo_servicio' => 'nullable|in:desayuno,comida,cena',
        ]);

        $comedor->horarios()->create($validated);

        return redirect()->back()->with('success', 'Horario aÃ±adido correctamente.');
    }

    /**
     * Eliminar un horario
     */
    public function destroy(Comedor $comedor, Horario $horario)
    {
        if (!auth()->user()->comedores->contains($comedor->id_comedor)) {
            abort(403);
        }

        // Asegurar que el horario pertenece al comedor
        if ($horario->id_comedor !== $comedor->id_comedor) {
            abort(404);
        }

        $horario->delete();

        return redirect()->back()->with('success', 'Horario eliminado correctamente.');
    }
}
