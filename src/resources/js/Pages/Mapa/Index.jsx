import { Head, Link } from '@inertiajs/react';

export default function MapaIndex() {
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
                        <Link
                            href={route('login')}
                            className="rounded-md px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
                        >
                            Iniciar Sesión
                        </Link>
                    </div>
                </header>

                {/* Main Content */}
                <main className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <h2 className="text-2xl font-bold mb-4">
                                    Busca comedores sociales cerca de ti
                                </h2>
                                <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                                    <p className="text-gray-600 text-lg">
                                        Mapa de Leaflet.js se integrará aquí (HU-001)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
