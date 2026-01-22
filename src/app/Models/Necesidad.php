<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Necesidad extends Model
{
    protected $table = 'necesidades';
    protected $primaryKey = 'id_necesidad';

    protected $fillable = [
        'id_comedor',
        'tipo',
        'descripcion',
        'urgencia',
    ];

    /**
     * Comedor al que pertenece la necesidad
     */
    public function comedor(): BelongsTo
    {
        return $this->belongsTo(Comedor::class, 'id_comedor', 'id_comedor');
    }
}
