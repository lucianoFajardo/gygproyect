'use client'
import { useState } from 'react'
import { login, signup } from './actions'

export default function LoginPage() {

    const [isLoading, setIsloading] = useState(false);
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Inicio de Sesión</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Correo Electrónico</label>
                            <input
                                type="email" name="email" id="email" required className="input input-bordered w-full mt-2" placeholder='Correo electronico'
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700">Contraseña</label>
                            <input
                                type="password" name="password" id='password' required className="input input-bordered w-full mt-2"
                                placeholder='Contraseña'
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            formAction={login}
                        >
                            Ingresar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            formAction={signup}
                        >
                            crear cuenta
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}


// TODO -> user prueba admin@gm.cm , admin123