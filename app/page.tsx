'use client'

import '@ant-design/v5-patch-for-react-19'
import {
  discountByItemCategory,
  discountByPoints,
  discountBySpecialCampaigns,
  sumDefaultCartTotalPrice,
} from '@/src/utils/cart'
import { useEffect } from 'react'

export default function Home() {
  // const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const sum = sumDefaultCartTotalPrice([
      { name: 'T-Shirt', price: 350, category: 'Clothing' },
      { name: 'Hat', price: 250, category: 'Clothing' },
    ])
    console.log('getTotalCartItemsPrice', sum)

    const c = discountByItemCategory('Clothing', 15, [
      { name: 'T-Shirt', price: 350, category: 'Clothing' },
      { name: 'Hoodie', price: 700, category: 'Clothing' },
      { name: 'Watch', price: 850, category: 'Electronics' },
      { name: 'Bag', price: 640, category: 'Accessories' },
    ])
    console.log('discountByItemCategory', c)

    const dSum = sumDefaultCartTotalPrice([
      { name: 'T-Shirt', price: 350, category: 'Clothing' },
      { name: 'Hat', price: 250, category: 'Clothing' },
      { name: 'Belt', price: 230, category: 'Accessories' },
    ])
    const d = discountByPoints(dSum, 68)
    console.log('discountByPoints', d)

    const fSum = sumDefaultCartTotalPrice([
      { name: 'T-Shirt', price: 350, category: 'Clothing' },
      { name: 'Hat', price: 250, category: 'Clothing' },
      { name: 'Belt', price: 230, category: 'Accessories' },
    ])
    const f = discountBySpecialCampaigns(fSum, 300, 40)
    console.log('discountBySpecialCampaigns', f)
  }, [])

  return <div className="App"></div>
}
