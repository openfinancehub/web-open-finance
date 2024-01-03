import { PageContainer, ProCard } from '@ant-design/pro-components';
import { SetStateAction, useState, useEffect } from 'react';
import { Button, Dropdown } from 'antd';
import { useLocation } from 'react-router-dom';
import { history } from 'umi';
import ModelsCode from '@/pages/Home/components/Public/ModelsCode';
import ModelsFiles from '@/pages/Home/components/Public/ModelsFiles';
import ModelsFigure from '@/pages/Home/components/Public/ModelsFigure';

interface Tab {
  tab: string;
  key: string;
  closable: boolean;
}
// 普通用户模式
const ModelsItems: React.FC<{
  modelValue: string
  factorValue: string
  showModal: boolean
  company: string;
  setModelValue: React.Dispatch<React.SetStateAction<string>>;
  setFactorValue: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCompany: (company: string) => void;
  isDeveloper: boolean
}> = ({ showModal, setShowModal, company, setCompany, isDeveloper }) => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [modelValue, setModelValue] = useState(searchParams.get('modelValue') || '');
  const [factorValue, setFactorValue] = useState(searchParams.get('factorValue') || '');
  const [currentTab, setCurrentTab] = useState('Code');


  const onTabChange = (key: SetStateAction<string>) => {
    setCurrentTab(key);
  };

  const params = `isDeveloper=${encodeURIComponent('false')}`;

  const showModalChange = () => {
    console.log("是否开发者模式", isDeveloper)
    history.push('/home' + `?${params}`);
    // history.back();
  };

  const [tabList, setTabList] = useState<Tab[]>([]);

  useEffect(() => {
    console.log(currentTab)
    if (isDeveloper) {
      setTabList([
        { tab: 'Data', key: 'Data', closable: false },
        { tab: 'Files and versions', key: 'Files', closable: false },
        { tab: 'Model Code', key: 'Code', closable: false },
      ])
    } else {
      setTabList([
        { tab: 'Model Code', key: 'Code', closable: false },
        { tab: 'Files and versions', key: 'Files', closable: false },
        { tab: 'Data', key: 'Data', closable: false },
      ])
    }
  }, [isDeveloper]);

  return (
    <div style={{ background: '#F5F7FA', paddingBlock: 30 }}>
      <PageContainer
        header={{
          title: 'Tools',
          ghost: true,
          extra: [
            <Button key='返回' onClick={() => showModalChange()} style={{ float: 'right', backgroundColor: 'red', color: 'white' }} >X</Button>
          ],
        }}
        tabList={tabList}
        onTabChange={onTabChange}
      >
        {currentTab === 'Code'
          && <ModelsCode
            modelValue={modelValue}
            factorValue={factorValue}
            setModelValue={setModelValue}
            setFactorValue={setFactorValue}
          />}
        {currentTab === 'Data' && <ModelsFigure
          factorValue={factorValue}
          modelValue={modelValue}
          company={company}
          setCompany={setCompany} />}
        {currentTab === 'Files' && <ModelsFiles />}
        {/* {currentTab === 'Test' && <Test />} */}
      </PageContainer>
    </div >
  );
}

export default ModelsItems;