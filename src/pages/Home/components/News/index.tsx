import React, { useRef, useState, lazy, Suspense } from 'react';
import { DotLoading, TabBar, Tabs } from 'antd-mobile';
// import { Tabs } from 'antd';
import styles from './styles.less';
import Stocks from './Stocks';
import Market from './Market';
import Events from './Events';
import Mine from './Mine';
import { AppOutline, HistogramOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons';

const tabs = [
  {
    key: '/home/news/market',
    title: '市场',
    icon: <AppOutline />,
    component: Market,
  },
  {
    key: '/home/news/events',
    title: '事件',
    icon: <UnorderedListOutline />,
    component: Events,
  },
  {
    key: '/home/news/stocks',
    title: '股票',
    icon: <HistogramOutline />,
    component: Stocks,
  },
  {
    key: '/home/news/mine',
    title: '我的',
    icon: <UserOutline />,
    component: Mine,
  },
];

export default () => {
  const [activeKey, setActiveKey] = useState(tabs[0].key);

  return (
    <>
      <div className={styles.content}>
        {tabs.map((item, index) => (
          activeKey === item.key && <item.component key={index} />
        ))}
      </div>

      <div className={styles.fixedBottom}>
        <TabBar
          activeKey={activeKey}
          onChange={newActiveKey => {
            setActiveKey(newActiveKey);
          }}
        >
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar >
      </div>
    </>
  );
};