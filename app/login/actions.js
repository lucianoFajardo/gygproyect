'use server'
import { CreateClient } from '@/app/utils/supabase/server'
import { redirect} from 'next/navigation'

export async function login(formData) {
    const supabase = CreateClient()
    // Validación de los inputs, si es necesario
    const dataGetForm = {
        email: formData.get('email'),
        password: formData.get('password'),
    }
    try {
        await supabase.auth.signInWithPassword(dataGetForm)
        console.log(dataGetForm);
        redirect('/')
    } catch (error) {
        console.log('Error -> ' + error)
        redirect('/error' , )
    }
}

export async function signup(formData) {
    const supabase = CreateClient()
    // Validación de los inputs, si es necesario
    const dataGetForm = {
        email: formData.get('email'),
        password: formData.get('password'),
    }
    const { error } = await supabase.auth.signUp(dataGetForm)
    if (error) {
        redirect('/error')
    }
    redirect('/')
}
