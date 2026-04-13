import { FC } from 'react'
import type { Language } from '@/types/common'
import { i18n } from '@/lang'

interface LearnPageProps {
  lang: Language
}

const LearnPage: FC<LearnPageProps> = ({ lang }) => {
  const t = i18n[lang]
  const fontClass = lang === 'zh' ? 'font-zh' : 'font-en'

  return (
    <main className={`pt-14 min-h-screen bg-gray-50 ${fontClass}`}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {t.learn}
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {lang === 'zh' ? '茶葉知識' : 'Tea Knowledge'}
                </h2>
                <p className="text-gray-700">
                  {lang === 'zh'
                    ? '學習不同種類的茶葉、產地特色、以及沖泡技巧。'
                    : 'Learn about different types of tea, regional characteristics, and brewing techniques.'
                  }
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {lang === 'zh' ? '沖泡指南' : 'Brewing Guide'}
                </h2>
                <p className="text-gray-700">
                  {lang === 'zh'
                    ? '掌握完美的沖泡時間、溫度和茶具選擇。'
                    : 'Master perfect brewing time, temperature, and tea equipment selection.'
                  }
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {lang === 'zh' ? '茶文化' : 'Tea Culture'}
                </h2>
                <p className="text-gray-700">
                  {lang === 'zh'
                    ? '深入了解台灣茶文化的歷史和傳統。'
                    : 'Dive deep into the history and traditions of Taiwan tea culture.'
                  }
                </p>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {lang === 'zh' ? '最新文章' : 'Latest Articles'}
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded border">
                  <h4 className="font-medium text-gray-800">
                    {lang === 'zh' ? '烏龍茶的完美沖泡法' : 'Perfect Oolong Tea Brewing'}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {lang === 'zh' ? '3分鐘閱讀' : '3 min read'}
                  </p>
                </div>
                <div className="p-3 bg-white rounded border">
                  <h4 className="font-medium text-gray-800">
                    {lang === 'zh' ? '台灣高山茶的特色' : 'Characteristics of Taiwan High Mountain Tea'}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {lang === 'zh' ? '5分鐘閱讀' : '5 min read'}
                  </p>
                </div>
                <div className="p-3 bg-white rounded border">
                  <h4 className="font-medium text-gray-800">
                    {lang === 'zh' ? '茶具選擇指南' : 'Tea Equipment Selection Guide'}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {lang === 'zh' ? '4分鐘閱讀' : '4 min read'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LearnPage
