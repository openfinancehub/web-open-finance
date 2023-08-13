import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Radar,Line } from '@ant-design/plots';
interface MyComponentProps {
    // Define any props required by the component
}
interface DataType {
    key: string;
    name: string;
    age: number;
    tel: string;
    phone: number;
    address: string;
}
const Strategy: React.FC<MyComponentProps> = (props) => {

    const raderData = [
        {
            name: '评估维度1',
            star: 10371,
        },
        {
            name: '评估维度2',
            star: 7380,
        },
        {
            name: '评估维度3',
            star: 7414,
        },
        {
            name: '评估维度4',
            star: 2140,
        },
        {
            name: '评估维度5',
            star: 660,
        },
    ];
    const raderConfig = {
        data: raderData.map((d) => ({ ...d, star: Math.sqrt(d.star) })),
        xField: 'name',
        yField: 'star',
        appendPadding: [0, 10, 0, 10],
        meta: {
            star: {
                alias: 'star 数量',
                min: 0,
                nice: true,
                formatter: (v) => Number(v).toFixed(2),
            },
        },
        xAxis: {
            tickLine: null,
        },
        yAxis: {
            label: false,
            grid: {
                alternateColor: 'rgba(0, 0, 0, 0.04)',
            },
        },
        // 开启辅助点
        point: {
            size: 2,
        },
        area: {},
    };
    const lineData = [
        {
            year: '二月',
            value: 2,
        },
        {
            year: '三月',
            value: 2.8,
        },
        {
          year: '四月',
          value: 3,
        },
        {
          year: '五月',
          value: 4,
        },
        {
          year: '六月',
          value: 3.5,
        },
        {
          year: '七月',
          value: 5,
        },
        {
          year: '八月',
          value: 4.9,
        },
        {
          year: '九月',
          value: 6,
        },
        {
          year: '十月',
          value: 7,
        },
    ];
    const config = {
        data:lineData,
        xField: 'year',
        yField: 'value',
        label: {},
        point: {
          size: 5,
          shape: 'diamond',
          style: {
            fill: 'white',
            stroke: '#5B8FF9',
            lineWidth: 2,
          },
        },
        tooltip: {
          showMarkers: false,
        },
        state: {
          active: {
            style: {
              shadowBlur: 4,
              stroke: '#000',
              fill: 'red',
            },
          },
        },
        interactions: [
          {
            type: 'marker-active',
          },
        ],
    };
    const columns: ColumnsType<DataType> = [
        {
            title: '因子取值',
            dataIndex: 'key',
            rowScope: 'row',
        },
        {
            title: '评估维度1',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
            // onCell: (_, index) => ({
            //     colSpan: index === 1 ? 5 : 1,
            // }),
        },
        {
            title: '评估维度2',
            dataIndex: 'age',
            // onCell: sharedOnCell,
        },
        {
            title: '评估维度3',
            dataIndex: 'tel',
            // onCell: (_, index) => {
            //     if (index === 3) {
            //         return { rowSpan: 2 };
            //     }
            //     // These two are merged into above cell
            //     if (index === 4) {
            //         return { rowSpan: 0 };
            //     }
            //     if (index === 1) {
            //         return { colSpan: 0 };
            //     }

            //     return {};
            // },
        },
        {
            title: '评估维度4',
            dataIndex: 'phone',
            // onCell: sharedOnCell,
        },
        {
            title: '评估维度5',
            dataIndex: 'address',
            // onCell: sharedOnCell,
        },
    ];
    const tabdata: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            tel: '0571-22098909',
            phone: 18889898989,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            tel: '0571-22098333',
            phone: 18889898888,
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            tel: '0575-22098909',
            phone: 18900010002,
            address: 'Sydney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Jim Red',
            age: 18,
            tel: '0575-22098909',
            phone: 18900010002,
            address: 'London No. 2 Lake Park',
        },
        {
            key: '5',
            name: 'Jake White',
            age: 18,
            tel: '0575-22098909',
            phone: 18900010002,
            address: 'Dublin No. 2 Lake Park',
        },
    ];
    return (
        <PageContainer
            ghost
            header={{
                title: '策略详情页',
            }}
        >
            <ProCard
                direction="column"
                gutter={[0, 16]}
                style={{ backgroundColor: 'rgb(213,213,213)' }}
            >
                <ProCard bordered gutter={[16, 16]}>
                    <ProCard colSpan="40%" bordered>
                        <Radar {...raderConfig} />
                    </ProCard>
                    <ProCard bordered>
                        <Line {...config} />
                    </ProCard>
                </ProCard>
                <ProCard bordered>
                    <h2 style={{ textAlign: 'center' }}><strong>策略描述</strong></h2>
                </ProCard>
                <ProCard bordered>
                    <Table columns={columns} dataSource={tabdata} bordered />
                </ProCard>
                {/* <ProCard bordered> */}
                <div style={{ textAlign: 'center' }}> <Button type="primary" size="large">订阅因子</Button></div>
                {/* </ProCard> */}
            </ProCard>
        </PageContainer>
    )
}
export default Strategy;