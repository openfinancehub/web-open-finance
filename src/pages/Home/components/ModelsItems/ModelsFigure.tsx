import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import { Button, Card, Input, Popover, Radio } from 'antd';
import { Tabs, message as Message } from 'antd';
import { CompanyList } from '@/pages/Finchat/components';
import { getEval } from '@/pages/Home/service';
import styles from './style.less'
import { FinchatServices } from '@/services';
import { history, useModel } from '@umijs/max';
import _ from 'lodash';

const { Search } = Input;
const ModelsFigure = () => {
  //获取请求中的model数据
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const modelValue = searchParams.get('model')!;
  const factorValue = searchParams.get('factor')!;
  const [stockList, setStockList] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const [initCompanyList, setInitCompanyList] = useState<any[]>([]);
  const {
    initialState: { currentUser }
  } = useModel('@@initialState');
  const commonHeader = {
    user: currentUser.username,
    req_id: currentUser.id,
    req_src: currentUser.avatarUrl,
    token: currentUser.token
  };
  // const commonHeader = {
  //   user: "124",
  //   req_id: "124",
  //   req_src: "124",
  //   token: "124"
  // };
  const handleCompany = (list: any[]) => {

    if (list.length === 1) {
      // console.log(list[0].company); 
      useEval(factorValue, modelValue, list[0].company);
    } else {
      // list.map((item) => {
      //   console.log(item.company); 
      // });
      useEval(factorValue, modelValue, list[1].company);
    }

    // useEval(factorValue, modelValue, list[0].company);
    // list.splice(0, list.length); // 清空list数组  
    // while (list.length > 0) {
    //   list.pop(); // 通过循环删除数组中的元素，直到数组为空  
    // }
    list.splice(0, list.length - 1);
  };

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
    try {
      const evalJson = await getEval('', model, inputValue)

      const result = processJson(evalJson?.result);
      setMessage([]);
      setMessage(pre => [...pre, result]);
      return result;
    } catch (err) {
      console.error(err);
      Message.error("获取数据失败" + err)
    }
  };
  const fetchSidebar = async () => {
    try {
      const res = await FinchatServices.fetchSidebar({
        header: commonHeader
      });
      const {
        stock_list = []
      } = res.output || {};
      setInitCompanyList(stock_list);
      setStockList(stock_list);
    } catch (error) {
      console.log(error, 'error');
    }
  };
  const onSearch = async (value: string) => {
    try {
      if (!value) {
        setStockList(initCompanyList);
        return;
      }
      const res = await FinchatServices.queryCompany({
        header: commonHeader,
        data: { query: value }
      });
      const list = res.output?.result || [];
      setStockList(list);
    } catch (error: any) {
      Message.error(error?.msg);
    }
  };

  const onChange = _.debounce((e: any) => {
    const str = e.target.value;
    if (!str) {
      setStockList(initCompanyList);
      return;
    }
    const list = stockList.filter(i => i.company.indexOf(str) !== -1);
    setStockList(list);
  }, 1000);

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
    fetchSidebar()
    useEval(factorValue, modelValue, '');
  }, []);

  return (
    <div className={styles.wrapFinchat}>
      <div className={styles.left}>
        <h3 style={{ margin: '18px' }}>{modelValue}</h3>
        <Search
          placeholder="Search Companies"
          allowClear
          onSearch={onSearch}
          onChange={onChange}
          style={{ width: '80%', margin: '0 0 12px 0' }}
        />
        <CompanyList list={stockList} handleProps={handleCompany} />
      </div>

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
                {item.chart && Object.keys(item.chart).length > 0 && (
                  <Card style={{ width: "100%", }}>
                    <ReactEcharts
                      option={item.chart}
                      style={{ height: '300px' }}
                    />
                  </Card>
                )}
                <Card style={{ width: "100%", margin: "10px 0 0 0" }}>
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
