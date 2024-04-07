import React, { useEffect, useState } from 'react'
import { InfiniteScroll, List, Grid,  ProgressCircle, Space, Slider, Toast, Tag } from 'antd-mobile'
import { getMarket } from '../../../service'
import EChartsGauge from './Gauge'
import Risk from './Risk'
import { Col, Divider, Row, Statistic, } from 'antd';
import style from './style.less'
import { getSentiment, getDanger } from '../../../service'

export default () => {

  const [marks, setMarks] = useState<string[]>([]);

  useEffect(() => {
    const newMarks: string[] = [];
    for (let i = 0; i <= 100; i += 1) {
      const date = new Date(2022, 11, 9 + i / 2);
      newMarks[i] = date.toISOString().split('T')[0];
    }
    setMarks(newMarks);
    fetchData();
  }, []);

  const [featuresList, setFeaturesList] = React.useState<any[]>([]);
  const [summary, setSummary] = React.useState<any[]>([]);
  const [name, setName] = React.useState<any[]>([]);
  
  const fetchData = async () => {
    const response = await getDanger();
    const {
      features = [],
      summary = {},
    } = response.result || {};

    setSummary(summary);
    Object.keys(features).forEach(key => {
      const time = features[key].TIME.上证指数
      const result = features[key].result.上证指数
      const r: React.SetStateAction<any[]> = [];
      time.forEach((item: any, index: string | number) => {
        r.push([item, result[index]]);
      })

      setFeaturesList(prevState => [...prevState, r]);
      setName(prevState => [...prevState, key]);
      // console.log(key, 'key')
    })
  };

  const seriesData = featuresList.map((feature, index) => {
    return {
      name: name[index],
      type: 'line',
      stack: 'Total',
      data: feature
    }
  });


  const showDate = (value: number | [number, number]) => {
    let text = '';
    if (typeof value === 'number') {
      text = `${value}`;
    } else {
      text = `[${value.join(',')}]`;
    }
    // 确保marks数组已经初始化
    if (marks[text]) {
      // Toast.show(`当前选中值为：${marks[text]}`);
      // console.log(value);
    }
    return (<div>
      {marks[text]}
    </div>)
  }

  return (
    <>
      <Row>
        <Col span={16}>
          <Divider orientation="left"><h2 style={{ color: "#E92838" }}>今日热度</h2></Divider>
          <Grid columns={8} gap={8}>
            <Grid.Item span={1}>
            </Grid.Item>
            <Grid.Item span={7}>
              <h3 >热度解读</h3>
            </Grid.Item>
            <Grid.Item span={2}>
            </Grid.Item>
            <Grid.Item span={6}>
              <div >近期，全球财经市场关注的焦点集中在两大主题上：一是科技股的调整，二是各国央行的政策走向。</div>
            </Grid.Item>
          </Grid>
        </Col>
        <Col span={8} >
          <EChartsGauge size={0.35} />
        </Col>
        <Row >
          <Divider orientation="left">往期指数</Divider>
        </Row>
        <Row >
          <Space style={{ '--gap': '24px' }}>
            <ProgressCircle
              style={{
                '--size': '100px',
                '--track-width': '4px',
                '--fill-color': 'var(--adm-color-danger)',
              }}
              percent={30}
            >
              <div style={{ 'fontSize': '10px' }}>北向资金流动位置</div>
              <div>0.0</div>
            </ProgressCircle>
            <ProgressCircle
              style={{
                '--size': '100px',
                '--track-width': '4px',
                '--fill-color': 'var(--adm-color-danger)',
              }}
              percent={60}
            >
              <div style={{ 'fontSize': '10px' }}>成交活跃度</div>
              <div>347709231730.5</div>
            </ProgressCircle>
            <ProgressCircle
              style={{
                '--size': '100px',
                '--track-width': '4px',
                '--fill-color': 'var(--adm-color-danger)',
              }}
              percent={10}
            >
              <div style={{ 'fontSize': '10px' }}>融资融券活跃度</div>
              <div>0.0</div>
            </ProgressCircle>
          </Space>

        </Row>
      </Row>
      <Row >
        <Col span={24}>
          <Slider defaultValue={30} popover={showDate} ticks={false} />
        </Col>
      </Row>
      <Row >
        <Divider orientation="left"></Divider>
      </Row>
      <Row >
        <Col span={18}>
          <Divider orientation="left"><h2 style={{ color: "#E92838" }}>危险指数</h2></Divider>
        </Col>
        <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} span={6}>
          <Statistic value={summary.上证指数} valueStyle={{ color: 'red', fontSize: '2.5em' }} precision={2} />
        </Col>
      </Row>
      <Row >
        {seriesData.map((item, index) => {
          return (
            <Col key={index} span={24} >
              <Risk legendData={[item.name]} seriesData={item} />
            </Col>)
        })}
      </Row>
    </>
  )
}
