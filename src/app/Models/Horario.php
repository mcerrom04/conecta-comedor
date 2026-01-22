<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Horario extends Model
{
    protected $table = 'horarios';
    protected $primaryKey = 'id_horario';

    protected $fillable = [
        'id_comedor',
        'dia_semana',
        'hora_apertura',
        'hora_cierre',
        'tipo_servicio',
    ];

    protected $casts = [
        'hora_apertura' => 'datetime:H:i:s',
        'hora_cierre' => 'datetime:H:i:s',
    ];

    /**
     * Comedor al que pertenece el horario
     */
    public function comedor(): BelongsTo
    {
        return $this->belongsTo(Comedor::class, 'id_comedor', 'id_comedor');
    }
}
