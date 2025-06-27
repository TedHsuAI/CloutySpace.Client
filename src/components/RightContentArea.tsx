interface RightContentAreaProps {
  lang?: 'en' | 'zh'
}

interface Product {
  key: 'i' | 'h' | 'm' | 's'
  price: number
  image: string
}

const productNames = {
  i: { zh: '灣島紅玉', en: 'Island Ruby' },
  h: { zh: '冬藏蜜蘊', en: 'Honey Petal' },
  m: { zh: '山渺烏龍', en: 'Mountain Mist' },
  s: { zh: '冬祈春芽', en: 'Spring Sprout' },
}

const products: Product[] = [
  {
    key: 'i',
    price: 30.0,
    image: '/src/assets/images/secondProduct/Island_Ruby-loose_leaf_1_v2.webp',
  },
  {
    key: 's',
    price: 43.5,
    image: '/src/assets/images/secondProduct/Spring_Sprout-loose_leaf_1_v2.webp',
  },
  {
    key: 'h',
    price: 26.0,
    image: '/src/assets/images/secondProduct/Honey_Petal-loose_leaf_1_v2.webp',
  },
  {
    key: 'm',
    price: 43.5,
    image: '/src/assets/images/secondProduct/Mountain_Mist-loose_leaf_1_v2.webp',
  },
]

const RightContentArea = ({ lang = 'en' }: RightContentAreaProps) => {
  return (
    <div className="w-full h-full px-4">
      <div className="grid grid-cols-2 gap-4 h-full">
        {products.map((product, index) => (
          <div key={index} className="bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            <div className="flex-1 overflow-hidden h-full">
              <img
                src={product.image}
                alt={productNames[product.key][lang]}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3 text-center flex-shrink-0">
              <h3 className="font-medium text-gray-800 mb-2 text-base">
                {productNames[product.key][lang]}
              </h3>
              <p className="text-sm font-medium text-gray-500">
                ${product.price.toFixed(1)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RightContentArea
