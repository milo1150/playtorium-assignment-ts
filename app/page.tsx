'use client'

/**
 * @see https://ant.design/docs/react/v5-for-19
 */
import '@ant-design/v5-patch-for-react-19'

/**
 * @description prevent page flicker
 * @see https://ant.design/docs/react/use-with-next?theme=dark#using-app-router
 */
import { AntdRegistry } from '@ant-design/nextjs-registry'

import {
  discountByItemCategory,
  discountByPoints,
  discountBySpecialCampaigns,
  sumDefaultCartTotalPrice,
} from '@/src/utils/cart'
import { useEffect } from 'react'
import { MainPage } from '@/src/components/MainPage'

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

  return (
    <AntdRegistry>
      <div className="w-full p-20 justify-center! h-lvh bg-gray-500 items-center! justify-items-center">
        <MainPage />
      </div>
    </AntdRegistry>
  )
}
