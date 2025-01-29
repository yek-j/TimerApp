export interface CreateTimeRecord {
    user_id: string;
    total_second: number;
}

export interface TimeRecord {
    id: string;
    user_id: string;
    study_date: string;
    total_seconds: number;
}