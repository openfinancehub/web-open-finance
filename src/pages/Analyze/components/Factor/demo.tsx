import React, { useEffect, useRef, useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { request } from 'umi';
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

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | DataZoomComponentOption
  | MarkLineComponentOption
  | MarkPointComponentOption
  | CandlestickSeriesOption
  | LineSeriesOption
>;

const Demo = () => {
  const chartRef = useRef(null);
  // 因子取值的数据
  const [factorData, setFactorData] = useState([])
  // K线的时间
  const [lineTimeData, setLineTimeData] = useState([])
  // 某只股票近N天的K线数据的接口
  const getstock_kline = (stock_id: string) => {
    const data = {
      stock_id: stock_id,
      days: 3,
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
    }).catch(err => { console.log(err) })
  };
  // 某只股票近N天的因子取值的接口
  const historyfactor = (stock_id: string) => {
    const data = {
      stock_id: stock_id,
      days: "3",
      key: "8140ad230f687daede75a08855e8ae5ff40c3ba8"
    }
    request('http://139.159.205.40:8808/quant/historyfactor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data)
    }).then((res) => {
      setLineTimeData(res.data[60].time)
    }).catch(err => {
      console.log(err)
    })
  };

// echarts 图表库数据
const echartsData = ()=>{
  request('/examples/data/asset/data/stock-DJI.json',{
    method:'GET',
  }).then((res)=>{
    console.log('数据',res);
  }).catch((err)=>{
    console.log(err);
  })
}


  useEffect(() => {
    echartsData()
  },[])


  return (
    <ProCard gutter={16} ghost wrap>
      <div ref={chartRef} style={{ width: "100%", height: "700px" }}></div>
    </ProCard>
  )

}


export default Demo;
