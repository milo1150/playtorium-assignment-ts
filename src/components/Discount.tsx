'use client'

import { Card, Checkbox, Divider, InputNumber, Row, Select } from 'antd'
import { useCartStore } from '../store/cart'
import { ItemCategoryDropdown } from '../types/cart'
import { useMemo } from 'react'

export const Discount: React.FC = () => {
  const cartStore = useCartStore((state) => state)
  const discount = useCartStore((state) => state.discount)

  const disabledFixedAmount = useMemo<boolean>(
    () => discount.percentage.checked,
    [discount.percentage.checked]
  )
  const disabledPercentage = useMemo<boolean>(
    () => discount.fixedAmount.checked,
    [discount.fixedAmount.checked]
  )
  const disabledPercentageDiscountByItemCategory = useMemo<boolean>(
    () => discount.byPoints.checked,
    [discount.byPoints.checked]
  )
  const disabledByPoints = useMemo<boolean>(
    () => discount.percentageDiscountByItemCategory.checked,
    [discount.percentageDiscountByItemCategory.checked]
  )

  const maxPoints = useMemo<number>(() => {
    return discount.byPoints.checked ? cartStore.getMaxPoints() : 0
  }, [cartStore, discount.byPoints.checked])

  return (
    <Card>
      <p className="text-xl font-extrabold">Discount</p>
      <Divider className="my-2!" />

      <div className="py-1!">
        <Checkbox
          className="pb-1!"
          onChange={(e) => {
            cartStore.setDiscountFixedAmount({
              checked: e.target.checked,
              amount: discount.fixedAmount.amount,
            })
          }}
          checked={discount.fixedAmount.checked}
          disabled={disabledFixedAmount}
        >
          Fixed amount (Coupon)
        </Checkbox>
        <InputNumber
          addonAfter="THB"
          placeholder="amount"
          className="mt-2 w-full!"
          min={0}
          value={discount.fixedAmount.amount}
          onChange={(v) => {
            cartStore.setDiscountFixedAmount({
              checked: discount.fixedAmount.checked,
              amount: v || 0,
            })
          }}
          disabled={disabledFixedAmount}
        />
      </div>

      <div className="py-1!">
        <Checkbox
          className="pb-1!"
          checked={discount.percentage.checked}
          onChange={(e) => {
            cartStore.setDiscountPercentage({
              checked: e.target.checked,
              percent: discount.percentage.percent,
            })
          }}
          disabled={disabledPercentage}
        >
          Percentage discount (Coupon)
        </Checkbox>
        <InputNumber
          addonAfter="%"
          placeholder="percentage"
          className="mt-2 w-full!"
          max={100}
          min={0}
          value={discount.percentage.percent}
          onChange={(v) => {
            cartStore.setDiscountPercentage({
              checked: discount.percentage.checked,
              percent: v || 0,
            })
          }}
          disabled={disabledPercentage}
        />
      </div>

      <div className="py-1!">
        <Checkbox
          className="pb-1!"
          checked={discount.percentageDiscountByItemCategory.checked}
          onChange={(e) => {
            cartStore.setDiscountPercentageDiscountByItemCategory({
              checked: e.target.checked,
              amount: discount.percentageDiscountByItemCategory.amount,
              category: discount.percentageDiscountByItemCategory.category,
            })
          }}
          disabled={disabledPercentageDiscountByItemCategory}
        >
          Percentage discount by item category (Ontop)
        </Checkbox>
        <Row className="gap-1 mt-2">
          <Select
            className="w-[49%]!"
            value={discount.percentageDiscountByItemCategory.category}
            options={
              [
                { value: 'Accessories', label: 'Accessories' },
                { value: 'Clothing', label: 'Clothing' },
                { value: 'Electronics', label: 'Electronics' },
              ] as ItemCategoryDropdown[]
            }
            onChange={(category) => {
              cartStore.setDiscountPercentageDiscountByItemCategory({
                checked: discount.percentageDiscountByItemCategory.checked,
                amount: discount.percentageDiscountByItemCategory.amount,
                category: category,
              })
            }}
            disabled={disabledPercentageDiscountByItemCategory}
          />
          <InputNumber
            addonBefore="Discount"
            addonAfter="%"
            min={0}
            max={100}
            className="w-[49%]!"
            value={discount.percentageDiscountByItemCategory.amount}
            onChange={(v) => {
              cartStore.setDiscountPercentageDiscountByItemCategory({
                checked: discount.percentageDiscountByItemCategory.checked,
                amount: v || 0,
                category: discount.percentageDiscountByItemCategory.category,
              })
            }}
            disabled={disabledPercentageDiscountByItemCategory}
          />
        </Row>
      </div>

      <div className="py-1!">
        <Checkbox
          className="pb-1!"
          checked={discount.byPoints.checked}
          onChange={(e) => {
            cartStore.setDiscountByPoint({
              checked: e.target.checked,
              points: discount.byPoints.points,
            })
          }}
          disabled={disabledByPoints}
        >
          Discount by points (Ontop){' '}
          {maxPoints ? (
            <span className="text-red-500">(max: {maxPoints})</span>
          ) : (
            ''
          )}
        </Checkbox>
        <div>
          <InputNumber
            addonAfter="Points"
            className="mt-2 w-full!"
            min={0}
            // max={maxPoints}
            value={discount.byPoints.points}
            onChange={(v) => {
              cartStore.setDiscountByPoint({
                checked: discount.byPoints.checked,
                points: v || 0,
              })
            }}
            disabled={disabledByPoints}
          />
        </div>
      </div>

      <div className="py-1!">
        <Checkbox
          className="pb-1!"
          checked={discount.specialCampaigns.checked}
          onChange={(e) => {
            cartStore.setDiscountSpecialCampaigns({
              checked: e.target.checked,
              every: discount.specialCampaigns.every,
              discount: discount.specialCampaigns.discount,
            })
          }}
        >
          Special campaigns (Seasonal)
        </Checkbox>
        <Row className="gap-1 mt-2">
          <InputNumber
            addonBefore="Every"
            addonAfter="THB"
            placeholder="Every"
            className="w-[49%]!"
            min={0}
            value={discount.specialCampaigns.every}
            onChange={(v) => {
              cartStore.setDiscountSpecialCampaigns({
                checked: discount.specialCampaigns.checked,
                every: v || 0,
                discount: discount.specialCampaigns.discount,
              })
            }}
          />
          <InputNumber
            addonBefore="Discount"
            addonAfter="THB"
            className="w-[49%]!"
            min={0}
            value={discount.specialCampaigns.discount}
            onChange={(v) => {
              cartStore.setDiscountSpecialCampaigns({
                checked: discount.specialCampaigns.checked,
                every: discount.specialCampaigns.every,
                discount: v || 0,
              })
            }}
          />
        </Row>
      </div>
    </Card>
  )
}

export default Discount
