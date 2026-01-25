import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';

export default function RegistrarComedor() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        direccion: '',
        latitud: '',
        longitud: '',
        telefono: '',
        email: '',
        descripcion: '',
        normas: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('gestor.comedores.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Registrar Nuevo Comedor
                </h2>
            }
        >
            <Head title="Registrar Comedor" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6 max-w-2xl">
                                <div>
                                    <InputLabel htmlFor="nombre" value="Nombre del Comedor" />
                                    <TextInput
                                        id="nombre"
                                        type="text"
                                        name="nombre"
                                        value={data.nombre}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('nombre', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.nombre} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="direccion" value="Dirección" />
                                    <TextInput
                                        id="direccion"
                                        type="text"
                                        name="direccion"
                                        value={data.direccion}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('direccion', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.direccion} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="latitud" value="Latitud" />
                                        <TextInput
                                            id="latitud"
                                            type="number"
                                            step="0.000001"
                                            name="latitud"
                                            value={data.latitud}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('latitud', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.latitud} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="longitud" value="Longitud" />
                                        <TextInput
                                            id="longitud"
                                            type="number"
                                            step="0.000001"
                                            name="longitud"
                                            value={data.longitud}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('longitud', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.longitud} className="mt-2" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="telefono" value="Teléfono" />
                                        <TextInput
                                            id="telefono"
                                            type="text"
                                            name="telefono"
                                            value={data.telefono}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('telefono', e.target.value)}
                                        />
                                        <InputError message={errors.telefono} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="email" value="Email del Comedor" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="descripcion" value="Descripción" />
                                    <textarea
                                        id="descripcion"
                                        name="descripcion"
                                        value={data.descripcion}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="3"
                                        onChange={(e) => setData('descripcion', e.target.value)}
                                    ></textarea>
                                    <InputError message={errors.descripcion} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="normas" value="Normas de Acceso" />
                                    <textarea
                                        id="normas"
                                        name="normas"
                                        value={data.normas}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="3"
                                        onChange={(e) => setData('normas', e.target.value)}
                                    ></textarea>
                                    <InputError message={errors.normas} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href={route('gestor.dashboard')}
                                        className="text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        Cancelar
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        Registrar Comedor
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