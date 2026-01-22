<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ComedorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Comedores visibles repartidos por Madrid
        $comedores = [
            [
                'nombre' => 'Comedor Central',
                'direccion' => 'Calle Mayor 1, Madrid',
                'latitud' => 40.416775,
                'longitud' => -3.703790,
                'telefono' => '911234567',
                'normas' => 'Normas generales de convivencia',
                'estado' => 'activo',
                'visible' => true,
            ],
            [
                'nombre' => 'Comedor Norte',
                'direccion' => 'Calle Arturo Soria 100, Madrid',
                'latitud' => 40.4650,
                'longitud' => -3.6540,
                'telefono' => '911111112',
                'normas' => 'Normas básicas',
                'estado' => 'activo',
                'visible' => true,
            ],
            [
                'nombre' => 'Comedor Sur',
                'direccion' => 'Avenida de Andalucía 50, Madrid',
                'latitud' => 40.3700,
                'longitud' => -3.7000,
                'telefono' => '911111113',
                'normas' => 'Normas básicas',
                'estado' => 'activo',
                'visible' => true,
            ],
            [
                'nombre' => 'Comedor Este',
                'direccion' => 'Calle Alcalá 600, Madrid',
                'latitud' => 40.4370,
                'longitud' => -3.6150,
                'telefono' => '911111114',
                'normas' => 'Normas básicas',
                'estado' => 'activo',
                'visible' => true,
            ],
            [
                'nombre' => 'Comedor Oeste',
                'direccion' => 'Calle Princesa 89, Madrid',
                'latitud' => 40.4300,
                'longitud' => -3.7200,
                'telefono' => '911111115',
                'normas' => 'Normas básicas',
                'estado' => 'activo',
                'visible' => true,
            ],
            [
                'nombre' => 'Comedor Chamartín',
                'direccion' => 'Plaza Castilla 1, Madrid',
                'latitud' => 40.4675,
                'longitud' => -3.6880,
                'telefono' => '911111116',
                'normas' => 'Normas básicas',
                'estado' => 'activo',
                'visible' => true,
            ],
            [
                'nombre' => 'Comedor Vallecas',
                'direccion' => 'Avenida de la Albufera 200, Madrid',
                'latitud' => 40.3910,
                'longitud' => -3.6580,
                'telefono' => '911111117',
                'normas' => 'Normas básicas',
                'estado' => 'activo',
                'visible' => true,
            ],
            [
                'nombre' => 'Comedor Carabanchel',
                'direccion' => 'Calle General Ricardos 150, Madrid',
                'latitud' => 40.3840,
                'longitud' => -3.7450,
                'telefono' => '911111118',
                'normas' => 'Normas básicas',
                'estado' => 'activo',
                'visible' => true,
            ],
            [
                'nombre' => 'Comedor Tetuán',
                'direccion' => 'Calle Bravo Murillo 300, Madrid',
                'latitud' => 40.4600,
                'longitud' => -3.7030,
                'telefono' => '911111119',
                'normas' => 'Normas básicas',
                'estado' => 'activo',
                'visible' => true,
            ],
            [
                'nombre' => 'Comedor Retiro',
                'direccion' => 'Calle Retiro 50, Madrid',
                'latitud' => 40.4210,
                'longitud' => -3.6740,
                'telefono' => '911111120',
                'normas' => 'Normas básicas',
                'estado' => 'activo',
                'visible' => true,
            ],
            // Comedores NO visibles (pendientes de aprobación)
            [
                'nombre' => 'Comedor Usera',
                'direccion' => 'Calle Marcelo Usera 150, Madrid',
                'latitud' => 40.3800,
                'longitud' => -3.7070,
                'telefono' => '911111130',
                'normas' => 'Normas básicas',
                'estado' => 'pendiente',
                'visible' => false,
            ],
            [
                'nombre' => 'Comedor Barajas',
                'direccion' => 'Avenida Logroño 300, Madrid',
                'latitud' => 40.4730,
                'longitud' => -3.5770,
                'telefono' => '911111131',
                'normas' => 'Normas básicas',
                'estado' => 'pendiente',
                'visible' => false,
            ],
        ];

        foreach ($comedores as $comedor) {
            DB::table('comedores')->insert($comedor);
        }

        // Horarios de prueba
        $horarios = [
            // Comedor Central (id_comedor: 1)
            ['id_comedor' => 1, 'dia_semana' => 'lunes', 'hora_apertura' => '12:00:00', 'hora_cierre' => '15:00:00', 'tipo_servicio' => 'comida'],
            ['id_comedor' => 1, 'dia_semana' => 'miercoles', 'hora_apertura' => '12:00:00', 'hora_cierre' => '15:00:00', 'tipo_servicio' => 'comida'],
            ['id_comedor' => 1, 'dia_semana' => 'viernes', 'hora_apertura' => '12:00:00', 'hora_cierre' => '15:00:00', 'tipo_servicio' => 'comida'],
            
            // Comedor Norte (id_comedor: 2)
            ['id_comedor' => 2, 'dia_semana' => 'martes', 'hora_apertura' => '13:00:00', 'hora_cierre' => '16:00:00', 'tipo_servicio' => 'comida'],
            ['id_comedor' => 2, 'dia_semana' => 'jueves', 'hora_apertura' => '13:00:00', 'hora_cierre' => '16:00:00', 'tipo_servicio' => 'comida'],
            
            // Comedor Sur (id_comedor: 3)
            ['id_comedor' => 3, 'dia_semana' => 'lunes', 'hora_apertura' => '11:30:00', 'hora_cierre' => '14:30:00', 'tipo_servicio' => 'comida'],
            ['id_comedor' => 3, 'dia_semana' => 'viernes', 'hora_apertura' => '11:30:00', 'hora_cierre' => '14:30:00', 'tipo_servicio' => 'comida'],
            
            // Comedor Este (id_comedor: 4)
            ['id_comedor' => 4, 'dia_semana' => 'miercoles', 'hora_apertura' => '12:30:00', 'hora_cierre' => '15:30:00', 'tipo_servicio' => 'comida'],
            
            // Comedor Oeste (id_comedor: 5)
            ['id_comedor' => 5, 'dia_semana' => 'sabado', 'hora_apertura' => '13:00:00', 'hora_cierre' => '16:00:00', 'tipo_servicio' => 'comida'],
            
            // Comedor Chamartín (id_comedor: 6)
            ['id_comedor' => 6, 'dia_semana' => 'domingo', 'hora_apertura' => '12:00:00', 'hora_cierre' => '15:00:00', 'tipo_servicio' => 'comida'],
            
            // Comedor Vallecas (id_comedor: 7)
            ['id_comedor' => 7, 'dia_semana' => 'lunes', 'hora_apertura' => '12:00:00', 'hora_cierre' => '15:00:00', 'tipo_servicio' => 'comida'],
            ['id_comedor' => 7, 'dia_semana' => 'martes', 'hora_apertura' => '12:00:00', 'hora_cierre' => '15:00:00', 'tipo_servicio' => 'comida'],
            
            // Comedor Carabanchel (id_comedor: 8)
            ['id_comedor' => 8, 'dia_semana' => 'jueves', 'hora_apertura' => '13:00:00', 'hora_cierre' => '16:00:00', 'tipo_servicio' => 'comida'],
            
            // Comedor Tetuán (id_comedor: 9)
            ['id_comedor' => 9, 'dia_semana' => 'viernes', 'hora_apertura' => '12:00:00', 'hora_cierre' => '15:00:00', 'tipo_servicio' => 'comida'],
            
            // Comedor Retiro (id_comedor: 10)
            ['id_comedor' => 10, 'dia_semana' => 'sabado', 'hora_apertura' => '13:00:00', 'hora_cierre' => '16:00:00', 'tipo_servicio' => 'comida'],
        ];

        foreach ($horarios as $horario) {
            DB::table('horarios')->insert($horario);
        }
    }
}
