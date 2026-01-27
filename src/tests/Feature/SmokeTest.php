<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SmokeTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Prueba básica de que la aplicación carga.
     */
    public function test_homepage_redirige_a_mapa(): void
    {
        $response = $this->get('/');
        $response->assertStatus(302);
        $response->assertRedirect(route('mapa'));
    }

    public function test_mapa_publico_carga_correctamente(): void
    {
        $response = $this->get('/mapa');
        $response->assertStatus(200);
    }

    /**
     * Prueba de que la página de login es accesible.
     */
    public function test_login_page_carga(): void
    {
        $response = $this->get('/login');
        $response->assertStatus(200);
    }
}
