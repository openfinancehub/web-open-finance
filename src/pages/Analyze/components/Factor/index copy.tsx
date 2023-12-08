import { useState, useEffect, useRef } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Space, Popover, Cascader } from 'antd';
import { Link, request } from 'umi';
import './style.css'
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TitleComponentOption,
    TooltipComponent,
    TooltipComponentOption,
    GridComponent,
    GridComponentOption,
    LegendComponent,
    LegendComponentOption,
    DataZoomComponent,
    DataZoomComponentOption,
    MarkLineComponent,
    MarkLineComponentOption,
    MarkPointComponent,
    MarkPointComponentOption
} from 'echarts/components';
import {
    CandlestickChart,
    LineChart,
} from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import Left from "./component/left"
import Loading from "../Loading"
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DataZoomComponent,
    MarkLineComponent,
    MarkPointComponent,
    CandlestickChart,
    LineChart,
    CanvasRenderer,
    UniversalTransition
]);

const Factor = () => {
    // 天数
    const Day = 1
    const size = 'large'
    const upColor = '#ec0000';
    const upBorderColor = '#8A0000';
    const downColor = '#00da3c';
    const downBorderColor = '#008F28';
    const chartRef = useRef(null);
    const [lineColor, setlineColor] = useState('#5470c6')
    const [inFactor, setInFactor] = useState('')
    const [factorData, setFactorData] = useState([])
    const [quantData, setQuantData] = useState({
        long: [],
        short: []
    })
    const [historyData, setHistoryData] = useState({})
    const [factorLiData, setFactorLiData] = useState([])
    const [lineTimeData, setLineTimeData] = useState([])
    const stockanalysis = (stock_id: string) => {
        const data = {
            stock_id: stock_id,
            with_details: '0',
            categories: "factor",
            key: "8140ad230f687daede75a08855e8ae5ff40c3ba8"
        }
        request('http://139.159.205.40:8808/quant/stockanalysis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
        }).then((res) => {
            setInFactor(res.data.long[0].name)
            let long = res.data.long || []
            let short = res.data.short || []
            long.forEach((item: object) => {
                item.struct.children.forEach((obj) => {
                    obj.value = obj.label
                    obj.children.forEach((obj2) => {
                        obj2.value = obj2.label
                        if (obj2.value === 'sigma') {
                            obj2.children.forEach((obj3, index) => {
                                obj3.value = `取值${index + 1}:` + obj3.value
                            })
                        } else {
                            obj2.children.forEach((obj3, index) => {
                                obj3.value = `取值${index + 1}:` + (obj3.value * 100).toFixed(2) + '%'
                            })
                        }
                    })
                })
            })
            short.forEach((item: object) => {
                item.struct.children.forEach((obj) => {
                    obj.value = obj.label
                    obj.children.forEach((obj2) => {
                        obj2.value = obj2.label
                        if (obj2.value === 'sigma') {
                            obj2.children.forEach((obj3, index) => {
                                obj3.value = `取值${index + 1}:` + obj3.value
                            })
                        } else {
                            obj2.children.forEach((obj3, index) => {
                                obj3.value = `取值${index + 1}:` + (obj3.value * 100).toFixed(2) + '%'
                            })
                        }
                    })
                })
            })
            setQuantData({ long, short })
        }).catch(err => { console.log(err) })
    };
    const getstock_kline = (stock_id: string) => {
        const data = {
            stock_id: stock_id,
            days: Day,
            key: "8140ad230f687daede75a08855e8ae5ff40c3ba8"
        }
        request('http://139.159.205.40:8808/quant/getstock_kline', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
        }).then((res) => {
            setFactorData(res.data)
            let list = []
            res.data.forEach((item)=>{
                list.push(item.time)
            })
            setLineTimeData(list)
        }).catch(err => { console.log(err) })
    };
    const historyfactor = (stock_id: string) => {
        const data = {
            stock_id: stock_id,
            days: Day,
            key: "8140ad230f687daede75a08855e8ae5ff40c3ba8"
        }
        request('http://139.159.205.40:8808/quant/historyfactor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
        }).then((res) => {
            // setLineTimeData(res.data[60].time)
            setHistoryData(res.data[60].factors)
        }).catch(err => {
            console.log(err)
        })
    };

    
    useEffect(() => {
        stockanalysis('000001.SZ')
        getstock_kline('000001')
        historyfactor('000001')
    }, [])

    useEffect(() => {
        if (Object.keys(historyData).length !== 0 && inFactor !== '') {
            setFactorLiData(historyData[inFactor].raw)
        }
    }, [lineTimeData, inFactor])

    useEffect(() => {
        console.log(111,'第一次');
        const data1 = factorData?.map((item) => {
            delete item.time
            return Object.values(item)
        }
        )
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
                formatter: function (params) {
                    // 自定义弹出框的内容
                    let bullet = '\u25CF';
                    let time = params[0].axisValue
                    let close = params[0].value[1];
                    let highest = params[0].value[2];
                    let lowest = params[0].value[3];
                    let open = params[0].value[4];
                    let volume = params[0].value[6];
                    let FactorName = params[1]?params[1].seriesName:'暂无数据';
                    let FactorValue = params[1]?params[1].value:'暂无数据';
                    return( time + '<br>'+
                        bullet + '开盘价' + ': &nbsp' + open + '<br>' +
                        bullet + '收盘价' + ': &nbsp' + close + '<br>'+
                        bullet + '最低价' + ': &nbsp' + lowest + '<br>'+
                        bullet + '最高价' + ': &nbsp' + highest + '<br>'+ '<div style="margin-bottom:6px"></div>' +
                        bullet + '成交量' + ': &nbsp' + volume + '<br>' +        
                        bullet + FactorName  + ': &nbsp'  + FactorValue
                        )
                },
            },
            loading: {
                text: '正在加载中...',
                color: '#000',
                backgroundColor: '#fff',
                width: '100%',
                height: '100%',
            },
            legend: {
                data: ['日K', inFactor]
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '15%'
            },
            xAxis: {
                type: 'category',
                data: lineTimeData,
                boundaryGap: false,
                axisLine: { onZero: false },
                splitLine: { show: false },
                min: 'dataMin',
                max: 'dataMax'
            },
            yAxis: [
                // 左侧Y轴配置
                {
                    type: 'value',
                    scale: true,
                    splitArea: {
                        show: true
                    },
                },
                // 右侧Y轴配置
                {
                    type: 'value',
                }
            ],
            // 控制缩略轴
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 50
                },
                {
                    show: true,
                    type: 'slider',
                    top: '90%',
                    start: 0,
                    end: 50
                }
            ],
            series: [
                {
                    name: '日K',
                    type: 'candlestick',
                    data: data1,
                    itemStyle: {
                        color: upColor,
                        color0: downColor,
                        borderColor: upBorderColor,
                        borderColor0: downBorderColor
                    },
                    markPoint: {
                        label: {
                            formatter: function (param: any) {
                                return param != null ? Math.round(param.value) + '' : '';
                            }
                        },
                        // data: [
                        //   {
                        //     name: 'Mark',
                        //     coord: ['2013/5/31', 2300],
                        //     value: 2300,
                        //     valueDim: 'colse',
                        //     itemStyle: {
                        //       color: 'rgb(41,60,85)'
                        //     }
                        //   },
                        //   {
                        //     name: 'highest value',
                        //     type: 'max',
                        //     valueDim: 'highest'
                        //   },
                        //   {

                        //     name: 'lowest value',
                        //     type: 'min',
                        //     valueDim: 'lowest'
                        //   },
                        //   {
                        //     name: 'average value on close',
                        //     type: 'average',
                        //     valueDim: 'close'
                        //   }
                        // ],
                        tooltip: {
                            formatter: function (param: any) {
                                return param.name + '<br>' + (param.data.coord || '');
                            }
                        }
                    },
                    yAxisIndex: 0,
                },
                {
                    name: inFactor,
                    type: 'line',
                    data: factorLiData,
                    smooth: true,
                    lineStyle: {
                        opacity: 0.9
                    },
                    itemStyle: {
                        color: lineColor
                    },
                    yAxisIndex: 1,
                },
                // {
                //   name: 'RSI',
                //   type: 'line',
                //   data: calculateMA(10),
                //   smooth: true,
                //   lineStyle: {
                //     opacity: 0.5
                //   }
                // },
            ]
        };
        const chart = echarts.init(chartRef.current);
        chart.setOption(option);
        return () => {
            chart.dispose();
        };
    }, [lineTimeData, factorLiData])

    const handleFactorLine = (event: any, index: number) => {
        let text = event.target.textContent
        switch (index) {
            case 0:
                setlineColor('#5470c6')
                break;
            case 1:
                setlineColor('#91cc75')
                break;
            case 2:
                setlineColor('#fac858')
                break;
        }
        setInFactor(text)
    }

    const handleDescContent = (event: string) => {
        const paragraphs = event.split("。");
        return paragraphs;
    }
    /**
     * 接收导航的数据,切换股票
     */
    const handleDataFromChild = (butttonId: string, buttonNum: string) => {
        getstock_kline(butttonId)
        historyfactor(butttonId)
        stockanalysis(butttonId + '.' + buttonNum)

    }
    return (
        <ProCard gutter={16} ghost wrap>
            <ProCard
                colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 3 }}
                style={{ height: "100%" }}
            >
                <Left onDataChange={handleDataFromChild}></Left>
            </ProCard>
            <ProCard gutter={[0, 13]} colSpan={{ xs: 24, sm: 24, md: 20, lg: 20, xl: 21 }} direction="column" >
                <ProCard style={{ height: 460 }} bordered>
                    <div ref={chartRef} style={{  width: "100%", height: "100%" }}></div>
                </ProCard>
                <ProCard title="看涨因子" type="inner" bordered direction="column">
                    {
                        quantData.long.map((item, index) => {
                            return (
                                <div key={item.name}>
                                    <Space>
                                        <Button type={inFactor === item.name ? 'primary' : 'default'} size={size} onClick={(event) => { handleFactorLine(event, index) }}>{item.name}</Button>
                                        <Cascader style={{ width: '100%' }} options={item.struct.children} size={size}
                                            fieldNames={{ label: 'value', value: 'label' }}
                                            placeholder="预估数值"
                                        />
                                        <Button type="primary" size={size}>推荐指数{item.rate}</Button>
                                        {/* <Link to={`/analyze/factordelite?id=${14}`}><Button type="primary" size={size}>详情</Button></Link> */}
                                        <Popover content={<div style={{ width: "500px" }} >{
                                            handleDescContent(item.desc).map((item, index) => {
                                                return (
                                                    <p style={{ textIndent: '2em' }} key={index}>{item}</p>
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
                        quantData.short.map((item, index) => {
                            return (
                                <div key={item.name}>
                                    <Space>
                                        <Button type={inFactor === item.name ? 'primary' : 'default'} size={size} onClick={(event) => { handleFactorLine(event, index) }}>{item.name}</Button>
                                        <Cascader style={{ width: '100%' }} options={item.struct.children} size={size} fieldNames={{ label: 'value', value: 'label' }} placeholder="预估数值" />
                                        <Button type="primary" size={size}>推荐指数{item.rate}</Button>
                                        {/* <Link to={`/analyze/factordelite?id=${14}`}><Button type="primary" size={size}>详情</Button></Link> */}
                                        <Popover content={<div style={{ width: "500px" }} >{
                                            handleDescContent(item.desc).map((item, index) => {
                                                return (
                                                    <p style={{ textIndent: '2em' }} key={index}>{item}</p>
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
