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
            'name' => 'Administrador',
            'email' => 'admin@admin.com',
            'password' => bcrypt('admin123'),
            'id_rol' => 'admin',
        ]);

        // Usuario gestor genérico
        $gestor = User::create([
            'name' => 'Gestor de Prueba',
            'email' => 'gestor@gestor.com',
            'password' => bcrypt('gestor123'),
            'id_rol' => 'gestor',
        ]);

        $gestorComedores = Comedor::whereIn('nombre', [
            'Comedor Central Madrid',
            'Comedor La Arboleda',
            'Comedor Merida Centro',
        ])->pluck('id_comedor');

        $gestor->comedores()->attach($gestorComedores);

        // Usuario ciudadano para pruebas
        User::create([
            'name' => 'Ciudadano de Prueba',
            'email' => 'user@user.com',
            'password' => bcrypt('user123'),
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
