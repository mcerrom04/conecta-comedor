import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { 
    MapPin, 
    Phone, 
    Mail, 
    Map as MapIcon, 
    Megaphone, 
    Utensils, 
    Shirt, 
    Package, 
    Droplet, 
    Accessibility, 
    AlertCircle,
    Info,
    Calendar,
    Users,
    Clock,
    History,
    Handshake,
    MessageSquare,
    CheckCircle
} from 'lucide-react';

export default function FichaComedor({ comedor, auth }) {
    // Agrupar horarios por día de la semana
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const horariosPorDia = diasSemana.map(dia => ({
        dia,
        horarios: comedor.horarios?.filter(h => h.dia_semana === dia) || []
    }));

    // Filtrar comentarios aprobados
    const comentariosAprobados = comedor.comentarios?.filter(c => c.estado === 'aprobado') || [];

    // Formulario para comentarios
    const { data, setData, post, processing, reset, errors, wasSuccessful } = useForm({
        id_comedor: comedor.id_comedor,
        texto: '',
    });

    const submitComentario = (e) => {
        e.preventDefault();
        post(route('comentarios.store'), {
            onSuccess: () => reset('texto'),
            preserveScroll: true,
        });
    };

    const [estadoEnVivo, setEstadoEnVivo] = useState({
        estadoActual: comedor.estado_actual,
        aforoDisponible: comedor.aforo_disponible,
        ultimaActualizacion: comedor.ultima_actualizacion,
        observaciones: comedor.observaciones,
    });

    // Obtener indicador de estado
    const getEstadoBadge = (estadoActual) => {
        const badges = {
            abierto: { text: 'Abierto', color: 'bg-green-100 text-green-800' },
            cerrado: { text: 'Cerrado', color: 'bg-red-100 text-red-800' },
            completo: { text: 'Completo', color: 'bg-yellow-100 text-yellow-800' }
        };
        return badges[estadoActual] || badges.cerrado;
    };

    const formatearFecha = (valor) => {
        if (!valor) {
            return 'Sin datos';
        }
        return new Date(valor).toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' });
    };

    const estadoBadge = getEstadoBadge(estadoEnVivo.estadoActual);

    useEffect(() => {
        let isMounted = true;

        const fetchEstado = async () => {
            try {
                const response = await fetch(route('comedor.estado', { id: comedor.id_comedor }));
                if (!response.ok) {
                    throw new Error('No se pudo obtener el estado actualizado.');
                }
                const payload = await response.json();
                if (!isMounted) {
                    return;
                }
                setEstadoEnVivo((prev) => ({
                    estadoActual: payload.estado_actual ?? prev.estadoActual,
                    aforoDisponible: payload.aforo_disponible ?? prev.aforoDisponible,
                    ultimaActualizacion: payload.ultima_actualizacion ?? prev.ultimaActualizacion,
                    observaciones: payload.observaciones ?? prev.observaciones,
                }));
            } catch (error) {
                console.error('Error actualizando el estado del comedor:', error);
            }
        };

        fetchEstado();
        const interval = setInterval(fetchEstado, 45000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [comedor.id_comedor]);

    return (
        <FrontendLayout auth={auth}>
            <Head title={comedor.nombre} />

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
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={18} className="mr-2" />
                                            <p>{comedor.direccion}</p>
                                        </div>
                                    </div>
                                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${estadoBadge.color}`}>
                                        <div className={`w-2 h-2 rounded-full mr-2 ${
                                            estadoEnVivo.estadoActual === 'abierto' ? 'bg-green-500' : 
                                            estadoEnVivo.estadoActual === 'completo' ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}></div>
                                        {estadoBadge.text}
                                    </span>
                                </div>

                                <div className="mt-4 grid gap-4 text-sm text-gray-600 sm:grid-cols-3">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs uppercase tracking-wide font-semibold text-gray-500">Aforo disponible</span>
                                        <span className="font-semibold text-gray-900">
                                            {estadoEnVivo.aforoDisponible === null ? 'Sin datos' : `${estadoEnVivo.aforoDisponible} plazas`}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs uppercase tracking-wide font-semibold text-gray-500">Última actualización</span>
                                        <span className="font-semibold text-gray-900">
                                            {formatearFecha(estadoEnVivo.ultimaActualizacion)}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs uppercase tracking-wide font-semibold text-gray-500">Actualización</span>
                                        <span className="font-semibold text-indigo-600">Cada 45 segundos</span>
                                    </div>
                                </div>

                                {estadoEnVivo.observaciones && (
                                    <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                                        <div className="flex items-center">
                                            <Megaphone className="text-yellow-600 mr-2" size={20} />
                                            <h3 className="font-bold text-yellow-800">Aviso del gestor</h3>
                                        </div>
                                        <p className="mt-1 text-yellow-900">
                                            {estadoEnVivo.observaciones}
                                        </p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    {comedor.telefono && (
                                        <div className="flex items-center gap-2">
                                            <Phone size={18} className="text-gray-500" />
                                            <span className="text-gray-700 font-semibold">Teléfono:</span>
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
                                            <Mail size={18} className="text-gray-500" />
                                            <span className="text-gray-700 font-semibold">Email:</span>
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
                                        <MapIcon size={20} />
                                        Cómo llegar
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
                                        <h3 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                                            <Info size={18} /> ¿Quieres colaborar?
                                        </h3>
                                        <p className="text-sm text-indigo-800 mb-3">
                                            Estas son las necesidades más urgentes del comedor. Puedes ayudar donando estos productos o contactándolos para ofrecerte como voluntario.
                                        </p>
                                        <div className="flex flex-wrap gap-4 text-sm">
                                            {comedor.telefono && (
                                                <a 
                                                    href={`tel:${comedor.telefono}`}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                                >
                                                    <Phone size={16} /> Llamar: {comedor.telefono}
                                                </a>
                                            )}
                                            {comedor.email && (
                                                <a 
                                                    href={`mailto:${comedor.email}`}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition"
                                                >
                                                    <Mail size={16} /> Enviar email
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {comedor.necesidades.map((necesidad) => {
                                            const urgencias = {
                                                baja: { text: 'Baja', color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
                                                media: { text: 'Media', color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' },
                                                alta: { text: 'Alta', color: 'bg-red-100 text-red-800', dot: 'bg-red-500' }
                                            };
                                            const urgencia = urgencias[necesidad.urgencia] || urgencias.baja;

                                            // Iconos por tipo de necesidad
                                            const tipoIconos = {
                                                'Alimentos': <Utensils size={24} className="text-indigo-500" />,
                                                'Productos de higiene': <Droplet size={24} className="text-indigo-500" />,
                                                'Voluntariado': <Handshake size={24} className="text-indigo-500" />,
                                                'Ropa': <Shirt size={24} className="text-indigo-500" />,
                                                'Otros': <Package size={24} className="text-indigo-500" />
                                            };
                                            const icono = tipoIconos[necesidad.tipo] || <Info size={24} className="text-indigo-500" />;

                                            return (
                                                <div 
                                                    key={necesidad.id_necesidad}
                                                    className="border-2 border-gray-100 rounded-lg p-5 hover:border-indigo-200 transition"
                                                >
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-indigo-50 rounded-lg">
                                                                {icono}
                                                            </div>
                                                            <h3 className="font-semibold text-lg text-gray-900">{necesidad.tipo}</h3>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 ${urgencia.color}`}>
                                                            <div className={`w-2 h-2 rounded-full ${urgencia.dot}`}></div>
                                                            {urgencia.text}
                                                        </span>
                                                    </div>
                                                    {necesidad.descripcion && (
                                                        <p className="text-sm text-gray-600 leading-relaxed">
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
                        <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 border-b pb-4">
                                    <MessageSquare className="text-indigo-600" /> Opiniones y Comentarios
                                </h2>

                                {/* Formulario para nuevo comentario */}
                                {auth.user ? (
                                    <div className="mb-10 bg-gray-50 p-6 rounded-xl border border-gray-100">
                                        <h3 className="font-bold text-gray-900 mb-4 text-lg">Deja tu opinión</h3>
                                        <form onSubmit={submitComentario}>
                                            <div className="mb-4">
                                                <textarea
                                                    value={data.texto}
                                                    onChange={e => setData('texto', e.target.value)}
                                                    className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition shadow-sm"
                                                    rows="3"
                                                    placeholder="Escribe tu experiencia o información útil para otros usuarios..."
                                                    required
                                                ></textarea>
                                                {errors.texto && <div className="text-red-600 text-sm mt-1">{errors.texto}</div>}
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className="text-xs text-gray-500">
                                                    * Los comentarios serán revisados por un moderador antes de publicarse.
                                                </p>
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                                                >
                                                    {processing ? 'Enviando...' : 'Enviar comentario'}
                                                </button>
                                            </div>
                                            {wasSuccessful && (
                                                <div className="mt-4 p-4 bg-green-50 text-green-800 border-l-4 border-green-400 rounded-r-lg text-sm font-medium flex items-center gap-2">
                                                    <CheckCircle size={18} className="text-green-600" />
                                                    Tu comentario ha sido enviado correctamente y está pendiente de moderación.
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                ) : (
                                    <div className="mb-10 text-center p-6 border-2 border-dashed border-gray-200 rounded-xl">
                                        <p className="text-gray-600 mb-4">Inicia sesión para dejar un comentario</p>
                                        <Link 
                                            href={route('login')}
                                            className="inline-block px-6 py-2 bg-white border border-indigo-600 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition"
                                        >
                                            Identificarse
                                        </Link>
                                    </div>
                                )}

                                {/* Lista de comentarios */}
                                {comentariosAprobados.length > 0 ? (
                                    <div className="space-y-6">
                                        {comentariosAprobados.map((comentario) => (
                                            <div 
                                                key={comentario.id_comentario}
                                                className="bg-white border border-gray-100 p-5 rounded-xl transition hover:shadow-md"
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                                            {comentario.user?.name?.charAt(0) || 'U'}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-gray-900 leading-none">
                                                                {comentario.user?.name || 'Usuario'}
                                                            </div>
                                                            <div className="text-xs text-gray-400 mt-1">
                                                                {new Date(comentario.created_at).toLocaleDateString('es-ES')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-gray-700 leading-relaxed italic">
                                                    "{comentario.texto}"
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 bg-gray-50 rounded-xl">
                                        <p className="text-gray-500">Aún no hay opiniones sobre este comedor.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
        </FrontendLayout>
    );
}
