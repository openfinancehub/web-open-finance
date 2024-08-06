import React, { memo, useEffect, useRef, useState } from 'react';
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
import { Divider, Layout, Menu, } from 'antd';
import { SentContent, DangerContent } from './Market/MarketContent';
import CompanyContent from './Company/CompanyContent';
import EventContent from './Events/EventContent';
import Test from './Industry/Test';

const { Header, Content, Footer, Sider } = Layout;

// 修改items数组以包含子菜单项
const items: MenuProps['items'] = [
    {
        key: '1',
        icon: React.createElement(AppstoreOutlined),
        label: `市场`,
        children: [ // 添加子菜单项
            {
                key: '1-1',
                icon: React.createElement(UploadOutlined),
                label: `热度指数`,
            },
            {
                key: '1-2',
                icon: React.createElement(BarChartOutlined),
                label: `危险指数`,
            },
        ],
    },
    {
        key: '2',
        icon: React.createElement(VideoCameraOutlined),
        label: `事件`,
    },
    {
        key: '3',
        icon: React.createElement(CloudOutlined),
        label: `公司`,
    },
    {
        key: '4',
        icon: React.createElement(TeamOutlined),
        label: `行业`,
    },
    {
        key: '5',
        icon: React.createElement(UserOutlined),
        label: `个人`,
    },
];

const MarketContentView: React.FC<{ content3Ref: React.RefObject<HTMLDivElement>, content4Ref: React.RefObject<HTMLDivElement> }> = memo(({ content3Ref, content4Ref }) => (
    <div>
        <div ref={content3Ref}>
            <SentContent />
        </div>
        <div ref={content4Ref}>
            <DangerContent />
        </div>
    </div>
));

const CustomMenu: React.FC = () => {
    const [selectedKey, setSelectedKey] = React.useState('1-1');

    const content1Ref = useRef<HTMLDivElement>(null);
    const content2Ref = useRef<HTMLDivElement>(null);
    const content3Ref = useRef<HTMLDivElement>(null);
    const content4Ref = useRef<HTMLDivElement>(null);

    const handleItemClick = (key: string) => {
        setSelectedKey(key);
        if (key === '2-1' && content1Ref.current) {
            content1Ref.current.scrollIntoView({ behavior: 'smooth', block: "center" });
        } else if (key === '2-2' && content2Ref.current) {
            content2Ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (key === '1-1' && content3Ref.current) {
            content3Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (key === '1-2' && content4Ref.current) {
            content4Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <Layout hasSider>
            <Sider
                style={{ overflow: 'auto', height: `calc(100vh - 60px)`, background: 'white', position: 'fixed', left: 0, top: 60, bottom: 0 }}
            >
                <Menu theme="light" mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={({ key }) => handleItemClick(key)}
                    defaultSelectedKeys={['1']} items={items} />
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <Content style={{ overflow: 'initial' }}>
                    {['1-1', '1-2'].includes(selectedKey) && (
                        <div style={{ padding: 24 }}>
                            <MarketContentView
                                content3Ref={content3Ref}
                                content4Ref={content4Ref}
                            />
                        </div>
                    )}

                    {['2', '2-1', '2-2'].includes(selectedKey) && (
                        <div style={{ padding: 24 }}>
                            <EventContent />
                        </div>
                    )}

                    {selectedKey === '3' && (
                        <div style={{ padding: 24, textAlign: 'center' }}>
                            <CompanyContent />
                        </div>
                    )}

                    {selectedKey === '4' && (
                        <div style={{ padding: 24, textAlign: 'center' }}>
                            <Test />
                        </div>
                    )}

                    {!['1', '1-1', '1-2', '2', '2-1', '2-2', '3', '4', '5'].includes(selectedKey) && (
                        <div style={{ padding: 24, textAlign: 'center' }}>No content matched</div>
                    )}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Open Finance ©{new Date().getFullYear()} Home
                </Footer>
            </Layout>
        </Layout>
    );
};

export default CustomMenu;