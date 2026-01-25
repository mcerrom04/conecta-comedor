<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Comedor;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Usuario administrador
        User::create([
            'name' => 'Admin Conecta',
            'email' => 'admin@conecta.com',
            'password' => bcrypt('admin123'),
            'id_rol' => 'admin',
        ]);

        // Usuario gestor genérico (para pruebas de registro)
        $gestorGenerico = User::create([
            'name' => 'Gestor General',
            'email' => 'gestor@example.com',
            'password' => bcrypt('gestor123'),
            'id_rol' => 'gestor',
        ]);

        // Usuario ciudadano para pruebas
        User::create([
            'name' => 'Usuario Ciudadano',
            'email' => 'ciudadano@example.com',
            'password' => bcrypt('ciudadano123'),
            'id_rol' => 'ciudadano',
        ]);

        // Gestores específicos para comedores existentes
        $comedores = Comedor::all();
        foreach ($comedores as $index => $comedor) {
            $user = User::create([
                'name' => 'Gestor ' . $comedor->nombre,
                'email' => 'gestor' . ($index + 1) . '@conecta.com',
                'password' => bcrypt('gestor123'),
                'id_rol' => 'gestor',
            ]);
            
            // Vincular el comedor al gestor
            $user->comedores()->attach($comedor->id_comedor);
        }
    }
}
