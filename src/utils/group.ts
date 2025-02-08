import { Group, GroupMembers, Member, MyGroup } from "@/types/group";
import { createClient } from "./supabase/client";

export const createNewGroup = async (user_id: string, group: Group) => {
    const supabase = createClient();
    let isUnique = false;
    let invite_code;

    while (!isUnique) {
        invite_code = await generateInviteCode();
        const { data } = await supabase
            .from('groups')
            .select('invite_code')
            .eq('invite_code', invite_code);

        isUnique = !data || data.length === 0;
    }

    const { data, error } = await supabase.from('groups').insert({
        invite_code: invite_code,
        name: group.name,
        description: group.description
    })
    .select('id')
    .single();

    if(error) {
        console.error(error);
        return false;
    } 

    const result = await supabase.from('group_members').insert({
        group_id: data.id,
        user_id: user_id,
        role: 'admin'
    });

    if(result.error) {
        console.error(error);
        return false;
    }

    return true;
}

const generateInviteCode = () =>  {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from(
      { length: 8 }, // 8개의 요소를 가진 빈 배열 생성
      () => chars.charAt(Math.floor(Math.random() * chars.length)) // 각 요소를 랜덤 문자로 채움
    ).join('');
}

export const getGroup = async (user_id: string) => {
    const supabase = createClient();

    const {data, error} = await supabase.from('groups')
        .select(`
            *,
            group_members!inner (
                id,
                user_id,
                role,
                joined_at,
                users(
                    name
                )
            )
        `)
        .eq('group_members.user_id', user_id);

    if(error) {
        console.error(error);
        return null;
    }

    if (data && data[0]) {
        const members = Array.isArray(data[0].group_members) 
        ? data[0].group_members 
        : [data[0].group_members];
       
        const myGroup: MyGroup = {
          gid: data[0].id,
          invite_code: data[0].invite_code,
          create_at: data[0].created_at,
          members: members.map((member: Member) => ({
            id: member.id,
            group_id: data[0].id,
            user_id: member.user_id,
            user_name: member.users.name,
            role: member.role,
            joined_at: member.joined_at
          })) as GroupMembers[]
        };
      
        return myGroup;
      }

    return null;
}