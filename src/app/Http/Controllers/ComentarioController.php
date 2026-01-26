<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComentarioController extends Controller
{
    /**
     * Muestra la lista de comentarios pendientes de moderación.
     */
    public function index()
    {
        $comentarios = Comentario::with(['user', 'comedor'])
            ->where('estado', 'pendiente')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/ModerarComentarios', [
            'comentarios' => $comentarios
        ]);
    }

    /**
     * Aprueba un comentario.
     */
    public function aprobar($id)
    {
        $comentario = Comentario::findOrFail($id);
        $comentario->update(['estado' => 'aprobado']);

        return back()->with('success', 'Comentario aprobado correctamente.');
    }

    /**
     * Rechaza un comentario.
     */
    public function rechazar($id)
    {
        $comentario = Comentario::findOrFail($id);
        $comentario->update(['estado' => 'rechazado']);

        return back()->with('success', 'Comentario rechazado.');
    }

    /**
     * Guarda un nuevo comentario (público).
     */
    public function store(Request $request)
    {
        $request->validate([
            'id_comedor' => 'required|exists:comedores,id_comedor',
            'texto' => 'required|string|max:1000',
        ]);

        Comentario::create([
            'user_id' => auth()->id(),
            'id_comedor' => $request->id_comedor,
            'texto' => $request->texto,
            'estado' => 'pendiente',
        ]);

        return back()->with('success', 'Tu comentario ha sido enviado y está pendiente de moderación.');
    }
}
