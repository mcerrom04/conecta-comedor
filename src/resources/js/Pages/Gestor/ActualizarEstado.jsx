import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function ActualizarEstado({ comedor }) {
    const { data, setData, post, processing, errors } = useForm({
        estado_actual: comedor.estado_actual || 'cerrado',
        aforo_disponible: comedor.aforo_disponible || 0,
        observaciones: comedor.observaciones || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('gestor.comedor.update-estado', { comedor: comedor.id_comedor }));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Actualizar Estado: {comedor.nombre}
                </h2>
            }
        >
            <Head title={`Estado - ${comedor.nombre}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Estado Operativo Actual
                            </h3>
                            <p className="text-sm text-gray-600 mb-6">
                                Informa a los usuarios si el comedor está abierto, cerrado o si el aforo está completo en este momento.
                            </p>

                            <form onSubmit={submit} className="max-w-xl space-y-6">
                                <div>
                                    <InputLabel htmlFor="estado_actual" value="Estado" />
                                    <select
                                        id="estado_actual"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.estado_actual}
                                        onChange={(e) => setData('estado_actual', e.target.value)}
                                        required
                                    >
                                        <option value="abierto">Abierto</option>
                                        <option value="cerrado">Cerrado</option>
                                        <option value="completo">Completo / Aforo Agotado</option>
                                    </select>
                                    <InputError message={errors.estado_actual} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="aforo_disponible" value="Aforo Disponible" />
                                    <TextInput
                                        id="aforo_disponible"
                                        type="number"
                                        min="0"
                                        name="aforo_disponible"
                                        value={data.aforo_disponible}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('aforo_disponible', e.target.value)}
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Número aproximado de plazas libres en este momento.</p>
                                    <InputError message={errors.aforo_disponible} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="observaciones" value="Observaciones / Avisos" />
                                    <textarea
                                        id="observaciones"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="3"
                                        value={data.observaciones}
                                        onChange={(e) => setData('observaciones', e.target.value)}
                                        placeholder="Ej: Solo se sirve cena hoy. Reparto de tickets a las 18:00."
                                    ></textarea>
                                    <InputError message={errors.observaciones} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href={route('gestor.dashboard')}
                                        className="text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        Cancelar
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        Guardar Cambios
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
