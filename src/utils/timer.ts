import { CreateTimeRecord } from "@/types/time";
import { createClient } from "./supabase/client";

export const displayTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSec = seconds % 60;

    // 두자리 수로 
    const displayMin = String(minutes).padStart(2, '0');
    const displaySec = String(remainingSec).padStart(2, '0');

    return `${displayMin}:${displaySec}`;
}

export const requestNotificationPermission = async () => {
    if(Notification.permission !== 'granted') {
        return await Notification.requestPermission();
    }
    return Notification.permission;
};

export const notifyTimer = () => {
  if(Notification.permission == 'granted') {
    return new Notification("타이머 종료", { 
        body: "설정한 시간이 완료되었습니다.",
        // icon
    });
  }  
}

export const recordTime = async (record: CreateTimeRecord) => {
  const supabase = createClient();
  const result = await supabase.from('timer_records').insert({
    user_id: record.user_id,
    total_seconds: record.total_second
  });

  if(result.error) {
    console.error(result.error);
  }
}
