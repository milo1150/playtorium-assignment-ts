import { expect, test, describe } from 'vitest'
import {
  sumDefaultCartTotalPrice,
  discountByItemCategory,
  discountByPoints,
  discountBySpecialCampaigns,
  CART_ITEMS,
  calculatePercentageDiscount,
  applyPercentageDiscount,
  calculateDiscountByItemCategory,
  calculateDiscountedCartItemValue,
  calculateMaxDiscountByPoints,
  calculateSpecialCampaignsMaxDiscountsApplicable,
} from '@/src/utils/cart' // update this path as needed
import { CartItem, ItemCategory } from '../types/cart'

describe('Assignment test cases', () => {
  test('Percentage discount', () => {
    const items: CartItem[] = [
      { id: 1, name: 'T-Shirt', price: 350, category: 'Clothing', amount: 1 },
      { id: 2, name: 'Hat', price: 250, category: 'Clothing', amount: 1 },
    ]
    const totalPrice = sumDefaultCartTotalPrice(items)
    const discountPercentage = 10
    const discount = calculatePercentageDiscount(totalPrice, discountPercentage)
    const result = totalPrice - discount
    expect(result).toEqual(540)
  })

  test('Percentage discount by item category', () => {
    const category: ItemCategory = 'Clothing'
    const discount = 15
    const items: CartItem[] = [
      { id: 1, name: 'T-Shirt', price: 350, category: 'Clothing', amount: 1 },
      { id: 2, name: 'Hoodie', price: 700, category: 'Clothing', amount: 1 },
      { id: 3, name: 'Watch', price: 850, category: 'Electronics', amount: 1 },
      { id: 4, name: 'Bag', price: 640, category: 'Accessories', amount: 1 },
    ]
    const result = discountByItemCategory(category, discount, items)
    expect(result).toEqual(2382.5)
  })

  test('Discount by points', () => {
    const sum = sumDefaultCartTotalPrice([
      { id: 1, name: 'T-Shirt', price: 350, category: 'Clothing', amount: 1 },
      { id: 2, name: 'Hat', price: 250, category: 'Clothing', amount: 1 },
      { id: 3, name: 'Belt', price: 230, category: 'Accessories', amount: 1 },
    ])
    const points = 68
    const result = discountByPoints(sum, points)
    expect(result).toEqual(762)
  })

  test('Special campaigns', () => {
    const sum = sumDefaultCartTotalPrice([
      { id: 1, name: 'T-Shirt', price: 350, category: 'Clothing', amount: 1 },
      { id: 2, name: 'Hat', price: 250, category: 'Clothing', amount: 1 },
      { id: 3, name: 'Belt', price: 230, category: 'Accessories', amount: 1 },
    ])
    const threshold = 300
    const discount = 40
    const result = discountBySpecialCampaigns(sum, threshold, discount)
    expect(result).toEqual(750)
  })
})

describe('Custom test cases', () => {
  const sampleCart = CART_ITEMS

  test('should correctly sum total cart price', () => {
    const sum = sumDefaultCartTotalPrice([
      { id: 1, name: 'T-Shirt', price: 350, category: 'Clothing', amount: 1 },
      { id: 2, name: 'Hat', price: 250, category: 'Clothing', amount: 1 },
    ])
    expect(sum).toBe(600)
  })

  test('should apply category discount correctly', () => {
    const discounted = discountByItemCategory('Clothing', 15, sampleCart)
    const expected =
      350 * 0.85 +
      250 * 0.85 +
      700 * 0.85 +
      850 + // Electronics - no discount
      640 + // Accessories - no discount
      230
    expect(discounted).toBeCloseTo(expected, 2)
  })

  test('should apply point discount with points < max allowed discount', () => {
    const total = 600
    const points = 68
    const discounted = discountByPoints(total, points)
    expect(discounted).toBe(600 - 68)
  })

  test('should cap discount by points at MAX_DISCOUNT_BY_POINT (20%)', () => {
    const total = 1000
    const points = 300 // more than 20% of total
    const expected = 1000 - 200 // 20% of 1000
    const discounted = discountByPoints(total, points)
    expect(discounted).toBe(expected)
  })

  test('should apply special campaign discount per threshold', () => {
    const total = 1200
    const threshold = 300
    const discount = 40
    const expected = 1200 - 4 * 40 // 4 full thresholds
    const discounted = discountBySpecialCampaigns(total, threshold, discount)
    expect(discounted).toBe(expected)
  })

  test('should return original price if campaign threshold not reached', () => {
    const total = 200
    const discounted = discountBySpecialCampaigns(total, 300, 50)
    expect(discounted).toBe(200)
  })
})

describe('Custom test cases (V2)', () => {
  test('applyPercentageDiscount should subtract correct discount', () => {
    const total = 1000
    const discount = 10
    const result = applyPercentageDiscount(total, discount)
    expect(result).toBe(900)
  })

  test('calculateDiscountedCartItemValue should return correct discount value', () => {
    const item: CartItem = {
      id: 1,
      name: 'T-Shirt',
      price: 500,
      category: 'Clothing',
      amount: 1,
    }
    const discount = 20
    const result = calculateDiscountedCartItemValue(item, discount)
    expect(result).toBe(100)
  })

  test('calculateDiscountByItemCategory should sum correct discount for matching category', () => {
    const items: CartItem[] = [
      { id: 1, name: 'T-Shirt', price: 300, category: 'Clothing', amount: 1 },
      {
        id: 2,
        name: 'Laptop',
        price: 2000,
        category: 'Electronics',
        amount: 1,
      },
      { id: 3, name: 'Hat', price: 200, category: 'Clothing', amount: 1 },
    ]
    const result = calculateDiscountByItemCategory('Clothing', 10, items)
    expect(result).toBe(50) // 10% of (300 + 200)
  })

  test('calculateMaxDiscountByPoints should return 20% of total', () => {
    const result = calculateMaxDiscountByPoints(1000)
    expect(result).toBe(200)
  })

  test('calculateSpecialCampaignsMaxDiscountsApplicable should floor total/threshold', () => {
    const result = calculateSpecialCampaignsMaxDiscountsApplicable(1050, 200)
    expect(result).toBe(5) // floor(1050 / 200)
  })
})
