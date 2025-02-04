'use client';

import { logOut } from "@/utils/auth";
import { ChartBarIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import StatsModal from "./modal/StatsModal";
import { UserContext } from "@/contexts/UserContext";
import { TimeContext } from "@/contexts/TimeContext";
import NewGroupModal from "./modal/NewGroupModal";
import ManageGroupModal from "./modal/ManageGroupModal";

export default function Sidebar () {
    const { user, setUser } = useContext(UserContext);
    const { todayTime, updateTodayTime } = useContext(TimeContext);
    // Modal 관련 
    const [showStats, setShowStats] = useState(false);
    const [showNewGroup, setShowNewGroup] = useState(false);
    const [showManageGroup, setShowManageGroup] = useState(false);

    const [hasGroup, setHasGroup] = useState(false);
    
    

    useEffect(() => {
      if(user) {
        updateTodayTime();
        // hasGroup 가져오기
        setHasGroup(false);
      }
    }, [updateTodayTime, user])

    const handleLogout = async () => {
      const error = await logOut();
      if(error) {
        console.error(error);
      } else {
        setUser(null);
      }
    }

    const handleGroupAction = () => {
      if(hasGroup) {
        setShowManageGroup(true);
      } else {
        setShowNewGroup(true);
      }
    }

    return (
      <div className="flex min-h-screen bg-gray-50">
        <StatsModal 
          show={showStats}
          onClose={() => setShowStats(false)}
        />
        <NewGroupModal
          show={showNewGroup}
          onClose={() => setShowNewGroup(false)}
        />
        <ManageGroupModal
          show={showManageGroup}
          onClose={() => setShowManageGroup(false)}
        />
        <aside className="w-64 bg-white border-r border-gray-200">
          {/* 로고 영역 */}
          <div className="p-4 border-b border-gray-200">
            <Link href="/">
              <h1 className="text-xl font-bold text-sky-700">Timer</h1>
            </Link>
          </div>
  
          {/* 사용자 프로필, 로그인 버튼튼 영역 */}
          <div className="p-4 border-b border-gray-200">
        {user ? (
          // 로그인된 경우 - 프로필 표시
          <div className="p-4 border-gray-200">
              <div className="flex flex-col space-y-3">
                  {/* 유저 정보 */}
                  <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                          <span className="text-sky-700 font-medium">
                              {user.name}
                          </span>
                      </div>
                      <div className="flex flex-col">
                          <span className="font-medium">{user.email}</span>
                      </div>
                  </div>
                  
                  {/* 로그아웃 버튼 */}
                  <button
                      onClick={handleLogout}
                      className="w-full py-2 px-4 text-sm text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                      로그아웃
                  </button>
              </div>
          </div>
        ) : (
          // 로그인되지 않은 경우 - 로그인/회원가입 버튼
          <div className="w-full space-y-2">
            <Link 
              href="/login"
              className="block w-full py-2 px-4 bg-sky-700 text-white rounded-lg hover:bg-sky-800 transition-colors text-center"
            >
              로그인
            </Link>
          </div>
        )}
      </div>
        {/* 통계 */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-medium text-gray-500">하루 집중 시간</h2>
            {user && (<button 
              onClick={() => setShowStats(true)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="통계 자세히 보기"
            >
              <ChartBarIcon className="h-5 w-5 text-gray-500" />
            </button>)}
          </div>
          {user ? (<div className="text-2xl font-bold text-sky-700">{todayTime}</div>) : (
            <div className="text-2xl font-bold text-sky-700"> 로그인 시 기록 </div>
          )}
        </div>
        {/* 그룹 현황 */}
        {user && (<div>
          <div className="p-4">
              <h2 className="text-sm font-medium text-gray-500 mb-3">그룹 현황</h2>
              
              <div className="space-y-3">
                {/* 그룹 멤버 목록 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>사용자</span>
                  </div>
                  <span className="text-sm text-gray-500">시간표시</span>
                </div>
              </div>
            </div><div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
                <button
                  className="w-full text-white bg-sky-500 hover:bg-sky-600 py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                  onClick={handleGroupAction}
                >
                  <UserGroupIcon className="h-5 w-5" />
                  {hasGroup ? "그룹 관리" : "그룹 참여하기"}
                </button>
              </div>
          </div>)}
        </aside>
    </div>
    );
  };
  