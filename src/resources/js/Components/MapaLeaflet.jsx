import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para los iconos de Leaflet en Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export default function MapaLeaflet({ comedores, center = [40.4168, -3.7038], zoom = 12 }) {
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
            
            {comedores && comedores.map((comedor) => (
                <Marker
                    key={comedor.id_comedor}
                    position={[parseFloat(comedor.latitud), parseFloat(comedor.longitud)]}
                >
                    <Popup>
                        <div className="p-2">
                            <h3 className="font-bold text-lg">{comedor.nombre}</h3>
                            <p className="text-sm text-gray-600">{comedor.direccion}</p>
                            {comedor.telefono && (
                                <p className="text-sm mt-1">
                                    📞 <a href={`tel:${comedor.telefono}`} className="text-blue-600 hover:underline">
                                        {comedor.telefono}
                                    </a>
                                </p>
                            )}
                            <a
                                href={`/comedor/${comedor.id_comedor}`}
                                className="inline-block mt-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded"
                            >
                                Ver detalles
                            </a>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
