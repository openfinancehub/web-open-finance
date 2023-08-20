import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, Dropdown, Input } from 'antd';
import { ModelsDetail } from '../../../../service'
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './style.less';


function ModelsCode() {
    const location = useLocation();
    // 获取查询参数字符串
    const searchParams = new URLSearchParams(location.search);
    // 获取 'id' 参数的值，留着发送给后端，返回对应的models数据
    const idValue = searchParams.get('id');
    console.log(idValue);

    const [modelCode, setModelCode] = useState();
    const [modelText, setModelText] = useState();
    // 初始化因子结构数据
    const handleTriggerEvent = async () => {
        const dataJson = await ModelsDetail();
        setModelCode(dataJson.data.code)
        setModelText(dataJson.data.text)
        console.log(dataJson)
    };
    useEffect(() => {
        handleTriggerEvent();
    }, []);


    return (
        <div>
            <ProCard split="horizontal">
                <ProCard >
                    <div className={styles.codeStyle}>
                        <pre >
                            {modelCode}
                        </pre>
                    </div>
                </ProCard>
                <ProCard title="" headerBordered >
                    <div className={styles.codeText} >{modelText}</div>
                </ProCard>
            </ProCard>
        </div >
    );
}
export default ModelsCode;