import { Line, Radar } from '@ant-design/plots';
import { ProCard } from '@ant-design/pro-components';
import {Tabs,TabsProps, MenuProps, Button, Dropdown, InputNumber, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { request } from 'umi';
import './style.css';
import Left from './component/left'
import Custom from './component/Custom'
import PublicStrategy from './component/PublicStrategy';
import OwnStrategy from './component/OwnStrategy';
const Strategy = () => {
  const size = 'large';
  const [seleType, setSeleType] = useState('看涨买入');
  // 选择看涨还是看跌
  const handleTypeRise = () => {
    setSeleType('看涨买入');
  };
  const handleTypeFall = () => {
    setSeleType('看跌止损');
  };
  const handleAll = () => {
    setSeleType('综合策略');
  }

  // 进行测试的接口
  const strategy_test = () => {
    const data = {
      key: "8140ad230f687daede75a08855e8ae5ff40c3ba8",
      setting:[
          { factor_name:'MACD',
            span:60,
            condition:'>0.008',
            mode:'long',
            type:'public'
          }
        ],
      configs:{
        stock_id:'000001',
        user_id:'001',
        // setting_mode:'公共策略 f/p  ,f表示策略基于因子的取值条件，p代表使用公共策略',
        setting_mode:'f',
        analysis_flag:0,
        holding_cost:-1,
        end_date:'2023-08-08',
        cnt_ops:10,
        test_days:5,
        // mode:'long\short\both'
        mode:'long'
      }
    }
    request('http://139.159.205.40:8808/quant/strategy_test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data)
    }).then((res) => {
      
    }).catch(err => { console.log(err) })
  }
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
    }).catch(err => { console.log(err) })
  }
  // 拿到令牌 去拿数据
  const GetStrategy = () =>{
    const data = {
      uid: 1,
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
    strategy_test()
    GetStrategy()
  }, []);


  /**
 * 接收导航的数据,切换股票
 */
  const handleDataFromChild = (butttonId: string, buttonNum: string) => {
    console.log(buttonNum, butttonId);
  }
  
  const templateItem: TabsProps['items'] = [
    {
      key: '1',
      label: `自定义`,
      children: <Custom></Custom>,
    },
    {
      key: '2',
      label: `公共策略`,
      children: <PublicStrategy></PublicStrategy>,
    },
    {
      key: '3',
      label: `自有策略`,
      children: <OwnStrategy></OwnStrategy>,
    },
  ];

  // 二级切换
  const templateChange = ()=>{

  }

  return (
    <ProCard gutter={16} ghost wrap>
      <ProCard
        colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 3 }}
        style={{ height: '100%' }}>
        <Left onDataChange={handleDataFromChild}></Left>
      </ProCard>
      <ProCard
        gutter={[0, 16]}
        colSpan={{ xs: 24, sm: 24, md: 20, lg: 20, xl: 21 }}
        direction="column">
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
          <div>
          <Button
              size={size}
              type={seleType === '综合策略' ? 'primary' : 'default'}
              onClick={() => {
                handleAll();
              }}>
              综合策略
            </Button>
          </div>
        </div>

        <Tabs tabPosition={"left"} items={templateItem} onChange={templateChange}></Tabs>

      </ProCard>
    </ProCard>
  );

};

export default Strategy;
