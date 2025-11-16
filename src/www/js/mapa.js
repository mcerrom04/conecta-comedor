// js/mapa.js
// Inicializar el mapa y mostrar los comedores

// Esperar a que el DOM esté listo
window.addEventListener('DOMContentLoaded', function() {
    var map = L.map('mapa').setView([40.4168, -3.7038], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    if (typeof comedores !== 'undefined' && Array.isArray(comedores)) {
        comedores.forEach(function(comedor) {
            if (comedor.latitud && comedor.longitud) {
                L.marker([comedor.latitud, comedor.longitud]).addTo(map)
                    .bindPopup(comedor.nombre);
            }
        });
    }
});
