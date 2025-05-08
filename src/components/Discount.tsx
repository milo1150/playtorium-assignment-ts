'use client'

import { Card, Checkbox, Divider, InputNumber, Row, Select } from 'antd'

export const Discount: React.FC = () => {
  return (
    <Card>
      <p className="text-xl font-extrabold">Discount</p>
      <Divider className="my-2!" />

      <div className="py-1!">
        <Checkbox className="pb-1!" onChange={() => {}}>
          Fixed amount (Coupon)
        </Checkbox>
        <InputNumber
          addonAfter="THB"
          placeholder="amount"
          className="mt-2 w-full!"
        />
      </div>

      <div className="py-1!">
        <Checkbox className="pb-1!" onChange={() => {}}>
          Percentage discount (Coupon)
        </Checkbox>
        <InputNumber
          addonAfter="%"
          placeholder="percentage"
          className="mt-2 w-full!"
          max={100}
          min={0}
        />
      </div>

      <div className="py-1!">
        <Checkbox className="pb-1!" onChange={() => {}}>
          Percentage discount by item category (Ontop)
        </Checkbox>
        <Row className="gap-1 mt-2">
          <Select
            className="w-[49%]!"
            defaultValue="lucy"
            onChange={() => {}}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
          <InputNumber placeholder="amount" className="w-[49%]!" />
        </Row>
      </div>

      <div className="py-1!">
        <Checkbox className="pb-1!" onChange={() => {}}>
          Discount by points (Ontop)
        </Checkbox>
        <div>
          <InputNumber placeholder="points" className="mt-2 w-full!" />
        </div>
      </div>

      <div className="py-1!">
        <Checkbox className="pb-1!" onChange={() => {}}>
          Special campaigns (Seasonal)
        </Checkbox>
        <Row className="gap-1 mt-2">
          <InputNumber
            addonAfter="THB"
            placeholder="Every"
            className="w-[49%]!"
          />
          <InputNumber
            addonAfter="THB"
            placeholder="Discount"
            className="w-[49%]!"
          />
        </Row>
      </div>
    </Card>
  )
}

export default Discount
