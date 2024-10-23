'use server'
import { CreateClient } from '@/app/utils/supabase/server'

export default async function CreateClientGyGSupabase(client) {
    const supabase = CreateClient();
    try {
        // Insertar datos en Supabase
        const { data, error } = await supabase.from('create_user').insert([{
            name: client.name,
            phone1: client.phone1,
            phone2: client.phone2,
            address: client.address,
            dates: client.dates,
            payments: client.payments,
            coordenates: client.coordenates,
            observations: client.observations,
            district: client.district,
            status: client.status,
            type_payment: client.type_payment,
        }]);
        if (error) {
            console.error('ERROR browser -> ', error.message);
        }
        return data;
    } catch (error) {
        console.error('ERROR because-> ', error);
    }
}
