'use client'
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Calendar } from 'primereact/calendar';
import GetDataUser from '../getData_user_server';


export default function RowEditingDemo() {
  const [clients, setClients] = useState(null);
  const [statuses] = useState(['Activo', 'Atrasado', 'Retirado']);

  useEffect(() => {
    GetDataUser().then((data) => {
      setClients(data)
    })
  }, []);

  const getSeverity = (value) => {
    switch (value) {
      case 'Activo':
        return 'success';
      case 'Atrasado':
        return 'warning';
      case 'Retirado':
        return 'danger';
      default:
        return null;
    }
  };

  //* esta funcion es para editar los campos 
  const onRowEditComplete = (e) => {
    let dataClient = [...clients];
    let { newData, index } = e;
    dataClient[index] = newData;
    console.log('dato cambiado ->', newData)
    console.log('Cliente seleccionado ->' , ...clients[index]['payments']);
    setClients(dataClient);
  };

  //* esta funcion es para el estilo cuando vaya a editar y tomar los datos que el usuario ingresa 
  const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  };

  //* esta fun es para definir el estado que el usuario tiene
  const statusEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Select a Status"
        itemTemplate={(option) => {
          return <Tag value={option} severity={getSeverity(option)}></Tag>;
        }}
      />
    );
  };

  //* Este es el Editor de precio para el campo a editar del precio
  const priceEditor = (options) => {
    return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="CLP" locale="es-ES" />;
  };

  //* Este es el estatud del estado del cliente para poder editarlo
  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData.inventoryStatus)}></Tag>;
  };

  const allowEdit = (rowData) => {
    return rowData.name !== 'Blue Band';
  };

  //* Estos campos son para poder visualizar la data que traemos y darle un formato.
  const formatData = (value) => {
    const setDatacalendar = new Date(value);
    return setDatacalendar.toLocaleDateString('es-ES');
  };

  const dateBodyTemplate = (rowData) => {
    if (rowData.dates && rowData.dates.length > 0) {
      const formattedDates = rowData.dates.map(date => formatData(date)).join(' - ');
      return formattedDates;
    } else {
      return 'Fecha no disponible';
    }
  };

  const dateEditor = (option) => {
    const value = Array.isArray(option.value) ? option.value.map(date => new Date(date)) : [null, null];
    const handlerDateChanges = (e) => {
      const [start, end] = e.value;
      if (start && end && start.getFullYear() === end.getFullYear()) {
        option.editorCallback([start, end]);
      } else {
        const adjustedEnd = new Date(start);
        adjustedEnd.setDate(start.getDate() + 4); 
        option.editorCallback([start, adjustedEnd]);
      }
    };
    return (
      <Calendar
        value={value}
        onChange={handlerDateChanges}
        selectionMode="range"
        showIcon
        dateFormat="dd/mm/yy"
        readOnlyInput
        hideOnRangeSelection
        placeholder="Fecha de instalación"
        className="input input-bordered w-full mt-2"
      />
    );
  };



  return (
    <>
      <h1 className='m-5 text-xl'> Editar datos de clientes.</h1>
      <div className="card m-5">
        <DataTable value={clients} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }} resizableColumns showGridlines>
          <Column field="name" header="Nombre" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
          <Column field="address" header="Dirección" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
          <Column field="phone1" header="Telefono 1" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
          <Column field="phone2" header="Telefono 2" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
          <Column
            field="dates"
            header="Fechas de pago"
            editor={(options) => dateEditor(options)}
            style={{ width: '20%' }}
            body={dateBodyTemplate}
          />
          <Column field="inventoryStatus" header="Estado" body={statusBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '20%' }}></Column>
          <Column field="payments" header="Plan" editor={(options) => priceEditor(options)} style={{ width: '20%', padding: '15px' }}></Column>
          <Column rowEditor={allowEdit} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
        </DataTable>
      </div>
    </>
  );
}

//TODO : hasta el momento esta el editar del calendario ya listo , lo que queda es solamente el plan y si esta pagado o no