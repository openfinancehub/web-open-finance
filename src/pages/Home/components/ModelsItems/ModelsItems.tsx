import { PageContainer, ProCard } from '@ant-design/pro-components';
import { SetStateAction, useState } from 'react';
import { Button, Dropdown } from 'antd';
import ModelsCode from './ModelsCode';
import ModelsFiles from './ModelsFiles';
import ModelsFigure from './ModelsFigure';
import Test from './Test';


function ModelsItems({ modelValue, factorValue, setModelValue,
  setFactorValue, showModal, setShowModal, company, setCompany }) {
  const [currentTab, setCurrentTab] = useState('Data');

  // console.log(modelValue, "modelValue")
  // console.log(factorValue, "factorValue")
  const onTabChange = (key: SetStateAction<string>) => {
    console.log(key)
    setCurrentTab(key);
  };

  const showModalChange = () => {
    // console.log(company, '这是ModelsItem界面')
    setShowModal(!showModal);
  };

  return (
    <div style={{ background: '#F5F7FA', paddingBlock: 30 }}>
      <PageContainer
        header={{
          title: 'Tools',
          ghost: true,
          // breadcrumb: {
          //   routes: [
          //     { path: '', breadcrumbName: 'Open Finance' },
          //     { path: '', breadcrumbName: 'Tools' },
          //   ],
          // },
          extra: [
            // <Button key="1">次要按钮</Button>,
            // <Button key="2">次要按钮</Button>,
            // <Button key="3" type="primary">
            //   主要按钮
            // </Button>,
            <Button key='退出' onClick={() => showModalChange()} style={{ float: 'right', backgroundColor: 'red', color: 'white' }} >X</Button>
          ],
        }}
        tabList={[
          { tab: 'Data', key: 'Data', closable: false, },
          { tab: 'Model Code', key: 'Code', closable: false, },
          { tab: 'Files and versions', key: 'Files', closable: false, },
          // { tab: 'Test', key: 'Test', closable: false, },
        ]}
        onTabChange={onTabChange}
      >
        {currentTab === 'Data' && <ModelsFigure
          factorValue={factorValue}
          modelValue={modelValue}
          company={company}
          setCompany={setCompany} />}
        {currentTab === 'Code'
          && <ModelsCode
            modelValue={modelValue}
            factorValue={factorValue}
            setModelValue={setModelValue}
            setFactorValue={setFactorValue}
          />}
        {currentTab === 'Files' && <ModelsFiles />}
        {/* {currentTab === 'Test' && <Test />} */}
      </PageContainer>
    </div >
  );
}

export default ModelsItems;