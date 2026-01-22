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
            $table->id();
            $table->string('nombre', 100);
            $table->string('direccion');
            $table->decimal('latitud', 9, 6);
            $table->decimal('longitud', 9, 6);
            $table->string('telefono', 20)->nullable();
            $table->text('normas')->nullable();
            $table->enum('estado', ['pendiente', 'activo', 'rechazado'])->default('pendiente');
            $table->boolean('visible')->default(true);
            $table->enum('estado_actual', ['abierto', 'cerrado'])->default('cerrado');
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
