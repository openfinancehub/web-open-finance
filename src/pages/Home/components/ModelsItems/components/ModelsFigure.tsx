import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getModelData } from '@/pages/Home/service';
import { UserOutlined } from '@ant-design/icons';
import ReactEcharts from 'echarts-for-react';
import { Button, Card, Input, Popover, Radio } from 'antd';
import { Tabs, message as Message } from 'antd';
import styles from './style.less'

const ModelsFigure = () => {
  //获取请求中的model数据
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const modelValue = searchParams.get('model')!;
  const factorValue = searchParams.get('factor')!;
  // console.log("modelValue >>", modelValue, "factorValue >>", factorValue)

  const [inputValue, setInputValue] = useState<string>('');

  const handleSendMessage = () => {
    if (!inputValue) return;
    useEval(factorValue, modelValue, inputValue)
    setInputValue('');
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [message, setMessage] = useState<any[]>([]);
  const useEval = async (factor: string, model: string, inputValue: string) => {
    let header = {
      req_id: '1234',
      req_src: 'source',
      user: 'user',
      token: 'token',
    };
    let dataStr = {
      ip: '127.0.0.1',
      factor: model,
      model: "default",
      input: inputValue,
      time: '',
      extra: 'extra',
    };

    try {
      const response = await fetch('/api/eval', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          header: header,
          data: dataStr
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      const result = processJson(json);
      setMessage([]);
      setMessage(pre => [...pre, result]);
      return result;
    } catch (err) {
      console.error(err);
      Message.error("获取数据失败" + err)
    }
  };

  const processJson = (json: { data: any; } | null) => {
    if (typeof json !== 'object' || json === null) {
      throw new Error('Unexpected value in response');
    }

    const response = JSON.parse(json.data || '{}');
    let content = response.output?.answer;
    content = content.replace(/\n/g, '<br>');
    let chart = response.output?.chart;

    return { sender: 'bot', content, chart };
  };
  useEffect(() => {
    useEval(factorValue, modelValue, '');
  }, []);

  return (
    <div className={styles.wrapFinchat}>

      <div className={styles.right}>
        <div className={styles.bottom}>
          <Input
            placeholder="Send a companies"
            allowClear
            value={inputValue}
            onPressEnter={handleSendMessage}
            onChange={handleInputChange}
          />
          <Button
            type="primary"
            onClick={handleSendMessage}
          >
            send
          </Button>
        </div>

        <div className={styles.content}>
          {message.map((item, index) => {
            return (
              <div className={styles.user} key={index}>
                <Card style={{ width: "100%" }}>
                  {item.chart && (
                    <ReactEcharts
                      option={item.chart}
                      style={{ height: '300px' }}
                    />
                  )
                  }
                  {item.content && (
                    <div
                      style={{ padding: '0 16px 0 16px' }}
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModelsFigure;
