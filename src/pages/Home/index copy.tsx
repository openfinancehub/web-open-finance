import { ProCard } from '@ant-design/pro-components';
import CategoryItem from './components/FinanceModels/CategoryItem'
import Models from './components/FinanceModels/Models'
import CategoryFigure from './components/FinanceModels/CategoryFigure'
import React, { useState } from 'react';
import SearchCompany from './components/FinanceModels/SearchCompany'
import MsgCard from './components/Info'

const Home: React.FC = () => {
  const [isActivePage, setActivePage] = useState(false);
  const [filteredModels, setFilteredModels] = useState([]);
  const [financeData, setFinanceData] = useState([]);
  const [company, setCompany] = useState<string>('');
  const [isDeveloper, setIsDeveloper] = useState(true);

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
        <ProCard split="horizontal" title="" colSpan="30%" >
          {/* {isActivePage ? <CategoryFigure onFilterFinance={handleFilterFinance} /> :
            <div>
              <ProCard title="" headerBordered>
                <CategoryItem onFilterFinance={handleFilterFinance} />
              </ProCard>
            </div>} */}
        </ProCard>

        <ProCard title="" split="horizontal" headerBordered>
          <ProCard title="" headerBordered>
            <SearchCompany />
          </ProCard>
          <ProCard title="" headerBordered style={{ height: '100vh', overflowY: 'auto' }}>
            <MsgCard ></MsgCard>
          </ProCard>
        </ProCard>
      </ProCard>
    </>
  );
};

export default Home;
