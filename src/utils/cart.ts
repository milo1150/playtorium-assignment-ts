import _ from 'lodash'

const MAX_DISCOUNT_BY_POINT = 20 // Percentage

export type ItemCategory = 'Clothing' | 'Accessories' | 'Electronics'
export type CartItem = {
  id: number
  name: string
  price: number
  category: ItemCategory
  amount: number
}

export const CART_ITEMS: Array<CartItem> = [
  { id: 1, name: 'T-Shirt', price: 350, category: 'Clothing', amount: 1 },
  { id: 2, name: 'Hat', price: 250, category: 'Clothing', amount: 1 },
  { id: 3, name: 'Hoodie', price: 700, category: 'Clothing', amount: 1 },
  { id: 4, name: 'Watch', price: 850, category: 'Electronics', amount: 1 },
  { id: 5, name: 'Bag', price: 640, category: 'Accessories', amount: 1 },
  { id: 6, name: 'Belt', price: 230, category: 'Accessories', amount: 1 },
] as const

export function sumDefaultCartTotalPrice(items: CartItem[]): number {
  return _.sumBy(items, 'price')
}

/**
 * @param discount - Percentage value.
 */
export function calculatePercentageDiscount(
  totalPrice: number,
  discount: number
): number {
  return (discount / 100) * totalPrice
}

/**
 * @param discount - Percentage value.
 */
export function getDiscountedCartItemValue(
  item: CartItem,
  discount: number
): number {
  return item.price - (discount / 100) * item.price
}

/**
 * @param discount - Percentage value.
 */
export function discountByItemCategory(
  category: ItemCategory,
  discount: number,
  items: CartItem[]
): number {
  const result = _.chain(items)
    .cloneDeep()
    .map((cartItem) =>
      cartItem.category === category
        ? getDiscountedCartItemValue(cartItem, discount)
        : cartItem.price
    )
    .sum()
    .value()
  return result
}

/**
 * @param discount - Percentage value.
 */
export function discountByPoints(totalPrice: number, points: number): number {
  const maxDiscount = (MAX_DISCOUNT_BY_POINT / 100) * totalPrice
  const result =
    points >= maxDiscount ? totalPrice - maxDiscount : totalPrice - points
  return result
}

/**
 * @param threshold - Every X THB for Discount Y THB.
 * @param discount - THB value.
 */
export function discountBySpecialCampaigns(
  totalPrice: number,
  threshold: number,
  discount: number
): number {
  const maxDiscountsApplicable = _.floor(totalPrice / threshold)
  return totalPrice - maxDiscountsApplicable * discount
}
