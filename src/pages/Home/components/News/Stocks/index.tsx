import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { getStock } from '../../../service';
import styles from '../styles.less';

interface DataType {
  // key: React.Key;
  name: string;
  TTM估值水平: string;
  分红平均值: string;
  分红稳定性: string;
  消息面利好度: string;
  获利占比: string;
  资金流向: string;
}


const Stocks: React.FC = () => {
  const [data, setData] = React.useState<any[]>([]);

  const [columns, setColumns] = useState<TableColumnsType<DataType>>([
    { title: '名称', dataIndex: 'name', width: 90, key: 'name', fixed: 'left', },
  ]);

  const fetchData = async () => {
    const response = await getStock();
    const { features = [], summary = [] } = response.result || {};

    const newColumns: TableColumnsType<DataType> = [];
    Object.keys(features).forEach((titleName) => {
      newColumns.push({
        title: titleName,
        dataIndex: titleName,
        key: titleName,
      });
    });
    setColumns(prevColumns => [...prevColumns, ...newColumns]);

    console.log(features, 'features')

    const targetData = [];

    // 提取股票名称列表
    const stockNames = Object.values(features)[0].TIME;

    for (const stockName of Object.keys(stockNames)) {
      const stockData = {
        name: stockName,
        key: stockName,
      };

      for (const [featureName, featureObj] of Object.entries(features)) {
        const value = featureObj.result[stockName];
        stockData[featureName] = value;
      }
      targetData.push(stockData);
    }
    console.log(targetData, '列表数据');
    setData(targetData)
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.content}>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.name}的详细信息</p>
          ),
        }
        }
        dataSource={data}
        // pagination={{ pageSize: 50 }}
        scroll={{ x: 1100 }}
      />
    </div>

  );
};

export default Stocks;
