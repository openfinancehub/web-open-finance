import { Column } from '@ant-design/plots';
import { PageContainer } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';

const HomePage: React.FC = () => {
  const [data, setData] = useState([]);

  const asyncFetch = () => {
    fetch(
      'https://gw.alipayobjects.com/os/antfincdn/mor%26R5yBI9/stack-group-column.json'
    )
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => {
        console.log('fetch data failed', error);
      });
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  const config = {
    data,
    xField: 'product_type',
    yField: 'order_amt',
    isGroup: true,
    isStack: true,
    seriesField: 'product_sub_type',
    groupField: 'sex',
    tooltip: {
      formatter: datum => ({
        name: `${datum.product_sub_type} ${datum.sex === '男' ? '👦' : '👧'}`,
        value: datum.order_amt
      })
    }
  };

  return (
    <PageContainer ghost>
      <Column {...config} />
    </PageContainer>
  );
};

export default HomePage;
