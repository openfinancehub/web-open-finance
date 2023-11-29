import { PageContainer, ProCard } from '@ant-design/pro-components';
import { SetStateAction, useState } from 'react';
import ModelsCode from './ModelsCode';
import ModelsFiles from './ModelsFiles';
import ModelsFigure from './ModelsFigure';
import Test from './Test';

export default () => {
  const [currentTab, setCurrentTab] = useState('Code');

  const onTabChange = (key: SetStateAction<string>) => {
    setCurrentTab(key);
  };

  return (
    <div style={{ background: '#F5F7FA', paddingBlock: 30 }}>
      <PageContainer
        header={{
          title: 'Tools',
          ghost: true,
          breadcrumb: {
            routes: [
              { path: '', breadcrumbName: 'Open Finance' },
              { path: '', breadcrumbName: 'Tools' },
            ],
          },
        }}
        tabList={[
          { tab: 'Model Code', key: 'Code', closable: false, },
          { tab: 'Files and versions', key: 'Files', closable: false, },
          { tab: 'Data', key: 'Data', closable: false, },
          // { tab: 'Test', key: 'Test', closable: false, },
        ]}
        onTabChange={onTabChange}
      >
        {currentTab === 'Code' && <ModelsCode />}
        {currentTab === 'Files' && <ModelsFiles />}
        {currentTab === 'Data' && <ModelsFigure />}
        {currentTab === 'Test' && <Test />}
      </PageContainer>
    </div>
  );
};