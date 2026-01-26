import { Link } from '@inertiajs/react';
import { Handshake } from 'lucide-react';

export default function FrontendLayout({ auth, children, title }) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header / Navbar mejorado */}
            <nav className="bg-white shadow-sm border-b">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center">
                            <Link href={route('mapa')} className="flex items-center gap-2">
                                <Handshake size={28} className="text-indigo-600" />
                                <span className="text-xl font-bold tracking-tight text-gray-900 hidden sm:block">
                                    Conecta Comedor
                                </span>
                            </Link>
                        </div>

                        <div className="flex gap-4 items-center">
                            {auth?.user ? (
                                <>
                                    {auth.user.id_rol === 'ciudadano' ? (
                                        <>
                                            <Link
                                                href={route('profile.edit')}
                                                className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
                                            >
                                                Mi Perfil
                                            </Link>
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="rounded-md px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
                                            >
                                                Cerrar Sesión
                                            </Link>
                                        </>
                                    ) : (
                                        <Link
                                            href={route('dashboard')}
                                            className="rounded-md px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
                                        >
                                            Mi Panel
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
                                    >
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Contenido principal */}
            <main>
                {children}
            </main>

            {/* Footer simple */}
            <footer className="bg-white border-t mt-12">
                <div className="mx-auto max-w-7xl px-4 py-6 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Conecta Comedor - Sistema de Gestión Social
                </div>
            </footer>
        </div>
    );
}
