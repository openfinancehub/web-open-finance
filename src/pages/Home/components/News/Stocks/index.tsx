import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import { MarketService } from '../../../service/';

interface StockData {
  // name: string;
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

function generateTargetData(features: Record<string, any>, summary: Object): StockData[] {
  const stockNames = Object.values(features)[0].TIME;

  return Object.entries(stockNames).map(([stockName]) => {
    const stockData: StockData = {
      // name: stockName,
      key: stockName,
    };
    Object.entries(summary).forEach(([sName, num]) => {
      if (sName === stockName) {
        stockData['number'] = num.toFixed(2)
      }
    });

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
    <p>{record.key}的内容</p>
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
      render: (_, record) => <a>{record.key}</a>,
    },
    {
      title: '推荐指数',
      width: 80,
      // fixed: 'left',
      sorter: (a, b) => {
        const numA = a.number as unknown as number;
        const numB = b.number as unknown as number;
        if (numA < 0 && numB >= 0) {
          return -1; // 负数排在前面
        } else if (numA >= 0 && numB < 0) {
          return 1; // 正数排在前面
        } else {
          return numA - numB; // 保持默认的数字排序
        }
      },
      dataIndex: 'number',
      render: (_, record) => <a>{record.number}</a>,
    },
  ];

  const [data, setData] = useState<any[]>([]);
  const [mergedColumns, setMergedColumns] = useState<ProColumns<StockData>[]>(initialColumns);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await MarketService.getStock();
      const { features = [], summary = [] } = response.result || {};

      const newColumns = createNewColumns(features);
      const combinedColumns = [...initialColumns, ...newColumns];
      setMergedColumns(combinedColumns);

      const targetData = generateTargetData(features, summary);
      console.log(targetData)
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
        columnWidth: 17,
        expandedRowRender: (record) => (
          extendedRender(record)
        ),
      }}
      rowKey="key"
    />
  );
};
