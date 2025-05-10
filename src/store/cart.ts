import { create } from 'zustand'
import {
  CART_ITEMS,
  calculateDiscountByItemCategory,
  calculateDiscountBySpecialCampaigns,
  calculateMaxDiscountByPoints,
  calculatePercentageDiscount,
  sumDefaultCartTotalPrice,
} from '../utils/cart'
import _ from 'lodash'
import { CartItem, Discount } from '../types/cart'

export type CartState = {
  items: CartItem[]
  discount: Discount
}

export type CartAction = {
  reset: () => void
  count: () => number
  add: (item: CartItem) => void
  delete: (item: CartItem) => void
  setDiscountFixedAmount: (args: Discount['fixedAmount']) => void
  setDiscountPercentage: (args: Discount['percentage']) => void
  setDiscountPercentageDiscountByItemCategory: (
    args: Discount['percentageDiscountByItemCategory']
  ) => void
  setDiscountByPoint: (args: Discount['byPoints']) => void
  setDiscountSpecialCampaigns: (args: Discount['specialCampaigns']) => void
  getTotalPrice: () => number
  getTotalCouponDiscount: () => number
  getTotalOntopDiscount: () => number
  getTotalSpecialDiscount: () => number
  getMaxPoints: () => number
}

const initCart: CartState = {
  items: [],
  discount: {
    fixedAmount: {
      checked: false,
      amount: 0,
    },
    percentage: {
      checked: false,
      percent: 0,
    },
    percentageDiscountByItemCategory: {
      checked: false,
      category: 'Accessories',
      amount: 0,
    },
    byPoints: {
      checked: false,
      points: 0,
    },
    specialCampaigns: {
      checked: false,
      every: 0,
      discount: 0,
    },
  },
}

function getDefaultItemPrice(id: number): number {
  return CART_ITEMS.find((item) => item.id === id)?.price || 0
}

function findCartItemIndex(cartItems: CartItem[], target: CartItem): number {
  return cartItems.findIndex((item) => item.id === target.id)
}

export const useCartStore = create<CartState & CartAction>()((set, get) => ({
  items: [],
  discount: initCart.discount,
  count: () => get().items.length,
  reset: () => set(initCart),
  add: (cartItem) => {
    set((state) => {
      const newState = _.cloneDeep(state) // cloneDeep for prevent CART_ITEMS mutated
      const findItemIndex = findCartItemIndex(state.items, cartItem)

      if (findItemIndex >= 0) {
        newState.items[findItemIndex].amount += 1
        newState.items[findItemIndex].price += cartItem.price
      } else {
        newState.items = [...newState.items, cartItem]
      }

      return newState
    })
  },
  delete: (cartItem) => {
    set((state) => {
      const newState = _.cloneDeep(state) // cloneDeep for prevent CART_ITEMS mutated
      const findItemIndex = findCartItemIndex(state.items, cartItem)

      if (findItemIndex === -1) {
        console.error('(delete) -> item not found', cartItem)
        return state
      }

      const targetItem = newState.items[findItemIndex]

      if (findItemIndex >= 0 && targetItem.amount >= 2) {
        newState.items[findItemIndex].amount -= 1
        newState.items[findItemIndex].price =
          targetItem.price - getDefaultItemPrice(cartItem.id)
      } else {
        newState.items = newState.items.filter(
          (item) => item.id !== cartItem.id
        )
      }

      return newState
    })
  },

  setDiscountFixedAmount: (args) => {
    set((state) => {
      const newState = _.cloneDeep(state)
      newState.discount.fixedAmount = { ...args }
      return newState
    })
  },

  setDiscountPercentage: (args) => {
    set((state) => {
      const newState = _.cloneDeep(state)
      newState.discount.percentage = { ...args }
      return newState
    })
  },

  setDiscountPercentageDiscountByItemCategory: (args) => {
    set((state) => {
      const newState = _.cloneDeep(state)
      newState.discount.percentageDiscountByItemCategory = { ...args }
      return newState
    })
  },

  setDiscountByPoint: (args) => {
    set((state) => {
      const newState = _.cloneDeep(state)
      newState.discount.byPoints = { ...args }
      return newState
    })
  },

  setDiscountSpecialCampaigns: (args) => {
    set((state) => {
      const newState = _.cloneDeep(state)
      newState.discount.specialCampaigns = { ...args }
      return newState
    })
  },

  getTotalCouponDiscount: () => {
    const totalPrice: number = sumDefaultCartTotalPrice(get().items)

    // Fixed amount (Coupon)
    if (get().discount.fixedAmount.checked) {
      return get().discount.fixedAmount.amount
    }

    // Percentage discount (Coupon)
    if (get().discount.percentage.checked) {
      const discount = calculatePercentageDiscount(
        totalPrice,
        get().discount.percentage.percent
      )
      return discount
    }

    return 0
  },

  getMaxPoints: () => {
    const totalPrice: number = sumDefaultCartTotalPrice(get().items)
    return calculateMaxDiscountByPoints(totalPrice)
  },

  getTotalOntopDiscount: () => {
    const totalPrice: number = sumDefaultCartTotalPrice(get().items)

    // Percentage discount by item category (Ontop)
    if (get().discount.percentageDiscountByItemCategory.checked) {
      const args = get().discount.percentageDiscountByItemCategory
      const totalDiscountPrices = calculateDiscountByItemCategory(
        args.category,
        args.amount,
        get().items
      )
      return totalDiscountPrices
    }

    // Discount by points (Ontop)
    if (get().discount.byPoints.checked) {
      const maxDiscountValue = calculateMaxDiscountByPoints(totalPrice)
      const discountByPoints = _.min([
        get().discount.byPoints.points,
        maxDiscountValue,
      ]) as number
      return discountByPoints
    }

    return 0
  },

  getTotalSpecialDiscount: () => {
    const totalPrice: number = sumDefaultCartTotalPrice(get().items)

    // Special campaigns (Seasonal)
    const specialCampaigns = get().discount.specialCampaigns
    if (
      specialCampaigns.checked &&
      specialCampaigns.every > 0 && // prevent NaN
      specialCampaigns.discount > 0 // prevent NaN
    ) {
      const specialDiscount = calculateDiscountBySpecialCampaigns(
        totalPrice,
        specialCampaigns.every,
        specialCampaigns.discount
      )
      return specialDiscount
    }

    return 0
  },

  getTotalPrice: () => {
    let totalPrice: number = sumDefaultCartTotalPrice(get().items)

    // (Coupon) Fixed amount & Percentage discount
    totalPrice -= get().getTotalCouponDiscount()

    // (Ontop) Percentage discount by item category & Discount by points
    totalPrice -= get().getTotalOntopDiscount()

    // (Seasonal) Special campaigns
    totalPrice -= get().getTotalSpecialDiscount()

    return totalPrice
  },
}))
