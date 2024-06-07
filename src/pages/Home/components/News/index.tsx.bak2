import React from 'react'
import type { FC } from 'react'
import { NavBar, TabBar } from 'antd-mobile'
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import {
  AppOutline,
  UnorderedListOutline,
  UserOutline,
  HistogramOutline,
} from 'antd-mobile-icons'
import MarketIndex from '@/pages/Home/components/News/Market/index'
import EventsIndex from '@/pages/Home/components/News/Events/index'
import StocksIndex from '@/pages/Home/components/News/Stocks/index'
import styles from './demo2.less'


const tabs = [
  {
    key: '/home/news/market',
    title: '市场',
    icon: <AppOutline />,
    path: '/home/news/market',
  },
  {
    key: '/home/news/events',
    title: '事件',
    icon: <UnorderedListOutline />,
    path: '/home/news/events',
  },
  {
    key: '/home/news/stocks',
    title: '股票',
    icon: <HistogramOutline />,
    path: '/home/news/stocks',
  },
  {
    key: '/home/news/mine',
    title: '我的',
    icon: <UserOutline />,
    path: '/mine',
  },
];

export default () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActiveByKey = (key: string) => {
    navigate(key);
  };

  return (
    <div className={styles.app}>
      <MarketIndex />
      <div className={styles.content}>
        <Routes>
          <Route path="/home/news/market" element={<MarketIndex />} />
          <Route path="/home/news/events" element={<EventsIndex />} />
          <Route path="/home/news/stocks" element={<StocksIndex />} />
          <Route path="/mine" element={<PersonalCenter />} />
        </Routes>
      </div>
      <div className={styles.fixedBottom}>
        <TabBar activeKey={pathname} onChange={(key) => setRouteActiveByKey(key)}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  )
}

function PersonalCenter() {
  return <div>我的</div>
}