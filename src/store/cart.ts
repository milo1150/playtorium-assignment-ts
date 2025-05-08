import { create } from 'zustand'
import { CART_ITEMS, CartItem } from '../utils/cart'
import _ from 'lodash'

export type CartState = {
  items: CartItem[]
}

export type CheckoutAction = {
  reset: () => void
  count: () => number
  add: (item: CartItem) => void
  delete: (item: CartItem) => void
}

const initCart: CartState = {
  items: [],
}

function getDefaultItemPrice(id: number): number {
  return CART_ITEMS.find((item) => item.id === id)?.price || 0
}

function findCartItemIndex(cartItems: CartItem[], target: CartItem): number {
  return cartItems.findIndex((item) => item.id === target.id)
}

export const useCartStore = create<CartState & CheckoutAction>()(
  (set, get) => ({
    items: [],
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
  })
)
