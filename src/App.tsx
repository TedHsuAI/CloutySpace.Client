// 完整應用程式測試
import { useState } from 'react'
import AppLayout from '@/AppLayout'
import type { Language } from '@/types/common'
import { STORAGE_KEYS } from '@/constants/app'
import { useLocalStorage } from '@/hooks'
import { Footer, MainNavBar, TopNav } from '@/components/layouts'
import { ProductGallery, CoreValuesSection, BrandStory, ProductShowcase } from '@/components/sections'
import { ShopPage } from '@/components/pages'
import { CartProvider } from '@/contexts/CartContext'

function App() {
  const [lang, setLang] = useLocalStorage<Language>(STORAGE_KEYS.LANGUAGE, 'en')
  const [currentPage, setCurrentPage] = useState<string>('/')
  
  const toggleLang = () => {
    const newLang: Language = lang === 'en' ? 'zh' : 'en'
    setLang(newLang)
  }

  const handleNavClick = (path: string) => {
    setCurrentPage(path)
  }

  const renderMainContent = () => {
    switch (currentPage) {
      case '/shop':
        return <ShopPage lang={lang} />
      case '/':
      default:
        return (
          <main className="pt-14">
            <ProductShowcase lang={lang} />
            <ProductGallery lang={lang} />
            <CoreValuesSection lang={lang} />
            <BrandStory lang={lang} />
          </main>
        )
    }
  }
  
  return (
    <CartProvider>
      <AppLayout>
        <TopNav lang={lang} toggleLang={toggleLang} />
        <MainNavBar lang={lang} onNavClick={handleNavClick} />
        
        {renderMainContent()}
        
        <Footer lang={lang} />
      </AppLayout>
    </CartProvider>
  )
}

export default App
