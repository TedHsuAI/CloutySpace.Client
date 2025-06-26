import { useEffect, useState } from 'react'
import TopNav from '@/components/layouts/TopNav'
import MainNavBar from '@/components/layouts/MainNavBar'
import AppLayout from '@/AppLayout'

function App() {
  const [lang, setLang] = useState<'en' | 'zh'>('en')

  // 初始化：從 localStorage 讀取語言設定
  useEffect(() => {
    const savedLang = localStorage.getItem('lang')
    if (savedLang === 'en' || savedLang === 'zh') {
      setLang(savedLang)
    }
  }, [])

  // 切換語言 & 存入 localStorage
  const toggleLang = () => {
    const newLang = lang === 'en' ? 'zh' : 'en'
    setLang(newLang)
    localStorage.setItem('lang', newLang)
  }

  return (
    <AppLayout>
      <TopNav lang={lang} toggleLang={toggleLang} />
      <MainNavBar lang={lang} />

      <main className="pt-14 text-center mt-8">
        <h1 className="text-3xl font-bold">主內容區塊</h1>
        <p>這是主頁內容，header 已經固定在上方</p>
      </main>
    </AppLayout>
  )
}

export default App
