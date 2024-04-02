import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { getStocks } from '../../../service';
import { useEffect, useState } from 'react';
import { history } from 'umi';
const valueEnum = {
  0: 'into',
  1: 'out',
};


export type TableListItem = {
  // key: string;
  name: string;
  MarketPrice: string;
  status: string;
  containers: number;
  Floating: number;
};

const creators = ['三菱日联', '路透IFR', '摩根士丹利', '高盛', '野村控股'];
const MarketPrice = ['1.1191', '0.8643', '0.9673', '1.0432', '0.7842'];
const Floating = [809, 680, -973, -432, 842];

const columns: ProColumns<TableListItem>[] = [
  {
    title: '名称',
    width: 80,
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '直盘/交叉盘',
    dataIndex: 'containers',
    width: 80,
  },
  {
    title: '策略状态',
    width: 80,
    dataIndex: 'status',
    initialValue: 'all',
    valueEnum: {
      out: { text: '买', status: 'Error' },
      into: { text: '卖', status: 'Success' },
    },
  },
  {
    title: '市场价格',
    width: 80,
    dataIndex: 'MarketPrice',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '浮动盈亏',
    width: 80,
    dataIndex: 'Floating',

  },
];

export default () => {
  // let tableListDataSource: TableListItem[] = [];
  let [tableListDataSource, setTableListDataSource] = useState<TableListItem[]>([])
  // const history = useHistory();
  tableListDataSource = tableListDataSource.map((stock, index) => ({
    ...stock,
    key: index,
  }));
  const stocksList = async () => {
    const response = await getStocks();
    console.log(response.data, "data");
    setTableListDataSource(response.data.stocksList);
    console.log(tableListDataSource, 'tableListDataSource');
  }

  useEffect(() => {
    stocksList();
  }, [])

  return (
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
            // history.push(`/home/stocks`);
            // console.log(record)
          },
        };
      }}
      expandable={{
        expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.name}的详细信息</p>,
        rowExpandable: (record) => record.name !== 'Not Expandable',
      }}

    />
  );
};