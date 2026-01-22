<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rutas protegidas por rol de Administrador
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    // Panel de administración
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');
    
    // Gestión de comedores pendientes
    Route::get('/comedores/pendientes', function () {
        return Inertia::render('Admin/ComedoresPendientes');
    })->name('comedores.pendientes');
    
    // Moderación de comentarios
    Route::get('/comentarios/moderar', function () {
        return Inertia::render('Admin/ModerarComentarios');
    })->name('comentarios.moderar');
});

// Rutas protegidas por rol de Gestor
Route::middleware(['auth', 'role:gestor'])->prefix('gestor')->name('gestor.')->group(function () {
    // Panel de gestor
    Route::get('/dashboard', function () {
        return Inertia::render('Gestor/Dashboard');
    })->name('dashboard');
    
    // Actualizar estado del comedor
    Route::get('/estado', function () {
        return Inertia::render('Gestor/ActualizarEstado');
    })->name('estado');
    
    // Gestionar necesidades
    Route::get('/necesidades', function () {
        return Inertia::render('Gestor/GestionarNecesidades');
    })->name('necesidades');
    
    // Gestionar horarios
    Route::get('/horarios', function () {
        return Inertia::render('Gestor/GestionarHorarios');
    })->name('horarios');
});

require __DIR__.'/auth.php';
