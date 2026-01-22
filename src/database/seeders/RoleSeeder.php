<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->insert([
            [
                'id_rol' => 'admin',
                'nombre' => 'Administrador',
                'desc_rol' => 'Administrador del sistema'
            ],
            [
                'id_rol' => 'gestor',
                'nombre' => 'Gestor',
                'desc_rol' => 'Gestor de comedores sociales'
            ],
            [
                'id_rol' => 'ciudadano',
                'nombre' => 'Ciudadano',
                'desc_rol' => 'Usuario ciudadano'
            ]
        ]);
    }
}
