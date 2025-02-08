'use server'
import { createClient } from "./supabase/server";
import { createClient as adminClient } from "@supabase/supabase-js";

export const getUser = async () => {
    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        return null;
    }
    
    return user;
}

export const logOut = async () => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    return error;
}

export const deleteUser = async (user_id: string) => {
    const supabase = adminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        });

    const { data, error }  = await supabase.auth.admin.deleteUser(user_id);

    if(error) {
        console.log(data);
        console.error(error);
        return false;
    } else {
        return true;
    }
}