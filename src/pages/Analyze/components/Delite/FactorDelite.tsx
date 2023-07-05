import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Column } from '@ant-design/plots';
import { Table , Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {useLocation} from 'umi'
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

const FactorDelite: React.FC<MyComponentProps> = (props) => {
    // 获取跳转到此页的id
    const location = useLocation();
    const params = new URLSearchParams(location.search)
    console.log(params.get('id'))
    const data = [
        {
            name: 'text1',
            维度: '评估维度1',
            数值: 18.9,
        },
        {
            name: 'text2',
            维度: '评估维度1',
            数值: 47,
        },
        {
            name: 'text1',
            维度: '评估维度2',
            数值: 28.8,
        },
        {
            name: 'text2',
            维度: '评估维度2',
            数值: 20.3,
        },
        {
            name: 'text1',
            维度: '评估维度3',
            数值: 39.3,
        },
        {
            name: 'text2',
            维度: '评估维度3',
            数值: 24,
        },
        {
            name: 'text1',
            维度: '评估维度4',
            数值: 81.4,
        },
        {
            name: 'text2',
            维度: '评估维度4',
            数值: 35.6,
        },
    ];
    const config = {
        data,
        isGroup: true,
        xField: '维度',
        yField: '数值',
        seriesField: 'name',

        /** 设置颜色 */
        //color: ['#1ca9e6', '#f88c24'],

        /** 设置间距 */
        // marginRatio: 0.1,
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'middle', 'bottom'
            // 可配置附加的布局方法
            layout: [
                // 柱形图数据标签位置自动调整
                {
                    type: 'interval-adjust-position',
                }, // 数据标签防遮挡
                {
                    type: 'interval-hide-overlap',
                }, // 数据标签文颜色自动调整
                {
                    type: 'adjust-color',
                },
            ],
        },
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
            colSpan: 2,
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
            colSpan: 0,
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
                title: '因子详情页',
            }}
        >
            <ProCard
                direction="column"
                gutter={[0, 16]}
                style={{ backgroundColor: 'rgb(213,213,213)' }}
            >
                <ProCard bordered>
                    <Column {...config} />
                </ProCard>
                <ProCard bordered>
                <h2 style={{ textAlign: 'center' }}><strong>因子描述</strong></h2>
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
export default FactorDelite;