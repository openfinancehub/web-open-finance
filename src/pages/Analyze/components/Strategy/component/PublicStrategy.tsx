import { Line, Radar } from '@ant-design/plots';
import { ProCard } from '@ant-design/pro-components';
import { Button, Dropdown, InputNumber, Space } from 'antd';
import { useState } from 'react';

export default function PublicStrategy() {
    const size = 'large';
    const [windowdata, setWindowdata] = useState(1)
    const [backData, setbackData] = useState(1)
    const [intervalData, setIntervalData] = useState(1)
    const [shopData, setShopData] = useState(1)
    const lineData = [
        // {
        //     year: '二月',
        //     value: 2
        // },
        // {
        //     year: '三月',
        //     value: 2.8
        // },
        // {
        //     year: '四月',
        //     value: 3
        // },
        // {
        //     year: '五月',
        //     value: 4
        // },
        // {
        //     year: '六月',
        //     value: 3.5
        // },
        // {
        //     year: '七月',
        //     value: 5
        // },
        // {
        //     year: '八月',
        //     value: 4.9
        // },
        // {
        //     year: '九月',
        //     value: 6
        // },
        // {
        //     year: '十月',
        //     value: 7
        // }
    ];
    const raderData = [
        // {
        //     name: '评估维度1',
        //     star: 10371
        // },
        // {
        //     name: '评估维度2',
        //     star: 7380
        // },
        // {
        //     name: '评估维度3',
        //     star: 7414
        // },
        // {
        //     name: '评估维度4',
        //     star: 2140
        // },
        // {
        //     name: '评估维度5',
        //     star: 660
        // }
    ];
    const raderConfig = {
        data: raderData.map(d => ({ ...d, star: Math.sqrt(d.star) })),
        xField: 'name',
        yField: 'star',
        appendPadding: [0, 10, 0, 10],
        meta: {
            star: {
                alias: 'star 数量',
                min: 0,
                nice: true,
                formatter: v => Number(v).toFixed(2)
            }
        },
        xAxis: {
            tickLine: null
        },
        yAxis: {
            label: false,
            grid: {
                alternateColor: 'rgba(0, 0, 0, 0.04)'
            }
        },
        // 开启辅助点
        point: {
            size: 2
        },
        area: {}
    };
    const backOrder = (value: number) => {
        console.log('回滚次数', value);
        setbackData(value)
    }
    const intervalTime = (value: number) => {
        console.log('间隔时长', value)
        setIntervalData(value)
    }
    const shopOrder = (value: number) => {
        console.log('买入次数', value);
        setShopData(value)
    }

    const demoBtn = () => {
        console.log(windowdata, backData, intervalData, shopData);
    }

    const config = {
        data: lineData,
        xField: 'year',
        yField: 'value',
        label: {},
        point: {
            size: 5,
            shape: 'diamond',
            style: {
                fill: 'white',
                stroke: '#5B8FF9',
                lineWidth: 2
            }
        },
        tooltip: {
            showMarkers: false
        },
        state: {
            active: {
                style: {
                    shadowBlur: 4,
                    stroke: '#000',
                    fill: 'red'
                }
            }
        },
        interactions: [
            {
                type: 'marker-active'
            }
        ]
    };

    const windowChange = (value: number) => {
        console.log('测试窗口', value);
        setWindowdata(value)
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.antgroup.com">
                    1st menu item
                </a>
            )
        },
        {
            key: '2',
            label: (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.aliyun.com">
                    2nd menu item
                </a>
            )
        },
        {
            key: '3',
            label: (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            )
        }
    ];
    return (
        <div>
            <ProCard gutter={16} ghost wrap>
                <ProCard
                    bordered
                    style={{ textAlign: 'center' }}
                    colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 10 }}>
                    <Space>
                        <Button type="primary" size={size}>
                            因子
                        </Button>
                        <Dropdown menu={{ items }} placement="bottom" arrow>
                            <Button size={size}>取值</Button>
                        </Dropdown>
                        <Dropdown menu={{ items }} placement="bottom" arrow>
                            <Button size={size}>条件</Button>
                        </Dropdown>
                        <Button type="primary" size={size}>
                            条件值
                        </Button>
                    </Space>
                </ProCard>
                <ProCard
                    style={{ textAlign: 'center' }}
                    bordered
                    colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 14 }}>
                    <div className="numberSele">
                        <InputNumber
                            size={size}
                            min={0}
                            addonBefore="测试窗口"
                            addonAfter="分钟"
                            defaultValue={1}
                            onChange={windowChange}
                        />
                        <InputNumber
                            size={size}
                            min={0}
                            addonBefore="回滚次数"
                            addonAfter="次"
                            defaultValue={1}
                            onChange={backOrder}
                        />
                    </div>
                    <div className="numberSele">
                        <InputNumber
                            size={size}
                            min={0}
                            addonBefore="间隔时长"
                            addonAfter="分钟"
                            defaultValue={1}
                            onChange={intervalTime}
                        />
                        <InputNumber
                            size={size}
                            min={0}
                            addonBefore="买入次数"
                            addonAfter="次"
                            defaultValue={1}
                            onChange={shopOrder}
                        />
                    </div>
                    <Button
                        size={size}
                        style={{
                            background: 'rgb(1,108,102)',
                            color: '#fff',
                            marginBottom: 20
                        }}
                        onClick={demoBtn}
                    >
                        测试
                    </Button>

                    <div className="demoResult">
                        测试结果:经过历史N次条件测试，平均期望涨幅为:XX%;50分位数期望涨幅:XX%;最大期望涨幅:XX%;期望波动标准差:XX%
                        经过历史N次条件测试，平均期望涨幅为：xx%；50分位数期望涨幅：xx%；最大期望涨幅：xx%；期望波动标准差：xx%
                    </div>
                </ProCard>
            </ProCard>
            <ProCard style={{ height: 360 }}>
                <ProCard
                    style={{ height: '100%' }}
                    colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 8 }}
                    bordered>
                    <Radar {...raderConfig} />
                </ProCard>
                <ProCard
                    style={{ height: '100%' }}
                    colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 16 }}
                    bordered>
                    <Line {...config} />
                </ProCard>
            </ProCard>
        </div>
    )
}