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
    CandlestickSeriesOption,
    LineChart,
    LineSeriesOption
} from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import Left from "./component/left"

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
    const chartRef = useRef(null);
    const upColor = '#ec0000';
    const upBorderColor = '#8A0000';
    const downColor = '#00da3c';
    const downBorderColor = '#008F28';
    // 响应式的折线颜色
    const [lineColor, setlineColor] = useState('#5470c6')
    // 按钮的全局样式
    const size = 'large'
    // 响应式的因子键值
    const [inFactor, setInFactor] = useState('')
    // 因子取值的数据
    const [factorData, setFactorData] = useState([])
    const [quantData, setQuantData] = useState({
        long: [],
        short: []
    })
    // history 的所有数据
    const [historyData, setHistoryData] = useState({})
    // 单个因子的折线数据
    const [factorLiData, setFactorLiData] = useState([])
    // 图表的时间轴
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
            console.log('实例',res)
            setFactorData(res.data)
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
            // console.log("1111", JSON.parse(res))
            console.log("222",res)
            setLineTimeData(res.data[60].time)
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
            setFactorLiData(historyData[inFactor].bins)
        }
    }, [lineTimeData, inFactor])

    useEffect(() => {
        console.log(factorLiData,"折线的数据")
        // 图表的数据
        const data1 = factorData.map((item) => {
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
                    let FactorName = params[1].seriesName
                    let FactorValue = params[1].value
                    return( time + '<br>'+
                        bullet + '开盘价' + ': &nbsp' + open + '<br>' +
                        bullet + '收盘价' + ': &nbsp' + close + '<br>'+
                        bullet + '最低价' + ': &nbsp' + lowest + '<br>'+
                        bullet + '最高价' + ': &nbsp' + highest + '<br>'+ '<div style="margin-bottom:6px"></div>' +
                        bullet + '成交量' + ': &nbsp' + volume + '<br>'+        
                        bullet + FactorName  + ': &nbsp'  + FactorValue
                        
                        )
    
                },
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
            dataZoom: [
                {
                    type: 'inside',
                    start: 50,
                    end: 100
                },
                {
                    show: true,
                    type: 'slider',
                    top: '90%',
                    start: 50,
                    end: 100
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

    /**
     * 点击切换因子的方法
     * 用来处理改变折线的数据
     */
    const handleValue = (event: any, index: number) => {
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

    /**
     * 处理段落的方法
     * @param event 
     * @returns 
     */
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
                    <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
                </ProCard>
                <ProCard title="看涨因子" type="inner" bordered direction="column">
                    {
                        quantData.long.map((item, index) => {
                            return (
                                <div key={item.name}>
                                    <Space>
                                        <Button type={inFactor === item.name ? 'primary' : 'default'} size={size} onClick={(event) => { handleValue(event, index) }}>{item.name}</Button>
                                        <Cascader style={{ width: '100%' }} options={item.struct.children} size={size}
                                            fieldNames={{ label: 'value', value: 'label' }}
                                            placeholder="预估数值"
                                        />
                                        <Button type="primary" size={size}>推荐指数{item.rate}</Button>
                                        <Link to={`/analyze/factordelite?id=${14}`}><Button type="primary" size={size}>详情</Button></Link>
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
                                        <Button type={inFactor === item.name ? 'primary' : 'default'} size={size} onClick={(event) => { handleValue(event, index) }}>{item.name}</Button>
                                        <Cascader style={{ width: '100%' }} options={item.struct.children} size={size} fieldNames={{ label: 'value', value: 'label' }} placeholder="预估数值" />
                                        <Button type="primary" size={size}>推荐指数{item.rate}</Button>
                                        <Link to={`/analyze/factordelite?id=${14}`}><Button type="primary" size={size}>详情</Button></Link>
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
