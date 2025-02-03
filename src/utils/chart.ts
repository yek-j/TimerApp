import { BaseTimeData, MonthlyTimeData, WeeklyTimeData, YearlyTimeData } from "@/types/time";
import { createClient } from "./supabase/client";

export const getChartData = async (period: string, user_id: string): Promise<BaseTimeData[]> => {
    if(!user_id) return [];
    switch (period) {
        case 'weekly': 
            return await getThisWeekData(user_id);
        case 'monthly': 
            return await getThisMonthData(user_id);
        case 'yearly':
            return await getThisYearData(user_id);
        default :
            return [];
    }
}

// 이주의 Timer 통계
export const getThisWeekData = async (user_id: string): Promise<WeeklyTimeData[]> => {
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
    
    return processedData;
}

// 이달의 Timer 통계
export const getThisMonthData = async (user_id: string): Promise<MonthlyTimeData[]> => {
    const offset = new Date().getTimezoneOffset() * 60000;
    const today = new Date(Date.now() - offset);

    // 이번달 1일 구하기
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    firstDay.setHours(0, 0, 0, 0);
    const firstDayWithOffset = new Date(firstDay.getTime() - offset);

    // 이번달 마지막일 구하기
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    lastDay.setHours(23, 59, 59, 999);
    const lastDayWithOffset = new Date(lastDay.getTime() - offset);

    const supabase = createClient();

    const { data, error } = await supabase
            .from('timer_records')
            .select('*')
            .eq('user_id', user_id)
            .gte('study_date', firstDayWithOffset.toISOString())
            .lte('study_date', lastDayWithOffset.toISOString());

    if(error) console.error(error);

    // 1일부터 마지막일까지의 배열 생성
    const daysInMonth = lastDay.getDate();
    const monthData: MonthlyTimeData[] = [];
    for(let i = 0; i < daysInMonth; i++) {
        monthData.push({
            date: `${i + 1}일`,  // 1부터 시작하는 날짜
            minutes: 0            // 초기 공부시간 0으로 설정
        });
    }

    data?.forEach(record => {
        const day = new Date(record.study_date).getDate();
        console.log(day);
        monthData[day - 1].minutes += Math.floor(record.total_seconds / 60);
    });

    return monthData;
}

// 올해의 Timer 통계
export const getThisYearData = async (user_id: string): Promise<YearlyTimeData[]> => {
    const offset = new Date().getTimezoneOffset() * 60000;
    const today = new Date(Date.now() - offset);

    // 올해 1월 1일
    const firstDay = new Date(today.getFullYear(), 0, 1);  // 0 = 1월
    firstDay.setHours(0, 0, 0, 0);
    const firstDayWithOffset = new Date(firstDay.getTime() - offset);

    // 올해 12월 31일
    const lastDay = new Date(today.getFullYear(), 11, 31); // 11 = 12월
    lastDay.setHours(23, 59, 59, 999);
    const lastDayWithOffset = new Date(lastDay.getTime() - offset);

    const supabase = createClient();

    const { data, error } = await supabase
            .from('timer_records')
            .select('*')
            .eq('user_id', user_id)
            .gte('study_date', firstDayWithOffset.toISOString())
            .lte('study_date', lastDayWithOffset.toISOString());

    if(error) console.error(error);

    // 1일부터 12월 생성성
    const yearData: YearlyTimeData[] = [];
    for(let i = 0; i < 12; i++) {
        yearData.push({
            month: `${i + 1}월`,
            minutes: 0            // 초기 공부시간 0으로 설정
        });
    }

    data?.forEach(record => {
        const month = new Date(record.study_date).getMonth();
        yearData[month].minutes += Math.floor(record.total_seconds / 60);
    });

    return yearData;
}