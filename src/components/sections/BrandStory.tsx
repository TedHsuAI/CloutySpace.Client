import { useState } from 'react'
import { BaseProps, ImageData } from '@/types/common'

// Import images
import teaLeafField from '@/assets/images/tea-leaf-field.png'
import flatLayArrangement from '@/assets/images/flat-lay-arrangement-with-tea-cups-herbs-1.png'

interface BrandStoryProps extends BaseProps {}

const BrandStory = ({ lang }: BrandStoryProps) => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)

  const imageData: ImageData[] = [
    {
      id: 'story',
      title: lang === 'zh' ? '我們的故事' : 'Our Story',
      image: teaLeafField,
      alt: 'Tea leaf field'
    },
    {
      id: 'knowledge',
      title: lang === 'zh' ? '茶葉知識' : 'Tea Knowledge',
      image: flatLayArrangement,
      alt: 'Flat lay arrangement with tea cups and herbs'
    }
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Images Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {imageData.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
              onMouseEnter={() => setHoveredImage(item.id)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <div className="relative overflow-hidden shadow-xl bg-white group-hover:shadow-2xl transition-shadow duration-300">
                <div className="relative w-full h-[420px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                      hoveredImage === item.id 
                        ? 'transform scale-110' 
                        : 'transform scale-100'
                    }`}
                    style={{
                      transformOrigin: 'center center'
                    }}
                  />
                  
                  <div className={`absolute inset-0 border-4 border-green-400 transition-opacity duration-300 ${
                    hoveredImage === item.id ? 'opacity-100' : 'opacity-0'
                  }`} />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-4xl font-normal text-white text-center drop-shadow-lg">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-[32px] font-semibold text-gray-800 mb-6">
            {lang === 'zh' ? '我們的核心直達您的心' : 'Our core to your heart'}
          </h2>
          <p className="text-[16px] text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {lang === 'zh' 
              ? '重新連接您的生活和心靈。我們承諾提供只對客戶有益的產品，無論是身體上還是精神上。'
              : 'Reconnect to your life and mind. We promise to provide products that only benefit our customers, both physically and mentally.'
            }
          </p>
          <div className="w-24 h-1 bg-gray-400 mx-auto"></div>
        </div>
      </div>
    </section>
  )
}

export default BrandStory
