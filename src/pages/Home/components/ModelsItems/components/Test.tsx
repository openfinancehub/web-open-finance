import React, { useEffect, useState } from 'react';
// import styles from './style.less';
import { useLocation } from 'react-router-dom';
import { getModelData } from '@/pages/Home/service';
import useRequest from './useEval';
import { UserOutlined } from '@ant-design/icons';
import ReactEcharts from 'echarts-for-react';
import { Button, Card, Input, Popover, Radio } from 'antd';
import styles from './style.less'

type useEvalHook = {
  message: any[];
};

const DemoDecompositionTreeGraph = () => {
  //获取请求中的model数据
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const modelValue = searchParams.get('model')!;
  const factorValue = searchParams.get('factor')!;
  console.log("modelValue >>", modelValue, "factorValue >>", factorValue)

  const [inputValue, setInputValue] = useState<string>('');

  const handleSendMessage = () => {
    if (!inputValue) return;
    //放一个请求
    // sendWebSocketMessage(inputValue, {
    //   company: selectedCom,
    //   ...selectedRole,
    //   task: selectedTask
    // });
    useEval(factorValue, modelValue, inputValue)
    setInputValue('');
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [message, setMessage] = useState<any[]>([]);
  const useEval = (factor: string, model: string, inputValue: string): useEvalHook => {
    try {
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
      const responseData = fetch('/api/eval', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          header: header,
          data: dataStr
        }),
      }).then(rep => {
        console.log(rep);
        return rep.json();
      }).then(json => {
        const response = JSON.parse(json.data || '{}');
        let content = response.output?.answer;
        content = content.replace(/\n/g, '<br>');
        let chart = response.output?.chart;
        //设置数据之前先清空旧的数据
        setMessage([]);
        setMessage(pre => {
          const tempList = [...pre].map(item => ({ ...item, flag: false }));
          return [...tempList, { sender: 'bot', content, chart }];
        });
      });
    } catch (error) {
      console.error('error:', error);
    }
    return { message };
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

export default DemoDecompositionTreeGraph;
