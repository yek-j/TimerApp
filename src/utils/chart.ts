import { TimeData } from "@/types/time";
import { createClient } from "./supabase/client";

export const getChartData = async (period: string, user_id: string): Promise<TimeData[]> => {
    if(!user_id) return [];
    switch (period) {
        case 'weekly': 
            return await getThisWeekData(user_id);
        default :
            return [];
    }
}

export const getThisWeekData = async (user_id: string): Promise<TimeData[]> => {
    const supabase = createClient();
    const today = new Date();
    const day = today.getDay();
  
    // 이번주 월요일 구하기
    const monday = new Date(today);
    monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
    monday.setHours(0, 0, 0, 0);

    // 이번주 일요일 구하기
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);  // 일요일 끝나는 시점

    const { data, error } = await supabase
        .from('timer_records')
        .select('*')
        .eq('user_id', user_id)
        .gte('study_date', monday.toISOString())
        .lte('study_date', sunday.toISOString());  

    if (error) console.error(error);

    // 데이터 가공
    const weekDays = ['월', '화', '수', '목', '금', '토', '일'];
    const processedData = weekDays.map(day => ({
        day,
        minutes: 0
    }));

    data?.forEach(record => {
        const dayIndex = new Date(record.study_date).getDay();
        const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
        processedData[adjustedIndex].minutes += Math.floor(record.total_seconds / 60);
    });
    console.log(processedData);
    return processedData;
}