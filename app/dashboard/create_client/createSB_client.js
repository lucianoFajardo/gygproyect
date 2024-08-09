'use server'
import { CreateClient } from '@/app/utils/supabase/server'

export async function CreateClientGyGSupabase(client) {
    const supabase = CreateClient();
    try {
        let imagePaths = [];
        if (client.antennaPhotos.length > 0) {
            for (let fieldName of client.antennaPhotos) {
                // Asumiendo que 'fieldName' es un nombre de archivo aquí
                const { data, error } = await supabase.storage.from('images').upload(`public/${fieldName}`, fieldName);
                if (error) {
                    console.log(error.message);
                } else {
                    imagePaths.push(data.path);
                    console.log('Imagen subida con éxito', data.path);
                }
            }
        }
        
        // Insertar datos en Supabase
        const { data, error } = await supabase.from('create_user').insert([{
            name: client.name,
            phone1: client.phone1,
            phone2: client.phone2,
            address: client.address,
            gpsLocation: client.gpsLocation,
            dates: client.dates,
            payment: client.payment,
            antennaPhotos: imagePaths.length > 0 ? imagePaths : null,
        }]);

        if (error) {
            console.log(error.message);
        } else {
            console.log('Usuario creado con éxito -> ', data);
        }
    } catch (error) {
        console.log('Error encontrado en algún lugar -> ', error);
    }
}
