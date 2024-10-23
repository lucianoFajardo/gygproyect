'use server'

import { Client } from "../models/client_model";
import { CreateClient } from "../utils/supabase/server"

export default async function GetDataUser() {
    const supabase = CreateClient();
    const { data, error } = await supabase.from('create_user').select('*');
    if (error) {
        //* Aqui entra cuando encuentra un error
        console.log('Error -> ', error.message);
    }
    const clientsData = data.map((e) => {
        const getClientsDataMap = new Client(e);
        return getClientsDataMap.toObject(); //* los datos enviados de una manera plana
    });
    return clientsData;
}