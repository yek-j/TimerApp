'use client';

import { displayTime } from "@/components/timer";
import { useState } from "react";
import { PlayIcon, PauseIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const [time, setTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);

  const addFiveMin = () => {
    if ((time + 300) > 3600) setTime(3600);
    else setTime(time + 300);
  }

  const subFiveMin = () => {
    if (time === 0) return;
    else if ((time - 300) < 0) { setTime(0) }
    else setTime(time - 300)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 space-y-8">
      {/** 타이머 부분 */}
      <div className="text-8xl font-bold">
        {displayTime(time)}
      </div>

      <div className="flex items-center space-x-8">
        {/** 타이머 컨트롤 버튼  */}
        <div className="flex space-x-4">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={()=>setIsRunning(!isRunning)}
          >
            {isRunning ? (
              <PauseIcon className="h-8 w-8 text-sky-700"/>
            ) : (
              <PlayIcon className="h-8 w-8 text-sky-700"/>
            )}
          </button>
          <button>
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
