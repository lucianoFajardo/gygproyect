'use client'
import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import CreateClientSchema from '@/app/schema/createClient_schema';
import CreateClientGyGSupabase from './createSB_client';

export default function Create_client() {
  const initialStateData = {
    name: '',
    phone1: '',
    phone2: '',
    address: '',
    dates: null,
    payments: 0,
    coordenates: '',
    observations: '',
    district: '',
    status: '',
    type_payment: '',
  };

  const [client, setClient] = useState(initialStateData);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState();


  const moneyOptions = [
    { label: '$ 20,000', value: 20000 },
    { label: '$ 25,000', value: 25000 },
    { label: '$ 30,000', value: 30000 },
    { label: '$ 40,000', value: 40000 }
  ];

  const typePayment = [
    { label: 'Efectivo', value: 'Efectivo' },
    { label: 'Deposito', value: 'Deposito' },
  ]

  const serverDistrict = [
    { label: 'Boro', value: 'servidor Boro' },
    { label: 'Hospital', value: 'servidor Hospital' },
    { label: 'Mula', value: 'servidor Mula' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDatesChange = (e) => {
    const selectedDates = Array.isArray(e.value) ? e.value.map(date => new Date(date)) : [];
    const [start] = selectedDates;
    console.log('Fecha seleccionada:', start);
    // Verificar si la fecha de inicio es válida
    if (!start || isNaN(start.getTime())) {
      console.error('Fecha inicial no válida');
      return;
    }
    // Obtener el último día del mes actual
    const lastDayOfMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
    // Calcular la fecha final, asegurándose de que no cruce el límite del mes actual
    const endDate = new Date(start);
    const newDay = start.getDate() + 5;
    if (newDay > lastDayOfMonth) {
      // Si se pasa del último día del mes, se ajusta al último día del mes actual
      endDate.setDate(lastDayOfMonth);
    } else {
      // De lo contrario, simplemente sumamos 5 días
      endDate.setDate(newDay);
    }
    setClient(prevState => ({ ...prevState, dates: [start, endDate] }));
  };



  const handlePaymentChange = (e) => {
    setClient(prevState => ({ ...prevState, payments: e.value }));
  };

  const handlerTypePayment = (e) => {
    setClient(prevState => ({ ...prevState, type_payment: e.value }));
  }

  const handlerDistrictChange = (e) => {
    setClient(prevState => ({ ...prevState, district: e.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultValidateForm = CreateClientSchema.safeParse(client);
    if (!resultValidateForm.success) {
      const fieldError = resultValidateForm.error.format();
      setErrors(fieldError);
      console.log('Error encontrado ->', fieldError);
    } else {
      setErrors({});
      setSuccess(true);
      try {
        // Aquí no instancias la clase, solo trabajas con el objeto 'client'
        const clientObject = {
          ...client,
          dates: client.dates.map(date => date.toISOString()), // Convertir fechas a ISO
        };
        await CreateClientGyGSupabase(clientObject);
      } catch (error) {
        console.log(error.message);
      }
      setTimeout(() => {
        setSuccess(false);
        setClient(initialStateData);
      }, 1000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Agregar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Nombre de Cliente</label>
            <input
              type="text"
              id="name"
              name="name"
              value={client.name}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
              placeholder="Ingrese el nombre del cliente"

            />
            {errors.name && <span className="text-red-500">{errors.name._errors.join(', ')}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="phone1" className="block text-gray-700">Teléfono</label>
            <input
              type="text"
              id="phone1"
              name="phone1"
              value={client.phone1}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
              placeholder="Ingrese el teléfono del cliente"

            />
            {errors.phone1 && <span className="text-red-500">{errors.phone1._errors.join(', ')}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="phone2" className="block text-gray-700">Otro teléfono (opcional)</label>
            <input
              type="text"
              id="phone2"
              name="phone2"
              value={client.phone2}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
              placeholder="Ingrese el teléfono del cliente"

            />
            {errors.phone2 && <span className="text-red-500">{errors.phone2._errors.join(', ')}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700">Dirección</label>
            <input
              type="text"
              id="address"
              name="address"
              value={client.address}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
              placeholder="Ingrese la dirección del cliente"
            />
            {errors.address && <span className="text-red-500">{errors.address._errors.join(', ')}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="dates" className="block text-gray-700">Fecha de Pago</label>
            <Calendar
              value={client.dates}
              onChange={handleDatesChange}
              selectionMode="range"
              showIcon
              dateFormat="dd/mm/yy"
              readOnlyInput
              hideOnRangeSelection
              placeholder="Fecha de instalación"
              className="input input-bordered w-full mt-2"
            />
            {errors.dates && <span className="text-red-500">{errors.dates._errors.join(', ')}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="payment" className="block text-gray-700">Monto de Pago</label>
            <Dropdown
              value={client.payments}
              onChange={handlePaymentChange}
              options={moneyOptions}
              optionLabel="label"
              placeholder="Seleccione un monto"
              className="input input-bordered w-full mt-2"
            />
            {errors.payments && <span className="text-red-500">{errors.payments._errors.join(', ')}</span>}

          </div>
          <div className="mb-4">
            <label htmlFor="type_payment" className="block text-gray-700">Forma de pago</label>
            <Dropdown
              value={client.type_payment}
              onChange={handlerTypePayment}
              options={typePayment}
              optionLabel="label"
              placeholder="Seleccione una forma de pago"
              className="input input-bordered w-full mt-2"
            />
            {errors.type_payment && <span className="text-red-500">{errors.type_payment._errors.join(', ')}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="coordenates" className="block text-gray-700">Latitud y longitud</label>
            <input
              type="text"
              id="coordenates"
              name="coordenates"
              value={client.coordenates}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
              placeholder="Ingrese latitud y longitud"
            />
            {errors.coordenates && <span className="text-red-500">{errors.coordenates._errors.join(', ')}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="district" className="block text-gray-700">Servidor perteneciente</label>
            <Dropdown
              value={client.district}
              onChange={handlerDistrictChange}
              options={serverDistrict}
              optionLabel="label"
              placeholder="Seleccione servidor"
              className="input input-bordered w-full mt-2"
            />
            {errors.district && <span className="text-red-500">{errors.district._errors.join(', ')}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="observations" className="block text-gray-700">Obvservaciones</label>
            <input
              type="text"
              id="observations"
              name="observations"
              value={client.observations}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
              placeholder="Ingrese una observacion del cliente"
            />
            {errors.observations && <span className="text-red-500">{errors.observations._errors.join(', ')}</span>}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            label="Show"
          >
            Agregar Cliente
          </button>
        </form>
        {
          success && (
            <div class="toast toast-top toast-end">
              <div class="alert bg-green-100">
                <span className='text-green-500'>Cliente creado con exito.</span>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};
