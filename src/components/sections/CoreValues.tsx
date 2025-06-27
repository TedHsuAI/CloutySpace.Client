import { BaseProps, CoreValue } from '@/types/common'
import { i18n } from '@/lang'

// 導入 SVG 圖片
import TaiwanIcon from '@/assets/svg/taiwan_icon.svg'
import TraceableSource from '@/assets/svg/TraceableSource.svg'
import RelaxationAndWellness from '@/assets/svg/RelaxationAndWellness.svg'

interface CoreValuesProps extends BaseProps {}

const CoreValues = ({ lang }: CoreValuesProps) => {
  const t = i18n[lang]

  const coreValues: CoreValue[] = [
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

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {coreValues.map((value, index) => (
            <div key={index} className="text-center px-4">
              <div className="flex justify-center mb-8">
                <img 
                  src={value.icon} 
                  alt={value.title}
                  className="w-24 h-24 object-contain"
                />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                {value.title}
              </h3>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreValues
