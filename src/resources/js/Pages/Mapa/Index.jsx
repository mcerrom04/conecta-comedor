import { Head, Link } from '@inertiajs/react';
import MapaLeaflet from '@/Components/MapaLeaflet';

export default function MapaIndex({ comedores, auth }) {
    return (
        <>
            <Head title="Mapa de Comedores" />

            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Conecta Comedor
                        </h1>
                        <div className="flex gap-4">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
                                >
                                    Mi Panel
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
                                    >
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="mb-4">
                                    <h2 className="text-2xl font-bold mb-2">
                                        Busca comedores sociales cerca de ti
                                    </h2>
                                    <p className="text-gray-600">
                                        Encontrados: <span className="font-semibold">{comedores.length}</span> comedores disponibles
                                    </p>
                                </div>
                                
                                {/* Mapa Leaflet */}
                                <div className="h-[600px] rounded-lg overflow-hidden border border-gray-200">
                                    <MapaLeaflet 
                                        comedores={comedores}
                                        center={[40.4168, -3.7038]} // Madrid centro
                                        zoom={12}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
