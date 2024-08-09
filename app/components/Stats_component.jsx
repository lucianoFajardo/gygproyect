import React from 'react'

export default function Stats_component() {

    //* despues adaptarlo a modo telefono
    return (
        <div className="stats shadow grid grid-flow-col justify-stretch ">
            <div className="stat">
                <div className="stat-figure text-primary">
                </div>
                <div className="stat-title">Dinero total </div>
                <div className="stat-value text-primary">3.500.000</div>
                <div className="stat-desc">Mes de junio</div>
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
                <div className="stat-value text-secondary">1500</div>
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
