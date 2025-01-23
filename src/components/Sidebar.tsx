'use client';

import { logOut } from "@/utils/supabase/auth";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar () {
    const [user, setUser] = useState<User | null>(null);
    const pathname = usePathname();

    useEffect(() => {
      const supabase = createClient();

      // 인증 상태 변경 구독
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

      return () => subscription.unsubscribe();
    }, [pathname]);

    const handleLogout = async () => {
      const error = await logOut();
      if(error) {
        console.error(error);
      } else {
        setUser(null);
      }
    }

    return (
      <div className="flex min-h-screen bg-gray-50">
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
                              {user.user_metadata.name}
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
  