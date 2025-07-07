import { TeaProduct } from '@/types/common'

// Import images
import islandRubyImg from '@/assets/images/secondProduct/Island_Ruby-loose_leaf_1_v2.webp'
import springSproutImg from '@/assets/images/secondProduct/Spring_Sprout-loose_leaf_1_v2.webp'
import honeyPetalImg from '@/assets/images/secondProduct/Honey_Petal-loose_leaf_1_v2.webp'
import mountainMistImg from '@/assets/images/secondProduct/Mountain_Mist-loose_leaf_1_v2.webp'
import giftSetImg from '@/assets/images/firstProduct/02-禮盒-2.png'

// Import tea bag images (local files)
import islandRubyTeaBagImg from '@/assets/images/teaBags/Island_Ruby-tea_bag_1_v2.webp'
import springSproutTeaBagImg from '@/assets/images/teaBags/Spring_Sprout-tea_bag_1_v2.webp'
import honeyPetalTeaBagImg from '@/assets/images/teaBags/Honey_Petal-tea_bag_1_v2.webp'
import mountainMistTeaBagImg from '@/assets/images/teaBags/Mountain_Mist-tea_bag_1_v2.webp'

export const TEA_PRODUCT_NAMES = {
  i: { zh: '灣島紅玉', en: 'Island Ruby' },
  h: { zh: '冬藏蜜蘊', en: 'Honey Petal' },
  m: { zh: '山渺烏龍', en: 'Mountain Mist' },
  s: { zh: '冬祈春芽', en: 'Spring Sprout' },
  g: { zh: '禮盒', en: 'Gift Set' },
} as const

export const TEA_CATEGORIES = {
  'black-tea': { zh: '紅茶', en: 'Black Tea' },
  'oolong-tea': { zh: '烏龍茶', en: 'Oolong Tea' },
  'green-tea': { zh: '綠茶', en: 'Green Tea' },
} as const

export const TEA_FORMATS = {
  'loose-leaf': { zh: '散茶', en: 'Loose Leaf' },
  'tea-bags': { zh: '茶包', en: 'Tea Bags' },
  'gift-sets': { zh: '禮盒組', en: 'Gift Sets' },
} as const

export const SHOP_PRODUCTS: TeaProduct[] = [
  // Gift Set
  {
    key: 'g',
    price: 90.0,
    image: giftSetImg,
    category: 'gift-sets',
    format: 'gift-sets',
    hasVariants: true,
  },
  // Honey Petal - Tea Bags
  {
    key: 'h',
    price: 21.0,
    image: honeyPetalTeaBagImg,
    category: 'black-tea',
    format: 'tea-bags',
    hasVariants: false,
  },
  // Honey Petal - Loose Leaf
  {
    key: 'h',
    price: 26.0,
    image: honeyPetalImg,
    category: 'black-tea',
    format: 'loose-leaf',
    hasVariants: false,
  },
  // Island Ruby - Tea Bags
  {
    key: 'i',
    price: 23.0,
    image: islandRubyTeaBagImg,
    category: 'black-tea',
    format: 'tea-bags',
    hasVariants: false,
  },
  // Island Ruby - Loose Leaf
  {
    key: 'i',
    price: 30.0,
    image: islandRubyImg,
    category: 'black-tea',
    format: 'loose-leaf',
    hasVariants: false,
  },
  // Mountain Mist - Tea Bags
  {
    key: 'm',
    price: 21.0,
    image: mountainMistTeaBagImg,
    category: 'oolong-tea',
    format: 'tea-bags',
    hasVariants: false,
  },
  // Mountain Mist - Loose Leaf
  {
    key: 'm',
    price: 43.5,
    image: mountainMistImg,
    category: 'oolong-tea',
    format: 'loose-leaf',
    hasVariants: false,
  },
  // Spring Sprout - Tea Bags
  {
    key: 's',
    price: 21.0,
    image: springSproutTeaBagImg,
    category: 'green-tea',
    format: 'tea-bags',
    hasVariants: false,
  },
  // Spring Sprout - Loose Leaf
  {
    key: 's',
    price: 43.5,
    image: springSproutImg,
    category: 'green-tea',
    format: 'loose-leaf',
    hasVariants: false,
  },
]

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
