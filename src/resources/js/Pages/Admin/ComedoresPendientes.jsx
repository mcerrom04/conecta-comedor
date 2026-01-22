import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ComedoresPendientes({ comedores }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Comedores Pendientes de Aprobación
                    </h2>
                    <Link
                        href={route('admin.dashboard')}
                        className="text-indigo-600 hover:text-indigo-700"
                    >
                        ← Volver al panel
                    </Link>
                </div>
            }
        >
            <Head title="Comedores Pendientes" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {comedores.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">
                                        No hay comedores pendientes de aprobación
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <p className="text-gray-600 mb-4">
                                        Total pendientes: <span className="font-semibold">{comedores.length}</span>
                                    </p>
                                    
                                    {comedores.map((comedor) => (
                                        <ComedorCard key={comedor.id_comedor} comedor={comedor} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function ComedorCard({ comedor }) {
    const { post, processing } = useForm();

    const handleAprobar = () => {
        if (confirm('¿Estás seguro de aprobar este comedor?')) {
            post(route('admin.comedores.aprobar', comedor.id_comedor));
        }
    };

    const handleRechazar = () => {
        if (confirm('¿Estás seguro de rechazar este comedor?')) {
            post(route('admin.comedores.rechazar', comedor.id_comedor));
        }
    };

    return (
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">
                            {comedor.nombre}
                        </h3>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                            Pendiente
                        </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                        <p className="flex items-center gap-2">
                            <span className="font-semibold">📍 Dirección:</span>
                            {comedor.direccion}
                        </p>
                        
                        {comedor.telefono && (
                            <p className="flex items-center gap-2">
                                <span className="font-semibold">📞 Teléfono:</span>
                                {comedor.telefono}
                            </p>
                        )}
                        
                        {comedor.email && (
                            <p className="flex items-center gap-2">
                                <span className="font-semibold">✉️ Email:</span>
                                {comedor.email}
                            </p>
                        )}

                        {comedor.descripcion && (
                            <p className="mt-3">
                                <span className="font-semibold">Descripción:</span>
                                <br />
                                <span className="text-gray-700">{comedor.descripcion}</span>
                            </p>
                        )}

                        {comedor.normas && (
                            <p className="mt-3">
                                <span className="font-semibold">Normas:</span>
                                <br />
                                <span className="text-gray-700 whitespace-pre-line">{comedor.normas}</span>
                            </p>
                        )}

                        {comedor.horarios && comedor.horarios.length > 0 && (
                            <div className="mt-3">
                                <span className="font-semibold">Horarios:</span>
                                <ul className="mt-1 ml-4 list-disc">
                                    {comedor.horarios.slice(0, 3).map((horario) => (
                                        <li key={horario.id_horario}>
                                            {horario.dia_semana}: {horario.hora_inicio} - {horario.hora_fin}
                                        </li>
                                    ))}
                                    {comedor.horarios.length > 3 && (
                                        <li className="text-indigo-600">
                                            +{comedor.horarios.length - 3} más...
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}

                        <p className="mt-3 text-xs text-gray-500">
                            Registrado el: {new Date(comedor.created_at).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                    onClick={handleAprobar}
                    disabled={processing}
                    className="flex-1 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                >
                    {processing ? 'Procesando...' : '✓ Aprobar'}
                </button>
                <button
                    onClick={handleRechazar}
                    disabled={processing}
                    className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                >
                    {processing ? 'Procesando...' : '✗ Rechazar'}
                </button>
                <Link
                    href={`/comedor/${comedor.id_comedor}`}
                    target="_blank"
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition text-center"
                >
                    Ver detalles →
                </Link>
            </div>
        </div>
    );
}
