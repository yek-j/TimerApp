export default function Sidebar () {
    
    return (
      <div className="flex min-h-screen bg-gray-50">
        <aside className="w-64 bg-white border-r border-gray-200">
          {/* 로고 영역 */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-sky-700">Timer</h1>
          </div>
  
          {/* 사용자 프로필, 로그인/회원가입 영역 */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div>
                <p className="font-medium">사용자명</p>
                <p className="text-sm text-gray-500">user@email.com</p>
              </div>
            </div>
          </div>
  
          {/* 그룹 현황 */}
          <div className="p-4">
            <h2 className="text-sm font-medium text-gray-500 mb-3">그룹 현황</h2>
            <div className="space-y-3">
              {/* 그룹 멤버 목록 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>사용자</span>
                </div>
                <span className="text-sm text-gray-500">작업중</span>
              </div>
              {/* 추가 멤버 */}
            </div>
          </div>
  
          {/* 설정 메뉴 (하단) */}
          <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
            <button className="text-gray-600 hover:text-gray-900 flex items-center space-x-2">
              <span>설정</span>
            </button>
          </div>
        </aside>
  
      </div>
    );
  };
  