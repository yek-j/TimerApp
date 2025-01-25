import { ModalProps } from "@/types/common";
import { XMarkIcon } from "@heroicons/react/16/solid";

export default function StatsModal({ show, onClose }: ModalProps) {
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
              <button className="px-3 py-1.5 bg-sky-100 text-sky-700 rounded-lg">일간</button>
              <button className="px-3 py-1.5 hover:bg-gray-100 rounded-lg">주간</button>
              <button className="px-3 py-1.5 hover:bg-gray-100 rounded-lg">월간</button>
              <button className="px-3 py-1.5 hover:bg-gray-100 rounded-lg">연간</button>
            </div>
            <div className="mt-4">
              {/* 여기에 선택된 기간의 통계 데이터 표시 */}
            </div>
          </div>
        </div>
    );
}