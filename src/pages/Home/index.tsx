import { ProCard } from '@ant-design/pro-components';
import FactorItem from './components/FinanceModels/CategoryItem'
import Models from './components/FinanceModels/Models'
import CategoryFigure from './components/FinanceModels/CategoryFigure'
import React, { useState } from 'react';
import HeaderTitle from './components/FinanceModels/HeaderTitle'
const Home: React.FC = () => {
  const [isActivePage, setActivePage] = useState(false);
  const [filteredModels, setFilteredModels] = useState([]);
  const [financeData, setFinanceData] = useState([]);

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
        <ProCard title="" colSpan="40%" >
          {/* <FactorItem onFilterFinance={handleFilterFinance} /> */}
          {isActivePage ? <CategoryFigure onFilterFinance={handleFilterFinance} /> : <FactorItem onFilterFinance={handleFilterFinance} />}
        </ProCard>
        <ProCard title="" split="horizontal" headerBordered>
          <ProCard title="" headerBordered>
            <HeaderTitle
              models={financeData}
              onModelsChange={handleModelsChange}
              originalData={filteredModels}
              isActivePage={isActivePage}
              setActivePage={setActivePage}
            />
          </ProCard>
          <ProCard title="" headerBordered>
            <div id='container'>
              {/* {isActivePage ? <CategoryFigure onFilterFinance={handleFilterFinance} /> : <Models data={financeData} />} */}
              <Models data={financeData} />
            </div>
          </ProCard>
        </ProCard>
      </ProCard>
    </>
  );
};

export default Home;
