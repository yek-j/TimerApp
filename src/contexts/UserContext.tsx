'use client';

import { User, UserContextType } from "@/types/common";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

const initUserContext: UserContextType = {
    user: null,
    setUser: () => {}
};

export const UserContext = createContext<UserContextType>(initUserContext);

export const mappingUser = (supabaseUser: SupabaseUser): User | null => {
    if(!supabaseUser.email || !supabaseUser.user_metadata?.name) {
        return null;
    }

    return {
        id: supabaseUser.id,
        email: supabaseUser.email,
        name: supabaseUser.user_metadata.name
    }
}

export function UserProvider({ children }: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const supabase = createClient();

       if (pathname === '/') {
            const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                if (session?.user) {
                    const mappedUser = mappingUser(session.user);
                    
                    if(mappedUser) {
                        setUser(mappedUser);
                    } else {
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            });
            return () => subscription.unsubscribe();
        }
    }, [pathname])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    );
}