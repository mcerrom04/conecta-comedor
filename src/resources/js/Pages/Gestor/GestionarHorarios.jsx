import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ConfirmationModal from '@/Components/ConfirmationModal';
import { useState } from 'react';

export default function GestionarHorarios({ comedor }) {
    const [idEliminar, setIdEliminar] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        dia_semana: 'lunes',
        hora_apertura: '09:00',
        hora_cierre: '14:00',
        tipo_servicio: 'comida',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('gestor.horarios.store', { comedor: comedor.id_comedor }), {
            onSuccess: () => reset(),
        });
    };

    const deleteHorario = () => {
        router.delete(route('gestor.horarios.destroy', { 
            comedor: comedor.id_comedor, 
            horario: idEliminar 
        }), {
            onSuccess: () => setIdEliminar(null),
        });
    };

    const diasSemana = {
        lunes: 'Lunes',
        martes: 'Martes',
        miercoles: 'Miércoles',
        jueves: 'Jueves',
        viernes: 'Viernes',
        sabado: 'Sábado',
        domingo: 'Domingo'
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Gestionar Horarios: {comedor.nombre}
                </h2>
            }
        >
            <Head title={`Horarios - ${comedor.nombre}`} />

            <ConfirmationModal
                show={idEliminar !== null}
                onClose={() => setIdEliminar(null)}
                onConfirm={deleteHorario}
                title="Eliminar Horario"
                message="¿Estás seguro de que quieres eliminar esta franja horaria?"
                confirmText="Sí, eliminar"
                cancelText="Cancelar"
                type="danger"
            />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Formulario para añadir horario */}
                    <div className="bg-white p-6 shadow sm:rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Añadir Franja Horaria</h3>
                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                            <div>
                                <InputLabel htmlFor="dia_semana" value="Día" />
                                <select
                                    id="dia_semana"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    value={data.dia_semana}
                                    onChange={(e) => setData('dia_semana', e.target.value)}
                                    required
                                >
                                    {Object.entries(diasSemana).map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                                <InputError message={errors.dia_semana} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="hora_apertura" value="Apertura" />
                                <TextInput
                                    id="hora_apertura"
                                    type="time"
                                    value={data.hora_apertura}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('hora_apertura', e.target.value)}
                                    required
                                />
                                <InputError message={errors.hora_apertura} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="hora_cierre" value="Cierre" />
                                <TextInput
                                    id="hora_cierre"
                                    type="time"
                                    value={data.hora_cierre}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('hora_cierre', e.target.value)}
                                    required
                                />
                                <InputError message={errors.hora_cierre} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="tipo_servicio" value="Servicio" />
                                <select
                                    id="tipo_servicio"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    value={data.tipo_servicio}
                                    onChange={(e) => setData('tipo_servicio', e.target.value)}
                                >
                                    <option value="desayuno">Desayuno</option>
                                    <option value="comida">Comida</option>
                                    <option value="cena">Cena</option>
                                </select>
                                <InputError message={errors.tipo_servicio} className="mt-2" />
                            </div>

                            <div>
                                <PrimaryButton disabled={processing} className="w-full justify-center">
                                    Añadir
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>

                    {/* Lista de horarios actuales */}
                    <div className="bg-white shadow sm:rounded-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Horarios Configurados</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Día</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Servicio</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Horario</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {comedor.horarios && comedor.horarios.length > 0 ? (
                                        comedor.horarios
                                            .sort((a, b) => {
                                                const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
                                                if (a.dia_semana !== b.dia_semana) {
                                                    return dias.indexOf(a.dia_semana) - dias.indexOf(b.dia_semana);
                                                }
                                                return a.hora_apertura.localeCompare(b.hora_apertura);
                                            })
                                            .map((horario) => (
                                            <tr key={horario.id_horario} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {diasSemana[horario.dia_semana]}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                                    {horario.tipo_servicio}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {horario.hora_apertura.substring(0, 5)} - {horario.hora_cierre.substring(0, 5)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => setIdEliminar(horario.id_horario)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-10 text-center text-sm text-gray-500">
                                                No hay horarios configurados para este comedor.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex justify-end">
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
