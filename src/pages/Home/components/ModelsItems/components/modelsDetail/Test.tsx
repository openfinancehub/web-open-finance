import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCode, updateCode } from '../../../../service';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, message, Space, Form, Input, Radio } from 'antd';
import styles from './style.less';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/python/python';

function ModelsCode() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const modelValue = searchParams.get('model')!;
  const factorValue = searchParams.get('factor')!;

  const [isEditing, setIsEditing] = useState(false);
  const [loadings, setLoadings] = useState<boolean[]>([false, false]);

  const [modelCode, setModelCode] = useState('');
  const [modelText, setModelText] = useState('');

  const tailLayout = {
    wrapperCol: {
      offset: 0,
      span: 16,
    },
  };
  const formRef = React.useRef(null);
  const onFinish = (values: any) => {
    console.log(values);
  };
  // const onReset = () => {
  //   formRef.current?.resetFields();
  // };

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
  const deleteTools = () => {
    updateCode(factorValue, modelCode, '', '', "action='delete'")
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
        <Form ref={formRef} name="control-ref" onFinish={onFinish}>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loadings[0]} onClick={handleSubmit}>
              Submit
            </Button>
            {/* <Button type="primary" htmlType="button" onClick={onReset}>
              Reset
            </Button> */}
            <Button type="primary" htmlType="button" loading={loadings[1]} onClick={handleEditToggle}>
              {isEditing ? 'Save' : 'Editing'}
            </Button>
            <Button type="primary" htmlType="button" onClick={() => { deleteTools() }}>
              delete
            </Button>
          </Form.Item>
          <Form.Item
            name="Model"
            label="Model"
            rules={[{ required: true, },]}
          >
            <Input value={modelValue} defaultValue={modelValue} disabled={!isEditing} />
          </Form.Item>
          <Form.Item
            name="Factor"
            label="Factor"
            rules={[{ required: true, },]}
          >
            <Input value={factorValue} defaultValue={factorValue} disabled={!isEditing} />
          </Form.Item>
          <Form.Item
            rules={[{ required: false, },]} >
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
          </Form.Item>
        </Form>
      </ProCard>
    </ProCard>
  );
}

export default ModelsCode;
