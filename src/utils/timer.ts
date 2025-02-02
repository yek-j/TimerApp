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


export const displayDailyTime = async (user_id: string) => {
  const supabase = createClient();
  const dateStr = new Date().toISOString().split('T')[0];

  const {data, error} = await supabase.from('timer_records')
                                .select()
                                .eq('user_id', user_id)
                                .eq('study_date', dateStr);

  if(error) {
    console.log(error);
    return '00시 00분';
  }
  
  let seconds = 0;

  if(data.length > 0) {
    for (const record of data) {
      seconds += record.total_seconds;
    }
  }

  const minutes = Math.floor(seconds / 60);
  const strTime = formatTime(minutes);

  return strTime;
}

export const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMin = minutes % 60;

  const displayHour = String(hours).padStart(2, '0');
  const displayMin = String(remainingMin).padStart(2, '0');

  return `${displayHour}시 ${displayMin}분`;
}