import React, { useEffect, useState } from 'react';
import { ProList } from '@ant-design/pro-components';
import { HeartTwoTone, CloudDownloadOutlined, CloudTwoTone, FileTextTwoTone } from '@ant-design/icons';
import { history } from 'umi';
import { ModelsItem, } from '../../data';

//普通用户models结展示
const DescriptionMeta: React.FC<{ json: ModelsItem }> = ({ json }) => {
    return (
        <div key={json.tag}>
            <span>
                <FileTextTwoTone /> {json.tag}
            </span>
            <span>
                <CloudDownloadOutlined style={{ color: '#1890ff' }} /> {json.time}
            </span>
            <span>
                <CloudTwoTone /> {json.download}
            </span>
            <span>
                <HeartTwoTone /> {json.like}
            </span>
        </div>
    );
};

interface ModelsProps {
    data: ModelsItem[];
    company: string;
    setCompany: (company: string) => void;
    isDeveloper: boolean
}

const Models: React.FC<ModelsProps> = ({ data, company, setCompany, isDeveloper }) => {
    const [filteredModels, setFilteredModels] = useState(data);
    const [modelValue, setModelValue] = useState('');
    const [factorValue, setFactorValue] = useState('');

    const params = `modelValue=${encodeURIComponent(modelValue)}&factorValue=${encodeURIComponent(factorValue)}`;

    //跳转models详情
    const onRow = (record: any) => {
        return {
            // 鼠标移入行
            onMouseEnter: () => {
                setFactorValue(record.tag)
                setModelValue(record.model)
            },
            // 点击事件
            onClick: () => {
                history.push('/home/model/item' + `?${params}`);
                console.log(modelValue, 'modelValue');
            },
        };
    };

    const fetchData = async () => {
        setFilteredModels(data);
    };
    useEffect(() => {
        fetchData();
    }, [data]);
    return (
        <div>
            <ProList<ModelsItem>
                onRow={onRow}
                rowKey='name'
                dataSource={filteredModels}
                pagination={{
                    pageSize: 10,
                }}
                showActions='hover'
                metas={{
                    title: {
                        dataIndex: 'model',
                        title: '模型名称',
                    },
                    avatar: {
                        dataIndex: 'icon',
                        search: false,
                    },
                    description: {
                        dataIndex: 'tag',
                        search: false,
                        render: (_, json) => <DescriptionMeta json={json} />,
                    },
                }}
            />
        </div>
    );
}

export default Models;
