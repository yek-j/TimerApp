'use client';

import { displayTime, notifyTimer, recordTime, requestNotificationPermission } from "@/utils/timer";
import { useContext, useEffect, useState } from "react";
import { PlayIcon, PauseIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { UserContext } from "@/contexts/UserContext";


export default function Timer() {
  const [targetTime, setTargetTime] = useState<number | null>(null);
  const [time, setTime] = useState(1500);  // 25분
  const [isRunning, setIsRunning] = useState(false);
  const [saveTime, setSaveTime] = useState(1500);
  const {user} = useContext(UserContext)!;

  useEffect(() => {
    requestNotificationPermission();
  },[]);

  useEffect(() => {
    let frameId: number;
    if(isRunning && targetTime) {
      const runningTimer = () => {
        const now = Date.now();
        const newTime = Math.ceil((targetTime - now) / 1000);

        if(newTime <= 0) {
          setIsRunning(false);
          notifyTimer();

          if(user) {
            recordTime({
              user_id: user.id,
              total_second: saveTime
            });
          }

          // 시간 초기화
          setTime(0);
          setSaveTime(0);
          return;
        }

        setTime(newTime);
        frameId = requestAnimationFrame(runningTimer);
      };

      frameId = requestAnimationFrame(runningTimer);
    }

    return () => {
      if(frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [isRunning, saveTime, targetTime, user])

  const toggleBtn = () => {
    if(!isRunning) {
      setTargetTime(Date.now() + (time * 1000));
      setIsRunning(true);
    } else {
      setIsRunning(false);
      setTargetTime(null);
    }
  }

  const addFiveMin = () => {
    if ((time + 300) > 3600) setTime(3600);
    else setTime(time + 300);
    setSaveTime(time);
  }

  const subFiveMin = () => {
    if (time === 0) return;
    else if ((time - 300) < 300) { setTime(300) } // 최소 5분
    else setTime(time - 300)
    setSaveTime(time);
  }

  const resetTimer = () => {
    setIsRunning(false);
    setTargetTime(null);
    setTime(1500);
    setSaveTime(1500);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      {/** 타이머 부분 */}
      <div className="text-8xl font-bold">
        {displayTime(time)}
      </div>

      <div className="flex items-center space-x-8">
        {/** 타이머 컨트롤 버튼  */}
        <div className="flex space-x-4">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={toggleBtn}
          >
            {isRunning ? (
              <PauseIcon className="h-8 w-8 text-sky-700"/>
            ) : (
              <PlayIcon className="h-8 w-8 text-sky-700"/>
            )}
          </button>
          <button
            onClick={resetTimer}
          >
            <ArrowPathIcon className="h-8 w-8 text-sky-700"/>
          </button>
        </div>

        {/** 시간 변경 버튼 */}
        <div className="flex space-x-4">
          <button 
            className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
            onClick={addFiveMin} 
            disabled={isRunning}
          >
            + 5분
          </button>
          <button 
            className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
            onClick={subFiveMin}
            disabled={isRunning}
          >
              - 5분
          </button>
        </div>
      </div>
    </div>
  );
}