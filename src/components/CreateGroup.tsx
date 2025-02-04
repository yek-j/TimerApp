import { ChevronLeftIcon } from "@heroicons/react/16/solid";

export default function CreateGroup() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-semibold">새 그룹 만들기</h2>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            그룹 이름
          </label>
          <input 
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="그룹 이름을 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            설명 (선택사항)
          </label>
          <textarea 
            className="w-full p-2 border rounded-lg"
            placeholder="그룹에 대한 설명을 입력하세요"
            rows={3}
          />
        </div>

        <button 
          type="submit"
          className="w-full py-2 px-4 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
        >
          그룹 생성하기
        </button>
      </form>
    </div>
  );
};
