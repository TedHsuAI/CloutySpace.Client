import { FC, useState } from 'react'
import { FaFacebookF, FaInstagram, FaUser, FaGlobe } from 'react-icons/fa6'
import { FaShoppingCart } from 'react-icons/fa'
import { i18n } from '@/lang'
import LoginModal from '@/components/LoginModal'

interface TopNavProps {
  lang: 'en' | 'zh'
  toggleLang: () => void
}

const TopNav: FC<TopNavProps> = ({ lang, toggleLang }) => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <header className="w-full h-14 fixed top-0 left-0 z-50 bg-white shadow-sm">
        <div className="relative w-full h-full">
          {/* 左上角 IG / FB icons */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
            <a
              href="https://www.instagram.com/cloutyspace/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500 transition-colors"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100072498547679#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              <FaFacebookF size={20} />
            </a>
          </div>

          {/* 右上角 購物車 / 登入 / 語言切換 */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
            <button
              className="text-gray-700 hover:text-black transition-colors bg-transparent border-none cursor-pointer"
              onClick={() => console.log('Go to cart')}
            >
              <FaShoppingCart size={20} />
            </button>

            {/* 登入按鈕 */}
            <div className="relative group">
              <button
                className="text-gray-700 hover:text-black transition-colors bg-transparent border-none cursor-pointer"
                onClick={() => setShowLogin(true)}
              >
                <FaUser size={20} />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 mt-1 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap px-1 bg-white shadow rounded">
                {i18n[lang].login}
              </div>
            </div>

            {/* 語言切換按鈕（中 / EN） */}
            <button
              className="text-gray-700 hover:text-black transition-colors bg-transparent border-none cursor-pointer flex items-center gap-1 min-w-[32px] justify-center"
              onClick={toggleLang}
              title="切換語言"
            >
              <FaGlobe size={18} />
              <span className="text-xs w-4 text-center inline-block">
                {i18n[lang].language}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 登入 Modal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  )
}

export default TopNav
