'use client'
import { useState } from 'react'
import { signup } from './actions';

export default function Signup() {
  const [error, setError]  = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await signup(formData);
    if(result?.error) {
        setError(result.error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          SignUp
        </h1>

        <form action={handleSubmit} className="space-y-6">
            <div>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="이름을 입력하세요"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
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
            회원가입
          </button>
        </form>
      </div>
    </div>
  )
}