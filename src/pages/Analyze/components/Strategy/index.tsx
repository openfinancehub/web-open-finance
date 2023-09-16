import { Line, Radar } from '@ant-design/plots';
import { ProCard } from '@ant-design/pro-components';
import type { MenuProps } from 'antd';
import { Button, Dropdown, InputNumber, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { request } from 'umi';
import './style.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MyComponentProps {
  // Define any props required by the component
}


const Strategy: React.FC<MyComponentProps> = () => {
  const size = 'large';
  const [sotckListData, setsotckList] = useState([]);
  const [selectedButton, setSelectedButton] = useState('平安银行');
  const [seleType, setSeleType] = useState('看涨买入');
  const handleButtonChange = (buttonId: React.SetStateAction<string>) => {
    setSelectedButton(buttonId);
  };
  // 选择看涨还是看跌
  const handleTypeRise = () => {
    setSeleType('看涨买入');
  };
  const handleTypeFall = () => {
    setSeleType('看跌止损');
  };
  // 获取当前支持的股票信息的接口
  const sotckList = () => {
    const data = {
      key: '8140ad230f687daede75a08855e8ae5ff40c3ba8'
    };
    request('http://139.159.205.40:8808/quant/sotcklist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    })
      .then(res => {
        setsotckList(
          res.data.map(item => {
            return item.split(',');
          })
        );
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    sotckList();
  }, []);
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com">
          1st menu item
        </a>
      )
    },
    {
      key: '2',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com">
          2nd menu item
        </a>
      )
    },
    {
      key: '3',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      )
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
        nice: true,
        formatter: v => Number(v).toFixed(2)
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
  const [windowdata,setWindowdata] = useState(1)
  const [backData,setbackData] = useState(1)
  const [intervalData,setIntervalData] = useState(1)
  const [shopData,setShopData] = useState(1)
  const windowChange = (value:number)=>{
    console.log('测试窗口',value);
    setWindowdata(value)
  }
  const backOrder = (value:number)=>{
    console.log('回滚次数',value);
    setbackData(value)
  }
  const intervalTime = (value:number)=>{
    console.log('间隔时长',value)
    setIntervalData(value)
  }
  const shopOrder = (value:number)=>{
    console.log('买入次数',value);
    setShopData(value)
  }

  /**
   * 点击测试触发的事件
   */
  const demoBtn = ()=>{
    console.log(windowdata,backData,intervalData,shopData);
  }

  return (
    <ProCard gutter={16} ghost wrap>
      <ProCard
        colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 3 }}
        style={{ height: '100%' }}>
        <div style={{ textAlign: 'center', height: '80vh', overflow: 'auto' }}>
          <Space direction="vertical">
            {sotckListData.map((item, index) => {
              return (
                <Button
                  key={index}
                  size={size}
                  type={selectedButton === item[0] ? 'primary' : 'default'}
                  onClick={() => handleButtonChange(item[0])}>
                  {item[0]}
                </Button>
              );
            })}
          </Space>
        </div>
      </ProCard>
      <ProCard
        gutter={[0, 16]}
        colSpan={{ xs: 24, sm: 24, md: 20, lg: 20, xl: 21 }}
        direction="column">
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
        <div className="seleType">
          <div>
            <Button
              type={seleType === '看涨买入' ? 'primary' : 'default'}
              size={size}
              onClick={() => {
                handleTypeRise();
              }}>
              看涨买入
            </Button>
          </div>
          <div>
            <Button
              size={size}
              type={seleType === '看跌止损' ? 'primary' : 'default'}
              onClick={() => {
                handleTypeFall();
              }}>
              看跌止损
            </Button>
          </div>
        </div>
        <ProCard gutter={16} ghost wrap>
          <ProCard
            bordered
            style={{ textAlign: 'center' }}
            colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 10 }}>
            <Space>
              <Button type="primary" size={size}>
                因子
              </Button>
              <Dropdown menu={{ items }} placement="bottom" arrow>
                <Button size={size}>取值</Button>
              </Dropdown>
              <Dropdown menu={{ items }} placement="bottom" arrow>
                <Button size={size}>条件</Button>
              </Dropdown>
              <Button type="primary" size={size}>
                条件值
              </Button>
            </Space>
          </ProCard>
          <ProCard
            style={{ textAlign: 'center' }}
            bordered
            colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 14 }}>
            <div className="numberSele">
              <InputNumber
                size={size}
                min={0}
                addonBefore="测试窗口"
                addonAfter="分钟"
                defaultValue={1}
                onChange={windowChange}
              />
              <InputNumber
                size={size}
                min={0}
                addonBefore="回滚次数"
                addonAfter="次"
                defaultValue={1}
                onChange={backOrder}
              />
            </div>
            <div className="numberSele">
              <InputNumber
                size={size}
                min={0}
                addonBefore="间隔时长"
                addonAfter="分钟"
                defaultValue={1}
                onChange={intervalTime}
              />
              <InputNumber
                size={size}
                min={0}
                addonBefore="买入次数"
                addonAfter="次"
                defaultValue={1}
                onChange={shopOrder}
              />
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
      </ProCard>
    </ProCard>
  );
};

export default Strategy;
