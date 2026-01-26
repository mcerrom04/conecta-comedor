import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Phone, MessageSquare, Info } from 'lucide-react';


// Icono personalizado para la ubicación del usuario
const userIcon = L.divIcon({
    className: 'custom-user-marker',
    html: '<div style="background-color: #4f46e5; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

const searchIcon = L.divIcon({
    className: 'custom-search-marker',
    html: '<div style="background-color: #0ea5e9; width: 22px; height: 22px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(14,165,233,0.6);"></div>',
    iconSize: [22, 22],
    iconAnchor: [11, 11]
});

// Icono profesional para los comedores
const diningIcon = L.divIcon({
    className: 'custom-dining-marker',
    html: `
        <div style="
            background-color: #4f46e5; 
            width: 32px; 
            height: 32px; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            border: 2px solid white; 
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
                <path d="M7 2v20"></path>
                <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
            </svg>
        </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
});

// Componente para actualizar el centro del mapa cuando cambia
function MapUpdater({ center }) {
    const map = useMap();
    
    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);
    
    return null;
}

export default function MapaLeaflet({ comedores, center = [40.4168, -3.7038], zoom = 12, userLocation = null, searchLocation = null, comedorSeleccionado = null }) {
    const markersRef = useRef({});

    // Efecto para abrir el popup del comedor seleccionado
    useEffect(() => {
        if (comedorSeleccionado && markersRef.current[comedorSeleccionado.id_comedor]) {
            markersRef.current[comedorSeleccionado.id_comedor].openPopup();
        }
    }, [comedorSeleccionado]);

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: '100%', width: '100%', minHeight: '500px' }}
            className="rounded-lg"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <MapUpdater center={center} />
            
            {/* Marcador de ubicación del usuario */}
            {userLocation && (
                <>
                    <Marker
                        position={[userLocation.lat, userLocation.lng]}
                        icon={userIcon}
                    >
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-bold text-lg">Tu ubicación</h3>
                                <p className="text-sm text-gray-600">Estás aquí</p>
                            </div>
                        </Popup>
                    </Marker>
                    <Circle
                        center={[userLocation.lat, userLocation.lng]}
                        radius={100}
                        pathOptions={{ color: '#4f46e5', fillColor: '#4f46e5', fillOpacity: 0.1 }}
                    />
                </>
            )}
            {searchLocation && (
                <>
                    <Marker
                        position={[searchLocation.lat, searchLocation.lng]}
                        icon={searchIcon}
                    >
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-bold text-lg">Dirección buscada</h3>
                                <p className="text-sm text-gray-600">
                                    {searchLocation.label}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                    <Circle
                        center={[searchLocation.lat, searchLocation.lng]}
                        radius={200}
                        pathOptions={{ color: '#0ea5e9', fillColor: '#38bdf8', fillOpacity: 0.15 }}
                    />
                </>
            )}
            
            {/* Marcadores de comedores */}
            {comedores && comedores.map((comedor) => (
                <Marker
                    key={comedor.id_comedor}
                    position={[parseFloat(comedor.latitud), parseFloat(comedor.longitud)]}
                    icon={diningIcon}
                    ref={(ref) => {
                        if (ref) {
                            markersRef.current[comedor.id_comedor] = ref;
                        }
                    }}
                >
                    <Popup>
                        <div className="p-2 min-w-[180px]">
                            <h3 className="font-bold text-gray-900 border-b pb-1 mb-2 leading-tight">{comedor.nombre}</h3>
                            <div className="flex items-start gap-1 text-xs text-gray-600 mb-1">
                                <MapPin size={12} className="mt-0.5 flex-shrink-0 text-indigo-500" />
                                <span>{comedor.direccion}</span>
                            </div>
                            {comedor.distancia && (
                                <div className="flex items-center gap-1 text-[11px] text-indigo-600 font-semibold mb-1">
                                    <Info size={11} />
                                    <span>A {comedor.distancia.toFixed(2)} km de ti</span>
                                </div>
                            )}
                            {comedor.telefono && (
                                <div className="flex items-center gap-1 text-xs mb-2">
                                    <Phone size={12} className="text-gray-400" />
                                    <a href={`tel:${comedor.telefono}`} className="text-blue-600 hover:underline">
                                        {comedor.telefono}
                                    </a>
                                </div>
                            )}
                            {comedor.observaciones && (
                                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-[10px] text-yellow-800 italic leading-snug">
                                    <strong>Aviso:</strong> {comedor.observaciones}
                                </div>
                            )}
                            <a
                                href={route('comedor.show', { id: comedor.id_comedor })}
                                className="inline-block mt-3 text-center w-full text-xs text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-lg font-bold transition shadow-sm"
                                style={{ color: 'white', textDecoration: 'none' }}
                            >
                                Ver ficha completa
                            </a>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
