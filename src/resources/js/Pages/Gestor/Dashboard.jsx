import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Panel de Gestor
                </h2>
            }
        >
            <Head title="Gestor Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-2xl font-bold mb-2">
                                Bienvenido, {auth.user.name}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Gestiona tu comedor social
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Card: Actualizar Estado */}
                                <Link
                                    href={route('gestor.estado')}
                                    className="block p-6 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition"
                                >
                                    <h4 className="text-xl font-semibold text-blue-800 mb-2">
                                        Estado del Día
                                    </h4>
                                    <p className="text-gray-600">
                                        Actualizar estado y aforo disponible
                                    </p>
                                </Link>

                                {/* Card: Gestionar Horarios */}
                                <Link
                                    href={route('gestor.horarios')}
                                    className="block p-6 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition"
                                >
                                    <h4 className="text-xl font-semibold text-green-800 mb-2">
                                        Horarios
                                    </h4>
                                    <p className="text-gray-600">
                                        Configurar horarios de apertura
                                    </p>
                                </Link>

                                {/* Card: Gestionar Necesidades */}
                                <Link
                                    href={route('gestor.necesidades')}
                                    className="block p-6 bg-yellow-50 hover:bg-yellow-100 rounded-lg border border-yellow-200 transition"
                                >
                                    <h4 className="text-xl font-semibold text-yellow-800 mb-2">
                                        Necesidades
                                    </h4>
                                    <p className="text-gray-600">
                                        Publicar necesidades del comedor
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
