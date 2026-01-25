import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ comedores }) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Panel de Gestor
                    </h2>
                    <Link
                        href={route('gestor.comedores.create')}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                    >
                        Registrar Nuevo Comedor
                    </Link>
                </div>
            }
        >
            <Head title="Gestor Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-2xl font-bold mb-2">
                                Bienvenido, {auth.user.name}
                            </h3>
                            <p className="text-gray-600">
                                Gestiona tus comedores sociales registrados.
                            </p>
                        </div>
                    </div>

                    <h3 className="text-lg font-medium text-gray-900 mb-4 px-4 sm:px-0">Tus Comedores</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                        {comedores && comedores.length > 0 ? (
                            comedores.map((comedor) => (
                                <div key={comedor.id_comedor} className="bg-white overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-indigo-500">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="text-xl font-bold text-gray-900">{comedor.nombre}</h4>
                                                <p className="text-sm text-gray-500">{comedor.direccion}</p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                comedor.estado === 'activo' ? 'bg-green-100 text-green-800' : 
                                                comedor.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' : 
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {comedor.estado.toUpperCase()}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3">
                                            <Link
                                                href={route('gestor.comedor.estado', { comedor: comedor.id_comedor })}
                                                className="flex items-center justify-center p-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition"
                                            >
                                                Actualizar Estado
                                            </Link>
                                            <div className="grid grid-cols-2 gap-2">
                                                <Link
                                                    href={route('gestor.horarios', { comedor: comedor.id_comedor })}
                                                    className="flex items-center justify-center p-2 bg-green-50 text-green-700 rounded hover:bg-green-100 transition"
                                                >
                                                    Horarios
                                                </Link>
                                                <Link
                                                    href={route('gestor.necesidades', { comedor: comedor.id_comedor })}
                                                    className="flex items-center justify-center p-2 bg-yellow-50 text-yellow-700 rounded hover:bg-yellow-100 transition"
                                                >
                                                    Necesidades
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="md:col-span-2 bg-white p-12 text-center rounded-lg shadow-sm">
                                <p className="text-gray-500 mb-4">No tienes comedores registrados todavía.</p>
                                <Link
                                    href={route('gestor.comedores.create')}
                                    className="text-indigo-600 font-semibold hover:underline"
                                >
                                    ¡Registra tu primer comedor ahora!
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
