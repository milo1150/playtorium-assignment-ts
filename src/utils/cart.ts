import _ from 'lodash'
import { CartItem, ItemCategory } from '../types/cart'

const MAX_DISCOUNT_BY_POINT = 20 // Percentage
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
 * @return discount price only.
 */
export function calculatePercentageDiscount(
  totalPrice: number,
  discount: number
): number {
  return (discount / 100) * totalPrice
}

/**
 * @param discount - The discount percentage to apply.
 * @return The total price after the discount is applied.
 */
export function applyPercentageDiscount(
  totalPrice: number,
  discount: number
): number {
  return totalPrice - calculatePercentageDiscount(totalPrice, discount)
}

export function getDiscountedCartItemValue(
  item: CartItem,
  discount: number
): number {
  return item.price - (discount / 100) * item.price
}

/**
 * @param discount - Percentage value.
 * @return The total price after the discount is applied.
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
 * @return discount price only.
 */
export function calculateDiscountedCartItemValue(
  item: CartItem,
  discount: number
): number {
  return (discount / 100) * item.price
}

/**
 * @param discount - Percentage value.
 * @return discount price only.
 */
export function calculateDiscountByItemCategory(
  category: ItemCategory,
  discount: number,
  items: CartItem[]
): number {
  const result: number[] = []
  items.forEach(
    (cartItem) =>
      cartItem.category === category &&
      result.push(calculateDiscountedCartItemValue(cartItem, discount))
  )
  return _.sum(result)
}

export function calculateMaxDiscountByPoints(totalPrice: number): number {
  return (MAX_DISCOUNT_BY_POINT / 100) * totalPrice
}

/**
 * @return The total price after the discount is applied.
 */
export function discountByPoints(totalPrice: number, points: number): number {
  const maxDiscount = calculateMaxDiscountByPoints(totalPrice)
  const result =
    points >= maxDiscount ? totalPrice - maxDiscount : totalPrice - points
  return result
}

/**
 * @param threshold - Every X THB for Discount Y THB.
 */
export function calculateSpecialCampaignsMaxDiscountsApplicable(
  totalPrice: number,
  threshold: number
): number {
  return _.floor(totalPrice / threshold)
}

/**
 * @param threshold - Every X THB for Discount Y THB.
 * @param discount - THB value.
 * @return discount price only.
 */
export function calculateDiscountBySpecialCampaigns(
  totalPrice: number,
  threshold: number,
  discount: number
): number {
  const maxDiscountsApplicable =
    calculateSpecialCampaignsMaxDiscountsApplicable(totalPrice, threshold)
  return maxDiscountsApplicable * discount
}

/**
 * @param threshold - Every X THB for Discount Y THB.
 * @param discount - THB value.
 * @return The total price after the discount is applied.
 */
export function discountBySpecialCampaigns(
  totalPrice: number,
  threshold: number,
  discount: number
): number {
  const maxDiscountsApplicable =
    calculateSpecialCampaignsMaxDiscountsApplicable(totalPrice, threshold)
  return totalPrice - maxDiscountsApplicable * discount
}
