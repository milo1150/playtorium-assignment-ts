'use client'

/**
 * @see https://ant.design/docs/react/v5-for-19
 */
import '@ant-design/v5-patch-for-react-19'

/**
 * @description prevent page flicker
 * @see https://ant.design/docs/react/use-with-next?theme=dark#using-app-router
 */
import { AntdRegistry } from '@ant-design/nextjs-registry'

import { MainPage } from '@/src/components/MainPage'

export default function Home() {
  return (
    <AntdRegistry>
      <div className="w-full p-20 justify-center! h-lvh bg-gray-500 items-center! justify-items-center">
        <MainPage />
      </div>
    </AntdRegistry>
  )
}
