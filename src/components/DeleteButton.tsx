import { UserContext } from "@/contexts/UserContext";
import { deleteUser } from "@/utils/auth";
import { useContext, useState } from "react";

export function DeleteAccount() {
    const {user, setUser} = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const [confirmText, setConfirmText] = useState('');
  
    const handleDelete = async () => {
        if(!user) return null;
        deleteUser(user.id)
            .then(success => {
                if(success) {
                    alert('탈퇴 성공');
                    setIsOpen(false);
                    setUser(null);
                } else {
                    alert('탈퇴 실패');
                    setIsOpen(true);
                }
            });
      };

    return (
    <div className="p-4 mt-auto border-t border-gray-200">
        <button 
            onClick={() => setIsOpen(true)}
            className="w-full py-2 px-4 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors text-center"
        >
        계정 삭제
        </button>

        {/* Modal */}
        {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full space-y-4">
            <h3 className="text-lg font-medium">계정을 삭제하시겠습니까?</h3>
            <p className="text-sm text-gray-500">
                모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
            </p>
            
            <div className="space-y-2">
                <input
                type="text"
                placeholder="'DELETE' 입력"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                
                <div className="flex space-x-3">
                <button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    취소
                </button>
                <button
                    disabled={confirmText !== 'DELETE'}
                    onClick={handleDelete}
                    className="flex-1 px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    삭제
                </button>
                </div>
            </div>
            </div>
        </div>
        )}
    </div>
    );
};