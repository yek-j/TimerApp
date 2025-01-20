'use client'
import { login } from './actions'
import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [error, setError]  = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await login(formData);
    if(result?.error) {
        setError(result.error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Login
        </h1>

        <form action={handleSubmit} className="space-y-6">
          <div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력하세요"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </div>

          <button 
            type="submit"
            className="w-full p-3 text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors"
          >
            로그인
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">아직 계정이 없으신가요?</p>
          <Link 
            href="/signup" 
            className="mt-2 inline-block text-sky-600 hover:text-sky-700 font-medium"
          >
            회원가입 하러가기
          </Link>
        </div>
      </div>
    </div>
  )
}