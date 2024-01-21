import React, { useEffect, useState } from 'react';
import { ProList } from '@ant-design/pro-components';
import { HeartTwoTone, CloudDownloadOutlined, CloudTwoTone, FileTextTwoTone } from '@ant-design/icons';
import { Description, ModelsItem, ListCategoryType, header, modelsData } from '../../data';
import './style.less';
import ModelsItems from './component/DModelsItems';
import { Collapse } from 'antd';
import { categoryJson, getModels } from '../../service';
const { Panel } = Collapse;

interface ModelsProps {
    onFilterFinance: any;
    data: ModelsItem[];
    company: string;
    setCompany: (company: string) => void;
    isDeveloper: boolean
}

const DModels: React.FC<ModelsProps> = ({ onFilterFinance, data, company, setCompany, isDeveloper }) => {
    // const [filteredModels, setFilteredModels] = useState(data);
    const [filteredModelsMap, setFilteredModelsMap] = useState(new Map());
    const [modelValue, setModelValue] = useState('');
    const [factorValue, setFactorValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [categoryList, setCategoryList] = useState<ListCategoryType>([]);


    // 添加元素到Map数组
    const addElement = (key: string, value: ModelsItem[]) => {
        setFilteredModelsMap(prevMapArray => {
            const newMapArray = new Map(prevMapArray);
            newMapArray.set(key, value);
            return newMapArray;
        });
    };

    const fetchCategoryJson = async () => {
        try {
            const response = await categoryJson();
            console.log(response)
            const titles = Object.keys(response?.result?.category);
            const descriptions = Object.values(response?.result?.category);
            const categories = createData(titles, descriptions);
            setCategoryList(categories);
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

    const handleTriggerEvent = async (factor: string) => {
        const dataJson = await getModels(factor);
        if (dataJson?.result?.models != null && dataJson.result.ret_code == 0) {
            // setFilteredModels(dataJson?.result?.models)
            addElement(factor, dataJson?.result?.models)
        }

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
    // const fetchData = async () => {
    //     setFilteredModels(data);
    // };
    useEffect(() => {
        // fetchData();
        fetchCategoryJson();
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

    const FactorMeta: React.FC<{ factor: string }> = ({ factor }) => {
        return (
            <ProList<ModelsItem>
                onRow={onRow}
                rowKey='id'
                dataSource={filteredModelsMap.get(factor)}
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
        );
    };

    const onChange = (key: string | string[]) => {
        console.log(key);
        if (key) {
            handleTriggerEvent(key as string);
        }
        // console.log(filteredModelsList)
    };

    return (
        <div>
            <div>
                <Collapse accordion >
                    {categoryList.map((item, index) => (
                        <Panel header={item.title} key={item.title}>
                            {/* {item.title} */}
                            {item.description.map(({ factor }, index) => (
                                <Collapse bordered={false} key={item.title + factor} accordion onChange={onChange}>
                                    <Panel header={factor} key={factor} >
                                        <FactorMeta factor={factor} />
                                    </Panel>
                                </Collapse>
                            ))}
                        </Panel>
                    ))}
                </Collapse>
            </div>
            {showModal && <div className='my-modal'>
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
};

export default DModels;
