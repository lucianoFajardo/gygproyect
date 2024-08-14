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
        }]);
        if (error) {
            console.log('ERROR browser -> ',error.message);
        }
        return data;
    } catch (error) {
        console.log('ERROR because-> ', error);
    }
}
