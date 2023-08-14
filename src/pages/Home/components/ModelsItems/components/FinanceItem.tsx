import type { ProCardTabsProps } from '@ant-design/pro-components';
import { ProCard } from '@ant-design/pro-components';
import { useState } from 'react';
import FirstLeftItem from './FirstLeftItem';


function FinanceItem() {
  const [tab, setTab] = useState('tab1');
  const [tabPosition, setTabPosition] =
    useState<ProCardTabsProps['tabPosition']>('top');

  return (
    <div>
      <ProCard
        tabs={{
          tabPosition,
          activeKey: tab,
          onChange: (key) => {
            setTab(key);
          },
        }}
      >
        <ProCard.TabPane key="tab1" tab="Model card">
          <ProCard colSpan='60%' >
            内容一
          </ProCard>
          <ProCard>
            <FirstLeftItem />
          </ProCard>
        </ProCard.TabPane>
        <ProCard.TabPane key="tab2" tab="Files and versions">
          内容二
        </ProCard.TabPane>
        <ProCard.TabPane key="tab3" tab="Community">
          内容三
        </ProCard.TabPane>
      </ProCard>
    </div>
  );
}
export default FinanceItem;