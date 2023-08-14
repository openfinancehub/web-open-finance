import React, { useState, useEffect } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Space, Dropdown, Popover, Select, MenuProps } from 'antd';
const { Option } = Select;
import { Stock } from '@ant-design/plots';
import { Link, request } from 'umi';
// import Demo from './demo.tsx'
import './style.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MyComponentProps {
    // Define any props required by the component
}

const Factor: React.FC<MyComponentProps> = () => {
    // 按钮的全局样式
    const size = 'large'
    // 股票种类的数据
    const [sotckListData, setsotckList] = useState([])
    // 因子取值的数据
    const [factorData, setFactorData] = useState([])
    const [quantData, setQuantData] = useState({
        long: [],
        short: []
    })
    const [selectedButton, setSelectedButton] = useState('平安银行');
    // 获取当前支持的股票信息
    const sotckList = () => {
        const data = {
            key: "8140ad230f687daede75a08855e8ae5ff40c3ba8"
        }
        request('quant/sotcklist', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
        }).then((res) => {
            setsotckList(res.data.map((item) => {
                return item.split(',')
            }))

        }).catch((err) => {
            console.log(err);

        })
    }
    // 某支股票推荐因子接口
    const stockanalysis = (stock_id: string) => {
        const data = {
            stock_id: stock_id,
            with_details: '0',
            categories: "factor",
            key: "8140ad230f687daede75a08855e8ae5ff40c3ba8"
        }
        request('quant/stockanalysis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
        }).then((res) => {
            setQuantData(res.data)
        }).catch(err => { console.log(err) })
    };
    // 某只股票近N天的K线数据的接口
    const getstock_kline = (stock_id) => {
        const data = {
            stock_id: stock_id,
            days: 1,
            key: "8140ad230f687daede75a08855e8ae5ff40c3ba8"
        }
        request('quant/getstock_kline', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
        }).then((res) => {
            console.log(res.data)
            setFactorData(res.data)
        }).catch(err => { console.log(err) })
    };

    // 某只股票近N天的因子取值的接口
    const historyfactor = () => {
        const data = {
            stock_id: '000001',
            days: "1",
            key: "8140ad230f687daede75a08855e8ae5ff40c3ba8"
        }
        request('quant/historyfactor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
        }).then((res) => {
            console.log(res)
        }).catch(err => { console.log(err) })
    };

    useEffect(() => {
        sotckList()
        stockanalysis('000001.SZ')
        getstock_kline('000001')
        // historyfactor()
    }, [])

    // 点击切换股票数据
    const handleButtonChange = (buttonStr: React.SetStateAction<string>, butttonId: React.SetStateAction<string>, buttonNum: any) => {
        getstock_kline(butttonId)
        setSelectedButton(buttonStr);
        stockanalysis(butttonId + '.' + buttonNum)
    };

    // 蜡烛图
    const config = {
        data: factorData,
        xField: 'time',
        yField: ['open', 'close', 'high', 'low'],
        slider: {},
        meta: {
            volume: {
                alias: '成交量',
            },
            open: {
                alias: '开盘价',
            },
            close: {
                alias: '收盘价',
            },
            high: {
                alias: '最高价',
            },
            low: {
                alias: '最低价',
            },
        },
        tooltip: {
            fields: ['open', 'close', 'high', 'low', 'volume'],
        },
    };

    // 实现级联选择
    // 评估难度
    const [provinceData, setProvinceData] = useState(['最大涨幅', '当前涨跌幅', '平均涨幅']);

    // 因子取值
    const [cityData, setcityData] = useState({
        最大涨幅: ['mean', 'quantile_10', 'quantile_50', 'quantile_90', 'sigma'],
        当前涨跌幅: ['mean', 'quantile_10', 'quantile_50', 'quantile_90', 'sigma'],
        平均涨幅: ['mean', 'quantile_10', 'quantile_50', 'quantile_90', 'ceshi'],
    });

    // 暂存评估取值数据 
    const [estimate, setEstimate] = useState({})
    const [twoestimate, setTwoEstimate] = useState(0)
    const [cities, setCities] = useState(cityData[provinceData[0]]);
    // 第一层选择触发
    const handleProvinceChange = (item, value) => {
        setProvinceData(Object.keys(item))
        console.log(item, value);
        if (value === provinceData[0]) {
            console.log(JSON.parse(item[0].details))
            setEstimate(JSON.parse(item[0].details))
        }
        else if (value === provinceData[1]) {
            setEstimate(JSON.parse(item[1].details))
        }
        else if (value === provinceData[2]) {
            setEstimate(JSON.parse(item[2].details))
        }
    };
    // 第二层选择触发
    const onSecondCityChange = (value) => {
        console.log(value)
        setTwoEstimate(estimate[value][1])
    }
    
    return (
        <ProCard gutter={16} ghost wrap>
            <ProCard
                colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 3 }}
                style={{ height: "100%" }}
            >
                <div style={{ textAlign: "center", height: "88vh", overflow: "auto" }}>
                    <Space direction="vertical" >
                        {
                            sotckListData.map((item, index) => {
                                return (
                                    <Button key={index} size={size}
                                        type={selectedButton === item[0] ? 'primary' : 'default'}
                                        onClick={() => handleButtonChange(item[0], item[1], item[2])}>{item[0]}</Button>
                                )
                            })
                        }
                    </Space>
                </div>
            </ProCard>
            <ProCard gutter={[0, 13]} colSpan={{ xs: 24, sm: 24, md: 20, lg: 20, xl: 21 }} direction="column" >
                <ProCard style={{ height: 360 }} bordered>
                    {/* <DualAxes {...factorConfig} /> */}
                    <Stock {...config} />
                </ProCard>
                <ProCard title="看涨因子" type="inner" bordered direction="column">
                    {
                        quantData.long.map((item) => {
                            return (
                                <div key={item.name}>
                                    <Space>
                                        <Button type="primary" size={size}>{item.name}</Button>
                                        <Select
                                            onChange={(value) => { handleProvinceChange(item.measures, value) }}
                                            defaultValue={item.measures[0].desc}
                                            style={{ width: 120 }}
                                        >
                                            {
                                                item.measures.map((province) => {
                                                    return (
                                                        <Option key={province.desc} value={province.desc}>{province.desc}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                        <Select
                                            style={{ width: 120 }}
                                            onChange={onSecondCityChange}
                                            defaultValue={cities[0]}
                                            options={cities.map((city) => ({ label: city, value: city }))}
                                        />
                                        <Button type="primary" size={size}>{twoestimate}</Button>
                                        <Button type="primary" size={size}>推荐指数{item.rate}</Button>
                                        <Link to={`/analyze/factordelite?id=${14}`}><Button type="primary" size={size}>详情</Button></Link>
                                        <Popover content={<div style={{ width: "500px" }} >{item.desc}</div>} title="描述">
                                            <Button size={size} type="primary" shape="circle" icon={<QuestionCircleOutlined />} />
                                        </Popover>
                                    </Space>
                                    <br /><br />
                                </div>
                            )
                        })
                    }

                </ProCard>
                <ProCard title="看跌因子" type="inner" bordered>
                    {
                        quantData.short.map((item) => {
                            return (
                                <div key={item.name}>
                                    <Space>
                                        <Button type="primary" size={size}>{item.name}</Button>
                                        <Select
                                            onChange={(value) => { handleProvinceChange(item.measures, value) }}
                                            defaultValue={item.measures[0].desc}
                                            style={{ width: 120 }}
                                        >
                                            {
                                                item.measures.map((province) => {
                                                    return (
                                                        <Option key={province.desc} value={province.desc}>{province.desc}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                        <Select
                                            style={{ width: 120 }}
                                            onChange={onSecondCityChange}
                                            defaultValue={cities[0]}
                                            options={cities.map((city) => ({ label: city, value: city }))}
                                        />
                                        <Button type="primary" size={size}>{twoestimate}</Button>
                                        <Button type="primary" size={size}>推荐指数{item.rate}</Button>
                                        <Link to={`/analyze/factordelite?id=${14}`}><Button type="primary" size={size}>详情</Button></Link>
                                        <Popover content={<div style={{ width: "500px" }} >{item.desc}</div>} title="描述">
                                            <Button size={size} type="primary" shape="circle" icon={<QuestionCircleOutlined />} />
                                        </Popover>
                                    </Space>
                                    <br /><br />
                                </div>
                            )
                        })
                    }
                </ProCard>
            </ProCard>
        </ProCard>
    )
}
export default Factor;