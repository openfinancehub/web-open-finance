import type { ProCardTabsProps } from '@ant-design/pro-components';
import { ProCard } from '@ant-design/pro-components';
import { useState } from 'react';
import FirstLeftItem from './components/modelsDetail/FirstLeftItem';
import ModelsCode from './components/modelsDetail/ModelsCode';
import ModelsFiles from './components/modelsDetail/ModelsFiles';
import ModelsFigure from './components/modelsDetail/ModelsFigure';
import Test from './components/modelsDetail/Test';

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
          {/* 内容一 */}
          <ProCard >
            <ModelsCode />
          </ProCard>
          {/* <ProCard>
            <FirstLeftItem />
          </ProCard> */}
        </ProCard.TabPane>
        <ProCard.TabPane key="tab2" tab="Files and versions">
          {/* 内容二 */}
          <ModelsFiles />
        </ProCard.TabPane>
        <ProCard.TabPane key="tab3" tab="Community">
          {/* 内容三 */}
          <ModelsFigure />
        </ProCard.TabPane>
        <ProCard.TabPane key="tab4" tab="Test">
          <Test />
        </ProCard.TabPane>
      </ProCard>
    </div>
  );
}
export default FinanceItem;