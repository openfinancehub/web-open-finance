import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button } from 'antd';

const valueEnum = {
  0: 'into',
  1: 'out',
};


export type TableListItem = {
  key: string;
  name: string;
  MarketPrice: number;
  status: string;
  containers: number;
  Floating: number;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['三菱日联', '路透IFR', '摩根士丹利', '高盛', '野村控股'];

const MarketPrice = [1.1191, 0.8643, 0.9673, 1.0432, 0.7842];
const Floating = [809, 680, -973, -432, 842];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i + '',
    name: creators[i],
    status: valueEnum[(Math.floor(Math.random() * 10) + '') as '0'],
    MarketPrice: MarketPrice[i],
    containers: Math.floor(Math.random() * 20),
    Floating: Floating[i],
  });
}

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
    // sorter: (a, b) => a.containers - b.containers,
    valueEnum: {
      all: { text: '全部' },
      付小小: { text: '付小小' },
      曲丽丽: { text: '曲丽丽' },
      林东东: { text: '林东东' },
      陈帅帅: { text: '陈帅帅' },
      兼某某: { text: '兼某某' },
    },
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
      // headerTitle="表格标题"
    />
  );
};