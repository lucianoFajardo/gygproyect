'use server'

import { Client } from "../models/client_model";
import { CreateClient } from "../utils/supabase/server"

export default async function GetDataUser(_) {
    const supabase = CreateClient();
    const { data, error } = await supabase.from('create_user').select('*');
    if (error) {
        //* Aqui entra cuando encuentra un error
        console.log('Error -> ', error.message);
    }
    //*  En este punto si no encontro ningun error prosigue con la carga de datos.
    //* podria estandarizar los datos para mandarlos lo mas limpio posible al front end 
    //* reduciendo la carga de estos, tenerlo en cuenta.
    const clientsData = data.map((e)=> {
        const getClientsDataMap = new Client(e);
        return getClientsDataMap.toObject(); //* los datos enviados de una manera plana
    });
    return clientsData;
}