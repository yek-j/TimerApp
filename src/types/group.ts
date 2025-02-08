export type NewGroupStep = 'none' | 'create' | 'join';

export interface Group {
    name: string;
    description: string;
}

export interface Member {
    id: string;
    user_id: string;
    role: string;
    joined_at: string;
    users: {
      name: string;
    }
}

export interface GroupMembers {
    id: string;
    group_id: string;
    user_id: string;
    user_name: string;
    role: string;
    joined_at: string;
}

export interface MyGroup{
    gid: string;
    invite_code: string;
    create_at: string;
    members: GroupMembers[]
}