import { i18n } from '@/lang'
import { BaseProps, CoreValue } from '@/types/common'

// 導入 SVG 圖片
import TaiwanIcon from '@/assets/svg/taiwan_icon.svg'
import TraceableSource from '@/assets/svg/TraceableSource.svg'
import RelaxationAndWellness from '@/assets/svg/RelaxationAndWellness.svg'

interface CoreValuesSectionProps extends BaseProps {}

const getCoreValuesData = (lang: 'en' | 'zh'): CoreValue[] => {
  const t = i18n[lang]
  
  return [
    {
      icon: TaiwanIcon,
      title: t.originatedFromTaiwan,
      description: t.originatedFromTaiwanDesc,
    },
    {
      icon: TraceableSource,
      title: t.traceableSource,
      description: t.traceableSourceDesc,
    },
    {
      icon: RelaxationAndWellness,
      title: t.relaxationAndWellness,
      description: t.relaxationAndWellnessDesc,
    },
  ]
}

interface CoreValueItemProps {
  value: CoreValue
}

const CoreValueItem = ({ value }: CoreValueItemProps) => (
  <div className="text-center px-4">
    {/* 圖標 */}
    <div className="flex justify-center mb-8">
      <img 
        src={value.icon} 
        alt={value.title}
        className="w-24 h-24 object-contain"
      />
    </div>
    
    {/* 標題 */}
    <h3 className="text-2xl font-semibold text-gray-800 mb-6">
      {value.title}
    </h3>
    
    {/* 描述 */}
    <p className="text-lg text-gray-600 leading-relaxed">
      {value.description}
    </p>
  </div>
)

export default function CoreValuesSection({ lang, className = '' }: CoreValuesSectionProps) {
  const coreValues = getCoreValuesData(lang)

  return (
    <section className={`py-16 px-4 bg-white ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* 三欄內容 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {coreValues.map((value, index) => (
            <CoreValueItem key={index} value={value} />
          ))}
        </div>
      </div>
    </section>
  )
}
