'use client'

import { Card, Divider, Row } from 'antd'
import { useCartStore } from '../store/cart'

export const Summary: React.FC = () => {
  const cartStore = useCartStore((state) => state)

  return (
    <Card>
      <p className="text-xl font-extrabold">Summary</p>
      <Divider className="my-2!" />

      <Row className="justify-between items-center">
        <p className="text-lg font-light">Coupon discount:</p>
        <p className="text-lg font-bold">
          {cartStore.getTotalCouponDiscount()} THB
        </p>
      </Row>
      <Row className="justify-between items-center">
        <p className="text-lg font-light">Ontop discount:</p>
        <p className="text-lg font-bold">
          {cartStore.getTotalOntopDiscount()} THB
        </p>
      </Row>
      <Row className="justify-between items-center">
        <p className="text-lg font-light">Special discount:</p>
        <p className="text-lg font-bold">
          {cartStore.getTotalSpecialDiscount()} THB
        </p>
      </Row>
      <Divider className="my-2!" />

      <Row className="justify-between items-center">
        <p className="text-lg font-light">Total:</p>
        <p className="text-lg font-bold">{cartStore.getTotalPrice()} THB</p>
      </Row>
    </Card>
  )
}

export default Summary
