import { ProCard } from '@ant-design/pro-components';
import type { DatePickerProps } from 'antd';
import { getFactorList } from "../api/indexApi";
import {
  Button,
  Card,
  DatePicker,
  InputNumber,
  Modal,
  PageHeader,
  Radio,
  Select,
  Space,
  message
} from 'antd';
import { LineChart, RadarChart } from 'echarts/charts';
import { LegendComponent, TitleComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { useEffect, useRef, useState } from 'react';
import { request } from 'umi';
import { FundOutlined } from '@ant-design/icons';
import ModelAnaly from "./ModelAnaly";
import StrategyCard from "./StrategyCard";
echarts.use([
  TitleComponent,
  LegendComponent,
  CanvasRenderer,
  RadarChart,
  LineChart
]);

export default function PublicStrategy(props: string) {
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const todayDate = `${year}-${month}-${date}`;
  const radarRef = useRef(null);
  const lineRef = useRef(null);
  const [demoDays, setDemoDays] = useState(5);
  const [backData, setbackData] = useState(0);
  const [dateData, setDateData] = useState(todayDate);
  const [shopData, setShopData] = useState(1);
  const [listData, setListData] = useState([]);
  const [detailsData, setDetailsData] = useState({});
  const [listName, setListName] = useState();
  const [indexdetails, setindexDetails] = useState('');
  const [isdemoBtn, setIsdemoBtn] = useState(true);
  const [lineDataTime, setlineDataTime] = useState();
  const [lineData, setLineData] = useState();
  const [lineMax, setLinemax] = useState();
  const [lineMin, setLinemin] = useState();
  const [lineIdent, setLineIdent] = useState([]);
  const [demoEndData, setDemoEndData] = useState([]);
  const [raderData, setRaderData] = useState([{ name: '', max: '' }]);
  const [eightOne, setEightOne] = useState('');
  const [selectedButton, setSelectedButton] = useState('');
  const [raderValue, setRaderValue] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModelOpen] = useState(false);
  const [quantSelectData, setSelectData] = useState([]);
  const [minTime, setMinTime] = useState(5);
  // stop
  const [stopDemo, setStopDemo] = useState(0);
  const firstKargs: any = [];
  let synthesis: any = [];

  const strtegylist = () => {
    const data = {
      uid: 1,
      key: '8140ad230f687daede75a08855e8ae5ff40c3ba8'
    };
    request('http://8.138.96.163:8081/quant/strtegylist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    })
      .then(res => {
        setListName(res.data.list[0]);
        setSelectedButton(res.data.list[0]);
        let options = res.data.list.map((item: string, index: number) => {
          return {
            value: item,
            lable: item,
            index: index
          };
        });
        setListData(options);
        setDetailsData(res.data.details);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const GetStrategy = (uid: number, demoTime: number) => {
    const data = {
      uid: uid,
      key: '8140ad230f687daede75a08855e8ae5ff40c3ba8'
    };
    request('http://8.138.96.163:8081/quant/get_strategy_test_result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    })
      .then((res: any) => {
        const list = demoTime + 20;
        if (demoTime > 80) {
          setStopDemo(res.code);
          return demoTime;
        }
        if (res.code === 801) {
          setEightOne(res.message);
        }
        if (res.code === 500) {
          return message.error(res.message);
        }
        if (res.code === 300 && demoTime <= 140) {
          setTimeout(() => {
            GetStrategy(uid, list);
          }, 2000);
        } else {
          let destArr: object[] = [];
          let raderArr: object[] = [];
          let radervalue: number[] = [];
          let linedata: any = [];
          let lineDataTime: string[] = [];
          // 买入卖出节点
          let longAndshort: object[] = [];
          res.data.result.forEach((item: any) => {
            if (item.indicator_flag === 'True') {
              destArr.push({
                name: item.name,
                desc: item.desc,
                value: item.value.toFixed(4)
              });
              raderArr.push({ name: item.name, max: item.max });
              radervalue.push(item.value);
            }
          });
          if (!backData) {
            res.data.raw_data.forEach((list: any) => {
              linedata.push(Object.values(list)[0]);
              lineDataTime.push(Object.keys(list)[0]);
              for (let i = 0; i < res.data.decision_long.length; i++) {
                if (res.data.decision_long[i] === Object.keys(list)[0]) {
                  longAndshort.push({
                    coord: [Object.keys(list)[0], Object.values(list)[0]],
                    itemStyle: { color: 'red' },
                    label: {
                      formatter: '买入'
                    }
                  });
                  break;
                }
              }
              for (let i = 0; i < res.data.decision_short.length; i++) {
                if (res.data.decision_short[i] === Object.keys(list)[0]) {
                  longAndshort.push({
                    coord: [Object.keys(list)[0], Object.values(list)[0]],
                    itemStyle: { color: 'green' },
                    label: {
                      formatter: '卖出'
                    }
                  });
                  break;
                }
              }
            });
          }
          destArr.push();

          const max: any = Math.max(...linedata);
          const min: any = Math.min(...linedata);
          setLinemax(max);
          setLinemin(min);
          setLineIdent(longAndshort);
          setDemoEndData(destArr);
          setRaderData(raderArr);
          setRaderValue(radervalue);
          setLineData(linedata);
          setlineDataTime(lineDataTime);
          setDetailsModelOpen(true);
          setIsdemoBtn(true);
          setIsModalOpen(false);
          synthesis = [];
          setTimeout(() => {
            initBasicEchart();
            initLineEchart();
          }, 300);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleStopTime = () => {
    setTimeout(() => {
      setStopDemo({ list: true });
    }, 8000);
  };
  const strategy_test = (kargs: number[]) => {
    const data = {
      key: '8140ad230f687daede75a08855e8ae5ff40c3ba8',
      setting: [
        {
          strategy_name: listName,
          span: 60,
          kargs: kargs
        }
      ],
      configs: {
        stock_id: props.ButtonId,
        user_id: '000001',
        setting_mode: 'p',
        analysis_flag: 0,
        holding_cost: -1,
        end_date: dateData,
        cnt_ops: shopData,
        test_days: demoDays,
        mode: 'both',
        scale: minTime
      }
    };
    request('http://8.138.96.163:8081/quant/strategy_test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    })
      .then(res => {
        if (res.code === 200) {
          if (res.uid) {
            GetStrategy(res.uid, 0);
            handleStopTime();
          }
        } else {
          message.error(res.message);
          setIsdemoBtn(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    strtegylist();
  }, []);
  const backOrder = (e: any) => {
    setbackData(e.target.value);
  };
  const dateTime: DatePickerProps['onChange'] = (date, dateString) => {
    setDateData(dateString);
  };
  const shopOrder = (value: number) => {
    setShopData(value);
  };
  const demoBtn = () => {
    synthesis = [];
    for (let i = 0; i < firstKargs.length; i++) {
      if (firstKargs.length > 0) {
        // 处理数组元素
        synthesis.push(`${firstKargs[0].name}:${firstKargs[0].value}`);
        if (i !== 0 && firstKargs[i - 1].name !== firstKargs[i].name) {
          synthesis.push(`${firstKargs[0].name}:${firstKargs[0].value}`);
        }
      }
    }
    strategy_test(synthesis);
    setIsdemoBtn(false);
    setTimeout(() => {
      setIsdemoBtn(true);
    }, 60000);
  };

  const demoDaysChange = (value: number) => {
    setDemoDays(value);
  };

  const handleChangeValue = (value: any, option: any) => {
    setListName(value);
    setindexDetails(option.index);
    setSelectedButton(value);
  };
  const nuberOnChange = (name: string, value: number) => {
    firstKargs.unshift({
      name: name,
      value: value
    });
  };
  const minTimeChange = (value: number) => {
    setMinTime(value);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleOpen = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancelDetails = () => {
    setDetailsModelOpen(false);
  };
  return (
    <div style={{ height: '88vh', }}>
    <PageHeader title="因子" >
    </PageHeader>
    <div style={{ height: '14vh', overflow: "auto", paddingBottom:'0.5vh',paddingTop:'0.5vh'  }} >
    <div className="cardList" >
          {quantSelectData.map((item, index) => {
            return (
              <Card
                key={index} 
                hoverable
                style={{ width: '300px' }}
                onClick={handleOpen}>
                <FundOutlined /> <p>{item?.name}</p>
              </Card>
            );
          })}
    </div>
    </div>
    <ModelAnaly></ModelAnaly>
    <StrategyCard></StrategyCard>
      <Modal
        title="策略分析"
        open={isModalOpen}
        onOk={handleOk}
        width={1200}
        onCancel={handleCancel}>
        <ProCard gutter={16} ghost wrap style={{ width: '100%' }}>
          <ProCard
            bordered
            style={{ textAlign: 'center', overflowY: 'scroll' }}
            colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 10 }}>
            <Space wrap align="center">
              因子：
              <Select
                value={selectedButton}
                style={{
                  width: 200,
                  textAlign: 'center'
                }}
                onChange={handleChangeValue}
                options={listData}
              />
            </Space>
            <div>
              {detailsData[selectedButton] &&
                detailsData[selectedButton].map((item, index) => {
                  return (
                    <div
                      style={{ marginTop: '20px' }}
                      key={index}
                      data-name={item.name}>
                      {item.desc} :{' '}
                      <InputNumber
                        min={1}
                        defaultValue={item.value}
                        onChange={value => {
                          nuberOnChange(item.name, value);
                        }}
                      />{' '}
                    </div>
                  );
                })}
            </div>
          </ProCard>
          <ProCard
            style={{ textAlign: 'center' }}
            bordered
            colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 14 }}>
     
            <div className="numberSele">
              <InputNumber
                size={size}
                min={1}
                max={10}
                addonBefore="测试天数"
                addonAfter="天"
                defaultValue={5}
                onChange={demoDaysChange}
              />
              &nbsp;
              <InputNumber
                size={size}
                min={1}
                addonBefore="最大交易次数"
                addonAfter="次"
                defaultValue={1}
                onChange={shopOrder}
              />
            </div>
            <div className="numberSele">
              <Select
                placeholder="最小时间单位（分钟）"
                onChange={minTimeChange}
                options={[
                  {
                    value: 1,
                    label: '最小时间单位1分钟'
                  },
                  {
                    value: 5,
                    label: '最小时间单位5分钟'
                  },
                  {
                    value: 15,
                    label: '最小时间单位15分钟'
                  },
                  {
                    value: 30,
                    label: '最小时间单位30分钟'
                  },
                  {
                    value: 60,
                    label: '最小时间单位60分钟'
                  }
                ]}
              />
              <DatePicker onChange={dateTime} />
              是否滚动测评:
              <Radio.Group onChange={backOrder} value={backData}>
                <Radio value={0}>否</Radio>
                <Radio value={1}>是</Radio>
              </Radio.Group>
            </div>

            {isdemoBtn && (
              <Button
                size={size}
                style={{
                  background: 'rgb(1,108,102)',
                  color: '#fff',
                  marginBottom: 20
                }}
                onClick={demoBtn}>
                {stopDemo ? '重新测试' : '测试'}
              </Button>
            )}
            {!isdemoBtn && (
              <Button
                size={size}
                style={{
                  background: 'rgb(1,108,102)',
                  color: '#fff',
                  marginBottom: 20
                }}>
                正在测试...
              </Button>
            )}
          </ProCard>
        </ProCard>
      </Modal>
      <Modal
        title="分析详情"
        open={detailsModalOpen}
        width={1300}
        onCancel={handleCancelDetails}
        onOk={handleCancelDetails}>
        <ProCard style={{ height: 260 }}>
          <ProCard
            style={{ height: '100%' }}
            colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 11 }}
            bordered>
            <div className="demoResult">
              <div>测试结果：</div>
              <br></br>
              {demoEndData.map((item: any, index) => {
                return (
                  <div style={{ fontWeight: 'bole' }} key={index}>
                    <p>
                      {' '}
                      <span>{index + 1}、</span>{' '}
                      {item.name ? `${item.name}(${item.value}):` : ''}
                    </p>
                    <p>{item.desc}</p>
                  </div>
                );
              })}
              {eightOne}
            </div>
          </ProCard>
          <ProCard
            style={{ height: '100%' }}
            colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 12 }}
            bordered>
            <div ref={radarRef} style={{ width: '100%', height: '100%' }}></div>
          </ProCard>
        </ProCard>
        <ProCard
          style={{ height: 300, width: '100%' }}
          colSpan={{ xs: 24, sm: 24, md: 4, lg: 4, xl: 12 }}>
          <div ref={lineRef} style={{ height: '100%' }}></div>
        </ProCard>
      </Modal>
    </div>
  );
}
