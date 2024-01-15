import { ProCard } from '@ant-design/pro-components';
import DModels from './DModels'
import React, { useState } from 'react';
import HeaderTitle from '@/pages/Home/components/FinanceModels/HeaderTitle'
import DCompanyList from './DCompanyList'
import { useLocation } from 'react-router-dom';
const Home: React.FC = () => {
  const [isActivePage, setActivePage] = useState(false);
  const [filteredModels, setFilteredModels] = useState([]);
  const [financeData, setFinanceData] = useState([]);
  const [company, setCompany] = useState<string>('');
  const [isDeveloper, setIsDeveloper] = useState(false);

  const companyChange = (company: string) => {
    setCompany(company);
  };

  const handleFilterFinance = (newData: React.SetStateAction<never[]>) => {
    setFinanceData(newData);
    setFilteredModels(newData);
  };
  const handleModelsChange = (filteredModels: any) => {
    setFinanceData(filteredModels);
  };
  return (
    <>
      <ProCard split="vertical">
        {/* 卡片左侧 */}
        <ProCard split="horizontal" title="" colSpan="40%" >
          <ProCard title="" headerBordered>
            <DCompanyList companyChange={companyChange} /> :
          </ProCard>
        </ProCard>
        {/* 卡片右侧 */}
        <ProCard title="" split="horizontal" headerBordered>
          <ProCard title="" headerBordered>
            <HeaderTitle
              onModelsChange={handleModelsChange}
              originalData={filteredModels}
              isActivePage={isActivePage}
              setActivePage={setActivePage}
              isDeveloper={isDeveloper}
              setIsDeveloper={setIsDeveloper}
            />
          </ProCard>
          <ProCard title="" headerBordered>
            <div id='container' key={'container'}>
              <DModels
                isDeveloper={isDeveloper}
                data={financeData}
                company={company}
                setCompany={companyChange} />
            </div>
          </ProCard>
        </ProCard>
      </ProCard>
    </>
  );
};

export default Home;
