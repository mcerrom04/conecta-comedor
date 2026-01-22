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
}
