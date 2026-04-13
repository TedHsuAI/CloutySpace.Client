import { FC } from 'react'
import type { Language } from '@/types/common'
import { i18n } from '@/lang'

interface AboutPageProps {
  lang: Language
}

const AboutPage: FC<AboutPageProps> = ({ lang }) => {
  const t = i18n[lang]
  const fontClass = lang === 'zh' ? 'font-zh' : 'font-en'

  return (
    <main className={`pt-14 min-h-screen bg-gray-50 ${fontClass}`}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {t.aboutUs}
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-4">
              {lang === 'zh' 
                ? '歡迎來到我們的品牌故事頁面。我們致力於為您提供最優質的茶葉產品和服務。'
                : 'Welcome to our brand story page. We are dedicated to providing you with the finest tea products and services.'
              }
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {lang === 'zh' ? '我們的使命' : 'Our Mission'}
            </h2>
            <p className="text-gray-700 mb-4">
              {lang === 'zh'
                ? '我們的使命是將台灣最好的茶葉帶給世界各地的茶愛好者，讓每一杯茶都成為一段美好的體驗。'
                : 'Our mission is to bring Taiwan\'s finest teas to tea lovers around the world, making every cup a wonderful experience.'
              }
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {lang === 'zh' ? '我們的價值觀' : 'Our Values'}
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{lang === 'zh' ? '品質第一：嚴選最優質的茶葉' : 'Quality First: Carefully selected premium tea leaves'}</li>
              <li>{lang === 'zh' ? '永續發展：支持環保和永續農業' : 'Sustainability: Supporting eco-friendly and sustainable agriculture'}</li>
              <li>{lang === 'zh' ? '文化傳承：推廣台灣茶文化' : 'Cultural Heritage: Promoting Taiwan tea culture'}</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AboutPage
