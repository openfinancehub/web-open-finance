import { ProCard } from '@ant-design/pro-components';
import { useState } from 'react';
import './style.less';
import Left from '../Public/left'
import PublicStrategy from './component/PublicStrategy';
const Strategy = () => {
  const [buttonId,setButtonId] = useState('')
  /**
 * 接收导航的数据,切换股票
 */
  const handleDataFromChild = (butttonId: string, buttonNum: string) => {
    console.log(buttonNum, butttonId);
    setButtonId(butttonId)
  }
  const handleOnInval = (buttonNum:string) => {
    setButtonId(buttonNum)
  }

  return (
    <ProCard gutter={16} ghost wrap>
      <ProCard
        colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 3 }}
        style={{ height: '100%',padding:0 }}>
        <Left onDataChange={handleDataFromChild} onInval={handleOnInval}></Left>
      </ProCard>
      <ProCard
        gutter={[0, 16]}
        colSpan={{ xs: 24, sm: 24, md: 20, lg: 20, xl: 21 }}
        direction="column">
          <PublicStrategy ButtonId={buttonId}></PublicStrategy>
      </ProCard>
    </ProCard>
  );

};

export default Strategy;
