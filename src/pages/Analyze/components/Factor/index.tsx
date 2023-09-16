import React, { useState, useEffect } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Space , Popover, Select, Cascader } from 'antd';
const { Option } = Select;
import { Stock, Line, Mix } from '@ant-design/plots';
import { Link, request } from 'umi';
import './style.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MyComponentProps {
    // Define any props required by the component
}

const Factor: React.FC<MyComponentProps> = () => {
    // 按钮的全局样式
    const size = 'large'
    // 初始因子的折线键值
    let firstFactor = ''
    // 响应式的折线颜色
    const [lineColor,setlineColor] = useState('#000')

    // 响应式的因子键值
    const [inFactor,setInFactor] = useState('')
    // 
    // 股票种类的数据
    const [sotckListData, setsotckList] = useState([])
    // 因子取值的数据
    const [factorData, setFactorData] = useState([])
    const [quantData, setQuantData] = useState({
        long: [],
        short: []
    })
    // history 的所有数据
    const [historyData,setHistoryData] = useState({})
    // 单个因子的折线数据
    const [factorLiData,setFactorLiData] = useState([])
    const [selectedButton, setSelectedButton] = useState('平安银行')
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
            firstFactor = res.data.long[0].name

            setInFactor(res.data.long[0].names)
            var long = res.data.long
            var short = res.data.short
            long.forEach((item) => {
                item.struct.children.forEach((obj) => {
                    obj.value = obj.label
                    obj.children.forEach((obj2) => {
                        obj2.value = obj2.label
                        if(obj2.value ==='sigma'){
                            obj2.children.forEach((obj3,index) => {
                                obj3.value = `取值${index+1}:`+ obj3.value
                            })
                        }else{
                            obj2.children.forEach((obj3,index) => {
                                obj3.value = `取值${index+1}:`+(obj3.value * 100).toFixed(2) + '%'
                            })
                        }
                    })
                })
            })
            short.forEach((item) => {
                item.struct.children.forEach((obj) => {
                    obj.value = obj.label
                    obj.children.forEach((obj2) => {
                        obj2.value = obj2.label
                        if(obj2.value ==='sigma'){
                            obj2.children.forEach((obj3,index) => {
                                obj3.value = `取值${index+1}:`+ obj3.value
                            })
                        }else{
                            obj2.children.forEach((obj3,index) => {
                                obj3.value = `取值${index+1}:`+(obj3.value * 100).toFixed(2) + '%'
                            })
                        }
                    })
                })
            })
            setQuantData({ long, short })
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
            setFactorData(res.data)
        }).catch(err => { console.log(err) })
    };

    // 某只股票近N天的因子取值的接口
    const historyfactor = (stock_id) => {
        const data = {
            stock_id: stock_id,
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
            let keysFactor = Object.keys(res.data[60].factors)
            let successData = {}
            keysFactor.forEach((i)=>{
                let sendData:number[] = []
                res.data[60].time.forEach((j,index) => {
                    sendData.push({time:j,value:res.data[60].factors[i].bins[index]})
                    successData = {...successData,[i]:sendData}
                });
            })
            setHistoryData(successData)
            setFactorLiData(successData[firstFactor])
        }).catch(err => { 
            console.log(err)
         })
    };

    useEffect(() => {
        sotckList()
        stockanalysis('000001.SZ')
        getstock_kline('000001')
        historyfactor('000001')
    }, [])

    // 点击切换股票数据
    const handleButtonChange = (buttonStr: React.SetStateAction<string>, butttonId: React.SetStateAction<string>, buttonNum: any) => {
        getstock_kline(butttonId)
        setSelectedButton(buttonStr);
        historyfactor(butttonId)
        stockanalysis(butttonId + '.' + buttonNum)
    };

    /**
     * 点击切换因子的方法
     * 用来处理改变折线的数据
     */
    const handleValue = (event,index) =>{

        console.log(event,index);
        switch (index) {
            case 0:
                setlineColor('#000')
                break;
            case 1:
                setlineColor('#6585ba')
                break;
        }
        let text = event.target.textContent
        setFactorLiData(historyData[text])
        setInFactor(text)

    }

    /**
     * 这个方法用于处理描述的文本段落
     */
    const handleDescContent = (event:string)=>{

        const paragraphs = event.split("。");
        return paragraphs;

    }

    const config = {
        xAxis:{
            tickCount:8
        },
        tooltip: {
            shared: true,
            formatter:(datum:string) =>{
                console.log(datum,'11111');
            },
        },
        syncViewPadding: true,
        // xAxis:{
        //     type: 'time',
        //     tickCount: 10,
        //     tickFormatter: 'YYYY-MM-DD HH:mm:ss',
        //     tickFormatter: (value) => {
        //         const date = new Date(value);
        //         return date.getSeconds().toString().padStart(2, '0');
        //       },
        // },
        plots: [
            {
                type: 'stock',
                options: {
                    data: factorData,
                    xField: 'time',
                    yField: ['open', 'close', 'high', 'low','volume'],
                    meta: {
                        volume: {
                            alias: '成交量',
                            formatter: (v) => `${(v)}`,
                        },
                        open: {
                            alias: '开盘价',
                            formatter: (v) => `${(v)}`,
                        },
                        close: {
                            alias: '收盘价',
                            formatter: (v) => `${(v)}`,
                        },
                        high: {
                            alias: '最高价',
                            formatter: (v) => `${(v)}`,
                        },
                        low: {
                            alias: '最低价',
                            formatter: (v) => `${(v)}`,
                        },
                        time:{
                              formatter:(v) => {
                                const date = new Date(v);
                                const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, '0');
                                const day = String(date.getDate()).padStart(2, '0');
                                const hours = String(date.getHours()).padStart(2, '0');
                                const minutes = String(date.getMinutes()).padStart(2, '0');
                                const seconds = String(date.getSeconds()).padStart(2, '0');
                                const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                                return `${(formattedTime)}`
                              }
                        }
                      
                    },
                    // 移除交互
                    interactions: [{ type: 'tooltip', enable: false }],
                    // xAxis: {
                    //     type: 'time',
                    //     tickCount: 10,
                    //     tickFormatter: 'YYYY-MM-DD HH:mm',
                    //   },
                    // slider: {
                    //     start: 0.1,
                    //     end: 0.5,
                    // },
                    // tooltip: {
                    //     // formatter:'YYYY-MM-DD HH:mm:ss',
                    //     fields: ['time','open', 'close', 'high', 'low', 'volume',],
                    // },
                  
                },
            },
            {
                type: 'line',
                options: {
                    data:factorLiData,
                    xField: 'time',
                    yField: 'value',
                    xAxis: false,
                    // xAxis: {
                    //     type: 'time',
                    //     tickCount: 10,
                    //     tickFormatter: 'YYYY-MM-DD HH:mm:ss',
                    //   },
                    yAxis: {
                        line: null,
                        // grid: null,
                        position: 'right',
                        // max: 0.16,
                        // tickCount: 8,
                    },
                    meta: {
                        date: {
                            sync: 'date',
                        },
                        value: {
                            alias: inFactor||'OBV',
                            // formatter: (v) => `${(v * 100).toFixed(1)}%`, 
                            formatter: (v) => `${v}`, 
                        },
                    },
                    smooth: true,
                    // label: {
                    //     callback: (value) => {
                    //         return {
                    //             offsetY: value === 0.148 ? 36 : value === 0.055 ? 0 : 20,
                    //             style: {
                    //                 fill: '#1AAF8B',
                    //                 fontWeight: 700,
                    //                 stroke: '#fff',
                    //                 lineWidth: 1,
                    //             },
                    //         };
                    //     },
                    // },
                    color: lineColor,
                },
            },
        ],
    };
    
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
                <ProCard style={{ height: 460 }} className={'allBox'}  bordered>
                    <div className={'chartScoll'}>
                    <Mix {...config} ></Mix>
                    </div>
                </ProCard>
                <ProCard title="看涨因子" type="inner" bordered direction="column">
                    {
                        quantData.long.map((item,index) => {
                            return (
                                <div key={item.name}>
                                    <Space>
                                        <Button type={inFactor === item.name ? 'primary' : 'default'}  size={size} onClick={(event)=>{handleValue(event,index)}}>{item.name}</Button>
                                        <Cascader style={{ width: '100%' }} options={item.struct.children} size={size}
                                            fieldNames={{ label: 'value', value: 'label' }}
                                            placeholder="预估数值"
                                        />
                                        <Button type="primary" size={size}>推荐指数{item.rate}</Button>
                                        <Link to={`/analyze/factordelite?id=${14}`}><Button type="primary" size={size}>详情</Button></Link>
                                        <Popover content={<div style={{ width: "500px" }} >{
                                        handleDescContent(item.desc).map((item,index)=>{
                                            return (
                                                <p style={{textIndent:'2em'}} key={index}>{item}</p>
                                            )
                                        })
                                        }</div>} title="描述">
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
                        quantData.short.map((item,index) => {
                            return (
                                <div key={item.name}>
                                    <Space>
                                        <Button type={inFactor === item.name ? 'primary' : 'default'} size={size} onClick={(event)=>{handleValue(event,index)}}>{item.name}</Button>
                                        <Cascader style={{ width: '100%' }} options={item.struct.children} size={size} fieldNames={{ label: 'value', value: 'label' }} placeholder="预估数值" />
                                        <Button type="primary" size={size}>推荐指数{item.rate}</Button>
                                        <Link to={`/analyze/factordelite?id=${14}`}><Button type="primary" size={size}>详情</Button></Link>
                                        <Popover content={<div style={{ width: "500px" }} >{
                                               handleDescContent(item.desc).map((item,index)=>{
                                                return (
                                                    <p style={{textIndent:'2em'}} key={index}>{item}</p>
                                                )
                                            })
                                        }</div>} title="描述">
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
