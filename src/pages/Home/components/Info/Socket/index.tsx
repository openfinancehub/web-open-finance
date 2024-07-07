import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import { MarketService } from '../../../service/';
import { Button } from 'antd';

interface StockData {
  key: string;
  // number?: number; // 明确定义number属性
  [key: string]: string | number; // 允许其他数值类型的属性
}

// 排序逻辑
const numberSorter = (a: StockData, b: StockData) => {
  const numA = (a.number ?? 0) as number;
  const numB = (b.number ?? 0) as number;

  if (numA < 0 && numB >= 0) return -1;
  if (numA >= 0 && numB < 0) return 1;
  return numA - numB;
};

function createNewColumns(features: Record<string, any>) {
  return Object.entries(features).map(([titleName, featureObj]) => ({
    title: titleName,
    dataIndex: titleName,
    key: titleName,
    width: 80,
    sorter: numberSorter,
  }));
}

function generateTargetData(features: Record<string, any>, summary: Record<string, number>): StockData[] {
  const stockNames = Object.values(features)[0].TIME;

  return Object.entries(stockNames).map(([stockName]) => {
    const stockData: StockData = { key: stockName };

    const summaryValue = summary[stockName];
    if (summaryValue !== undefined) {
      stockData['number'] = summaryValue.toFixed(2);
    }

    Object.entries(features).forEach(([featureName, featureObj]) => {
      const value = featureObj.result[stockName];
      stockData[featureName] = value !== undefined && value !== null ? parseFloat(value.toFixed(3)) : 0;
    });

    return stockData;
  });
}

const EnhancedRender = ({ record }: { record: StockData }) => (
  <div>
    <p>{record.key} 的内容</p>
  </div>
);
const extendedRender = (record: StockData) => <EnhancedRender record={record} />;

export default function StockTable() {
  const initialColumns: ProColumns<StockData>[] = [
    {
      title: '股票名称',
      width: 60,
      fixed: 'left',
      dataIndex: 'key',
      render: (text, record) => <a>{record.key}</a>,
    },
    {
      title: '推荐指数',
      width: 80,
      sorter: numberSorter,
      dataIndex: 'number',
      render: (text, record) => <a>{record.number}</a>,
    },
  ];

  const [data, setData] = useState<StockData[]>([]);
  const [originalData, setOriginalData] = useState<StockData[]>([]);
  const [columns, setColumns] = useState<ProColumns<StockData>[]>(initialColumns);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await MarketService.getStock();
      const { features = [], summary = {} } = response.result || {};

      const newColumns = createNewColumns(features);
      setColumns([...initialColumns, ...newColumns]);

      const targetData = generateTargetData(features, summary);
      console.log('Generated Data:', targetData);
      setData(targetData);
      setOriginalData(targetData);
    } catch (error) {
      console.error('Fetch data error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (params: any) => {
    const filteredData = originalData.filter(item => item.key.includes(params));
    setData(filteredData);
  };

  const exportExcel = (params: any) => {
    console.log(params, 'params');
    // 当params同时包含current和pageSize，且没有其他额外属性时，执行setData(originalData)
    if ('current' in params && 'pageSize' in params && Object.keys(params).length === 2) {
      setData(originalData);
    }
    // 当params同时包含current和pageSize，以及有其他任意数据时，执行过滤并setData(filteredData)
    else if ('current' in params && 'pageSize' in params) {
      const filteredData = originalData.filter(item => item.key.includes(params.key));
      setData(filteredData);
    }
    // 如果params不包含current和pageSize，则进行过滤操作
    else {
      const filteredData = originalData.filter(item => item.key.includes(params));
      setData(filteredData);
    }
    // return filteredData
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProTable
      loading={isLoading}
      columns={columns}
      dataSource={data}
      // params={params}
      request={(params) => {
        return exportExcel(params)
      }}
      scroll={{ x: 2000 }}
      // options={{
      //   search: {
      //     title: '股票名称',
      //     placeholder: '请输入股票名称',
      //     onSearch: handleSearch,
      //   },
      // }}
      search={{
        labelWidth: 100,
        span: 12,
        optionRender: ({ searchText, resetText }, { form }, dom) => [
          <Button
            key="searchText"
            type="primary"
            onClick={() => {
              form?.submit();
            }}
          >
            {searchText}
          </Button>,
          <Button
            key="resetText"
            onClick={() => {
              form?.resetFields();
            }}
          >
            {resetText}
          </Button>
        ]
      }}
      pagination={{
        pageSize: 10,
      }
      }
      expandable={{
        columnWidth: 17,
        expandedRowRender: extendedRender,
      }}
      rowKey="key"
    />
  );
}