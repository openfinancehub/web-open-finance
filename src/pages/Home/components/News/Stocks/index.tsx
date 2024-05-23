import { getStock } from '@/pages/Home/service';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';


interface StockData {
  name: string;
  key: string;
  [key: string]: string;
}

function createNewColumns(features: Record<string, any>) {
  return Object.entries(features).map(([titleName, featureObj], index) => ({
    title: titleName,
    dataIndex: titleName,
    key: titleName,
    width: 80,
  }));
}

function generateTargetData(features: Record<string, any>): StockData[] {
  const stockNames = Object.values(features)[0].TIME;

  return Object.entries(stockNames).map(([stockName]) => {
    const stockData: StockData = {
      name: stockName,
      key: stockName,
    };

    Object.entries(features).forEach(([featureName, featureObj]) => {
      const value = featureObj.result[stockName];
      const roundedNumber = parseFloat(value.toFixed(3));
      stockData[featureName] = roundedNumber;
    });

    return stockData;
  });
}

const EnhancedRender = ({ record }: { record: StockData }) => (
  <div>
    <p>{record.name}的内容</p>
  </div>
);
const extendedRender = (record: StockData) => <EnhancedRender record={record} />;

export default () => {
  const initialColumns: ProColumns<StockData>[] = [
    {
      title: '股票名称',
      width: 60,
      fixed: 'left',
      dataIndex: 'name',
      render: (_, record) => <a>{record.name}</a>,
    },
  ];

  const [data, setData] = useState<any[]>([]);
  const [mergedColumns, setMergedColumns] = useState<ProColumns<StockData>[]>(initialColumns);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getStock();
      const { features = [], summary = [] } = response.result || {};

      const newColumns = createNewColumns(features);
      const combinedColumns = [...initialColumns, ...newColumns];
      setMergedColumns(combinedColumns);

      const targetData = generateTargetData(features);
      setData(targetData);
    } catch (error) {
      console.error('Fetch data error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProTable
      loading={isLoading}
      columns={mergedColumns}
      dataSource={data}
      scroll={{ x: 2000 }}
      options={false}
      search={false}
      pagination={{
        pageSize: 10,
      }}
      expandable={{
        columnWidth: 15,
        expandedRowRender: (record) => (
          extendedRender(record)
        ),
      }}
      rowKey="key"
    />
  );
};
