import React, { useEffect, useState } from 'react';
import { ProList } from '@ant-design/pro-components';
import { HeartTwoTone, CloudDownloadOutlined, CloudTwoTone, FileTextTwoTone } from '@ant-design/icons';
import { Description, ModelsItem, ListCategoryType, header, modelsData } from '../../data';
import './style.less';
import ModelsItems from '../ModelsItems/ModelsItems';
import { Collapse } from 'antd';
import { Button, Input, Tag } from 'antd';
import { categoryJson, modelsJson } from '../../service';
const { Panel } = Collapse;

interface ModelsProps {
    onFilterFinance: any;
    data: ModelsItem[];
    company: any[];
    setCompany: (company: React.SetStateAction<never[]>) => void;
    isDeveloper: boolean
}
let head: header = {
    req_id: '1234',
    req_src: 'source',
    user: 'user',
    token: 'token',
};
let dataStr: modelsData = {
    ip: '127.0.0.1',
    factor: '',
    time: '',
    extra: 'extra',
};

const Models: React.FC<ModelsProps> = ({ onFilterFinance, data, company, setCompany, isDeveloper }) => {
    const [filteredModels, setFilteredModels] = useState(data);
    const [modelValue, setModelValue] = useState('');
    const [factorValue, setFactorValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [categoryList, setCategoryList] = useState<ListCategoryType>([]);

    const fetchCategoryJson = async () => {
        try {
            const response = await categoryJson();
            // console.log(response.data.category)
            const titles = Object.keys(response?.result?.category);
            const descriptions = Object.values(response?.result?.category);
            const categories = createData(titles, descriptions);
            setCategoryList(categories);

            console.log(categoryList)

        } catch (error) {
            console.error('fetch data failed', error);
        }
    };
    const createData = (titles: string[], description: any[]): ListCategoryType => {
        if (titles.length !== description.length) {
            throw new Error('error');
        }
        return titles.map((title, index) => ({
            title,
            description: description[index] as Description[]
        }));
    };

    //点击事件请求后端接口获取因子信息
    const filterFinance = (factor: string) => {
        if (factor === dataStr.factor) {
            factor = ''
        }
        dataStr.factor = factor;
        handleTriggerEvent();

    };

    const handleTriggerEvent = async () => {
        const dataJson = await modelsJson(head, dataStr);
        if (dataJson?.result?.models != null && dataJson.result.ret_code == 0) {
            setFilteredModels(dataJson?.result?.models)
            // onFilterFinance(dataJson?.result?.models);
        }
        console.log(dataJson)
    };
    //跳转models详情
    const onRow = (record: any) => {
        return {
            onClick: () => {
                showModalChange();
                setFactorValue(record.tag)
                setModelValue(record.model)
                console.log(record);
            },
        };
    };
    const showModalChange = () => {
        setShowModal((prevShowModal) => !prevShowModal);
    };
    const fetchData = async () => {
        setFilteredModels(data);
    };
    useEffect(() => {
        fetchData();
        fetchCategoryJson()
    }, [data]);

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

    return (
        <div>
            <div key='model' >
                <Collapse accordion>
                    {categoryList.map((item, index) => (
                        <Panel header={item.title} key={index}>
                            {item.description.map(({ factor }, index) => (
                                <Collapse accordion>
                                    <Panel header={factor} key={`${index}-${factor}`} onClick={() => filterFinance(factor)}>
                                        <ProList<ModelsItem>
                                            onRow={onRow}
                                            rowKey='id'
                                            dataSource={filteredModels}
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
                                    </Panel>
                                </Collapse>
                            ))}
                        </Panel>
                    ))}
                </Collapse>
            </div>

            {showModal && <div key='my-modal' className='my-modal'>
                <ModelsItems
                    isDeveloper={isDeveloper}
                    modelValue={modelValue}
                    factorValue={factorValue}
                    setModelValue={setModelValue}
                    setFactorValue={setFactorValue}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    company={company}
                    setCompany={setCompany} />
            </div>}
        </div >
    );
}

export default Models;
