<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Comedor;
use App\Models\Necesidad;

class ComedorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Comedores en Madrid
        $comedor1 = Comedor::create([
            'nombre' => 'Comedor Central Madrid',
            'direccion' => 'Calle Mayor 1, Madrid',
            'latitud' => 40.416775,
            'longitud' => -3.703790,
            'telefono' => '911234567',
            'email' => 'central@comedores.madrid',
            'descripcion' => 'Comedor social en el centro de Madrid. Ofrecemos comidas diarias y atención integral.',
            'normas' => 'Respetar turnos, mantener limpieza, no consumir alcohol',
            'estado' => 'activo',
            'estado_actual' => 'abierto',
            'aforo_disponible' => 80,
            'ultima_actualizacion' => now()->subMinutes(3),
            'visible' => true,
        ]);

        $comedor2 = Comedor::create([
            'nombre' => 'Comedor Norte',
            'direccion' => 'Calle Arturo Soria 100, Madrid',
            'latitud' => 40.4650,
            'longitud' => -3.6540,
            'telefono' => '911111112',
            'email' => 'norte@comedores.madrid',
            'descripcion' => 'Comedor social en zona norte.',
            'normas' => 'Normas básicas de convivencia',
            'estado' => 'activo',
            'estado_actual' => 'cerrado',
            'aforo_disponible' => 0,
            'ultima_actualizacion' => now()->subMinutes(15),
            'visible' => true,
        ]);

        $comedor3 = Comedor::create([
            'nombre' => 'Comedor Sur Vallecas',
            'direccion' => 'Avenida de la Albufera 200, Madrid',
            'latitud' => 40.3910,
            'longitud' => -3.6580,
            'telefono' => '911111117',
            'email' => 'vallecas@comedores.madrid',
            'descripcion' => 'Comedor social en Vallecas con servicio de desayuno y comida.',
            'normas' => 'Puntualidad y respeto mutuo',
            'estado' => 'activo',
            'estado_actual' => 'completo',
            'aforo_disponible' => 0,
            'ultima_actualizacion' => now()->subMinutes(5),
            'visible' => true,
        ]);

        $comedor4 = Comedor::create([
            'nombre' => 'Comedor Carabanchel',
            'direccion' => 'Calle General Ricardos 150, Madrid',
            'latitud' => 40.3840,
            'longitud' => -3.7450,
            'telefono' => '911111118',
            'email' => 'carabanchel@comedores.madrid',
            'descripcion' => 'Comedor social familiar en Carabanchel.',
            'normas' => 'Ambiente familiar y respetuoso',
            'estado' => 'activo',
            'estado_actual' => 'abierto',
            'aforo_disponible' => 22,
            'ultima_actualizacion' => now()->subMinutes(7),
            'visible' => true,
        ]);

        $comedor5 = Comedor::create([
            'nombre' => 'Comedor Tetuán',
            'direccion' => 'Calle Bravo Murillo 300, Madrid',
            'latitud' => 40.4600,
            'longitud' => -3.7030,
            'telefono' => '911111119',
            'email' => 'tetuan@comedores.madrid',
            'descripcion' => 'Comedor social en Tetuán.',
            'normas' => 'Normas básicas',
            'estado' => 'activo',
            'estado_actual' => 'abierto',
            'aforo_disponible' => 60,
            'ultima_actualizacion' => now()->subMinutes(10),
            'visible' => true,
        ]);

        // Comedores en Badajoz
        $comedor6 = Comedor::create([
            'nombre' => 'Comedor La Arboleda',
            'direccion' => 'Avenida de la Arboleda 1, Badajoz',
            'latitud' => 38.8794,
            'longitud' => -6.9707,
            'telefono' => '924123456',
            'email' => 'arboleda@comedores.badajoz',
            'descripcion' => 'Comedor social en una zona centrica de la ciudad.',
            'normas' => 'Respeto y convivencia pacífica',
            'estado' => 'activo',
            'estado_actual' => 'abierto',
            'aforo_disponible' => 35,
            'ultima_actualizacion' => now()->subMinutes(2),
            'visible' => true,
        ]);

        $comedor7 = Comedor::create([
            'nombre' => 'Comedor El Mirador',
            'direccion' => 'Calle del Mirador 12, Badajoz',
            'latitud' => 38.8880,
            'longitud' => -6.9855,
            'telefono' => '924111222',
            'email' => 'mirador@comedores.badajoz',
            'descripcion' => 'Comedor social en una zona elevada de la ciudad.',
            'normas' => 'Mantener orden y limpieza',
            'estado' => 'activo',
            'estado_actual' => 'cerrado',
            'aforo_disponible' => 0,
            'ultima_actualizacion' => now()->subMinutes(20),
            'visible' => true,
        ]);

        $comedor8 = Comedor::create([
            'nombre' => 'Comedor Las Fuentes',
            'direccion' => 'Calle de las Fuentes 8, Badajoz',
            'latitud' => 38.8800,
            'longitud' => -6.9580,
            'telefono' => '924333444',
            'email' => 'fuentes@comedores.badajoz',
            'descripcion' => 'Comedor social en una zona residencial de la ciudad.',
            'normas' => 'Respeto a todo el personal y usuarios',
            'estado' => 'activo',
            'estado_actual' => 'abierto',
            'aforo_disponible' => 18,
            'ultima_actualizacion' => now()->subMinutes(4),
            'visible' => true,
        ]);

        $comedor9 = Comedor::create([
            'nombre' => 'Comedor Puente Nuevo',
            'direccion' => 'Avenida del Puente 5, Badajoz',
            'latitud' => 38.8720,
            'longitud' => -6.9725,
            'telefono' => '924222333',
            'email' => 'puentenuevo@comedores.badajoz',
            'descripcion' => 'Comedor social con atencion diaria y apoyo comunitario.',
            'normas' => 'Respeto a usuarios y personal',
            'estado' => 'activo',
            'estado_actual' => 'abierto',
            'aforo_disponible' => 25,
            'ultima_actualizacion' => now()->subMinutes(6),
            'visible' => true,
        ]);

        $comedor10 = Comedor::create([
            'nombre' => 'Comedor La Encina',
            'direccion' => 'Calle de la Encina 20, Badajoz',
            'latitud' => 38.8920,
            'longitud' => -6.9850,
            'telefono' => '924444555',
            'email' => 'encina@comedores.badajoz',
            'descripcion' => 'Comedor social con plazas limitadas y apoyo vecinal.',
            'normas' => 'Colaborar con el equipo y respetar turnos',
            'estado' => 'activo',
            'estado_actual' => 'cerrado',
            'aforo_disponible' => 0,
            'ultima_actualizacion' => now()->subMinutes(12),
            'visible' => true,
        ]);

        $comedor11 = Comedor::create([
            'nombre' => 'Comedor Merida Centro',
            'direccion' => 'Calle Santa Eulalia 6, Merida',
            'latitud' => 38.9170,
            'longitud' => -6.3439,
            'telefono' => '924777888',
            'email' => 'merida@comedores.ext',
            'descripcion' => 'Comedor social en el centro de Merida.',
            'normas' => 'Puntualidad y convivencia',
            'estado' => 'activo',
            'estado_actual' => 'abierto',
            'aforo_disponible' => 40,
            'ultima_actualizacion' => now()->subMinutes(9),
            'visible' => true,
        ]);

        $comedor12 = Comedor::create([
            'nombre' => 'Comedor Caceres Solidario',
            'direccion' => 'Calle San Pedro 4, Caceres',
            'latitud' => 39.4750,
            'longitud' => -6.3722,
            'telefono' => '927111222',
            'email' => 'caceres@comedores.ext',
            'descripcion' => 'Comedor social en el casco historico de Caceres.',
            'normas' => 'Normas basicas de convivencia',
            'estado' => 'activo',
            'estado_actual' => 'abierto',
            'aforo_disponible' => 30,
            'ultima_actualizacion' => now()->subMinutes(8),
            'visible' => true,
        ]);

        // Comedores pendientes de aprobación
        $comedorPendienteMadrid = Comedor::create([
            'nombre' => 'Comedor Usera (Pendiente)',
            'direccion' => 'Calle Marcelo Usera 150, Madrid',
            'latitud' => 40.3800,
            'longitud' => -3.7070,
            'telefono' => '911111130',
            'email' => 'usera@comedores.madrid',
            'normas' => 'Normas básicas',
            'estado' => 'pendiente',
            'aforo_disponible' => null,
            'ultima_actualizacion' => null,
            'visible' => false,
        ]);

        $comedorPendienteBadajoz = Comedor::create([
            'nombre' => 'Comedor Horizonte (Pendiente)',
            'direccion' => 'Calle Horizonte 3, Badajoz',
            'latitud' => 38.8760,
            'longitud' => -6.9650,
            'telefono' => '924555666',
            'email' => 'horizonte@comedores.badajoz',
            'normas' => 'Normas básicas',
            'estado' => 'pendiente',
            'aforo_disponible' => null,
            'ultima_actualizacion' => null,
            'visible' => false,
        ]);

        // NECESIDADES para varios comedores
        
        // Comedor Central Madrid - Urgencia ALTA
        Necesidad::create([
            'id_comedor' => $comedor1->id_comedor,
            'tipo' => 'Alimentos',
            'descripcion' => 'Necesitamos arroz, pasta, legumbres y aceite de forma urgente. Atendemos a 150 personas diarias.',
            'urgencia' => 'alta',
        ]);
        
        Necesidad::create([
            'id_comedor' => $comedor1->id_comedor,
            'tipo' => 'Voluntariado',
            'descripcion' => 'Buscamos voluntarios para cocina y servicio de comedor los fines de semana.',
            'urgencia' => 'media',
        ]);

        // Comedor Vallecas - Urgencia MEDIA
        Necesidad::create([
            'id_comedor' => $comedor3->id_comedor,
            'tipo' => 'Productos de higiene',
            'descripcion' => 'Necesitamos gel de baño, champú, papel higiénico y productos de limpieza.',
            'urgencia' => 'media',
        ]);

        Necesidad::create([
            'id_comedor' => $comedor3->id_comedor,
            'tipo' => 'Ropa',
            'descripcion' => 'Ropa de invierno para adultos: abrigos, mantas y calzado.',
            'urgencia' => 'alta',
        ]);

        // Comedor Carabanchel - Urgencia BAJA
        Necesidad::create([
            'id_comedor' => $comedor4->id_comedor,
            'tipo' => 'Alimentos',
            'descripcion' => 'Frutas frescas, verduras y lácteos.',
            'urgencia' => 'baja',
        ]);

        Necesidad::create([
            'id_comedor' => $comedor4->id_comedor,
            'tipo' => 'Otros',
            'descripcion' => 'Menaje de cocina: platos, cubiertos y vasos.',
            'urgencia' => 'baja',
        ]);

        // Comedor La Arboleda - Urgencia ALTA
        Necesidad::create([
            'id_comedor' => $comedor6->id_comedor,
            'tipo' => 'Alimentos',
            'descripcion' => 'Urgente: leche, huevos, pan y alimentos no perecederos.',
            'urgencia' => 'alta',
        ]);

        Necesidad::create([
            'id_comedor' => $comedor6->id_comedor,
            'tipo' => 'Voluntariado',
            'descripcion' => 'Necesitamos personal médico o enfermería voluntaria 1 día a la semana.',
            'urgencia' => 'alta',
        ]);

        // Comedor Las Fuentes - Urgencia MEDIA
        Necesidad::create([
            'id_comedor' => $comedor8->id_comedor,
            'tipo' => 'Productos de higiene',
            'descripcion' => 'Pañales para bebés y adultos, toallitas húmedas.',
            'urgencia' => 'media',
        ]);

        // HORARIOS
        $horarios = [
            // Comedor Central (id: 1) - Lunes a Viernes
            ['id_comedor' => $comedor1->id_comedor, 'dia_semana' => 'lunes', 'hora_apertura' => '12:00', 'hora_cierre' => '15:00', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor1->id_comedor, 'dia_semana' => 'lunes', 'hora_apertura' => '19:00', 'hora_cierre' => '21:00', 'tipo_servicio' => 'cena'],
            ['id_comedor' => $comedor1->id_comedor, 'dia_semana' => 'martes', 'hora_apertura' => '12:00', 'hora_cierre' => '15:00', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor1->id_comedor, 'dia_semana' => 'miercoles', 'hora_apertura' => '12:00', 'hora_cierre' => '15:00', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor1->id_comedor, 'dia_semana' => 'jueves', 'hora_apertura' => '12:00', 'hora_cierre' => '15:00', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor1->id_comedor, 'dia_semana' => 'viernes', 'hora_apertura' => '12:00', 'hora_cierre' => '15:00', 'tipo_servicio' => 'comida'],
            
            // Comedor Norte (id: 2)
            ['id_comedor' => $comedor2->id_comedor, 'dia_semana' => 'martes', 'hora_apertura' => '13:00', 'hora_cierre' => '16:00', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor2->id_comedor, 'dia_semana' => 'jueves', 'hora_apertura' => '13:00', 'hora_cierre' => '16:00', 'tipo_servicio' => 'comida'],
            
            // Comedor Vallecas (id: 3)
            ['id_comedor' => $comedor3->id_comedor, 'dia_semana' => 'lunes', 'hora_apertura' => '08:00', 'hora_cierre' => '10:00', 'tipo_servicio' => 'desayuno'],
            ['id_comedor' => $comedor3->id_comedor, 'dia_semana' => 'lunes', 'hora_apertura' => '13:00', 'hora_cierre' => '15:30', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor3->id_comedor, 'dia_semana' => 'viernes', 'hora_apertura' => '13:00', 'hora_cierre' => '15:30', 'tipo_servicio' => 'comida'],
            
            // Comedor Carabanchel (id: 4)
            ['id_comedor' => $comedor4->id_comedor, 'dia_semana' => 'miercoles', 'hora_apertura' => '12:30', 'hora_cierre' => '15:30', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor4->id_comedor, 'dia_semana' => 'sabado', 'hora_apertura' => '13:00', 'hora_cierre' => '16:00', 'tipo_servicio' => 'comida'],
            
            // Comedor Tetuán (id: 5)
            ['id_comedor' => $comedor5->id_comedor, 'dia_semana' => 'domingo', 'hora_apertura' => '12:00', 'hora_cierre' => '15:00', 'tipo_servicio' => 'comida'],
            
            // Comedor La Arboleda (id: 6)
            ['id_comedor' => $comedor6->id_comedor, 'dia_semana' => 'lunes', 'hora_apertura' => '12:00', 'hora_cierre' => '14:30', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor6->id_comedor, 'dia_semana' => 'miercoles', 'hora_apertura' => '12:00', 'hora_cierre' => '14:30', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor6->id_comedor, 'dia_semana' => 'viernes', 'hora_apertura' => '12:00', 'hora_cierre' => '14:30', 'tipo_servicio' => 'comida'],
            
            // Comedor El Mirador (id: 7)
            ['id_comedor' => $comedor7->id_comedor, 'dia_semana' => 'martes', 'hora_apertura' => '13:00', 'hora_cierre' => '15:30', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor7->id_comedor, 'dia_semana' => 'jueves', 'hora_apertura' => '13:00', 'hora_cierre' => '15:30', 'tipo_servicio' => 'comida'],
            
            // Comedor Las Fuentes (id: 8)
            ['id_comedor' => $comedor8->id_comedor, 'dia_semana' => 'lunes', 'hora_apertura' => '12:30', 'hora_cierre' => '15:00', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor8->id_comedor, 'dia_semana' => 'martes', 'hora_apertura' => '12:30', 'hora_cierre' => '15:00', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor8->id_comedor, 'dia_semana' => 'miercoles', 'hora_apertura' => '12:30', 'hora_cierre' => '15:00', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor8->id_comedor, 'dia_semana' => 'jueves', 'hora_apertura' => '12:30', 'hora_cierre' => '15:00', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor8->id_comedor, 'dia_semana' => 'viernes', 'hora_apertura' => '12:30', 'hora_cierre' => '15:00', 'tipo_servicio' => 'comida'],

            // Comedor Puente Nuevo (id: 9)
            ['id_comedor' => $comedor9->id_comedor, 'dia_semana' => 'martes', 'hora_apertura' => '09:00', 'hora_cierre' => '11:00', 'tipo_servicio' => 'desayuno'],
            ['id_comedor' => $comedor9->id_comedor, 'dia_semana' => 'jueves', 'hora_apertura' => '13:00', 'hora_cierre' => '15:00', 'tipo_servicio' => 'comida'],

            // Comedor La Encina (id: 10)
            ['id_comedor' => $comedor10->id_comedor, 'dia_semana' => 'lunes', 'hora_apertura' => '20:00', 'hora_cierre' => '22:00', 'tipo_servicio' => 'cena'],
            ['id_comedor' => $comedor10->id_comedor, 'dia_semana' => 'sabado', 'hora_apertura' => '12:00', 'hora_cierre' => '14:00', 'tipo_servicio' => 'comida'],

            // Comedor Merida Centro (id: 11)
            ['id_comedor' => $comedor11->id_comedor, 'dia_semana' => 'lunes', 'hora_apertura' => '12:00', 'hora_cierre' => '14:00', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor11->id_comedor, 'dia_semana' => 'viernes', 'hora_apertura' => '18:00', 'hora_cierre' => '20:00', 'tipo_servicio' => 'cena'],

            // Comedor Caceres Solidario (id: 12)
            ['id_comedor' => $comedor12->id_comedor, 'dia_semana' => 'miercoles', 'hora_apertura' => '08:00', 'hora_cierre' => '10:00', 'tipo_servicio' => 'desayuno'],
            ['id_comedor' => $comedor12->id_comedor, 'dia_semana' => 'domingo', 'hora_apertura' => '13:00', 'hora_cierre' => '15:00', 'tipo_servicio' => 'comida'],
        ];

        foreach ($horarios as $horario) {
            DB::table('horarios')->insert($horario);
        }
    }
}
