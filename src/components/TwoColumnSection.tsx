import ImageCarousel from './ImageCarousel'
import RightContentArea from './RightContentArea'

interface TwoColumnSectionProps {
  lang: 'en' | 'zh'
}

const TwoColumnSection = ({ lang }: TwoColumnSectionProps) => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[1146px] items-start">
          {/* 左側：圖片輪播區域 */}
          <div className="h-full">
            <ImageCarousel lang={lang} />
          </div>

          {/* 右側：內容區域 */}
          <div className="h-full">
            <RightContentArea lang={lang} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TwoColumnSection
