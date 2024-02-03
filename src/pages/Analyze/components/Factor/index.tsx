import { useState, useEffect, useRef } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { PoweroffOutlined } from '@ant-design/icons';
import { Link, request } from 'umi';
import './style.less'
import * as echarts from 'echarts/core';
import {
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    VisualMapComponent,
    LegendComponent,
    BrushComponent,
    DataZoomComponent
} from 'echarts/components';
import {
    CandlestickChart, LineChart, BarChart
} from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import Left from "../Public/left"
import {Linedata,lineType,linealldata} from "./stock-DJI"
import { Space, Select, InputNumber, Button,Table,Spin } from 'antd'
echarts.use([
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    VisualMapComponent,
    LegendComponent,
    BrushComponent,
    DataZoomComponent,
    CandlestickChart,
    LineChart,
    BarChart,
    CanvasRenderer,
    UniversalTransition
]);

const Factor = () => {
    // 天数
    const Day = 1
    const upColor = '#00da3c';
    const downColor = '#ec0000';
    const chartRef = useRef(null);
    let   chart: any
    const [factorData, setFactorData] = useState([])
    const [historyData, setHistoryData] = useState({})
    const [lineTimeData, setLineTimeData] = useState([])
    const [scale,setScale] = useState(1)
    const [step,setStep] = useState(1)
    const [dataSpan,setDataSpan] = useState(60)
    const [targetSpan,setTargerSpan] = useState(15)
    const [allTabledata,setAllTabledata] = useState([])
    const [tableDataLi,setTableDataLi] = useState([])
    const [targetSelect,setTargetSelect] = useState([])
    const [targetSelectLi,setTargetSelectLi] = useState('')
    const [ratedisSelectLi,setRatedisSelectLi] = useState('max_dd')
    const [endSeek,setEndSeek] = useState(false)
    const [seekbtnText,setSeekbtnText] = useState('开始测试')
    const [stockName,setStockName] = useState('')
    const [factorKey,setFactorKey] = useState('')
    const [factorValue,setFactorValue] = useState([])
    const [factorSelect,setFactorSelect] = useState([])
    const [factorTime,setFactorTime] = useState([])
    // 保存股票id
    const [stockid,setStockid] = useState('')
    // 对表格数据进行筛选的方法
    function filterTableData(allTableData,targerSelectli,ratedisSelectLi){
        // if(allTableData.length>0){
            allTableData.filter((item:any) => item.name === targerSelectli) 
            .map((item:any) =>
                item.measures.forEach(element => {
                    if(element.name === ratedisSelectLi){
                        let list = JSON.parse(element.value)
                        setTableDataLi(list)
                    } 
                }))
        // }
    }
    // k线的接口
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
            let list:any = []
            res.data.forEach((item:any) => {
                list.push(item.time)
            })
            setLineTimeData(list)
            chart.hideLoading();
            chart.refresh()
        }).catch(err => { console.log(err) })
    };
    // 折线的接口
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
            const data = JSON.parse(res.data)[60].factors
            const data1 = JSON.parse(res.data)[60].time

            console.log(data1,"折线的数据");
            setFactorTime(data1)
            setHistoryData(data)
            let dataFactorkey = Object.keys(data)
            let selectFcatorKeys:any = dataFactorkey.map((item)=>{
                return{
                    value:item,
                    label:item
                }
            })
            setFactorSelect(selectFcatorKeys)
            // setFactorKey(dataFactorkey[0])
            // setFactorValue(data[dataFactorkey[0]].raw)
        }).catch(err => {
            console.log(err)
        })
    };
    // 拿到uid后
    const beforGetUid = (uid:number,time:number) =>{
        const data = {
            uid:uid,    
            key: "8140ad230f687daede75a08855e8ae5ff40c3ba8"
        }
        request('http://139.159.205.40:8808/quant/get_factor_profile_test_result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
        }).then((res) => {
            let list = time + 1
            if (res.code === 300) {
                if(time<=20){
                    setTimeout(() => {
                        beforGetUid(uid,list)
                    }, 3000)
                }else{
                    setEndSeek(false)
                }
            }else{
                let targetSelectData = res.data.factors.map( (item:any) =>( {value:item.name,lable:item.name}))
                let firstTargetLi = res.data.factors[0].name
                setTargetSelect(targetSelectData)
                setAllTabledata(res.data.factors)
                filterTableData(res.data.factors,firstTargetLi,ratedisSelectLi)
                setEndSeek(false)
            }
        }).catch(err => { console.log(err) })
    }
    // 提交测试数据的接口
    const subInterface = (stock_id:string) =>{
        const data = {
            stock_id: stock_id,
            user_id:"0001",
            scale,
            data_span:dataSpan,
            target_span:targetSpan,
            step,
            key: "8140ad230f687daede75a08855e8ae5ff40c3ba8"
        }
        request('http://139.159.205.40:8808/quant/factor_profile_test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
        }).then((res) => {
           beforGetUid(res.uid,1)
        }).catch(err => { console.log(err) })
    }
    // 切换股票
    const handleDataFromChild = (butttonId: string, buttonNum: string,buttonStr:string) => {
        getstock_kline(butttonId)
        historyfactor(butttonId)
        setStockid(butttonId)
        setStockName(buttonStr)
    }
    // 刚进页面时调用
    const handleOnInval = (buttonNum: string,buttonName:string) => {
        getstock_kline(buttonNum)
        historyfactor(buttonNum)
        setStockid(buttonNum)
        setStockName(buttonName)
    }
    // 判断因子日期与k线日期是否一致
    useEffect(()=>{
        if(factorTime[0] !== lineTimeData[0]){
            setHistoryData([])
            setFactorSelect([])
            setFactorValue([])
        }else{
            const firsttitle = factorSelect[0]?.value
            setFactorKey(firsttitle)
            setFactorValue(historyData[firsttitle]?.raw)
        }
    },[factorTime])
    useEffect(() => {
        // 股票的数据  
        const data2 = factorData?.map((item) => {
            delete item.time
            return Object.values(item)
        })
        const data1 = data2?.map((item)=>{
            return[item[3],item[0],item[2],item[1]]
        })
     
        const option = {
            animation: false,
            legend: {
                top: 0,
                left: 'center',
                width:"80%"
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
                borderWidth: 1,
                borderColor: '#ccc',
                textStyle: {
                    color: '#000'
                },
            },
            loading: {
                show: true // 启用 loading 动画效果
              },
            axisPointer: {
                link: [
                    {
                        xAxisIndex: 'all'
                    }
                ],
                label: {
                    backgroundColor: '#777'
                }
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: false
                    },
                    brush: {
                        type: ['lineX', 'clear']
                    }
                }
            },
            brush: {
                xAxisIndex: 'all',
                brushLink: 'all',
                outOfBrush: {
                    colorAlpha: 0.1
                }
            },
            visualMap: {
                show: false,
                seriesIndex: 5,
                dimension: 2,
                pieces: [
                    {
                        value: 1,
                        color: downColor
                    },
                    {
                        value: -1,
                        color: upColor
                    }
                ]
            },
            grid: [
                {
                    left: '0%',
                    right: '0%',
                    height: '60%'
                },
                // {
                //     left: '0%',
                //     right: '0%',
                //     top: '70%',
                //     height: '16%'   
                // }
            ],
            xAxis: [
                {
                    type: 'category',
                    data: lineTimeData,
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    splitLine: { show: false },
                    min: 'dataMin',
                    max: 'dataMax',
                    axisPointer: {
                        z: 100
                    }
                },
                // {
                //     type: 'category',
                //     gridIndex: 1,
                //     data: lineTimeData,
                //     boundaryGap: false,
                //     axisLine: { onZero: false },
                //     axisTick: { show: false },
                //     splitLine: { show: false },
                //     axisLabel: { show: false },
                //     min: 'dataMin',
                //     max: 'dataMax'
                // }
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    splitArea: {
                        show: true
                    }
                },
                {
                    type:'value',
                    scale: true,
                },
                // {
                //     scale: true,
                //     gridIndex: 1,
                //     splitNumber: 2,
                //     axisLabel: { show: false },
                //     axisLine: { show: false },
                //     axisTick: { show: false },
                //     splitLine: { show: false }
                // }
               
            ],
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: [0, 1],
                    start: 0,
                    end: 10
                },
                {
                    show: true,
                    xAxisIndex: [0, 1],
                    type: 'slider',
                    top: '85%',
                    // top:'80%',
                    start: 0,
                    end: 10
                }
            ],
            series: [
                {
                    name: stockName,
                    // name: "龙头股份",
                    type: 'candlestick',
                    data: data1,
                    yAxisIndex: 0,
                    itemStyle: {
                        color: upColor,
                        color0: downColor,
                        borderColor: undefined,
                        borderColor0: undefined
                    }
                },
                {
                    name:factorKey,
                    type:'line',
                    data:factorValue,
                    yAxisIndex: 1,  // 关联第一个 y 轴
                    smooth: true,
                    // yAxisIndex: 1,
                    // xAxisIndex: 1,
                    lineStyle: {
                        opacity: 0.5
                    }
                }
                // {
                //     name: stockName,
                //     type: 'bar',
                //     xAxisIndex: 1,
                //     yAxisIndex: 1,
                //     data: data1,
                // },
                // ...serveris 
              
            ]
        };
        chart = echarts.init(chartRef.current);
        if(data1.length<=0){
            chart.showLoading();
        }
        chart.setOption(option);
        return () => {
            chart.dispose();
        };
    }, [lineTimeData,factorKey])
  

    const columns = [
        {
          title: '因子分箱值',
          dataIndex: 'bin',
          key: 'bin',
        },
        {
          title: '因子取值范围',
          dataIndex: 'quantile',
          key: 'quantile',
        },
        {
          title: '10分位数',
          dataIndex: 'quantile_10',
          key: 'quantile_10',
        },
        {
          title: '50分位数',
          key: 'quantile_50',
          dataIndex: 'quantile_50',
        },
        {
          title: '90分位数',
          key: 'quantile_90',
          dataIndex:'quantile_90'
        },
        {
            title: '均值',
            key: 'mean',
            dataIndex: 'mean',
        },
        {
            title: '标准差',
            key: 'sigma',
            dataIndex: 'sigma',
        },
    ];


    const handleFactorChange = (value:any) =>{
        setFactorKey(value)
        setFactorValue(historyData[value].raw)
    } 
    const handleScale = (value:any) => {
        setScale(value)
    }
    const handleStep = (value:any) =>{
        setStep(value)
    }
    const handleDataSpan = (value:any) => {
        setDataSpan(value)
    }
    const handleTargetSpan = (value:any) =>{
        setTargerSpan(value)
    }
    const subBtn = () =>{
        subInterface(stockid)
        setEndSeek(true)
        setSeekbtnText('重新测试')

    }
    const handleTargerChange = (value:any) =>{
        setTargetSelectLi(value)
        filterTableData(allTabledata,value,ratedisSelectLi)
    }
    const handleRatedisChange = (value:any) => {
        setRatedisSelectLi(value)
        filterTableData(allTabledata,targetSelectLi,value)
    }
    

    return (
        <ProCard gutter={16} ghost wrap>
            <ProCard
                colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 3 }}
                style={{ height: "100%", padding: 0 }}
            >
                <Left onDataChange={handleDataFromChild} onInval={handleOnInval}></Left>
            </ProCard>

            <ProCard gutter={[0, 13]} colSpan={{ xs: 24, sm: 24, md: 20, lg: 20, xl: 21 }} direction="column" >
                <div>
                    <Select
                        placeholder="因子"
                        style={{ width: 120 }}
                        onChange={handleFactorChange}
                        options={factorSelect}
                        />
                </div>
                <ProCard style={{ height: '70vh' }} bordered>
                        <div ref={chartRef} style={{ width: "100%", height: "100%", overflow: 'hidden' }}></div>
                </ProCard>
                <ProCard>
                    <div style={{ textAlign: "center" }}>因子分析与评估</div>
                    <hr /><br />
                    <div style={{ textAlign: "center" }}>测试参数</div>
                    <br />
                    <div className='factorli'>
                        <Select
                            style={{ width: '20%' }}
                            placeholder="时间粒度"
                            onChange={handleScale}
                            options={[
                                {
                                    value: 1,
                                    label: '1',
                                },
                                {
                                    value: 5,
                                    label: '5',
                                },
                                {
                                    value: 15,
                                    label: '15',
                                },
                                {
                                    value: 30,
                                    label: '30',
                                },
                                {
                                    value: 60,
                                    label: '60',
                                },
                            ]}
                        />
                        <InputNumber
                            min={1}
                            addonBefore="间隔长度"
                            defaultValue={1}
                            onChange={handleStep}
                        />
                        <InputNumber
                            min={60}
                            addonBefore="因子最小计算长度"
                            defaultValue={60}
                            onChange={handleDataSpan}
                        />
                        <InputNumber
                            min={15}
                            addonBefore="目标时间长度"
                            defaultValue={15}
                            onChange={handleTargetSpan}
                        />
                    </div>
                    <br />
                    <div style={{ textAlign: 'center' }}>
                        {
                            endSeek?   <Button loading  style={{
                                background: 'rgb(1,108,102)',
                                color: '#fff',
                            }}  icon={<PoweroffOutlined />}>正在测试</Button>:<Button type="primary" onClick={subBtn}>{seekbtnText}</Button>
                        }
                    </div>
                </ProCard>
                <ProCard>
                    <div>
                        <Select
                            style={{ width: '18%',marginRight:10}}
                            placeholder="指标"
                            onChange={handleTargerChange}
                            options={targetSelect}
                        />
                        <Select
                            style={{ width: '18%' }}
                            placeholder="评估维度"
                            onChange={handleRatedisChange}
                            options={[
                                {
                                    value: 'max_dd',
                                    label: 'max_dd',
                                },
                                {
                                    value: 'max_cu',
                                    label: 'max_cu',
                                },
                                {
                                    value: 'sf_std',
                                    label: 'sf_std',
                                },
                                {
                                    value: 'period_return',
                                    label: 'period_return',
                                },
                                {
                                    value: 'mean_return',
                                    label: 'mean_return',
                                },
                            ]}
                        />
                    </div>
                    <br />
                    <div>
                    <Table columns={columns} dataSource={tableDataLi} />
                    </div>
                </ProCard>
            </ProCard>
        </ProCard>
    )
}
export default Factor;
