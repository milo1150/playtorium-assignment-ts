'use client'

import { Button, Card, List, Row } from 'antd'
import { MinusCircleOutlined } from '@ant-design/icons'
import { useCartStore } from '../store/cart'

export const Carts: React.FC = () => {
  const cartStore = useCartStore((state) => state)

  return (
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={cartStore.items}
      className="border-none"
      bordered={false}
      renderItem={(item) => (
        <List.Item>
          <Card className="flex justify-between min-w-full max-w-full">
            <Row className="w-full justify-between items-center">
              <section>
                <p className="font-extrabold text-lg">{item.name}</p>
                <p>Amount: {item.amount}</p>
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
                  onClick={() => cartStore.delete(item)}
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
