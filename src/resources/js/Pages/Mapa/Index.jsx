import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import MapaLeaflet from '@/Components/MapaLeaflet';

export default function MapaIndex({ comedores, auth }) {
    const [userLocation, setUserLocation] = useState(null);
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    const [mapCenter, setMapCenter] = useState([40.4168, -3.7038]); // Madrid por defecto
    const [mapZoom, setMapZoom] = useState(12);

    // Función para calcular distancia usando Haversine (en km)
    const calcularDistancia = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radio de la Tierra en km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // Calcular distancias a todos los comedores
    const comedoresConDistancia = userLocation
        ? comedores.map(comedor => ({
            ...comedor,
            distancia: calcularDistancia(
                userLocation.lat,
                userLocation.lng,
                parseFloat(comedor.latitud),
                parseFloat(comedor.longitud)
            )
        })).sort((a, b) => a.distancia - b.distancia)
        : comedores;

    const obtenerUbicacion = () => {
        if (!navigator.geolocation) {
            alert('Tu navegador no soporta geolocalización');
            return;
        }

        setIsGettingLocation(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                setUserLocation(location);
                setMapCenter([location.lat, location.lng]);
                setMapZoom(14);
                setIsGettingLocation(false);
            },
            (error) => {
                console.error('Error obteniendo ubicación:', error);
                alert('No se pudo obtener tu ubicación. Verifica los permisos del navegador.');
                setIsGettingLocation(false);
            }
        );
    };

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
                                <div className="mb-4 flex justify-between items-start">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2">
                                            Busca comedores sociales cerca de ti
                                        </h2>
                                        <p className="text-gray-600">
                                            Encontrados: <span className="font-semibold">{comedores.length}</span> comedores disponibles
                                            {userLocation && (
                                                <span className="ml-2 text-green-600">
                                                    📍 Mostrando distancias desde tu ubicación
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <button
                                        onClick={obtenerUbicacion}
                                        disabled={isGettingLocation}
                                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                                    >
                                        {isGettingLocation ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Obteniendo...
                                            </>
                                        ) : (
                                            <>
                                                📍 Usar mi ubicación
                                            </>
                                        )}
                                    </button>
                                </div>
                                
                                {/* Mapa Leaflet */}
                                <div className="h-[600px] rounded-lg overflow-hidden border border-gray-200">
                                    <MapaLeaflet 
                                        comedores={comedoresConDistancia}
                                        center={mapCenter}
                                        zoom={mapZoom}
                                        userLocation={userLocation}
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
