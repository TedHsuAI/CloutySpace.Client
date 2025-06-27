import { FC, useState } from 'react'
import { FaFacebookF, FaInstagram, FaUser, FaGlobe } from 'react-icons/fa6'
import { FaShoppingCart } from 'react-icons/fa'
import { i18n } from '@/lang'
import { LoginModal } from '@/components/features'
import { useCart } from '@/contexts/CartContext'

interface TopNavProps {
  lang: 'en' | 'zh'
  toggleLang: () => void
}

const TopNav: FC<TopNavProps> = ({ lang, toggleLang }) => {
  const [showLogin, setShowLogin] = useState(false)
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <>
      <header className="w-full h-14 fixed top-0 left-0 z-50 bg-white shadow-sm">
        <div className="relative w-full h-full">
          {/* 左上角 FB / IG icons - 位置互換，間距統一 */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=100072498547679#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://www.instagram.com/cloutyspace/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500 transition-colors"
            >
              <FaInstagram size={20} />
            </a>
          </div>

          {/* 右上角 購物車 / 登入 / 語言切換 */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
            {/* 購物車按鈕 */}
            <div className="relative group flex items-center">
              <button
                className="flex items-center justify-center text-gray-700 hover:text-black transition-colors bg-transparent border-none cursor-pointer relative"
                onClick={() => console.log('Go to cart')}
              >
                <FaShoppingCart size={20} />
                {/* 購物車數量 badge */}
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium min-w-[20px]">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap px-2 py-1 bg-white shadow rounded pointer-events-none z-10">
                {lang === 'zh' ? '購物車' : 'Shopping Cart'}
              </div>
            </div>

            {/* 登入按鈕 */}
            <div className="relative group flex items-center">
              <button
                className="flex items-center justify-center text-gray-700 hover:text-black transition-colors bg-transparent border-none cursor-pointer"
                onClick={() => setShowLogin(true)}
              >
                <FaUser size={20} />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap px-2 py-1 bg-white shadow rounded pointer-events-none z-10">
                {i18n[lang].login}
              </div>
            </div>

            {/* 語言切換按鈕（中 / EN） */}
            <button
              className="flex items-center justify-center text-gray-700 hover:text-black transition-colors bg-transparent border-none cursor-pointer gap-1 min-w-[32px]"
              onClick={toggleLang}
              title={lang === 'zh' ? '切換語言' : 'Switch Language'}
            >
              <FaGlobe size={20} />
              <span className="text-xs w-4 text-center inline-block">
                {i18n[lang].language}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 登入 Modal */}
      {showLogin && (
        <LoginModal 
          lang={lang}
          onClose={() => setShowLogin(false)} 
        />
      )}
    </>
  )
}

export default TopNav
