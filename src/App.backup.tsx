import { TopNav, MainNavBar, Footer } from '@/components/layouts'
import { ProductGallery, CoreValuesSection } from '@/components/sections'
import TwoColumnSection from '@/components/TwoColumnSection'
import TwoImageSection from '@/components/TwoImageSection'
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
        <ProductGallery lang={lang} />
        <TwoColumnSection lang={lang} />
        <TwoImageSection lang={lang} />
        <CoreValuesSection lang={lang} />
      </main>
      <Footer lang={lang} />
    </AppLayout>
  )
}

export default App
