'use server';

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function signup(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { name }
        }
    })
  
    if (error) {
        console.error(data);
        console.error('Signup error details:', {
            message: error.message,
            status: error.status,
            name: error.name
          })
        // 구체적인 에러 메시지 반환
        return {
          error: `회원가입 실패: ${error.message} (${error.cause})`
        }
    }
  
    revalidatePath('/', 'layout')
    redirect('/login')
  }