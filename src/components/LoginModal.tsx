import { FC, useState } from 'react'
import FloatingInput from '@/components/ui/FloatingInput'
import GoogleLoginButton from '@/components/ui/GoogleLoginButton'

interface LoginModalProps {
  onClose: () => void
}

const LoginModal: FC<LoginModalProps> = ({ onClose }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      {/* 背景遮罩層（點擊會關閉 Modal） */}
      <div
  className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4 sm:p-8"
  onClick={onClose}
>
  {/* Modal 本體 */}
  <div
    className="
      bg-white 
      w-full 
      max-w-[360px] 
      sm:max-w-[420px] 
      md:max-w-[420px] 
      rounded-xl 
      shadow-lg 
      px-6 py-6 
      sm:px-8 
      relative
    "
    onClick={(e) => e.stopPropagation()}
  >
          {/* 標題 */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-1">Login</h2>
            <p className="text-sm text-gray-500">Welcome back! Please login to your account.</p>
          </div>

          {/* 表單輸入區塊（使用自訂 FloatingInput） */}
          <div className="flex flex-col gap-6 items-start mb-4 w-full">
            <FloatingInput
              label="Username"
              value={username}
              onChange={setUsername}
            />
            <FloatingInput
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />
          </div>

          {/* 登入表單：記住我 + 登入按鈕 */}
          <form className="space-y-6">
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-1">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className="text-blue-500 hover:underline">Lost your password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Login
            </button>
          </form>

          {/* 註冊提示 */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Not a member yet? <a href="#" className="text-blue-500 hover:underline">Register now</a>
          </div>

          {/* Google 登入按鈕 */}
          <div className="mt-4">
            <GoogleLoginButton onClick={() => console.log('Google login clicked')} />
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginModal
