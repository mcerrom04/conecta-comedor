<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Comedor extends Model
{
    protected $table = 'comedores';
    protected $primaryKey = 'id_comedor';

    protected $fillable = [
        'nombre',
        'direccion',
        'latitud',
        'longitud',
        'telefono',
        'normas',
        'estado',
        'visible',
        'estado_actual',
        'aforo_disponible',
        'observaciones',
        'ultima_actualizacion',
    ];

    protected $casts = [
        'visible' => 'boolean',
        'latitud' => 'decimal:6',
        'longitud' => 'decimal:6',
        'aforo_disponible' => 'integer',
        'ultima_actualizacion' => 'datetime',
    ];

    /**
     * Horarios del comedor
     */
    public function horarios(): HasMany
    {
        return $this->hasMany(Horario::class, 'id_comedor', 'id_comedor');
    }

    /**
     * Necesidades del comedor
     */
    public function necesidades(): HasMany
    {
        return $this->hasMany(Necesidad::class, 'id_comedor', 'id_comedor');
    }

    /**
     * Comentarios del comedor
     */
    public function comentarios(): HasMany
    {
        return $this->hasMany(Comentario::class, 'id_comedor', 'id_comedor');
    }

    /**
     * Gestores del comedor
     */
    public function gestores(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'comedor_user', 'id_comedor', 'user_id');
    }
}
