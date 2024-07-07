import { ProCard } from '@ant-design/pro-components';
import CategoryItem from '../components/FinanceModels/CategoryItem'
import Models from '../components/FinanceModels/Models'
import CategoryFigure from '../components/FinanceModels/CategoryFigure'
import React, { useState } from 'react';
import HeaderTitle from '../components/FinanceModels/HeaderTitle'
import DCompanyList from '../components/Developer/DCompanyList'
import { useLocation } from 'react-router-dom';
const Home: React.FC = () => {
  const [isActivePage, setActivePage] = useState(false);
  const [filteredModels, setFilteredModels] = useState([]);
  const [financeData, setFinanceData] = useState([]);
  const [company, setCompany] = useState<string>('');
  const [isDeveloper, setIsDeveloper] = useState(true);

  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const [isDeveloper, setIsDeveloper] = useState(searchParams.get('isDeveloper') || '');

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
        <ProCard split="horizontal" title="" colSpan="40%" >

          {isActivePage ? <CategoryFigure onFilterFinance={handleFilterFinance} /> :
            <div>
              <ProCard title="" headerBordered>
                <CategoryItem onFilterFinance={handleFilterFinance} />
              </ProCard>
            </div>
          }
        </ProCard>

        <ProCard title="" split="horizontal" headerBordered>
          <ProCard title="" headerBordered>
            <HeaderTitle
              // models={financeData}
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
              <Models
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
