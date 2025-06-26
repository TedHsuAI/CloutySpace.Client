import { FC } from 'react';
import SearchInput from '@/components/ui/SearchInput';
import { i18n } from '@/lang';
import logo from '@/assets/images/logo/Logo-100p.png';
import MainNavBarButton from '@/components/ui/MainNavBarButton';

interface MainNavBarProps {
  lang: 'en' | 'zh';
}

const MainNavBar: FC<MainNavBarProps> = ({ lang }) => {
  const fontClass = lang === 'zh' ? 'font-zh' : 'font-en';

  return (
    <nav className={`w-full bg-white shadow-sm mt-14 sticky top-14 z-40 border-b ${fontClass}`}>
      <div className="max-w-5xl mx-auto h-24 relative flex items-center">
        <div className="flex-grow flex justify-center items-center gap-10">
          <MainNavBarButton text={i18n[lang].home} />
          <MainNavBarButton text={i18n[lang].shop} />
          <div className="mx-4" style={{ width: '66px', height: '54px' }}></div>
          <MainNavBarButton text={i18n[lang].aboutUs} />
          <MainNavBarButton text={i18n[lang].learn} />
        </div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ width: '66px', height: '54px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src={logo}
            alt="Brand Logo"
            style={{ width: '66px', height: '54px', objectFit: 'contain' }}
            className="cursor-pointer transition hover:opacity-90"
          />
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <SearchInput lang={lang} />
        </div>
      </div>
    </nav>
  );
};

export default MainNavBar;
