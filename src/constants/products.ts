import { TeaProduct } from '@/types/common'

// Import images
import islandRubyImg from '@/assets/images/secondProduct/Island_Ruby-loose_leaf_1_v2.webp'
import springSproutImg from '@/assets/images/secondProduct/Spring_Sprout-loose_leaf_1_v2.webp'
import honeyPetalImg from '@/assets/images/secondProduct/Honey_Petal-loose_leaf_1_v2.webp'
import mountainMistImg from '@/assets/images/secondProduct/Mountain_Mist-loose_leaf_1_v2.webp'

export const TEA_PRODUCT_NAMES = {
  i: { zh: '灣島紅玉', en: 'Island Ruby' },
  h: { zh: '冬藏蜜蘊', en: 'Honey Petal' },
  m: { zh: '山渺烏龍', en: 'Mountain Mist' },
  s: { zh: '冬祈春芽', en: 'Spring Sprout' },
} as const

export const TEA_PRODUCTS: TeaProduct[] = [
  {
    key: 'i',
    price: 30.0,
    image: islandRubyImg,
  },
  {
    key: 's',
    price: 43.5,
    image: springSproutImg,
  },
  {
    key: 'h',
    price: 26.0,
    image: honeyPetalImg,
  },
  {
    key: 'm',
    price: 43.5,
    image: mountainMistImg,
  },
]

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/profile.php?id=100072498547679#',
  instagram: 'https://www.instagram.com/cloutyspace/',
} as const
