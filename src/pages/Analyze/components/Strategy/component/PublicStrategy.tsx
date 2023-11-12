import { Line } from '@ant-design/plots';
import { ProCard } from '@ant-design/pro-components';
import type { DatePickerProps } from 'antd';
import { Button, InputNumber, Space, DatePicker, Radio, } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { request } from 'umi';
import * as echarts from 'echarts/core';
import { TitleComponent, LegendComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    TitleComponent,
    LegendComponent,
    CanvasRenderer,
    RadarChart
]);
export default function PublicStrategy() {
    const size = 'large';
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const todayDate = `${year}-${month}-${date}`
    const radarRef = useRef(null)
    const [demoDays, setDemoDays] = useState(5)
    const [backData, setbackData] = useState(0)
    const [dateData, setDateData] = useState(todayDate)
    const [shopData, setShopData] = useState(1)
    const [listData, setListData] = useState([])
    const [detailsData, setDetailsData] = useState([])
    const [listName, setListName] = useState()
    const [indexdetails, setindexDetails] = useState(0)
    const [isdemoBtn, setIsdemoBtn] = useState(true)
    const [lineData,setLineData] = useState([])
    const [demoEndData, setDemoEndData] = useState([{ desc: '测试结果:' }])
    const [raderData,setRaderData] = useState([ { name: '', max: '' },
   ])
    const [raderValue,setRaderValue] = useState([])
    const firstKargs: any = []
    let synthesis: any = []
    // 获取对应测试的数据接口
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
            setListData(res.data.list)
            setDetailsData(Object.values(res.data.details))
        }).catch(err => { console.log(err) })
    }
    // 拿到令牌 去拿数据
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
                }, 10000)
            } else {
                let destArr = []
                let raderArr = []
                let radervalue = []
                let linedata = []
                res.data.result.forEach(item => {
                    if(item.indicator_flag === 'True'){
                        destArr.push({name:item.name,desc:item.desc})
                        raderArr.push({name:item.name,max:item.max})
                        radervalue.push(item.value)
                    }
                });
                 if(!backData){
                    res.data.raw_data.forEach(list => {
                        linedata.push({date:Object.keys(list)[0],value:Object.values(list)[0]})
                    });
                }
                destArr.push()
                setDemoEndData(destArr)
                setRaderData(raderArr)
                setRaderValue(radervalue)
                setLineData(linedata)
                console.log("成功！");
                setIsdemoBtn(true);
                synthesis = [];
            }
        }).catch(err => { console.log(err) })
    }
    // 进行测试的接口
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
    useEffect(()=>{
        const option = {
            title: {
                text: 'Basic Radar Chart'
              },
              radar: {
                indicator: raderData
              },
              series: [
                {
                  name: 'Budget vs spending',
                  type: 'radar',
                  data: [
                    {
                      value: raderValue ,
                      name: 'Allocated Budget'
                    }
                  ]
                }
              ]
        }
        const chart = echarts.init(radarRef.current);
        chart.setOption(option);
    },[raderValue]);

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

    }
    const nuberOnChange = (name: string, value: number) => {
        console.log(name, value);
        firstKargs.unshift({
            name: name,
            value: value
        })
        console.log(firstKargs);

    }
    console.log(lineData,'111');
    const lineconfig = {
        data:lineData,
        padding: 'auto',
        xField: 'date',
        yField: 'value',
        xAxis: {
          tickCount: 5,
        },
        point: {
            size: 5,
            shape: 'diamond',
            // style: {
            //   fill: 'white',
            //   stroke: '#5B8FF9',
            //   lineWidth: 1,
            // },
          },
        slider: {
          start: 0.1,
          end: 0.2,
        },
    };
    return (
        <div>
            <ProCard gutter={16} ghost wrap>
                <ProCard
                    bordered
                    style={{ textAlign: 'center' }}
                    colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 10 }}>
                    <Space>
                        {
                            listData.map((item, index) => {
                                return (
                                    <Button key={index} onClick={(e) => { handleValue(index, e) }}>{item}</Button>
                                )
                            })
                        }
                    </Space>
                    <div >
                        {
                            detailsData[indexdetails] && detailsData[indexdetails].map((item, index) => {
                                return (
                                    <div style={{marginTop:'20px'}} key={index} data-name={item.name}>{item.desc} : <InputNumber min={1} defaultValue={item.value}
                                        onChange={(value) => { nuberOnChange(item.name, value) }}
                                    /> </div>
                                )
                            })
                        }
                    </div>
                </ProCard>
                <ProCard
                    style={{ textAlign: 'center' }}
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
                        {demoEndData.map((item, index) => {
                            return (
                                // <span key={index}>{item.desc}</span>
                                <div key={index}>
                                    <p >{item.name?`${item.name}:`:''}</p>
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
                    {/* <Radar {...raderConfig} /> */}
                </ProCard>
            </ProCard>
            <ProCard style={{ height: 360 }}>
                    <Line {...lineconfig}></Line>
            </ProCard>
        </div>
    )
}