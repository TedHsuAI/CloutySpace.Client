import { FC, useCallback } from 'react'
import { BaseProps, NavItem } from '@/types/common'
import { SearchInput } from '@/components/shared/SearchInput'
import { i18n } from '@/lang'
import logo from '@/assets/images/logo/Logo-100p.png'
import MainNavBarButton from '@/components/ui/MainNavBarButton'

interface MainNavBarProps extends BaseProps {
  onSearch?: (query: string) => void
  onNavClick?: (path: string) => void
}

const getNavItems = (lang: 'en' | 'zh'): NavItem[] => [
  { id: 'home', label: i18n[lang].home, href: '/' },
  { id: 'shop', label: i18n[lang].shop, href: '/shop' },
  { id: 'about', label: i18n[lang].aboutUs, href: '/about' },
  { id: 'learn', label: i18n[lang].learn, href: '/learn' },
]

const MainNavBar: FC<MainNavBarProps> = ({ 
  lang, 
  onSearch,
  onNavClick,
  className = ''
}) => {
  const fontClass = lang === 'zh' ? 'font-zh' : 'font-en'
  const navItems = getNavItems(lang)

  const handleSearch = useCallback((query: string) => {
    if (onSearch) {
      onSearch(query)
    } else {
      console.log('Searching for:', query)
    }
  }, [onSearch])

  const handleNavClick = useCallback((href: string) => {
    if (onNavClick) {
      onNavClick(href)
    }
  }, [onNavClick])

  return (
    <nav className={`w-full bg-white shadow-sm mt-14 sticky top-14 z-40 border-b ${fontClass} ${className}`}>
      <div className="max-w-5xl mx-auto h-24 relative flex items-center">
        {/* Navigation Items */}
        <div className="flex-grow flex justify-center items-center gap-10">
          {navItems.slice(0, 2).map((item) => (
            <MainNavBarButton 
              key={item.id}
              text={item.label} 
              onClick={() => handleNavClick(item.href)}
            />
          ))}
          
          {/* Logo Space */}
          <div className="mx-4" style={{ width: '66px', height: '54px' }}></div>
          
          {navItems.slice(2).map((item) => (
            <MainNavBarButton 
              key={item.id}
              text={item.label} 
              onClick={() => handleNavClick(item.href)}
            />
          ))}
        </div>
        
        {/* Centered Logo */}
        <div 
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" 
          style={{ width: '66px', height: '54px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <img
            src={logo}
            alt="Brand Logo"
            style={{ width: '66px', height: '54px', objectFit: 'contain' }}
            className="cursor-pointer transition hover:opacity-90"
            onClick={() => handleNavClick('/')}
          />
        </div>
        
        {/* Search Input */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <SearchInput 
            lang={lang} 
            variant="expandable"
            onSearch={handleSearch}
          />
        </div>
      </div>
    </nav>
  )
}

export default MainNavBar;
