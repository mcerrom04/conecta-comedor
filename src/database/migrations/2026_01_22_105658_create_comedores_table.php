<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comedores', function (Blueprint $table) {
            $table->id('id_comedor');
            $table->string('nombre', 100);
            $table->string('direccion', 255);
            $table->decimal('latitud', 9, 6);
            $table->decimal('longitud', 9, 6);
            $table->string('telefono', 20)->nullable();
            $table->string('email', 100)->nullable();
            $table->text('descripcion')->nullable();
            $table->text('normas')->nullable();
            $table->enum('estado', ['pendiente', 'activo', 'rechazado'])->default('pendiente'); // Estado administrativo
            $table->enum('estado_actual', ['abierto', 'cerrado', 'completo'])->default('cerrado'); // Estado operativo del día
            $table->boolean('visible')->default(true);
            $table->integer('aforo_disponible')->nullable();
            $table->text('observaciones')->nullable();
            $table->timestamp('ultima_actualizacion')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comedores');
    }
};
