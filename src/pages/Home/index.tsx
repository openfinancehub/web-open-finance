import { ProCard } from '@ant-design/pro-components';
import CategoryItem from './components/FinanceModels/CategoryItem'
import TestM from './components/FinanceModels/Test'
import CategoryFigure from './components/FinanceModels/CategoryFigure'
import React, { useState } from 'react';
import HeaderTitle from './components/FinanceModels/HeaderTitle'
import CompanyList from './components/ModelsItems/CompanyList'
const Home: React.FC = () => {
  const [isActivePage, setActivePage] = useState(false);
  const [filteredModels, setFilteredModels] = useState([]);
  const [financeData, setFinanceData] = useState([]);
  const [company, setCompany] = useState([]);
  const [isDeveloper, setIsDeveloper] = useState(true);

  const companyChange = (company: React.SetStateAction<never[]>) => {
    // console.log(company, 'shoudaode')
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
        <ProCard split="horizontal" title="" colSpan="40%" >
          {isActivePage ? <CategoryFigure onFilterFinance={handleFilterFinance} /> :
            <div>
              <ProCard title="" headerBordered>
                <CompanyList companyChange={companyChange} />
                {/* <Test onFilterFinance={handleFilterFinance} /> */}
              </ProCard>
            </div>
          }
        </ProCard>

        <ProCard title="" split="horizontal" headerBordered>
          <ProCard title="" headerBordered>
            <HeaderTitle
              models={financeData}
              onModelsChange={handleModelsChange}
              originalData={filteredModels}
              isActivePage={isActivePage}
              setActivePage={setActivePage}
              isDeveloper={isDeveloper}
              setIsDeveloper={setIsDeveloper}
            />
          </ProCard>
          <ProCard title="" headerBordered>
            <div id='container'>
              {/* <Models data={financeData} company={company} setCompany={companyChange} /> */}
              <TestM
                isDeveloper={isDeveloper}
                onFilterFinance={handleFilterFinance}
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
