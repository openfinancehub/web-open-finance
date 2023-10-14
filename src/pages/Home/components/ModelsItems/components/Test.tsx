import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCode, updateCode } from '../../../service';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import styles from './style.less';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/python/python';

function Test() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const modelValue = searchParams.get('model')!;
    const factorValue = searchParams.get('factor')!;
    // console.log(modelValue);
    // console.log(factorValue);
    const [isEditing, setIsEditing] = useState(false);
    const [loadings, setLoadings] = useState<boolean[]>([false, false]);

    const [modelCode, setModelCode] = useState('');
    const [modelText, setModelText] = useState('');
    //请求后端获取代码数据
    const handleTriggerEvent = async () => {
        if (modelValue === null || factorValue === null) {
            setModelCode('');
            setModelText('');
        } else {
            const dataJson = await getCode(factorValue, modelValue);
            setModelCode(dataJson.data.code);
            setModelText(dataJson.data.text);
        }
    };

    const handleSubmit = async () => {
        // 非编辑状态才可以提交，向后端发送请求
        if (!isEditing) {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[0] = true;
                return newLoadings;
            });

            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[0] = false;
                return newLoadings;
            });
            const response = await updateCode(factorValue, modelValue, modelCode, modelText, '');
            if (response.ret_code == 0) {
                // console.log(response.data.code)
                setModelCode(response.data.code)
                setModelText(response.data.text)
                message.success('提交成功');
            } else {
                message.error('提交失败');
            }
        } else {
            message.error('当前正在编辑，提交失败');
        }
    };

    const handleEditToggle = () => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[1] = true;
            return newLoadings;
        });

        setTimeout(() => {
            setIsEditing((prevIsEditing) => !prevIsEditing);
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[1] = false;
                return newLoadings;
            });
        }, 1000);
    };
    useEffect(() => {
        handleTriggerEvent();
    }, []);

    return (
        <ProCard split="horizontal">
            <ProCard>
                <Space wrap className={styles.butStyle} size={26}>
                    <Button type="primary" loading={loadings[1]} onClick={handleEditToggle}>
                        {isEditing ? '保存' : '编辑'}
                    </Button>
                    <Button type="primary" loading={loadings[0]} onClick={handleSubmit}>
                        提交
                    </Button>
                </Space>
                <CodeMirror
                    value={modelCode}
                    options={{
                        mode: 'python',
                        theme: 'material',
                        lineNumbers: true,
                    }}
                    onBeforeChange={(editor, data, value) => {
                        if (isEditing) setModelCode(value);
                    }}
                />
                <br />
                <CodeMirror
                    value={modelText}
                    options={{
                        mode: 'txt',
                        theme: 'material',
                        lineNumbers: true,
                    }}
                    onBeforeChange={(editor, data, value) => {
                        setModelText(value);
                    }}
                />
            </ProCard>
            <ProCard title="" headerBordered>

            </ProCard>
        </ProCard>
    );
}

export default Test;
