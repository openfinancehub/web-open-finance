import React, { useRef } from 'react'
import { Button, Space, Swiper, Toast } from 'antd-mobile'
import { SwiperRef } from 'antd-mobile/es/components/swiper'

import styles from './style.less'

const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']

const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      className={styles.content}
      style={{ background: color }}
      onClick={() => {
        Toast.show(`你点击了卡片 ${index + 1}`)
      }}
    > 
        股票事件{index + 1}
    </div>
  </Swiper.Item>
))

const Demo: React.FC<{}> = () => {
  
  const ref = useRef<SwiperRef>(null)
  return (
    <>
      <div title='循环'>
        <Swiper
          loop
          autoplay
          // onIndexChange={i => {
          //   console.log(i, 'onIndexChange1')
          // }}
        >
          {items}
        </Swiper>
      </div>
    </>
  )
}
export default Demo;