'use client'
import React from 'react'
import Navbar_component from '../components/Navbar_component'
import Stats_component from '../components/Stats_component'

export default function Dashboard_page() {
    return (
        <>
            <section>
                <p>estadisticas</p>
                <Stats_component />
                <h1>Clientes nuevos: mostrar 10 nuevos</h1>
                <div className='bg-gray-200 rounded-lg'>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* cabezera*/}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Nombre cliente</th>
                                    <th>Telefono</th>
                                    <th>Direccion</th>
                                    <th>Fechas de pago</th>
                                    <th>Plan</th>
                                    <th>Ubicacion gps</th>
                                    <th>foto de antena</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>Raul lucidio</td>
                                    <td>982261454</td>
                                    <td>av colima St 33</td>
                                    <td>1 al 15</td>
                                    <td>$ 25.000</td>
                                    <td>ubicacion </td>
                                    <td>pantallazo de antena</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='p-5'>
                    <button class="btn btn-primary" onClick={() => console.log('ver todos los clientes')}>ver clientes</button>
                </div>
            </section>
        </>
    )
}
