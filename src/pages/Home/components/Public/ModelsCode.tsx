import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FactorService } from '../../service/';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, message, Space, Form, Input, Radio, Tooltip, Col, Row } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/python/python';


const ModelsCode: React.FC<{
  modelValue: string
  factorValue: string
  setModelValue: React.Dispatch<React.SetStateAction<string>>;
  setFactorValue: React.Dispatch<React.SetStateAction<string>>;
}> = ({ modelValue, factorValue, setModelValue, setFactorValue }) => {
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const [modelValue, setModelValue] = useState(searchParams.get('model') || '');
  // const [factorValue, setFactorValue] = useState(searchParams.get('factor') || '');

  const [isEditing, setIsEditing] = useState(false);
  const [loadings, setLoadings] = useState<boolean[]>([false, false]);

  const [modelCode, setModelCode] = useState('');
  const [modelText, setModelText] = useState('');

  const [form] = Form.useForm();

  const toggleLoading = (index: number, isLoading: boolean) => {
    setLoadings(prevLoadings => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = isLoading;
      return newLoadings;
    });
  };

  const onFinish = async () => {
    try {
      await form.validateFields();
    } catch (error) {
      message.error('表单验证失败');
      return;
    }

    if (!isEditing) {
      try {
        // 开始加载  
        toggleLoading(0, true);
        const response = await FactorService.updateCode(factorValue, modelValue, modelCode, modelText, '');
        // console.log(response);
        // 处理响应数据  
        if (response && response.ret_code === 0) {
          // 更新模型代码和文本  
          setModelCode(response.models.data.code);
          setModelText(response.models.data.text);
          // 显示提交成功的消息  
          message.success('提交成功');
        } else {
          // 显示提交失败的消息  
          message.error('提交失败');
        }
      } catch (error) {
        console.error('updateCode failed:', error);
        return;
      } finally {
        toggleLoading(0, false);
      }
    } else {
      message.error('当前正在编辑，提交失败');
    }
  };
  //初始化数据
  const handleTriggerEvent = async () => {
    if (modelValue && factorValue) {
      const dataJson = await FactorService.getCode(factorValue, modelValue);
      // dataJson?.result
      // console.log(dataJson)
      // console.log(dataJson?.result.data)
      setModelCode(dataJson.models.code);
      setModelText(dataJson.models.text);
    } else {
      setModelCode('');
      setModelText('');
    }
  };
  // 删除
  const deleteTools = () => {
    setModelValue("")
    setFactorValue("")
    updateCode(factorValue, modelCode, '', '', "action='delete'")
  };

  const handleEditToggle = () => {
    toggleLoading(1, true);
    setTimeout(() => {
      setIsEditing(prevIsEditing => !prevIsEditing);

      toggleLoading(1, false);
    }, 500);
  };

  const TooltipIcon = ({ title }: { title: string }) => (
    <Tooltip title={title}>
      <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
    </Tooltip>
  );
  const FormButton = ({ loadingIndex, clickHandler, children }:
    { loadingIndex: number, clickHandler: any, children: string }) => (
    <Col span={2}>
      <Button type="primary" loading={loadings[loadingIndex]} onClick={clickHandler}>
        {children}
      </Button>
    </Col>
  );
  const CustomFormInput = ({ name, label, isEditing }: {
    name: string, label: string, isEditing: boolean
  }) => (
    <Col span={10}>
      <Form.Item name={name} label={label} rules={[{ required: true }]} hasFeedback>
        <Input
          suffix={<TooltipIcon title={`Enter Your ${name}`} />}
          disabled={!isEditing}
        />
      </Form.Item>
    </Col>
  );
  useEffect(() => {
    handleTriggerEvent();
  }, []);

  return (
    <ProCard split="horizontal">
      <Form form={form} onFinish={onFinish}
        initialValues={{ Model: modelValue, Factor: factorValue }}>
        <Form.Item >
          <Row gutter={0}>
            <FormButton loadingIndex={0} clickHandler={onFinish}>{'Submit'}</FormButton>
            <FormButton loadingIndex={1} clickHandler={handleEditToggle}>{isEditing ? 'Save' : 'Editing'}</FormButton>
            <FormButton loadingIndex={2} clickHandler={() => { deleteTools() }}>{'Delete'}</FormButton>
          </Row>
          <br />
          <Row gutter={16}>
            <CustomFormInput name='Model' label='Model' isEditing={isEditing} />
            <CustomFormInput name='Factor' label='Factor' isEditing={isEditing} />
          </Row>
        </Form.Item>
      </Form>
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
  );
}

export default ModelsCode;
