// 完整應用程式測試
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppLayout from '@/AppLayout'
import type { Language } from '@/types/common'
import { STORAGE_KEYS } from '@/constants/app'
import { useLocalStorage } from '@/hooks'
import { Footer, MainNavBar, TopNav } from '@/components/layouts'
import { ProductGallery, CoreValuesSection, BrandStory, ProductShowcase } from '@/components/sections'
import { ShopPage, AboutPage, LearnPage, GoogleTestPage } from '@/components/pages'
import { CartProvider } from '@/contexts/CartContext'

// 首頁組件
const HomePage = ({ lang }: { lang: Language }) => (
  <main className="pt-14">
    <ProductShowcase lang={lang} />
    <ProductGallery lang={lang} />
    <CoreValuesSection lang={lang} />
    <BrandStory lang={lang} />
  </main>
)

function App() {
  const [lang, setLang] = useLocalStorage<Language>(STORAGE_KEYS.LANGUAGE, 'en')
  
  const toggleLang = () => {
    const newLang: Language = lang === 'en' ? 'zh' : 'en'
    setLang(newLang)
  }
  
  return (
    <Router>
      <CartProvider>
        <AppLayout>
          <TopNav lang={lang} toggleLang={toggleLang} />
          <MainNavBar lang={lang} />
          
          <Routes>
            <Route path="/" element={<HomePage lang={lang} />} />
            <Route path="/shop" element={<ShopPage lang={lang} />} />
            <Route path="/about" element={<AboutPage lang={lang} />} />
            <Route path="/learn" element={<LearnPage lang={lang} />} />
            <Route path="/test-google" element={<GoogleTestPage lang={lang} />} />
          </Routes>
          
          <Footer lang={lang} />
        </AppLayout>
      </CartProvider>
    </Router>
  )
}

export default App
