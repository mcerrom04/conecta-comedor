<?php

namespace Database\Seeders;

use App\Models\Comentario;
use App\Models\Comedor;
use App\Models\User;
use Illuminate\Database\Seeder;

class ComentarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ciudadano = User::where('id_rol', 'ciudadano')->first();
        if (!$ciudadano) return;

        $comedores = Comedor::take(5)->get();

        foreach ($comedores as $comedor) {
            // Un comentario aprobado
            Comentario::create([
                'user_id' => $ciudadano->id,
                'id_comedor' => $comedor->id_comedor,
                'texto' => 'Excelente servicio y comida muy buena en ' . $comedor->nombre,
                'estado' => 'aprobado',
            ]);

            // Un comentario pendiente
            Comentario::create([
                'user_id' => $ciudadano->id,
                'id_comedor' => $comedor->id_comedor,
                'texto' => '¿Cuál es el menú para mañana en ' . $comedor->nombre . '?',
                'estado' => 'pendiente',
            ]);
        }
    }
}
