import { Head, Link } from '@inertiajs/react';

export default function FichaComedor({ comedor, auth }) {
    // Agrupar horarios por día de la semana
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const horariosPorDia = diasSemana.map(dia => ({
        dia,
        horarios: comedor.horarios?.filter(h => h.dia_semana === dia) || []
    }));

    // Filtrar comentarios aprobados
    const comentariosAprobados = comedor.comentarios?.filter(c => c.aprobado) || [];

    // Obtener indicador de estado
    const getEstadoBadge = (estadoActual) => {
        const badges = {
            abierto: { text: '🟢 Abierto', color: 'bg-green-100 text-green-800' },
            cerrado: { text: '🔴 Cerrado', color: 'bg-red-100 text-red-800' },
            completo: { text: '🟡 Completo', color: 'bg-yellow-100 text-yellow-800' }
        };
        return badges[estadoActual] || badges.cerrado;
    };

    const estadoBadge = getEstadoBadge(comedor.estado_actual);

    return (
        <>
            <Head title={comedor.nombre} />

            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                        <Link
                            href={route('mapa')}
                            className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2"
                        >
                            ← Volver al mapa
                        </Link>
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
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                        {/* Información Principal */}
                        <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden">
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                            {comedor.nombre}
                                        </h1>
                                        <p className="text-gray-600 mb-4">
                                            📍 {comedor.direccion}
                                        </p>
                                    </div>
                                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${estadoBadge.color}`}>
                                        {estadoBadge.text}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    {comedor.telefono && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-700 font-semibold">📞 Teléfono:</span>
                                            <a 
                                                href={`tel:${comedor.telefono}`}
                                                className="text-indigo-600 hover:underline"
                                            >
                                                {comedor.telefono}
                                            </a>
                                        </div>
                                    )}
                                    {comedor.email && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-700 font-semibold">✉️ Email:</span>
                                            <a 
                                                href={`mailto:${comedor.email}`}
                                                className="text-indigo-600 hover:underline"
                                            >
                                                {comedor.email}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {comedor.descripcion && (
                                    <div className="mt-6">
                                        <h2 className="text-xl font-semibold mb-2">Descripción</h2>
                                        <p className="text-gray-700">{comedor.descripcion}</p>
                                    </div>
                                )}

                                {comedor.normas && (
                                    <div className="mt-6">
                                        <h2 className="text-xl font-semibold mb-2">Normas de acceso</h2>
                                        <p className="text-gray-700 whitespace-pre-line">{comedor.normas}</p>
                                    </div>
                                )}

                                {/* Botón Cómo llegar */}
                                <div className="mt-6">
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${comedor.latitud},${comedor.longitud}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                                    >
                                        🗺️ Cómo llegar
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Horarios */}
                        <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-4">Horarios</h2>
                                {horariosPorDia.some(d => d.horarios.length > 0) ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Día
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Hora Inicio
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Hora Fin
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Observaciones
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {horariosPorDia.map(({ dia, horarios }) => 
                                                    horarios.map((horario, index) => (
                                                        <tr key={horario.id_horario} className="hover:bg-gray-50">
                                                            {index === 0 && (
                                                                <td 
                                                                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                                                                    rowSpan={horarios.length}
                                                                >
                                                                    {dia}
                                                                </td>
                                                            )}
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                                {horario.hora_inicio}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                                {horario.hora_fin}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                                {horario.observaciones || '-'}
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No hay horarios disponibles</p>
                                )}
                            </div>
                        </div>

                        {/* Necesidades */}
                        {comedor.necesidades && comedor.necesidades.length > 0 && (
                            <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold">¿Cómo puedes ayudar?</h2>
                                        <span className="text-sm text-gray-600">
                                            {comedor.necesidades.length} necesidad{comedor.necesidades.length !== 1 ? 'es' : ''} actual{comedor.necesidades.length !== 1 ? 'es' : ''}
                                        </span>
                                    </div>
                                    
                                    {/* Call to action para donaciones */}
                                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                                        <h3 className="font-semibold text-indigo-900 mb-2">💙 ¿Quieres colaborar?</h3>
                                        <p className="text-sm text-indigo-800 mb-3">
                                            Estas son las necesidades más urgentes del comedor. Puedes ayudar donando estos productos o contactándolos para ofrecerte como voluntario.
                                        </p>
                                        <div className="flex flex-wrap gap-4 text-sm">
                                            {comedor.telefono && (
                                                <a 
                                                    href={`tel:${comedor.telefono}`}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                                >
                                                    📞 Llamar: {comedor.telefono}
                                                </a>
                                            )}
                                            {comedor.email && (
                                                <a 
                                                    href={`mailto:${comedor.email}`}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition"
                                                >
                                                    ✉️ Enviar email
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {comedor.necesidades.map((necesidad) => {
                                            const urgencias = {
                                                baja: { text: 'Baja', color: 'bg-blue-100 text-blue-800', icon: '🔵' },
                                                media: { text: 'Media', color: 'bg-yellow-100 text-yellow-800', icon: '🟡' },
                                                alta: { text: 'Alta', color: 'bg-red-100 text-red-800', icon: '🔴' }
                                            };
                                            const urgencia = urgencias[necesidad.urgencia] || urgencias.baja;

                                            // Iconos por tipo de necesidad
                                            const tipoIconos = {
                                                'Alimentos': '🍽️',
                                                'Productos de higiene': '🧴',
                                                'Voluntariado': '🤝',
                                                'Ropa': '👕',
                                                'Otros': '📦'
                                            };
                                            const icono = tipoIconos[necesidad.tipo] || '📋';

                                            return (
                                                <div 
                                                    key={necesidad.id_necesidad}
                                                    className="border-2 border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                                                >
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-2xl">{icono}</span>
                                                            <h3 className="font-semibold text-lg">{necesidad.tipo}</h3>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${urgencia.color}`}>
                                                            <span>{urgencia.icon}</span>
                                                            {urgencia.text}
                                                        </span>
                                                    </div>
                                                    {necesidad.descripcion && (
                                                        <p className="text-sm text-gray-700 leading-relaxed">
                                                            {necesidad.descripcion}
                                                        </p>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Comentarios */}
                        {comentariosAprobados.length > 0 && (
                            <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
                                    <div className="space-y-4">
                                        {comentariosAprobados.map((comentario) => (
                                            <div 
                                                key={comentario.id_comentario}
                                                className="border-l-4 border-indigo-500 pl-4 py-2"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-semibold text-gray-900">
                                                        {comentario.user?.name || 'Usuario'}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(comentario.created_at).toLocaleDateString('es-ES')}
                                                    </span>
                                                </div>
                                                <p className="text-gray-700">{comentario.contenido}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
