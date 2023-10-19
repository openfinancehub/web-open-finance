import { Line, Radar } from '@ant-design/plots';
import { ProCard } from '@ant-design/pro-components';
import type { DatePickerProps } from 'antd';
import { Button, InputNumber, Space, DatePicker, Radio,  } from 'antd';
import { useEffect, useState } from 'react';
import { request } from 'umi';
export default function PublicStrategy() {
    const size = 'large';
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const todayDate = `${year}-${month}-${date}`
    const [demoDays, setDemoDays] = useState(5)
    const [backData, setbackData] = useState(0)
    const [dateData, setDateData] = useState(todayDate)
    const [shopData, setShopData] = useState(1)
    const [listData, setListData] = useState([])
    const [detailsData, setDetailsData] = useState([])
    const [listName, setListName] = useState('S_MACD')
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
            console.log(res)
            setListData(res.data.list)
            setDetailsData(Object.values(res.data.details))
        }).catch(err => { console.log(err) })
    }
    // 进行测试的接口
    const strategy_test = () => {
        const data = {
            key: "8140ad230f687daede75a08855e8ae5ff40c3ba8",
            setting: [
                {
                    factor_name: listName,
                    span: 60,
                    kargs: []
                }
            ],
            configs: {
                stock_id: '000001',
                user_id: 1,
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
            // if(res.code === 300){
            //   setTimeout(()=>{
            //     GetStrategy()
            //   },5000)
            // }
        }).catch(err => { console.log(err) })
    }

    useEffect(() => {
        strtegylist()
        // strategy_test()
    }, []);

    // console.log(detailsData);
    // const arrlistSele = Object.values(detailsData)
    // console.log(arrlistSele);

    const lineData = [
        {
            year: '二月',
            value: 2
        },
        {
            year: '三月',
            value: 2.8
        },
        {
            year: '四月',
            value: 3
        },
        {
            year: '五月',
            value: 4
        },
        {
            year: '六月',
            value: 3.5
        },
        {
            year: '七月',
            value: 5
        },
        {
            year: '八月',
            value: 4.9
        },
        {
            year: '九月',
            value: 6
        },
        {
            year: '十月',
            value: 7
        }
    ];
    const raderData = [
        {
            name: '评估维度1',
            star: 10371
        },
        {
            name: '评估维度2',
            star: 7380
        },
        {
            name: '评估维度3',
            star: 7414
        },
        {
            name: '评估维度4',
            star: 2140
        },
        {
            name: '评估维度5',
            star: 660
        }
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
                nice: true
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
    const backOrder = (e:any) => {
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
        strategy_test()
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

    const demoDaysChange = (value: number) => {
        console.log('测试天数', value);
        setDemoDays(value)
    }

    const handleValue = (index: number, event:any) => {
        let text = event.target.innerHTML
        setListName(text)
    }
    console.log(detailsData);
    function Elementlist (){
        return(
            <>
                {
                     detailsData.forEach((item) => {
                        item.map((j,i)=>{
                         return(
                             <div key={i}>{j.desc}</div>
                         )
                        })
                     })
                }
            </>
        )
    }
   
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
                    <div>
                        <Elementlist></Elementlist>
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