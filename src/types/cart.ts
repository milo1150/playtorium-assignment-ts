import { DefaultOptionType } from 'antd/es/select'

export type ItemCategory = 'Clothing' | 'Accessories' | 'Electronics' | ''

export interface ItemCategoryDropdown extends Omit<DefaultOptionType, 'value'> {
  value?: ItemCategory | null
}

export type CartItem = {
  id: number
  name: string
  price: number
  category: ItemCategory
  amount: number
}

export type Discount = {
  fixedAmount: {
    checked: boolean
    amount: number
  }
  percentage: {
    checked: boolean
    percent: number
  }
  percentageDiscountByItemCategory: {
    checked: boolean
    category: ItemCategory
    amount: number
  }
  byPoints: {
    checked: boolean
    points: number
  }
  specialCampaigns: {
    checked: boolean
    every: number
    discount: number
  }
}
