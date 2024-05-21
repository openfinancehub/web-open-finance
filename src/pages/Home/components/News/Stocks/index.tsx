import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { getStock } from '../../../service';
import styles from '../styles.less';

interface StockData {
  name: string;
  key: string;
  [key: string]: string;
}

const Stocks: React.FC<TableProps<StockData>> = () => {
  const [data, setData] = React.useState<any[]>([]);

  const [columns, setColumns] = useState<TableColumnsType<StockData>>([
    { title: '名称', dataIndex: 'name', width: 200, align: 'center' }
  ]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await getStock();
    const { features = [], summary = [] } = response.result || {};

    const newColumns: TableColumnsType<StockData> = Object.keys(features).map(titleName => ({
      title: titleName,
      dataIndex: titleName,
      key: titleName,
      width: 500,
    }));
    setColumns(prevColumns => [...prevColumns, ...newColumns]);
    const targetData: StockData[] = [];
    // 提取股票名称列表
    const stockNames = Object.values(features)[0].TIME;

    const featureEntries = Object.entries(features);

    for (const stockName of Object.keys(stockNames)) {
      const stockData = {
        name: stockName,
        key: stockName,
      };

      featureEntries.map(([featureName, featureObj]) => {
        const value = featureObj.result[stockName];
        const roundedNumber = parseFloat(value.toFixed(3));
        stockData[featureName] = roundedNumber;
      });

      targetData.push(stockData);
    }
    console.log(targetData, '列表数据');
    setData(targetData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.content}>
      <Table
        columns={columns}
        loading={isLoading}
        rowKey={(record) => record.name}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.name}的详细信息</p>
          ),
        }}
        dataSource={data}
      />
    </div>
  );
};

export default Stocks;
