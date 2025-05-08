'use client'

import { Card, Divider, Row } from 'antd'

export const Summary: React.FC = () => {
  return (
    <Card>
      <p className="text-xl font-extrabold">Summary</p>
      <Divider className="my-2!" />

      <Row className="justify-between items-center">
        <p className="text-lg font-light">Coupon:</p>
        <p className="text-lg font-bold">-200 THB</p>
      </Row>
      <Row className="justify-between items-center">
        <p className="text-lg font-light">Ontop:</p>
        <p className="text-lg font-bold">-200 THB</p>
      </Row>
      <Row className="justify-between items-center">
        <p className="text-lg font-light">Special:</p>
        <p className="text-lg font-bold">-300 THB</p>
      </Row>
      <Divider className="my-2!" />

      <Row className="justify-between items-center">
        <p className="text-lg font-light">Total:</p>
        <p className="text-lg font-bold">300 THB</p>
      </Row>
    </Card>
  )
}

export default Summary
