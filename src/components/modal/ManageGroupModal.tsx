import { ModalProps } from "@/types/common";
import { XMarkIcon } from "@heroicons/react/16/solid";

export default function ManageGroupModal({ show, onClose }: ModalProps) {
    if(!show) return null;
    return (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50"
          onClick={onClose}
        >
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-96 z-50">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">그룹 관리</h2>
                        <button 
                            onClick={onClose}
                            className="hover:bg-gray-100 rounded-lg"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>
                    {/* 그룹 정보 */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">스터디 그룹 A</h3>
                    <p className="text-sm text-gray-600 mb-2">멤버 3명</p>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">초대 코드:</span>
                        <code className="bg-white px-2 py-1 rounded">ABC123XY</code>
                        <button className="text-sky-600 hover:text-sky-700">복사</button>
                    </div>
                    </div>

                    {/* 멤버 목록 */}
                    <div className="space-y-3">
                    <h3 className="font-medium">멤버</h3>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                        <div className="flex items-center gap-2">
                            <span>사용자1</span>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* 나가기 버튼 */}
                    <button className="mt-6 w-full py-2 px-4 text-red-600 hover:bg-red-50 rounded-lg">
                    그룹 나가기
                    </button>
                </div>
            </div>
        </div>
    );
};