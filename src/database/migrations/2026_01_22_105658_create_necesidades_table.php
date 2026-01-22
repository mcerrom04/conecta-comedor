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
        Schema::create('necesidades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_comedor')->constrained('comedores')->onDelete('cascade');
            $table->enum('tipo', ['alimento', 'producto', 'voluntariado']);
            $table->string('descripcion');
            $table->enum('urgencia', ['baja', 'media', 'alta'])->default('media');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('necesidades');
    }
};
