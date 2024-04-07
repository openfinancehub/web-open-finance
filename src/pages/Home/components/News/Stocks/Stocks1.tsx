import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { getStock } from '../../../service';
import { useEffect, useState } from 'react';

export type TableListItem = {
  key: string;
  name: string;
  MarketPrice: string;
  status: string;
  containers: number;
  Floating: number;
};

export default () => {

  let [tableListDataSource, setTableListDataSource] = useState<TableListItem[]>([])

  const [summaryData, setSummaryData] = useState<string[]>([])
  const [features, setFeatures] = useState<string[]>([])
  const [columns, setColumns] = useState<ProColumns<TableListItem>[]>([
    {
      title: '名称',
      dataIndex: 'name',
    },
  ]);

  const stocksList = async () => {
    const response = await getStock();

    const {
      features = [],
      summary = [],
    } = response.result || {};

    setSummaryData(summary);
    setFeatures(features);

    Object.keys(features).forEach((key, index) => {

      columns.push({
        title: key,
        dataIndex: key,
      })

      console.log(key)
    })

  }

  useEffect(() => {
    stocksList();
  }, [])

  return (
    <>

      <ProTable<TableListItem>
        dataSource={tableListDataSource}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        columns={columns}
        search={false}
        options={false}
        dateFormatter="string"
        onRow={(record) => {
          return {
            onClick: (event) => {
              <div style={{ backgroundColor: '#000000' }}>aaa</div>
            },
          };
        }}
      // expandable={{
      //   expandedRowRender: (record) => <p >{record.name}的详细信息</p>,
      //   rowExpandable: (record) => record.name !== 'Not Expandable',
      // }}
      />
    </>
  );
};