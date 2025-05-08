import _ from 'lodash'

const MAX_DISCOUNT_BY_POINT = 20 // Percentage

export type ItemCategory = 'Clothing' | 'Accessories' | 'Electronics'
export type CartItem = { name: string; price: number; category: ItemCategory }

export const CART_ITEMS: ReadonlyArray<CartItem> = [
  { name: 'T-Shirt', price: 350, category: 'Clothing' },
  { name: 'Hat', price: 250, category: 'Clothing' },
  { name: 'Hoodie', price: 700, category: 'Clothing' },
  { name: 'Watch', price: 850, category: 'Electronics' },
  { name: 'Bag', price: 640, category: 'Accessories' },
  { name: 'Belt', price: 230, category: 'Accessories' },
]

export function sumDefaultCartTotalPrice(items: CartItem[]): number {
  return _.sumBy(items, 'price')
}

/**
 * @param discountAmount - Percentage value.
 */
export function calculatePercentageDiscount(
  totalPrice: number,
  discountAmount: number
): number {
  return (discountAmount / 100) * totalPrice
}

/**
 * @param discountAmount - Percentage value.
 */
function getDiscountedCartItemValue(
  item: CartItem,
  discountAmount: number
): number {
  return item.price - (discountAmount / 100) * item.price
}

/**
 * @param discountAmount - Percentage value.
 */
export function discountByItemCategory(
  category: ItemCategory,
  discountAmount: number,
  items: CartItem[]
): number {
  const result = _.chain(items)
    .cloneDeep()
    .map((cartItem) =>
      cartItem.category === category
        ? getDiscountedCartItemValue(cartItem, discountAmount)
        : cartItem.price
    )
    .sum()
    .value()
  return result
}

/**
 * @param discountAmount - Percentage value.
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
