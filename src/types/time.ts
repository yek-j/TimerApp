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

export interface BaseTimeData {
    minutes: number;
}

export interface WeeklyTimeData extends BaseTimeData{
    day: string;
}

export interface MonthlyTimeData extends BaseTimeData{
    date: string;
}

export interface YearlyTimeData extends BaseTimeData{
    month: string;
}

export type Period = 'weekly' | 'monthly' | 'yearly';

export interface ChartProps {
    data: BaseTimeData[];
    period: Period;
}