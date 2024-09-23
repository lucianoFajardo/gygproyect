'use server'
import { CreateClient } from "@/app/utils/supabase/server"
const supabase = CreateClient(); //* Mi objeto de supabase esta creado aqui, puedo llamarlo en cualquier parte solamente de esta clase

//
async function supabseCall({ fromSql, selectSql, count }) {
    const { data, error } = (await supabase.from(fromSql).select(selectSql, {count}));
    if (error) {
        console.error('Error because -> ', error.message);
        return { error: true, code: error.code, message: error.message };
    }
    //* Aqui no retornara un error ya que la data fue obtenida con exito entonces solamente envia la data
    return { error: false, data };
}

export default async function GetPrice(_) {
    const response = await supabseCall({ fromSql: 'create_user', selectSql: 'payments' });
    if(response.error) {
        console.log(response.message);
        return response.code;
    }
    const totalPayments = response.data.reduce((sum , i ) => { 
        return sum + (i.payments || 0 )
    }, 0);  
    return totalPayments;
}

export async function GetTotalClients(_) {
    const res = await supabseCall({fromSql: 'create_user', selectSql: 'uuid' , count: 'exact'})
    if(res.error){
        console.log(res.message);
        return res.code;
    }
    const totalClient = res.data.length;
    return totalClient;
}

//TODO: Este es mi clase para poder crear las stats que necesite para crear las llamadas a la base de datos