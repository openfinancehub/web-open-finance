import { ProCard } from "@ant-design/pro-components";
import { useRef, useState } from "react";
import { Button, message, Space } from "antd";
import { getStrategyTest, getStrategyResult, getStrtegyList } from "../api/analysis";
import { LineChart, RadarChart } from 'echarts/charts';
import { LegendComponent, TitleComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
  TitleComponent,
  LegendComponent,
  CanvasRenderer,
  RadarChart,
  LineChart
]);
const Strategy = () => {
  const radarRef = useRef(null);
  const lineRef = useRef(null);
  const [stopDemo,setStopDemo] = useState(0)
  const GetStrategy = (uid,demoTime) => {
    const data = {
      uid:uid,
      key:"8140ad230f687daede75a08855e8ae5ff40c3ba8"
    }
    getStrategyResult(data).then((res)=>{
      const list = demoTime + 20
      if(demoTime>80){
        setStopDemo(1)
        return demoTime
      }
      if(res.code == 801){
        message.error(res.message)
      }
      if(res.code == 500){
        message.error(res.message);
      }
      if(res.code == 300 && demoTime <= 140){
        setTimeout(() => {
          GetStrategy(uid, list);
        }, 2000);
      }else{
        
      }
    })
  }

  // 初始化折现图
  const initLineEchart = () => {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        formatter: function (params) {
          let v1 =
            '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:blue;"></span>';
          let v2 =
            '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:red;"></span>';
          let v3 =
            '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:green;"></span>';
          if (params[1] && params[1].data !== '') {
            return v2 + '买入 :' + params[0].data;
          } else if (params[1] && params[2].data !== '') {
            return v3 + '卖出 :' + params[0].data;
          } else {
            return v1 + '股票 :' + params[0].data;
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
        max: lineMax
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
            width: 3
          },
          itemStyle: {
            borderWidth: 3,
            color: 'blue'
          }
        }
      ]
    };
    const chart = echarts.init(lineRef.current);
    chart.setOption(option);
  };
  // 初始化饼状图
  const initBasicEchart = () => {
    const option = {
      title: {
        text: 'Basic Radar Chart'
      },
      radar: {
        indicator: raderData
      },
      tooltip: {
        trigger: 'item'
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
    };
    const chart = echarts.init(radarRef.current);
    chart.setOption(option);
  };
  return (
    <div>
      <ProCard direction="column" >
        <ProCard ghost wrap style={{ width: '100%' }}>
          <ProCard
            bordered
            style={{ textAlign: 'center', overflowY: 'scroll' }}
            colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 10 }}>
            <Space wrap align="center">
              因子：
              <Select
                value={selectedButton}
                style={{
                  width: 200,
                  textAlign: 'center'
                }}
                onChange={handleChangeValue}
                options={listData}
              />
            </Space>
            <div>
              {detailsData[selectedButton] &&
                detailsData[selectedButton].map((item, index) => {
                  return (
                    <div
                      style={{ marginTop: '20px' }}
                      key={index}
                      data-name={item.name}>
                      {item.desc} :{' '}
                      <InputNumber
                        min={1}
                        defaultValue={item.value}
                        onChange={value => {
                          nuberOnChange(item.name, value);
                        }}
                      />{' '}
                    </div>
                  );
                })}
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
              &nbsp;
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
              <Select
                placeholder="最小时间单位（分钟）"
                onChange={minTimeChange}
                options={[
                  {
                    value: 1,
                    label: '最小时间单位1分钟'
                  },
                  {
                    value: 5,
                    label: '最小时间单位5分钟'
                  },
                  {
                    value: 15,
                    label: '最小时间单位15分钟'
                  },
                  {
                    value: 30,
                    label: '最小时间单位30分钟'
                  },
                  {
                    value: 60,
                    label: '最小时间单位60分钟'
                  }
                ]}
              />
              <DatePicker onChange={dateTime} />
              是否滚动测评:
              <Radio.Group onChange={backOrder} value={backData}>
                <Radio value={0}>否</Radio>
                <Radio value={1}>是</Radio>
              </Radio.Group>
            </div>

            {isdemoBtn && (
              <Button
                size={size}
                style={{
                  background: 'rgb(1,108,102)',
                  color: '#fff',
                  marginBottom: 20
                }}
                onClick={demoBtn}>
                {stopDemo ? '重新测试' : '测试'}
              </Button>
            )}
            {!isdemoBtn && (
              <Button
                size={size}
                style={{
                  background: 'rgb(1,108,102)',
                  color: '#fff',
                  marginBottom: 20
                }}>
                正在测试...
              </Button>
            )}
          </ProCard>
        </ProCard>
        <ProCard style={{ height: 260 }}>
          <ProCard
            style={{ height: '100%' }}
            colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 11 }}
            bordered>
            <div className="demoResult">
              <div>测试结果：</div>
              <br></br>
              {demoEndData.map((item, index) => {
                return (
                  <div style={{ fontWeight: 'bole' }} key={index}>
                    <p>
                      {' '}
                      <span>{index + 1}、</span>{' '}
                      {item.name ? `${item.name}(${item.value}):` : ''}
                    </p>
                    <p>{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </ProCard>
          <ProCard
            style={{ height: '100%' }}
            colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 12 }}
            bordered>
            <div ref={radarRef} style={{ width: '100%', height: '100%' }}></div>
          </ProCard>
        </ProCard>
        <ProCard
          style={{ height: 300, width: '100%' }}
          colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 12 }}>
          <div ref={lineRef} style={{ height: '100%' }}></div>
        </ProCard>
      </ProCard>
    </div>
  )
}

export default Strategy