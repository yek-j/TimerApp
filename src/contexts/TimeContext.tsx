'use client';

import { createContext, ReactNode, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { displayDailyTime } from "@/utils/timer";
import { TimeContextType } from "@/types/time";

const initTimeContext: TimeContextType = {
    todayTime: '--시 --분',
    updateTodayTime: async () => {} 
}

export const TimeContext = createContext<TimeContextType>(initTimeContext);

export const TimeProvider = ({ children }: {children: ReactNode}) => {
  const [todayTime, setTodayTime] = useState('');
  const { user } = useContext(UserContext); // 기존 user context 사용

  const updateTodayTime = async () => {
    console.log(user);
    if (!user) return;
    const today = await displayDailyTime(user.id);
    console.log(today);
    setTodayTime(today);
  };

  return (
    <TimeContext.Provider value={{ todayTime, updateTodayTime }}>
      {children}
    </TimeContext.Provider>
  );
};
