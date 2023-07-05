import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Button, Space, Dropdown, Popover } from 'antd';
import { useState } from 'react'

import { Link } from 'umi';

import './style.less'
interface MyComponentProps {
    // Define any props required by the component
}
const Subscribe: React.FC<MyComponentProps> = (props) => {
    const [size, setSize] = useState<SizeType>('large');
    const [selectedButton, setSelectedButton] = useState('已订阅1');
    const handleButtonChange = (buttonId: React.SetStateAction<string>) => {
        setSelectedButton(buttonId);
    };
    return (
        <ProCard gutter={16} ghost wrap>
            <ProCard
                colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 3 }}
                style={{ height: "100%" }}
            >
                <div style={{ textAlign: "center" }}>
                    <Space direction="vertical" >
                        <Button size={size}
                            type={selectedButton === '已订阅1' ? 'primary' : 'default'}
                            onClick={() => handleButtonChange('已订阅1')}>已订阅1</Button>
                        <Button size={size}
                            type={selectedButton === '已订阅2' ? 'primary' : 'default'}
                            onClick={() => handleButtonChange('已订阅2')}
                        >已订阅2</Button>
                        <Button size={size}
                            type={selectedButton === '已订阅3' ? 'primary' : 'default'}
                            onClick={() => handleButtonChange('已订阅3')}
                        >已订阅3</Button>
                        <Button size={size}
                            type={selectedButton === '已订阅4' ? 'primary' : 'default'}
                            onClick={() => handleButtonChange('已订阅4')}
                        >已订阅4</Button>
                        <Button size={size}
                            type={selectedButton === '已订阅5' ? 'primary' : 'default'}
                            onClick={() => handleButtonChange('已订阅5')}
                        >已订阅5</Button>
                    </Space>
                </div>
            </ProCard>
            <ProCard gutter={16} colSpan={{ xs: 24, sm: 24, md: 20, lg: 20, xl: 21 }}  >
                    <ProCard title="因子" type="inner" bordered>
                        <div className='title'>
                            自订阅起股价涨跌幅:80%
                        </div>
                        <div className='content'>
                            <div>自订阅起因子表现：</div>
                            <div>看涨评估-因子取值:xx,评估维度1:xx</div> 
                            <div>看涨评估-因子取值:xx,评估维度2:xx</div> 
                            <div>看跌评估-因子取值:xx,评估维度3:xx</div> 
                        </div>
                        <div style={{textAlign: "center"}}> <Link to="/analyze/factordelite"><Button type="primary" size={size}>查看详情</Button> </Link> </div>
                    </ProCard>
                    <ProCard title="买入策略" type="inner" bordered>
                    <div className='title'>
                            自订阅起股价涨跌幅:80%
                        </div>
                        <div className='content'>
                            <div>自订阅起因子表现：</div>
                            <div>看涨评估-因子取值:xx,评估维度1:xx</div> 
                            <div>看涨评估-因子取值:xx,评估维度2:xx</div> 
                            <div>看跌评估-因子取值:xx,评估维度3:xx</div> 
                        </div>
                        <div style={{textAlign: "center"}}> <Link to="/analyze/strategy"> <Button type="primary" size={size}>查看详情</Button></Link> </div>
                    </ProCard>
            </ProCard>
        </ProCard>
    )
}
export default Subscribe;