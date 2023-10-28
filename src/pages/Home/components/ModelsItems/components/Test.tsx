import React, { useEffect, useState } from 'react';
import styles from './style.less';
import { useLocation } from 'react-router-dom';
import { getModelData } from '@/pages/Home/service';
// import useEval from './useEval';
import { UserOutlined } from '@ant-design/icons';
import ReactEcharts from 'echarts-for-react';
import { Button, Card, Input, Popover, Radio } from 'antd';

const DemoDecompositionTreeGraph = () => {
  //获取请求中的model数据
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const modelValue = searchParams.get('model')!;
  const factorValue = searchParams.get('factor')!;
  console.log("modelValue >>", modelValue, "factorValue >>", factorValue)

  // const { message, sendWebSocketMessage, clearMessage } = useEval(factorValue, modelValue);
  type useEvalHook = {
    message: any[];
    clearMessage: () => void;
    sendWebSocketMessage: (message: string, info: any) => void;
  };
  const [message, setMessage] = useState<any[]>([]);
  const useEval = (factor: string, model: string): useEvalHook => {
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
        setMessage(pre => {
          const tempList = [...pre].map(item => ({ ...item, flag: false }));
          return [...tempList, { sender: 'bot', content, chart }];
        });
      });
    } catch (error) {
      console.error('error:', error);
    }
    const sendWebSocketMessage = (message: string, info: any) => {
      setMessage(pre => [
        ...pre,
        { sender: 'user', content: message, flag: true }
      ]);
    };

    const clearMessage = () => {
      setMessage([]);
    };
    return { message, sendWebSocketMessage, clearMessage };
  };
  useEffect(() => {
    useEval(factorValue, modelValue);
  }, []);
  
  return (
    <div className={styles.content}>
      {message.map((item, index) => {
        // if (item.sender === 'user') {
        //   return (
        //     <div className={styles.user} key={index}>
        //       <Card style={{ width: 300 }}>
        //         {item.content && (
        //           <div
        //             style={{ padding: '0 16px 0 0' }}
        //             dangerouslySetInnerHTML={{
        //               __html: item.content
        //             }}
        //           />
        //         )}
        //         {item.flag && <span className={styles.cursor} />}
        //         <span className={styles.tag}>
        //           <UserOutlined style={{ fontSize: '18px' }} />
        //         </span>
        //       </Card>
        //     </div>
        //   );
        // }
        return (
          <div className={styles.user} key={index}>
            <Card style={{ width: 600 }}>
              {item.chart && (
                <ReactEcharts
                  option={item.chart}
                  style={{ height: '300px' }}
                />
              )
              }
              {item.content && (
                <div
                  style={{ padding: '0 16px 0 0' }}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              )}
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default DemoDecompositionTreeGraph;
