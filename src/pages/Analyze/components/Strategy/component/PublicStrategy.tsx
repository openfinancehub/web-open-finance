// import { Line } from '@ant-design/plots';
import { ProCard } from '@ant-design/pro-components';
import type { DatePickerProps } from 'antd';
import { Button, InputNumber, Space, DatePicker, Radio, } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { request } from 'umi';
import * as echarts from 'echarts/core';
import { TitleComponent, LegendComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    TitleComponent,
    LegendComponent,
    CanvasRenderer,
    RadarChart,
    LineChart
]);
export default function PublicStrategy() {
    const demoLine = [10.26, 10.26, 10.26, 10.26, 10.26, 10.28, 10.3, 10.28, 10.27, 10.27, 10.26, 10.28, 10.27, 10.28, 10.27, 10.27, 10.25, 10.25, 10.26, 10.25, 10.26]
    const demoLineTime = ['2023-11-22 09:30:00', '2023-11-22 09:31:00', '2023-11-22 09:32:00', '2023-11-22 09:33:00', '2023-11-22 09:34:00', '2023-11-22 09:35:00', '2023-11-22 09:36:00', '2023-11-22 09:37:00', '2023-11-22 09:38:00', '2023-11-22 09:39:00', '2023-11-22 09:40:00', '2023-11-22 09:41:00', '2023-11-22 09:42:00', '2023-11-22 09:43:00', '2023-11-22 09:44:00', '2023-11-22 09:45:00', '2023-11-22 09:46:00', '2023-11-22 09:47:00', '2023-11-22 09:48:00', '2023-11-22 09:49:00']
    const size = 'large';
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const todayDate = `${year}-${month}-${date}`
    const radarRef = useRef(null)
    const lineRef = useRef(null)
    const [demoDays, setDemoDays] = useState(5)
    const [backData, setbackData] = useState(0)
    const [dateData, setDateData] = useState(todayDate)
    const [shopData, setShopData] = useState(1)
    const [listData, setListData] = useState([])
    const [detailsData, setDetailsData] = useState([])
    const [listName, setListName] = useState()
    const [indexdetails, setindexDetails] = useState(0)
    const [isdemoBtn, setIsdemoBtn] = useState(true)
    const [lineDataTime,setlineDataTime] = useState()
    const [lineData, setLineData] = useState()
    const [lineMax,setLinemax] = useState()
    const [lineMin,setLinemin] = useState()
    const [lineIdent,setLineIdent] = useState([])
    const [demoEndData, setDemoEndData] = useState([])
    const [raderData, setRaderData] = useState([{ name: '', max: '' }])
    const [selectedButton, setSelectedButton] = useState('')
    const [raderValue, setRaderValue] = useState([])
    const firstKargs: any = []
    let synthesis: any = []
    const strtegylist = () => {
        const data = {
            uid: 1,
            key: "8140ad230f687daede75a08855e8ae5ff40c3ba8"
        }
        request('http://139.159.205.40:8808/quant/strtegylist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
        }).then((res) => {
            setListName(res.data.list[0])
            setSelectedButton(res.data.list[0])
            setListData(res.data.list)
            setDetailsData(Object.values(res.data.details))
        }).catch(err => { console.log(err) })
    }
    const GetStrategy = (uid: number) => {
        const data = {
            uid: uid,
            key: "8140ad230f687daede75a08855e8ae5ff40c3ba8"
        }
        request('http://139.159.205.40:8808/quant/get_strategy_test_result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
        }).then((res) => {
            console.log(res)
            if (res.code === 300) {
                setTimeout(() => {
                    GetStrategy(uid)
                }, 5000)
            } else {
                let destArr = []
                let raderArr = []
                let radervalue = []
                let linedata = []
                let lineDataTime = []
                // 买入卖出节点
                let longAndshort = []
                res.data.result.forEach(item => {
                    if (item.indicator_flag === 'True') {
                        destArr.push({ name: item.name, desc: item.desc, value: item.value.toFixed(4) })
                        raderArr.push({ name: item.name, max: item.max })
                        radervalue.push(item.value)
                    }
                });
                if (!backData) {
                    res.data.raw_data.forEach(list => {
                        linedata.push(Object.values(list)[0])
                        lineDataTime.push(Object.keys(list)[0])
                        for(let i=0;i<res.data.decision_long.length;i++){
                            if(res.data.decision_long[i] === Object.keys(list)[0]){
                                longAndshort.push({
                                    coord: [Object.keys(list)[0], Object.values(list)[0]],
                                    itemStyle: {color: 'red'},
                                    label: {
                                        formatter: '买入'
                                    }
                                })
                                break;
                            }
                        }
                        for(let i=0;i<res.data.decision_short.length;i++){
                            if(res.data.decision_short[i] === Object.keys(list)[0]){
                                longAndshort.push({
                                    coord: [Object.keys(list)[0], Object.values(list)[0]],
                                    itemStyle: {color: 'green'},
                                    label: {
                                        formatter: '卖出'
                                    }
                                })
                                break;
                            }
                        }
                    });
                }
                destArr.push()
                console.log(linedata);
                const max = Math.max(...linedata)
                const min = Math.min(...linedata)
                setLinemax(max)
                setLinemin(min)
                setLineIdent(longAndshort)
                setDemoEndData(destArr)
                setRaderData(raderArr)
                setRaderValue(radervalue)
                setLineData(linedata)
                setlineDataTime(lineDataTime)
                console.log("成功！");
                setIsdemoBtn(true);
                synthesis = [];
            }
        }).catch(err => { console.log(err) })
    }
    const strategy_test = (kargs: number[]) => {
        const data = {
            key: "8140ad230f687daede75a08855e8ae5ff40c3ba8",
            setting: [
                {
                    strategy_name: listName,
                    span: 60,
                    kargs: kargs
                }
            ],
            configs: {
                stock_id: '000001',
                user_id: '000001',
                setting_mode: 'p',
                analysis_flag: 0,
                holding_cost: -1,
                end_date: dateData,
                cnt_ops: shopData,
                test_days: demoDays,
                mode: 'both'
            }
        }
        request('http://139.159.205.40:8808/quant/strategy_test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
        }).then((res) => {
            console.log(res.uid)
            if (res.uid) {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                GetStrategy(res.uid)
            }
        }).catch(err => { console.log(err) })
    }
    useEffect(() => {
        strtegylist()
    }, []);

    useEffect(() => {
        const option = {
            title: {
                text: 'Basic Radar Chart'
            },
            radar: {
                indicator: raderData
            },
            tooltip: {
                trigger: 'item',
            },
            series: [
                {
                    name: 'Budget vs spending',
                    type: 'radar',
                    data: [
                        {
                            value: raderValue,
                            name: 'Allocated Budget'
                        }
                    ]
                }
            ]
        }
        const chart = echarts.init(radarRef.current);
        chart.setOption(option);
    }, [raderValue]);

    useEffect(() => {
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
                formatter: function(params) {
                    let v1  = '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:blue;"></span>'
                    let v2 = '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:red;"></span>'
                    let v3 =  '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:green;"></span>'
                    if(params[1] && params[1].data !==''){
                        return v2 + '买入 :'+ params[0].data
                    }
                    else if(params[1] && params[2].data !=='' ){
                        return v3 + '卖出 :'+ params[0].data
                    }else{
                        return v1 + '股票 :' + params[0].data ;
                    }
                    
                }
            },
            xAxis: {
                type: 'category',
                data: lineDataTime
            },
            yAxis: {
                type: 'value',
                min: lineMin,
                max: lineMax,
            },
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
                    data: lineData,
                    type: 'line',
                    symbolSize: 10,
                    symbol: 'circle',
                    markPoint: {
                        label: {
                            show: true,
                            position: 'top'
                        },
                        data: lineIdent
                    },
                    lineStyle: {
                        color: '#5470C6',
                        width: 3,
                    },
                    itemStyle: {
                        borderWidth: 3,
                        //   borderColor: '#EE6666',
                        color: 'blue'
                    }
                },
            ]
        };
        const chart = echarts.init(lineRef.current)
        chart.setOption(option)
    }, [lineData])
    const backOrder = (e: any) => {
        console.log('回滚次数', e.target.value);
        setbackData(e.target.value)
    }
    const dateTime: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
        setDateData(dateString)
    };
    const shopOrder = (value: number) => {
        console.log('最大交易次数', value);
        setShopData(value)
    }
    const demoBtn = () => {
        synthesis = []
        for (let i = 0; i < firstKargs.length; i++) {
            if (firstKargs.length > 0) {
                // 处理数组元素
                synthesis.push(`${firstKargs[0].name}:${firstKargs[0].value}`)
                if (i !== 0 && firstKargs[i - 1].name !== firstKargs[i].name) {
                    synthesis.push(`${firstKargs[0].name}:${firstKargs[0].value}`)
                }
            }
        }
        console.log(synthesis);
        strategy_test(synthesis)
        setIsdemoBtn(false)

    }

    const demoDaysChange = (value: number) => {
        console.log('测试天数', value);
        setDemoDays(value)
    }

    const handleValue = (index: number, event: any) => {
        let text = event.target.innerHTML
        setListName(text)
        setindexDetails(index)
        setSelectedButton(text)
    }
    const nuberOnChange = (name: string, value: number) => {
        console.log(name, value);
        firstKargs.unshift({
            name: name,
            value: value
        })
        console.log(firstKargs);

    }

    return (
        <div>
            <ProCard gutter={16} ghost wrap>
                <ProCard
                    bordered
                    style={{ textAlign: 'center', height: 225 ,overflowY: 'scroll'}}
                    colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 10 }}>
                    <Space>
                        {
                            listData.map((item, index) => {
                                return (
                                    <Button type={selectedButton === item ? 'primary' : 'default'}
                                        key={index} onClick={(e) => { handleValue(index, e) }}>{item}</Button>
                                )
                            })
                        }
                    </Space>
                    <div >
                        {
                            detailsData[indexdetails] && detailsData[indexdetails].map((item, index) => {
                                return (
                                    <div style={{ marginTop: '20px' }} key={index} data-name={item.name}>{item.desc} : <InputNumber min={1} defaultValue={item.value}
                                        onChange={(value) => { nuberOnChange(item.name, value) }}
                                    /> </div>
                                )
                            })
                        }
                    </div>
                </ProCard>
                <ProCard
                    style={{ textAlign: 'center', height: 225}}
                    bordered
                    colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 14 }}>
                    <div className="numberSele">
                        <InputNumber
                            size={size}
                            min={1}
                            max={10}
                            addonBefore="测试天数"
                            addonAfter="天"
                            defaultValue={5}
                            onChange={demoDaysChange}
                        />
                        <InputNumber
                            size={size}
                            min={1}
                            addonBefore="最大交易次数"
                            addonAfter="次"
                            defaultValue={1}
                            onChange={shopOrder}
                        />
                    </div>
                    <div className="numberSele">
                        <DatePicker onChange={dateTime} />
                        是否滚动测评:
                        <Radio.Group onChange={backOrder} value={backData}>
                            <Radio value={0}>否</Radio>
                            <Radio value={1}>是</Radio>
                        </Radio.Group>
                    </div>
                    {isdemoBtn && <Button
                        size={size}
                        style={{
                            background: 'rgb(1,108,102)',
                            color: '#fff',
                            marginBottom: 20
                        }}
                        onClick={demoBtn}
                    >
                        测试
                    </Button>}
                    {
                        !isdemoBtn && <Button
                            size={size}
                            style={{
                                background: 'rgb(1,108,102)',
                                color: '#fff',
                                marginBottom: 20
                            }}
                        >
                            正在测试...
                        </Button>
                    }
                </ProCard>
            </ProCard>
            <ProCard style={{ height: 360 }}>
                <ProCard
                    style={{ height: '100%' }}
                    colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 11 }}
                    bordered>
                    <div className="demoResult">
                        <div>测试结果：</div><br></br>
                        {demoEndData.map((item, index) => {
                            return (
                                <div style={{fontWeight:'bole'}} key={index}>
                                      <p > <span>{index +1}、</span> {item.name ? `${item.name}(${item.value}):` : ''}</p>
                                    <p>{item.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </ProCard>
                <ProCard
                    style={{ height: '100%' }}
                    colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 12 }}
                    bordered>
                    <div ref={radarRef} style={{ width: "100%", height: "100%" }}></div>
                </ProCard>
            </ProCard>
            <ProCard style={{ height: 460, width: '90%' }} colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 12 }}>
                <div ref={lineRef} style={{ height: "100%" }}></div>
            </ProCard>
        </div>
    )
}