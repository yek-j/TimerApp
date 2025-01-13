'use client';

import { displayTime } from "@/components/timer";
import { useState } from "react";

export default function Home() {
  const [time, setTime] = useState(1500)

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
      <div className="flex flex-col items-center space-y-8 text-8xl font-bold">
        {displayTime(time)}
      </div>
      <div className="flex space-x-4">
        <button 
          className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
          onClick={addFiveMin}
        >
          + 5분
        </button>
        <button 
          className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
          onClick={subFiveMin}>
            - 5분
        </button>
      </div>
    </div>
  );
}
