'use client'

import { Col, Row, Typography } from 'antd'
import Products from './Products'
import Carts from './Carts'
import Discount from './Discount'
import Summary from './Summary'

const { Title } = Typography

export const MainPage: React.FC = () => {
  return (
    <div className="w-2/3">
      <Title className="text-white!"></Title>
      <Row gutter={12}>
        <Col span={8}>
          <Products />
        </Col>

        <Col span={8}>
          <Carts />
        </Col>

        <Col span={8}>
          <Discount />
          <div className="pt-2" />
          <Summary />
        </Col>
      </Row>
    </div>
  )
}

export default MainPage
