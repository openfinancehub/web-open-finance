import React, { useRef, useState, lazy, Suspense } from 'react';
import { Tabs } from 'antd-mobile';
// import { Tabs } from 'antd';
import styles from './styles.less';
import Stocks1 from './Stocks/Stocks1';
import Indices from './Market/market1';
import ImportantEvents from './Events/event1';
import PersonalCenter from './PersonalCenter/PersonalCenter';
import { AppOutline, HistogramOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons';

const tabs = [
  {
    key: 'market',
    title: '市场',
    icon: <AppOutline />,
    component: Indices,
  },
  {
    key: 'events',
    title: '事件',
    icon: <UnorderedListOutline />,
    component: ImportantEvents,
  },
  {
    key: 'stocks',
    title: '股票',
    icon: <HistogramOutline />,
    component: Stocks1,
  },
  {
    key: 'personalCenter',
    title: '我的',
    icon: <UserOutline />,
    component: PersonalCenter,
  },
];

export default () => {
  const [activeKey, setActiveKey] = useState(tabs[0].key);

  return (
    <>
      <div className={styles.content}>
        {tabs.map(item => (
          <Suspense key={item.key} fallback={<div>加载中...</div>}>
            {activeKey === item.key && <item.component />}
          </Suspense>
        ))}
      </div>
      <div className={styles.fixedBottom}>
        <Tabs
          activeKey={activeKey}
          onChange={newActiveKey => {
            setActiveKey(newActiveKey);
          }}
        >
          {tabs.map(item => (
            <Tabs.Tab key={item.key} icon={item.icon} title={item.title} />
          ))}
        </Tabs>
      </div>
    </>
  );
};