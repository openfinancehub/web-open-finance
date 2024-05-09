import { useEffect, useState,useRef } from 'react';
import { request } from 'umi';
import { ProCard } from '@ant-design/pro-components';
import { Select, Button, Input, Space,message  } from 'antd';
import { useModel } from '@umijs/max';
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
const Screen = () => {
    const {
        initialState: { currentUser }
      } = useModel('@@initialState');
    const [factor, setFactor] = useState([])
    const [mode, setMode] = useState([])
    const [facotrLi, setFactorLi] = useState('')
    let   chart: any
    const [modeLi, setModeLi] = useState('')
    const [inputValue,setInputValue] = useState('')
    const [echartsData,setEchartsData] = useState([])
    const chartRef = useRef(null);
    const commonHeader = {
        user: currentUser.username,
        req_id: currentUser.id,
        req_src: currentUser.avatarUrl,
        token: currentUser.token
    }
    const getFactor = () => {
        request('/quent-api/factor', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            setFactorLi(res.result.factor[0])
            setModeLi(res.result.mode[0])
            let factorData = res.result.factor.map((item: string) => {
                return {
                    value: item,
                    lable: item
                }
            });
            let modeData = res.result.mode.map((item: string) => {
                return {
                    value: item,
                    lable: item,
                }
            })
            setFactor(factorData)
            setMode(modeData)
        })
    }
    
    const postFetch = () => {
        const data = {
            factor: facotrLi,
            // mode: modeLi,
            mode: "gt",
            val: 0.01,
            // val: inputValue,
            extra:''
        }
        request('quent-api/fetch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // data:data,
            data: {
                data:[data],
                // header:commonHeader
            },
           
        }).then((res)=>{
            message.info(res.msg)
            const resData = res.result.DividentMean
            const xData =  Object.keys(resData.result)
            const yData = Object.values(resData.result)
            setEchartsData([xData,yData])
        })
    }
    useEffect(() => {
        getFactor()
    }, [])
    useEffect(()=>{
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  data: echartsData[0],
                  axisTick: {
                    alignWithLabel: true
                  }
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: '2024-4-27',
                  type: 'bar',
                  barWidth: '60%',
                  data: echartsData[1]
                }
              ]
        }
        chart = echarts.init(chartRef.current);
        chart.setOption(option);
        return () => {
            chart.dispose();
        };
    },[echartsData])
    function handleFacChange(value: any) {
        console.log(value);
        setFactorLi(value)
    }
    function handleMoChange(value: any) {
        console.log(value);
        setModeLi(value)
    }
    function handleQuery() {
        postFetch()

    }
    const handleInput = (e:any)=>{
        setInputValue(e.target.value)
    }
    return (
        <div>
            <Space>
                <Input placeholder="请输入要查询的股票"
                    onChange={handleInput}
                />
                <Select
                    defaultValue="请选择条件"
                    style={{ width: 240 }}
                    onChange={handleFacChange}
                    options={factor}
                />
                <Select
                    defaultValue="请选择条件"
                    style={{ width: 240 }}
                    onChange={handleMoChange}
                    options={mode}
                />
                <Button type="primary" onClick={handleQuery}>查询</Button>
            </Space>
            <ProCard style={{ height: '40vh', marginTop:'30px' }} bordered>
                <div ref={chartRef} style={{ width: "100%", height: "100%", overflow: 'hidden' }}></div>
            </ProCard>
        </div>
    )
}
export default Screen