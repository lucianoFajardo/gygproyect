'use client'
import React, { useEffect, useState } from 'react';
import Stats_component from '../components/Stats_component';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import GetDataUser from './getData_user_server';
export default function Dashboard_page() {
    const [dataUser, setDataUser] = useState([]);
    const [price , setPrice] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataCatch = await GetDataUser();
                setDataUser(dataCatch);
            } catch (error) {
                console.error('Catch Error -> ', error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const formatData = (value) => {
        const setDatacalendar = new Date(value);
        return setDatacalendar.toLocaleDateString('es-ES');
    };

    const dateBodyTemplate = (rowData) => {
        //* Asegúrate de que `dates` no esté vacío y selecciona la primera fecha
        if (rowData.dates && rowData.dates.length > 0) {
            const formattedDates = rowData.dates.map(date => formatData(date)).join(' - ');
            return formattedDates;
        } else {
            return 'Fecha no disponible'; //* este es en el caso de que no tenga fechas pero no tendria que pasar ya que esta condicionado a que si o si llega con una fecha
        }
    };

    if (loading) {
        return <div className='flex justify-center pt-60'>
            <span className="loading loading-bars loading-lg"/>
        </div>
    }

    return (
        <>
            <section>
                <h1><p className="uppercase text-2xl p-3">Estadísticas</p></h1>
                <Stats_component />
                <h2><p className="uppercase text-xl p-3">Clientes recientes</p></h2>
                <DataTable value={dataUser} tableStyle={{ minWidth: '50rem' }} className='p-5' stripedRows paginator rows={5}>
                    <Column field="name" header="Nombre cliente"></Column>
                    <Column field="phone1" header="Teléfono 1"></Column>
                    <Column field="phone2" header="Teléfono 2"></Column>
                    <Column field="address" header="Dirección"></Column>
                    <Column field="dates" header="Fecha de pago" body={dateBodyTemplate} />
                    <Column field="payments" header="Plan" ></Column>
                </DataTable>
                <div className='p-5'>
                    <button className="btn btn-primary" onClick={() => {}}>Ver clientes</button> 
                </div>
            </section>
        </>
    );

    //** aqui tiene que mandar al apartado de ver la tabla de clientes para poder editarla */
}
