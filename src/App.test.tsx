import { TopNav, MainNavBar, Footer } from '@/components/layouts'
import AppLayout from '@/AppLayout'
import { useLocalStorage } from '@/hooks'
import { STORAGE_KEYS } from '@/constants/app'
import type { Language } from '@/types/common'

function App() {
  const [lang, setLang] = useLocalStorage<Language>(STORAGE_KEYS.LANGUAGE, 'en')

  // 切換語言
  const toggleLang = () => {
    const newLang: Language = lang === 'en' ? 'zh' : 'en'
    setLang(newLang)
  }

  return (
    <AppLayout>
      <TopNav lang={lang} toggleLang={toggleLang} />
      <MainNavBar lang={lang} />

      <main className="pt-14">
        <div className="py-16 text-center">
          <h1 className="text-4xl font-bold">CloutySpace Client 測試頁面</h1>
          <p className="text-lg mt-4">Language: {lang}</p>
          <button 
            onClick={toggleLang}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            切換語言 / Toggle Language
          </button>
        </div>
      </main>
      
      <Footer lang={lang} />
    </AppLayout>
  )
}

export default App
