import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Anchor, Col, Menu, Row } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import SearchCompany from './components/FinanceModels/SearchCompany';
import MsgCard from './components/Info/Market';

type MenuItem = Required<MenuProps>['items'][number];


const Home: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    // <ProCard split="vertical">
    //   <ProCard split="horizontal" title="" colSpan="30%" >
    //     {/* <Menu
    //       onClick={onClick}
    //       // style={{ width: 256 }}
    //       defaultSelectedKeys={['1']}
    //       defaultOpenKeys={['sub1']}
    //       mode="inline"
    //       items={items}
    //     /> */}

    //   </ProCard>

    //   <ProCard title="" split="horizontal" headerBordered>
    //     <ProCard title="" headerBordered>
    //       <SearchCompany />
    //     </ProCard>
    //     <ProCard title="" headerBordered style={{ height: '100vh', overflowY: 'auto' }}>
    //       <MsgCard />
    //     </ProCard>
    //   </ProCard>
    // </ProCard>
    <div>
      <MsgCard />
    </div>

  );
};

export default Home;