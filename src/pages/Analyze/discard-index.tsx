import { useState, useEffect } from 'react';
import { PageContainer,ProCard  } from '@ant-design/pro-components';
import { Pie,Column } from '@ant-design/plots';
import {Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const HomePage: React.FC = () => {
  // const [waveCakeData, setwaveCakeData] = useState([]);
  // const [responsive, setResponsive] = useState(false);
  // const asyncFetch = () => {
  //   fetch('https://gw.alipayobjects.com/os/antfincdn/mor%26R5yBI9/stack-group-column.json')
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => {
  //       console.log('fetch data failed', error);
  //     });
  // };
  // useEffect(() => {
  //   asyncFetch();
  // }, []);

  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }
  
  const columns: ColumnsType<DataType> = [
    {
      title: '指标',
      dataIndex: 'name',
      key: 'name',
      width:"150px",
      customHeaderCell: () => ({
        style: {
            textAlign: 'center',  //头部单元格水平居中
        },
      }),
    },
    {
      title: '权重',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '边际波动率',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '成分波动率',
      key: 'tags',
      dataIndex: 'tags',
    },
    {
      title: 'Beta',
      key: 'action',
      dataIndex:'action',
    },
  ];
  const data: DataType[] = [
    {
      key: '1',
      name: '000001',
      age: 0.215454,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: '000001',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: '000001',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  const waveCakeData = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data:waveCakeData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    legend:false,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return (
    <PageContainer ghost>
       <ProCard
        title="波动率分析"
        // extra="2019年9月28日"
        // split={responsive ? 'horizontal' : 'vertical'}
        bordered
        headerBordered
      >
        <ProCard colSpan="30%">
          {/* <div style={{ height: 360 }}>左侧内容</div> */}
          <Pie {...config}/>
        </ProCard>
        <ProCard>
          {/* <div style={{ height: 360 }}>右侧内容</div> */}
          <Table columns={columns} dataSource={data} />
        </ProCard>
      </ProCard>
     {/* <Column {...config} /> */}
    </PageContainer>
  );
};

export default HomePage;
