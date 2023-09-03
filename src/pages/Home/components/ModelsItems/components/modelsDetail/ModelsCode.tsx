import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ModelsDetail, updateModelCode } from '../../../../service';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/python/python';

function ModelsCode() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const idValue = searchParams.get('id')!;
    console.log(idValue);

    const [isEditing, setIsEditing] = useState(false);
    const [loadings, setLoadings] = useState<boolean[]>([false, false]); // 0 for submit, 1 for toggle

    const [modelCode, setModelCode] = useState('');
    const [modelText, setModelText] = useState('');

    const handleTriggerEvent = async () => {
        const dataJson = await ModelsDetail(idValue);
        setModelCode(dataJson.data.code);
        setModelText(dataJson.data.text);
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
            const response = await updateModelCode(idValue, modelCode);
            if (response.success) {
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
        <div>
            <ProCard split="horizontal">
                <ProCard>
                    <Space wrap>
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
                </ProCard>
                <ProCard title="" headerBordered>
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
            </ProCard>
        </div>
    );
}

export default ModelsCode;
