import { ModalProps } from "@/types/common";
import { NewGroupStep } from "@/types/group";
import { PlusCircleIcon, UserGroupIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import CreateGroup from "../CreateGroup";
import JoinGroup from "../JoinGroup";

export default function NewGroupModal({ show, onClose }: ModalProps) {
    const [selectStep, setSelectStep] = useState<NewGroupStep>('none');

    const handleClose = () => {
        onClose();  // 모달 닫기
        setSelectStep('none');  // 상태 초기화
    };

    if(!show) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
            {selectStep === 'none' && (<div>
                <h2 className="text-xl font-semibold mb-4">그룹 참여하기</h2>
          
                <div className="space-y-4">
                    <button 
                    onClick={() => setSelectStep('create')}
                    className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3"
                    >
                    <PlusCircleIcon className="h-6 w-6 text-sky-500" />
                    <div className="text-left">
                        <div className="font-medium">새 그룹 만들기</div>
                        <div className="text-sm text-gray-500">나만의 스터디 그룹을 만들어보세요</div>
                    </div>
                    </button>
        
                    <button 
                    onClick={() => setSelectStep('join')}
                    className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3"
                    >
                    <UserGroupIcon className="h-6 w-6 text-sky-500" />
                    <div className="text-left">
                        <div className="font-medium">기존 그룹 참여</div>
                        <div className="text-sm text-gray-500">그룹 코드를 통해 참여하세요</div>
                    </div>
                    </button>
                </div>
        
                
            </div>)}
            {selectStep === 'create' && (
                <CreateGroup />
            )}
            {selectStep === 'join' && (
                <JoinGroup />
            )}
            <button 
                    onClick={handleClose}
                    className="mt-4 w-full py-2 px-4 text-gray-500 hover:text-gray-700"
                >
                    취소
                </button>
            </div>
      </div>
    );
}