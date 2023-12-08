import { ProCard } from '@ant-design/pro-components';
import {Tabs,TabsProps, Button } from 'antd';
import { useState } from 'react';
import './style.css';
import Left from '../Public/left'
import Custom from './component/Custom'
import PublicStrategy from './component/PublicStrategy';
import OwnStrategy from './component/OwnStrategy';
const Strategy = () => {
  const size = 'large';
  const [buttonId,setButtonId] = useState('000001')
  const [seleType, setSeleType] = useState('看涨买入');
  const handleTypeRise = () => {
    setSeleType('看涨买入');
  };
  const handleTypeFall = () => {
    setSeleType('看跌止损');
  };
  const handleAll = () => {
    setSeleType('综合策略');
  }
  /**
 * 接收导航的数据,切换股票
 */
  const handleDataFromChild = (butttonId: string, buttonNum: string) => {
    console.log(buttonNum, butttonId);
    setButtonId(butttonId)
    
  }
  
  const templateItem: TabsProps['items'] = [
      // {
      //   key: '1',
      //   label: `自定义`,
      //   children: <Custom></Custom>,
      // },
      // {
      //   key: '2',
      //   label: `公共策略`,
      //   children: <PublicStrategy ButtonId={buttonId}></PublicStrategy>,
      // },
      // {
      //   key: '3',
      //   label: `自有策略`,
      //   children: <OwnStrategy></OwnStrategy>,
      // },
  ];

  // 二级切换
  const templateChange = ()=>{

  }

  return (
    <ProCard gutter={16} ghost wrap>
      <ProCard
        colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 3 }}
        style={{ height: '100%',padding:0 }}>
        <Left onDataChange={handleDataFromChild}></Left>
      </ProCard>
      <ProCard
        gutter={[0, 16]}
        colSpan={{ xs: 24, sm: 24, md: 20, lg: 20, xl: 21 }}
        direction="column">
        {/* <div className="seleType">
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
        </div> */}

        {/* <Tabs tabPosition={"left"} items={templateItem} onChange={templateChange}></Tabs> */}
        <PublicStrategy ButtonId={buttonId}></PublicStrategy>

      </ProCard>
    </ProCard>
  );

};

export default Strategy;
