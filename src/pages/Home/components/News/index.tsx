import React, { useRef, useState } from 'react'
import { Tabs, Swiper } from 'antd-mobile'
import styles from './styles.less'
import { SwiperRef } from 'antd-mobile/es/components/swiper'
import Demo from './Stocks/Demo'
import Indices from './Market/market1'
import ImportantEvents from './Events/event1'
import { Badge, TabBar } from 'antd-mobile'
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  HistogramOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'

const tabs = [
  {
    key: 'market',
    title: '市场',
    icon: <AppOutline />,
    badge: Badge.dot,
  },
  {
    key: 'events',
    title: '事件',
    icon: <UnorderedListOutline />,
    badge: '5',
  },
  // {
  //   key: 'stocks',
  //   title: '股票',
  //   icon: (active: boolean) =>
  //     active ? <MessageFill /> : <MessageOutline />,
  //   badge: '99+',
  // },
  {
    key: 'stocks',
    title: '股票',
    icon: <HistogramOutline />,
    badge: '99+',
  },
  {
    key: 'personalCenter',
    title: '我的',
    icon: <UserOutline />,
  },
]

export default () => {
  const swiperRef = useRef<SwiperRef>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <>
      <Swiper
        direction='horizontal'
        loop
        indicator={() => null}
        ref={swiperRef}
        defaultIndex={activeIndex}
        onIndexChange={index => {
          setActiveIndex(index)
        }}
      >
        <Swiper.Item>
          <div >
            <Indices />
          </div>
        </Swiper.Item>
        <Swiper.Item>
          <div >
            <ImportantEvents />
          </div>
        </Swiper.Item>
        <Swiper.Item>
          <div className={styles.content}>
            <Demo />
          </div>
        </Swiper.Item>
        <Swiper.Item>
          <div className={styles.content}>个人主页</div>
        </Swiper.Item>
      </Swiper>
      <TabBar className={styles.fixedBottom}
        activeKey={tabs[activeIndex].key} onChange={key => {
          const index = tabs.findIndex(item => item.key === key)
          console.log(key, index)
          setActiveIndex(index)
          swiperRef.current?.swipeTo(index)
        }}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </>
  )
}