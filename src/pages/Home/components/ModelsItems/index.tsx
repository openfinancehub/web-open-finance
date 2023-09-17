import { PageContainer, ProCard } from '@ant-design/pro-components';
import { SetStateAction, useState } from 'react';
import ModelsCode from './components/modelsDetail/ModelsCode';
import ModelsFiles from './components/modelsDetail/ModelsFiles';
import ModelsFigure from './components/modelsDetail/ModelsFigure';
import Test from './components/modelsDetail/Test';

export default () => {
  const [currentTab, setCurrentTab] = useState('Code');

  const onTabChange = (key: SetStateAction<string>) => {
    setCurrentTab(key);
  };

  return (
    <div style={{ background: '#F5F7FA', paddingBlock: 30 }}>
      <PageContainer
        header={{
          title: 'Model',
          ghost: true,
          breadcrumb: {
            routes: [
              { path: '', breadcrumbName: 'Open Finance' },
              { path: '', breadcrumbName: 'Model' },
            ],
          },
        }}
        tabList={[
          { tab: 'Model Code', key: 'Code', closable: false, },
          { tab: 'Files and versions', key: 'Files', closable: false, },
          { tab: 'Tools', key: 'Tools', closable: false, },
          { tab: 'Test', key: 'Test', closable: false, },
        ]}
        onTabChange={onTabChange}
      >
        {currentTab === 'Code' && <ModelsCode />}
        {currentTab === 'Files' && <ModelsFiles />}
        {currentTab === 'Tools' && <ModelsFigure />}
        {currentTab === 'Test' && <Test />}
      </PageContainer>
    </div>
  );
};