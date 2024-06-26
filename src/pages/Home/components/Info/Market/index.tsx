import React from 'react';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Divider, Layout, Menu, Typography, theme } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import SearchCompany from '../../FinanceModels/SearchCompany';
import MarketContent from './MarketContent';
import Stocks from '../../News/Stocks';

const { Header, Content, Footer, Sider } = Layout;

// 修改items数组以包含子菜单项
const items: MenuProps['items'] = [
    {
        key: '1',
        icon: React.createElement(AppstoreOutlined),
        label: `市场`,
    },
    {
        key: '2',
        icon: React.createElement(VideoCameraOutlined),
        label: `事件`,
        children: [ // 添加子菜单项
            {
                key: '2-1',
                icon: React.createElement(UploadOutlined),
                label: `Subnav 1`,
            },
            {
                key: '2-2',
                icon: React.createElement(BarChartOutlined),
                label: `Subnav 2`,
            },
        ],
    },
    {
        key: '3',
        icon: React.createElement(CloudOutlined),
        label: `股票`,
    },
    {
        key: '4',
        icon: React.createElement(UserOutlined),
        label: `个人`,
    },
];

const CustomMenu: React.FC = () => {
    const [selectedKey, setSelectedKey] = React.useState('1');

    return (
        <Layout hasSider>
            <Sider
                style={{ overflow: 'auto', height: `calc(100vh - 60px)`, background: 'white', position: 'fixed', left: 0, top: 60, bottom: 0 }}
            >
                <div className="demo-logo-vertical" />
                <Menu theme="light" mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={({ key }) => setSelectedKey(key)}
                    defaultSelectedKeys={['1']} items={items} />
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                {/* <Header style={{ padding: 0, }} /> */}
                <Content style={{ overflow: 'initial' }}>
                    {selectedKey === '1' && (
                        <div style={{ padding: 24, textAlign: 'center' }}>
                            <MarketContent />
                        </div>
                    )}
                    {selectedKey === '2' && (
                        <div style={{ padding: 24, textAlign: 'center' }}>Parent Content for nav 2</div>
                    )}
                    {selectedKey === '2-1' && (
                        <div style={{ padding: 24, textAlign: 'center' }}>Content for Subnav 1</div>
                    )}
                    {selectedKey === '2-2' && (
                        <div style={{ padding: 24, textAlign: 'center' }}>Content for Subnav 2</div>
                    )}
                    {selectedKey === '3' && (
                        <div style={{ padding: 24, textAlign: 'center' }}>
                            <Stocks />
                        </div>
                    )}
                    {!['1', '2', '2-1', '2-2', '3', '4'].includes(selectedKey) && (
                        <div style={{ padding: 24, textAlign: 'center' }}>No content matched</div>
                    )}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Open Finance ©{new Date().getFullYear()} Happy
                </Footer>
            </Layout>
        </Layout>
    );
};

export default CustomMenu;