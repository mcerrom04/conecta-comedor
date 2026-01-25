<?php

use App\Http\Controllers\ComedorController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // Redirigir directamente al mapa
    return redirect()->route('mapa');
});

Route::get('/dashboard', function () {
    $user = auth()->user();
    
    // Redirigir según el rol del usuario
    if ($user->isAdmin()) {
        return redirect()->route('admin.dashboard');
    } elseif ($user->isGestor()) {
        return redirect()->route('gestor.dashboard');
    }
    
    // Ciudadanos van al mapa público
    return redirect()->route('mapa');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Ruta pública del mapa (accesible para todos)
Route::get('/mapa', [ComedorController::class, 'mapa'])->name('mapa');

// Ruta para ver ficha de comedor
Route::get('/comedor/{id}', [ComedorController::class, 'show'])->name('comedor.show');
Route::get('/comedor/{id}/estado', [ComedorController::class, 'estado'])->name('comedor.estado');

// Rutas protegidas por rol de Administrador
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    // Panel de administración
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');
    
    // Gestión de comedores pendientes
    Route::get('/comedores/pendientes', [ComedorController::class, 'pendientes'])->name('comedores.pendientes');
    Route::post('/comedores/{id}/aprobar', [ComedorController::class, 'aprobar'])->name('comedores.aprobar');
    Route::post('/comedores/{id}/rechazar', [ComedorController::class, 'rechazar'])->name('comedores.rechazar');
    
    // Moderación de comentarios
    Route::get('/comentarios/moderar', function () {
        return Inertia::render('Admin/ModerarComentarios');
    })->name('comentarios.moderar');
});

// Rutas protegidas por rol de Gestor
Route::middleware(['auth', 'role:gestor'])->prefix('gestor')->name('gestor.')->group(function () {
    // Panel de gestor
    Route::get('/dashboard', function () {
        return Inertia::render('Gestor/Dashboard', [
            'comedores' => auth()->user()->comedores
        ]);
    })->name('dashboard');

    // Registrar nuevo comedor (HU-012)
    Route::get('/comedores/crear', [ComedorController::class, 'create'])->name('comedores.create');
    Route::post('/comedores', [ComedorController::class, 'store'])->name('comedores.store');

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
