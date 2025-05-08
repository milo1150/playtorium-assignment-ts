'use client'

import { Button, Card, List, Row } from 'antd'
import { CART_ITEMS } from '../utils/cart'
import { MinusCircleOutlined } from '@ant-design/icons'

export const Carts: React.FC = () => {
  const data = CART_ITEMS

  return (
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={data}
      className="border-none"
      bordered={false}
      renderItem={(item) => (
        <List.Item>
          <Card className="flex justify-between min-w-full max-w-full">
            <Row className="w-full justify-between items-center">
              <section>
                <p className="font-extrabold text-lg">{item.name}</p>
                <p>
                  Price:{' '}
                  <span className="font-extrabold">{item.price} THB</span>
                </p>
                <p>Category: {item.category}</p>
              </section>
              <section>
                <Button
                  icon={<MinusCircleOutlined />}
                  color="danger"
                  variant="outlined"
                >
                  Remove
                </Button>
              </section>
            </Row>
          </Card>
        </List.Item>
      )}
    />
  )
}

export default Carts
