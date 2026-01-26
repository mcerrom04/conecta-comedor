import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Phone, MessageSquare, Info } from 'lucide-react';

// Fix para los iconos de Leaflet en Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

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
                    ref={(ref) => {
                        if (ref) {
                            markersRef.current[comedor.id_comedor] = ref;
                        }
                    }}
                >
                    <Popup>
                        <div className="p-2 min-w-[150px]">
                            <h3 className="font-bold text-gray-900 border-b pb-1 mb-2">{comedor.nombre}</h3>
                            <div className="flex items-start gap-1 text-xs text-gray-600 mb-1">
                                <MapPin size={12} className="mt-0.5 flex-shrink-0" />
                                <span>{comedor.direccion}</span>
                            </div>
                            {comedor.distancia && (
                                <div className="flex items-center gap-1 text-xs text-indigo-600 font-semibold mb-1">
                                    <Info size={12} />
                                    <span>{comedor.distancia.toFixed(2)} km de ti</span>
                                </div>
                            )}
                            {comedor.telefono && (
                                <div className="flex items-center gap-1 text-xs mb-2">
                                    <Phone size={12} />
                                    <a href={`tel:${comedor.telefono}`} className="text-blue-600 hover:underline">
                                        {comedor.telefono}
                                    </a>
                                </div>
                            )}
                            {comedor.observaciones && (
                                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-[10px] text-yellow-800 italic">
                                    <strong>Aviso:</strong> {comedor.observaciones}
                                </div>
                            )}
                            <a
                                href={route('comedor.show', { id: comedor.id_comedor })}
                                className="inline-block mt-3 text-center w-full text-xs text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md font-medium transition"
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
