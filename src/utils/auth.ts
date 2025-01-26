'use server'
import { createClient } from "./supabase/server";

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

