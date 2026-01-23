import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import MapaLeaflet from '@/Components/MapaLeaflet';

export default function MapaIndex({ comedores, auth }) {
    const [userLocation, setUserLocation] = useState(null);
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    const [mapCenter, setMapCenter] = useState([40.4168, -3.7038]); // Madrid por defecto
    const [mapZoom, setMapZoom] = useState(12);
    
    // Estados de filtros
    const [filtroTexto, setFiltroTexto] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('todos');
    const [filtroDistancia, setFiltroDistancia] = useState(10);
    const [filtroDistanciaActivo, setFiltroDistanciaActivo] = useState(false);
    const [filtroHora, setFiltroHora] = useState('');
    const [panelLateralAbierto, setPanelLateralAbierto] = useState(false);
    const [comedorSeleccionado, setComedorSeleccionado] = useState(null);
    const [mostrarFiltros, setMostrarFiltros] = useState(false);

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

    // Aplicar filtros
    const comedoresFiltrados = comedoresConDistancia.filter(comedor => {
        // Filtro por texto (nombre o dirección)
        if (filtroTexto) {
            const textoLower = filtroTexto.toLowerCase();
            const coincide = 
                comedor.nombre.toLowerCase().includes(textoLower) ||
                comedor.direccion.toLowerCase().includes(textoLower);
            if (!coincide) return false;
        }

        // Filtro por estado
        if (filtroEstado !== 'todos' && comedor.estado !== filtroEstado) {
            return false;
        }

        // Filtro por distancia (solo si hay ubicación del usuario y está activo)
        if (userLocation && filtroDistanciaActivo && comedor.distancia > filtroDistancia) {
            return false;
        }

        // Filtro por hora (actualmente no funcional, solo UI)
        // TODO: implementar lógica para verificar si el comedor está abierto a la hora seleccionada
        if (filtroHora) {
            // Por ahora solo filtramos los que tienen horarios definidos
            if (!comedor.horarios || comedor.horarios.length === 0) {
                return false;
            }
        }

        return true;
    });

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
                                {/* Header responsive: columna en móvil, dos columnas en desktop */}
                                <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start">
                                    {/* Título */}
                                    <div className="order-1">
                                        <h2 className="text-2xl font-bold mb-2">
                                            Busca comedores cercanos
                                        </h2>
                                    </div>
                                    
                                    {/* Botones */}
                                    <div className="order-2 flex gap-2 lg:order-2">
                                        <button
                                            onClick={() => setMostrarFiltros(!mostrarFiltros)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                                                mostrarFiltros 
                                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            🔍 Filtros
                                            {(filtroEstado !== 'todos' || filtroDistanciaActivo || filtroHora) && (
                                                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                                    !
                                                </span>
                                            )}
                                        </button>
                                        <button
                                            onClick={obtenerUbicacion}
                                            disabled={isGettingLocation}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                                                userLocation 
                                                    ? 'bg-green-600 hover:bg-green-700' 
                                                    : 'bg-indigo-600 hover:bg-indigo-700'
                                            } text-white disabled:bg-gray-400 disabled:cursor-not-allowed`}
                                        >
                                            {isGettingLocation ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <span>Obteniendo...</span>
                                                </>
                                            ) : userLocation ? (
                                                <>
                                                    <span className="text-lg">✓</span>
                                                    <span>Ubicación</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-lg">✕</span>
                                                    <span>Ubicación</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Contador de comedores */}
                                    <div className="order-3 lg:order-1">
                                        <p className="text-gray-600">
                                            Mostrando: <span className="font-semibold">{comedoresFiltrados.length}</span> de {comedores.length} comedores
                                        </p>
                                    </div>
                                </div>

                                {/* Panel de Filtros - Colapsable */}
                                <div 
                                    className={`mb-6 overflow-hidden transition-all duration-300 ease-in-out ${
                                        mostrarFiltros ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <h3 className="text-lg font-semibold mb-3 text-gray-900">Filtros</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Filtro por texto */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Buscar por nombre o dirección
                                            </label>
                                            <input
                                                type="text"
                                                value={filtroTexto}
                                                onChange={(e) => setFiltroTexto(e.target.value)}
                                                placeholder="Ej: Comedor Central, Calle..."
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>

                                        {/* Filtro por estado */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Estado
                                            </label>
                                            <select
                                                value={filtroEstado}
                                                onChange={(e) => setFiltroEstado(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            >
                                                <option value="todos">Todos</option>
                                                <option value="abierto">🟢 Abierto</option>
                                                <option value="cerrado">🔴 Cerrado</option>
                                                <option value="completo">🟡 Completo</option>
                                            </select>
                                        </div>

                                        {/* Filtro por distancia */}
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Distancia máxima: {filtroDistancia} km
                                                </label>
                                                {userLocation && (
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={filtroDistanciaActivo}
                                                            onChange={(e) => setFiltroDistanciaActivo(e.target.checked)}
                                                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                        />
                                                        <span className="text-xs text-gray-600">Activar</span>
                                                    </label>
                                                )}
                                            </div>
                                            {!userLocation && (
                                                <p className="text-xs text-gray-500 mb-2">
                                                    Usa tu ubicación para activar este filtro
                                                </p>
                                            )}
                                            <input
                                                type="range"
                                                min="1"
                                                max="50"
                                                value={filtroDistancia}
                                                onChange={(e) => setFiltroDistancia(Number(e.target.value))}
                                                disabled={!userLocation || !filtroDistanciaActivo}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                                            />
                                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                <span>1 km</span>
                                                <span>50 km</span>
                                            </div>
                                        </div>

                                        {/* Filtro por hora */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                🕐 Hora específica
                                            </label>
                                            <input
                                                type="time"
                                                value={filtroHora}
                                                onChange={(e) => setFiltroHora(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                ⚠️ Filtro visual solamente (funcionalidad pendiente)
                                            </p>
                                        </div>
                                    </div>

                                    {/* Botón limpiar filtros */}
                                    {(filtroTexto || filtroEstado !== 'todos' || filtroDistanciaActivo || filtroHora) && (
                                        <div className="mt-3 text-center">
                                            <button
                                                onClick={() => {
                                                    setFiltroTexto('');
                                                    setFiltroEstado('todos');
                                                    setFiltroDistancia(50);
                                                    setFiltroDistanciaActivo(false);
                                                    setFiltroHora('');
                                                }}
                                                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                                            >
                                                Limpiar filtros
                                            </button>
                                        </div>
                                    )}
                                    </div>
                                </div>
                                
                                {/* Mapa Leaflet con botón de panel lateral */}
                                <div className="relative h-[600px] rounded-lg overflow-hidden border border-gray-200">
                                    {/* Botón para abrir panel lateral (solo si hay filtros activos) */}
                                    {(filtroTexto || filtroEstado !== 'todos' || filtroDistanciaActivo || filtroHora) && (
                                        <button
                                            onClick={() => setPanelLateralAbierto(!panelLateralAbierto)}
                                            className="absolute top-4 right-4 z-[1000] bg-white hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-lg border border-gray-300 transition flex items-center gap-2"
                                        >
                                            <span>📋 Ver lista ({comedoresFiltrados.length})</span>
                                            <span className={`transition-transform ${panelLateralAbierto ? 'rotate-180' : ''}`}>
                                                ▼
                                            </span>
                                        </button>
                                    )}

                                    {/* Panel lateral desplegable */}
                                    {panelLateralAbierto && (
                                        <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-2xl z-[999] overflow-y-auto border-l border-gray-300">
                                            <div className="p-4">
                                                <div className="flex justify-between items-center mb-4 pb-3 border-b">
                                                    <h3 className="text-lg font-bold text-gray-800">
                                                        Comedores filtrados
                                                    </h3>
                                                    <button
                                                        onClick={() => setPanelLateralAbierto(false)}
                                                        className="text-gray-500 hover:text-gray-700 font-bold text-xl"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    {comedoresFiltrados.length === 0 ? (
                                                        <p className="text-gray-500 text-center py-8">
                                                            No hay comedores que cumplan los filtros
                                                        </p>
                                                    ) : (
                                                        comedoresFiltrados.map(comedor => (
                                                            <button
                                                                key={comedor.id_comedor}
                                                                onClick={() => {
                                                                    setComedorSeleccionado(comedor);
                                                                    setMapCenter([
                                                                        parseFloat(comedor.latitud),
                                                                        parseFloat(comedor.longitud)
                                                                    ]);
                                                                    setMapZoom(16);
                                                                    setPanelLateralAbierto(false);
                                                                }}
                                                                className={`w-full text-left p-3 rounded-lg border transition-all ${
                                                                    comedorSeleccionado?.id_comedor === comedor.id_comedor
                                                                        ? 'bg-indigo-50 border-indigo-400 shadow-md'
                                                                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                                                                }`}
                                                            >
                                                                <div className="flex items-start justify-between gap-2">
                                                                    <div className="flex-1 min-w-0">
                                                                        <h4 className="font-semibold text-gray-900 truncate text-sm">
                                                                            {comedor.nombre}
                                                                        </h4>
                                                                        <p className="text-xs text-gray-600 truncate mt-1">
                                                                            📍 {comedor.direccion}
                                                                        </p>
                                                                        {comedor.distancia && (
                                                                            <p className="text-xs text-gray-500 mt-1">
                                                                                🚶 {comedor.distancia.toFixed(1)} km
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                    <span className={`text-xs font-medium px-2 py-1 rounded flex-shrink-0 ${
                                                                        comedor.estado === 'abierto' 
                                                                            ? 'bg-green-100 text-green-800'
                                                                            : comedor.estado === 'cerrado'
                                                                            ? 'bg-red-100 text-red-800'
                                                                            : 'bg-yellow-100 text-yellow-800'
                                                                    }`}>
                                                                        {comedor.estado === 'abierto' ? '🟢' : comedor.estado === 'cerrado' ? '🔴' : '🟡'}
                                                                    </span>
                                                                </div>
                                                            </button>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <MapaLeaflet 
                                        comedores={comedoresFiltrados}
                                        center={mapCenter}
                                        zoom={mapZoom}
                                        userLocation={userLocation}
                                        comedorSeleccionado={comedorSeleccionado}
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
