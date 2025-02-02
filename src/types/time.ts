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

export interface TimeContextType {
    todayTime: string;
    updateTodayTime: () => Promise<void>;
};

export interface TimeData {
    day?: string;    // 주간
    date?: string;   // 월간
    month?: string;  // 연간
    minutes: number;
}

export type Period = 'weekly' | 'monthly' | 'yearly';

export interface ChartProps {
    data: TimeData[];
    period: Period;
}