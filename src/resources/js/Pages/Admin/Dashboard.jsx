import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Panel de Administración
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-2xl font-bold mb-6">
                                Bienvenido, Administrador
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Card: Comedores Pendientes */}
                                <Link
                                    href={route('admin.comedores.pendientes')}
                                    className="block p-6 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition"
                                >
                                    <h4 className="text-xl font-semibold text-blue-800 mb-2">
                                        Comedores Pendientes
                                    </h4>
                                    <p className="text-gray-600">
                                        Aprobar o rechazar solicitudes de nuevos comedores
                                    </p>
                                </Link>

                                {/* Card: Moderar Comentarios */}
                                <Link
                                    href={route('admin.comentarios.moderar')}
                                    className="block p-6 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition"
                                >
                                    <h4 className="text-xl font-semibold text-green-800 mb-2">
                                        Moderar Comentarios
                                    </h4>
                                    <p className="text-gray-600">
                                        Revisar y aprobar comentarios pendientes
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
