import { ChevronLeftIcon } from "@heroicons/react/16/solid";

export default function JoinGroup() {
    return (
      <div>
        <div className="flex items-center gap-2 mb-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold">그룹 참여하기</h2>
        </div>
  
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              초대 코드
            </label>
            <input 
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="8자리 초대 코드를 입력하세요"
              maxLength={8}
            />
            <p className="mt-1 text-sm text-gray-500">
              예시: ABC123XY
            </p>
          </div>
  
          <button 
            type="submit"
            className="w-full py-2 px-4 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
          >
            참여하기
          </button>
        </form>
      </div>
    );
  };