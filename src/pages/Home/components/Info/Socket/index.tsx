import { ProTable, type ProColumns } from '@ant-design/pro-components';
import { useCallback, useEffect, useState } from 'react';
import { MarketService } from '../../../service/';
import { Button, Drawer, Table } from 'antd';
import Gauge from './barChart';

interface StockResponse {
  result: {
    features: Record<string, { result: any; TIME: any }>;
    summary: any;
  };
}

interface StockData {
  key: string;
  stockRate: number;
}

const initialColumns: ProColumns<StockData>[] = [
  {
    title: '股票名称',
    width: 30,
    // fixed: 'left',
    dataIndex: 'name',
    render: (_, record) => <a>{record.key}</a>,
  },
  {
    title: '推荐指数',
    width: 60,
    // fixed: 'left',
    sorter: (a, b) => {
      const numA = a.stockRate as unknown as number;
      const numB = b.stockRate as unknown as number;
      if (numA < 0 && numB >= 0) {
        return -1; // 负数排在前面
      } else if (numA >= 0 && numB < 0) {
        return 1; // 正数排在前面
      } else {
        return numA - numB; // 保持默认的数字排序
      }
    },
    dataIndex: 'number',
    render: (_, record) => record.stockRate,
  },
];

function generateTargetData(summary: { [s: string]: number; }): StockData[] {
  return Object.entries(summary).map(([name, stockRate]) => ({
    key: name,
    stockRate,
  }));
}

export default function StockTable() {

  const [isLoading, setIsLoading] = useState(true);

  const [stockKey, setStockKey] = useState<string>('');
  const [indicatorsData, setIndicatorsData] = useState<{ [key: string]: { [company: string]: any[] } }>({});
  const [data, setData] = useState<any[]>([]);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await MarketService.getStock();
      const { result } = response as StockResponse;

      const targetData = generateTargetData(result.summary);
      // console.log(targetData)
      setData(targetData);

    } catch (error) {
      console.error('Fetch data error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCompData = async () => {
    try {
      setIsLoading(true);
      const response = await MarketService.getStock();
      const { result } = response as StockResponse;

      const newIndicatorsData = Object.entries(result.features).reduce(
        (acc, [key, value]) => {
          if (value?.result?.[stockKey] && value.TIME?.[stockKey]) {
            acc[key] = {
              xData: value.result[stockKey],
              yData: value.TIME[stockKey],
            };
          }
          return acc;
        },
        {} as { [key: string]: { xData: any[], yData: any[] } }
      );
      console.log(newIndicatorsData, 'newIndicatorsData');

      setIndicatorsData(newIndicatorsData);
    } catch (error) {
      console.error('Fetch data error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewClick = useCallback(() => {
    // 点击查看按钮之后添加额外的逻辑
    setOpen(true);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (stockKey) {
      fetchCompData();
    }
  }, [stockKey]);

  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>
        <ProTable
          loading={isLoading}
          columns={initialColumns}
          dataSource={data}
          scroll={{ x: 800 }}
          options={false}
          search={false}
          rowSelection={{
            // 注释该行则默认不显示下拉选项
            type: 'radio',
            selections: false,
            // selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
            // defaultSelectedRowKeys: [1],
            onChange: (selectedRowKeys, selectedRows) => {
              // 当选择项改变时，你可以在这里处理逻辑
              if (selectedRowKeys.length > 0) {
                setStockKey(selectedRows[0].key);
              }
            },
          }}
          tableAlertRender={({
            selectedRowKeys,
            selectedRows,
            onCleanSelected,
          }) => {
            if (selectedRowKeys.length > 0) {
              setStockKey(selectedRows[0].key);
            }
            return (
              <div >
                {/* <span>
                  已选 {selectedRowKeys.length} 项
                  <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                    取消选择
                  </a>
                </span> */}
                <span>{`当前选择: ${selectedRowKeys.length > 0 ? selectedRows[0].key : ''}`}</span>
              </div>
            );
          }}
          tableAlertOptionRender={() => {
            return (
              <div>
                <a onClick={handleViewClick}>查看详细内容</a>
              </div>
            );
          }}
          pagination={{
            pageSize: 10,
          }}
          rowKey="key"
        />
      </div>
      <div>
        <Drawer
          title={stockKey}
          placement="right"
          size={'large'}
          onClose={onClose}
          open={open}
        >
          {Object.entries(indicatorsData).map(([titleName, { xData, yData }], index) => (
            <div key={index}>
              <Gauge titleName={titleName} xData={xData} yData={yData} />
            </div>
          ))}
        </Drawer>
      </div>
    </div >
  );
}