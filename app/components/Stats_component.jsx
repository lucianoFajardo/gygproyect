'use client'
import React, { useEffect, useState } from 'react'
import GetPrice, { GetTotalClients } from './js/stats_server';

export default function Stats_component() {

    const [payments, setPayments] = useState();
    const [totalClient , setTotalClient] = useState();
    //* despues adaptarlo a modo telefono,
    //* aqui debo de mostrar la data obenida de supabase

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataPrices = await GetPrice();
                setPayments(dataPrices);
                const dataClientTotal = await GetTotalClients();
                setTotalClient(dataClientTotal);
            } catch (error) {
                console.error('Catch Error -> ', error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="stats shadow grid grid-flow-col justify-stretch ">
            <div className="stat">
                <div className="stat-figure text-primary">
                </div>
                <div className="stat-title">Dinero total </div>
                <div className="stat-value text-primary">$ {payments}</div>
            </div>
            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-8 w-8 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                </div>
                <div className="stat-title">Total de clientes</div>
                <div className="stat-value text-secondary">{totalClient}</div>
                <div className="stat-desc">Clientes instalados nuevos</div>
            </div>

            <div className="stat">
                <div className="stat-title">Tareas a realizar</div>
                <div className="stat-desc text-secondary">tareas pendientes</div>
                <div className="stat-desc text-secondary">tareas pendientes</div>
                <div className="stat-desc text-secondary">tareas pendientes</div>
            </div>
        </div>
    )
}


//* en este apartado tengo que obtener los datos y el plan de todos los usuarios para sacar un total completo del dinero
// * despues debo de poder obtener la cantidad total de dinero hasta el momento en ese mes , osea si es junio todo el dinero total hasta el 30 de todos los meses
//* si empieza un nuevo mes tiene que volver el contador a cero y mostrar el total de cliente que han pagado hasta ese momento