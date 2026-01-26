import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function GestionarNecesidades({ comedor }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        tipo: 'Alimentos',
        descripcion: '',
        urgencia: 'media',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('gestor.necesidades.store', { comedor: comedor.id_comedor }), {
            onSuccess: () => reset('descripcion'),
        });
    };

    const deleteNecesidad = (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta necesidad?')) {
            router.delete(route('gestor.necesidades.destroy', { 
                comedor: comedor.id_comedor, 
                necesidad: id 
            }));
        }
    };

    const urgencias = {
        baja: { text: 'Baja', color: 'bg-blue-100 text-blue-800' },
        media: { text: 'Media', color: 'bg-yellow-100 text-yellow-800' },
        alta: { text: 'Alta', color: 'bg-red-100 text-red-800' }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Gestionar Necesidades: {comedor.nombre}
                </h2>
            }
        >
            <Head title={`Necesidades - ${comedor.nombre}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Formulario para añadir necesidad */}
                    <div className="bg-white p-6 shadow sm:rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Publicar Nueva Necesidad</h3>
                        <form onSubmit={submit} className="space-y-6 max-w-2xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="tipo" value="Categoría" />
                                    <select
                                        id="tipo"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.tipo}
                                        onChange={(e) => setData('tipo', e.target.value)}
                                        required
                                    >
                                        <option value="Alimentos">Alimentos</option>
                                        <option value="Productos de higiene">Productos de higiene</option>
                                        <option value="Voluntariado">Voluntariado</option>
                                        <option value="Ropa">Ropa</option>
                                        <option value="Otros">Otros</option>
                                    </select>
                                    <InputError message={errors.tipo} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="urgencia" value="Prioridad / Urgencia" />
                                    <select
                                        id="urgencia"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.urgencia}
                                        onChange={(e) => setData('urgencia', e.target.value)}
                                        required
                                    >
                                        <option value="baja">Baja</option>
                                        <option value="media">Media</option>
                                        <option value="alta">Alta</option>
                                    </select>
                                    <InputError message={errors.urgencia} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="descripcion" value="Descripción de lo que se necesita" />
                                <textarea
                                    id="descripcion"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    rows="3"
                                    value={data.descripcion}
                                    onChange={(e) => setData('descripcion', e.target.value)}
                                    placeholder="Ej: Necesitamos 10kg de arroz y aceite para esta semana."
                                    required
                                ></textarea>
                                <InputError message={errors.descripcion} className="mt-2" />
                            </div>

                            <div>
                                <PrimaryButton disabled={processing}>
                                    Publicar Necesidad
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>

                    {/* Lista de necesidades actuales */}
                    <div className="bg-white shadow sm:rounded-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Necesidades Actuales</h3>
                        </div>
                        <div className="p-6">
                            {comedor.necesidades && comedor.necesidades.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {comedor.necesidades.map((necesidad) => (
                                        <div key={necesidad.id_necesidad} className="border rounded-lg p-4 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-bold text-gray-900">{necesidad.tipo}</h4>
                                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${urgencias[necesidad.urgencia].color}`}>
                                                        {urgencias[necesidad.urgencia].text}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-4">{necesidad.descripcion}</p>
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => deleteNecesidad(necesidad.id_necesidad)}
                                                    className="text-sm text-red-600 hover:text-red-900 font-medium"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-4">No hay necesidades publicadas actualmente.</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between items-center px-4 sm:px-0">
                        <p className="text-sm text-gray-500 italic">
                            Las necesidades son visibles públicamente en la ficha de tu comedor.
                        </p>
                        <Link
                            href={route('gestor.dashboard')}
                            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
                        >
                            Volver al Panel
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
