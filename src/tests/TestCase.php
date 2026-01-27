<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Fix para tests que usan RefreshDatabase: crear roles si no existen
        // para evitar errores de Foreign Keys en Users
        if (\Illuminate\Support\Facades\Schema::hasTable('roles') && \App\Models\Role::count() === 0) {
            \App\Models\Role::create(['id_rol' => 'ciudadano', 'nombre' => 'Ciudadano']);
            \App\Models\Role::create(['id_rol' => 'gestor', 'nombre' => 'Gestor']);
            \App\Models\Role::create(['id_rol' => 'admin', 'nombre' => 'Administrador']);
        }
    }
}
