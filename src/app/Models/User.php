<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'id_rol',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Rol del usuario
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'id_rol', 'id_rol');
    }

    /**
     * Comedores gestionados por el usuario
     */
    public function comedores(): BelongsToMany
    {
        return $this->belongsToMany(Comedor::class, 'comedor_user', 'user_id', 'id_comedor');
    }

    /**
     * Comedor gestionado (Para compatibilidad con lÃ³gica anterior si solo tiene uno)
     */
    public function comedor()
    {
        return $this->comedores()->first();
    }

    /**
     * Comentarios del usuario
     */
    public function comentarios(): HasMany
    {
        return $this->hasMany(Comentario::class, 'user_id');
    }

    /**
     * Verificar si el usuario es administrador
     */
    public function isAdmin(): bool
    {
        return $this->id_rol === 'admin';
    }

    /**
     * Verificar si el usuario es gestor
     */
    public function isGestor(): bool
    {
        return $this->id_rol === 'gestor';
    }

    /**
     * Verificar si el usuario es ciudadano
     */
    public function isCiudadano(): bool
    {
        return $this->id_rol === 'ciudadano';
    }
}
