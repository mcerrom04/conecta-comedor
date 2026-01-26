import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { MessageSquare, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

export default function ModerarComentarios({ comentarios }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Moderación de Comentarios
                    </h2>
                    <Link
                        href={route('admin.dashboard')}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition"
                    >
                        <ArrowLeft size={16} /> Volver al panel
                    </Link>
                </div>
            }
        >
            <Head title="Moderar Comentarios" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {comentarios.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="flex justify-center mb-4">
                                        <MessageSquare size={64} className="text-gray-200" />
                                    </div>
                                    <p className="text-gray-500 text-lg">
                                        No hay comentarios pendientes de moderación
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center pb-4 border-b">
                                        <p className="text-gray-600">
                                            Total pendientes: <span className="font-bold text-indigo-600">{comentarios.length}</span>
                                        </p>
                                    </div>
                                    
                                    <div className="grid gap-6">
                                        {comentarios.map((comentario) => (
                                            <ComentarioCard key={comentario.id_comentario} comentario={comentario} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function ComentarioCard({ comentario }) {
    const { post, processing } = useForm();

    const handleAprobar = () => {
        post(route('admin.comentarios.aprobar', comentario.id_comentario), {
            preserveScroll: true
        });
    };

    const handleRechazar = () => {
        if (confirm('¿Estás seguro de rechazar este comentario? Se ocultará de la vista pública.')) {
            post(route('admin.comentarios.rechazar', comentario.id_comentario), {
                preserveScroll: true
            });
        }
    };

    return (
        <div className="border border-gray-100 bg-gray-50 rounded-xl p-6 transition-all hover:bg-white hover:shadow-md">
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-gray-900">{comentario.user.name}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-500">
                            {new Date(comentario.created_at).toLocaleDateString()} a las {new Date(comentario.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>

                    <div className="mb-3 text-sm flex items-center gap-1 text-gray-600">
                        <span>En:</span>
                        <span className="font-semibold text-indigo-600 italic">
                            {comentario.comedor.nombre}
                        </span>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-100 text-gray-700 italic">
                        "{comentario.texto}"
                    </div>
                </div>

                <div className="flex flex-row md:flex-col gap-2 justify-end">
                    <button
                        onClick={handleAprobar}
                        disabled={processing}
                        className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        <CheckCircle size={16} />
                        Aprobar
                    </button>
                    <button
                        onClick={handleRechazar}
                        disabled={processing}
                        className="px-4 py-2 bg-red-100 text-red-700 text-sm font-bold rounded-lg hover:bg-red-200 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        <XCircle size={16} />
                        Rechazar
                    </button>
                </div>
            </div>
        </div>
    );
}
