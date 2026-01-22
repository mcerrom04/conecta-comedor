<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comentario extends Model
{
    protected $table = 'comentarios';
    protected $primaryKey = 'id_comentario';

    protected $fillable = [
        'user_id',
        'id_comedor',
        'texto',
        'estado',
    ];

    /**
     * Usuario que escribió el comentario
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Comedor al que pertenece el comentario
     */
    public function comedor(): BelongsTo
    {
        return $this->belongsTo(Comedor::class, 'id_comedor', 'id_comedor');
    }

    /**
     * Scope para comentarios aprobados
     */
    public function scopeAprobados($query)
    {
        return $query->where('estado', 'aprobado');
    }

    /**
     * Scope para comentarios pendientes
     */
    public function scopePendientes($query)
    {
        return $query->where('estado', 'pendiente');
    }
}
