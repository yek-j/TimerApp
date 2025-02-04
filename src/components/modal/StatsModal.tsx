import { ModalProps } from "@/types/common";
import { XMarkIcon } from "@heroicons/react/16/solid";
import TimeChart from "../TimeChart";
import { getChartData } from "@/utils/chart";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { Period, BaseTimeData } from "@/types/time";

export default function StatsModal({ show, onClose }: ModalProps) {
  const { user } = useContext(UserContext);
  const [period, setPeriod] = useState<Period>('weekly');
  const [data, setData] = useState<BaseTimeData[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      if(!user || !show) return;
      const result = await getChartData(period, user.id)
      if(result) {
        setData(result);
      }
    }
    fetchData();
  }, [period, user, show])
  
    if(!show) return null;
    return (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <div 
            className="bg-white rounded-lg p-6 w-96 max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">학습 통계</h3>
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-lg"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="space-x-2">
              <button 
                className={`px-3 py-1.5 rounded-lg ${
                  period === 'weekly' ? 'bg-sky-100 text-sky-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => setPeriod('weekly')}  
              >
                주간
              </button>
              <button 
                className={`px-3 py-1.5 rounded-lg ${
                  period === 'monthly' ? 'bg-sky-100 text-sky-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => setPeriod('monthly')}  
              >
                월간
              </button>
              <button 
                className={`px-3 py-1.5 rounded-lg ${
                  period === 'yearly' ? 'bg-sky-100 text-sky-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => setPeriod('yearly')}  
              >
                연간
              </button>
            </div>
            <div className="mt-4">
              <TimeChart
                data={data}
                period={period}
              />
            </div>
          </div>
        </div>
    );
}