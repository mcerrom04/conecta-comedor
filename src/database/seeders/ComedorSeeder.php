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
            'visible' => true,
        ]);

        // Comedores en Badajoz
        $comedor6 = Comedor::create([
            'nombre' => 'Comedor San Roque',
            'direccion' => 'Calle San Roque 15, Badajoz',
            'latitud' => 38.8794,
            'longitud' => -6.9707,
            'telefono' => '924123456',
            'email' => 'sanroque@comedores.badajoz',
            'descripcion' => 'Comedor social en el barrio de San Roque.',
            'normas' => 'Respeto y convivencia pacífica',
            'estado' => 'activo',
            'estado_actual' => 'abierto',
            'visible' => true,
        ]);

        $comedor7 = Comedor::create([
            'nombre' => 'Comedor Casco Antiguo',
            'direccion' => 'Plaza de España 8, Badajoz',
            'latitud' => 38.8797,
            'longitud' => -6.9700,
            'telefono' => '924111222',
            'email' => 'cascoantiguobadajoz@comedores.es',
            'descripcion' => 'Comedor social en el centro histórico de Badajoz.',
            'normas' => 'Mantener orden y limpieza',
            'estado' => 'activo',
            'estado_actual' => 'cerrado',
            'visible' => true,
        ]);

        $comedor8 = Comedor::create([
            'nombre' => 'Comedor Pardaleras',
            'direccion' => 'Avenida de Elvas 50, Badajoz',
            'latitud' => 38.8850,
            'longitud' => -6.9840,
            'telefono' => '924333444',
            'email' => 'pardaleras@comedores.badajoz',
            'descripcion' => 'Comedor social en el barrio de Pardaleras.',
            'normas' => 'Respeto a todo el personal y usuarios',
            'estado' => 'activo',
            'estado_actual' => 'abierto',
            'visible' => true,
        ]);

        // Comedores pendientes de aprobación
        $comedor9 = Comedor::create([
            'nombre' => 'Comedor Usera (Pendiente)',
            'direccion' => 'Calle Marcelo Usera 150, Madrid',
            'latitud' => 40.3800,
            'longitud' => -3.7070,
            'telefono' => '911111130',
            'email' => 'usera@comedores.madrid',
            'normas' => 'Normas básicas',
            'estado' => 'pendiente',
            'visible' => false,
        ]);

        $comedor10 = Comedor::create([
            'nombre' => 'Comedor Valdepasillas (Pendiente)',
            'direccion' => 'Calle Valdepasillas 20, Badajoz',
            'latitud' => 38.8700,
            'longitud' => -6.9600,
            'telefono' => '924555666',
            'email' => 'valdepasillas@comedores.badajoz',
            'normas' => 'Normas básicas',
            'estado' => 'pendiente',
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

        // Comedor San Roque Badajoz - Urgencia ALTA
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

        // Comedor Pardaleras Badajoz - Urgencia MEDIA
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
            
            // Comedor San Roque Badajoz (id: 6)
            ['id_comedor' => $comedor6->id_comedor, 'dia_semana' => 'lunes', 'hora_apertura' => '12:00', 'hora_cierre' => '14:30', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor6->id_comedor, 'dia_semana' => 'miercoles', 'hora_apertura' => '12:00', 'hora_cierre' => '14:30', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor6->id_comedor, 'dia_semana' => 'viernes', 'hora_apertura' => '12:00', 'hora_cierre' => '14:30', 'tipo_servicio' => 'comida'],
            
            // Comedor Casco Antiguo Badajoz (id: 7)
            ['id_comedor' => $comedor7->id_comedor, 'dia_semana' => 'martes', 'hora_apertura' => '13:00', 'hora_cierre' => '15:30', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor7->id_comedor, 'dia_semana' => 'jueves', 'hora_apertura' => '13:00', 'hora_cierre' => '15:30', 'tipo_servicio' => 'comida'],
            
            // Comedor Pardaleras Badajoz (id: 8)
            ['id_comedor' => $comedor8->id_comedor, 'dia_semana' => 'lunes', 'hora_apertura' => '12:30', 'hora_cierre' => '15:00', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor8->id_comedor, 'dia_semana' => 'martes', 'hora_apertura' => '12:30', 'hora_cierre' => '15:00', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor8->id_comedor, 'dia_semana' => 'miercoles', 'hora_apertura' => '12:30', 'hora_cierre' => '15:00', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor8->id_comedor, 'dia_semana' => 'jueves', 'hora_apertura' => '12:30', 'hora_cierre' => '15:00', 'tipo_servicio' => 'comida'],
            ['id_comedor' => $comedor8->id_comedor, 'dia_semana' => 'viernes', 'hora_apertura' => '12:30', 'hora_cierre' => '15:00', 'tipo_servicio' => 'comida'],
        ];

        foreach ($horarios as $horario) {
            DB::table('horarios')->insert($horario);
        }
    }
}
