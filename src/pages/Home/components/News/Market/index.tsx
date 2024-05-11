import React, { useEffect, useState } from 'react'
import { InfiniteScroll, List, Grid, Ellipsis, AutoCenter, } from 'antd-mobile'
import EChartsGauge from './Gauge'
import Risk from './Risk'
import { Col, Divider, Row, Statistic, } from 'antd';
import { getSentiment, getDanger } from '../../../service'

export default () => {

  const [dangerList, setFeaturesList] = React.useState<any[]>([]);
  const [danger, setDanger] = React.useState<any>();
  const [dangerName, setDangerName] = React.useState<any[]>([]);

  const [sentList, setSentList] = React.useState<any[]>([]);
  const [sentSummary, setSentSummary] = React.useState<any>();
  const [sentName, setSentName] = React.useState<any[]>([]);

  const content =
    '蚂蚁的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容。'


  const fetchData = async () => {
    const response = await getDanger();
    const { features = [], summary = {} } = response.result || {};

    Object.keys(features).forEach(feature => {
      const time = features[feature].TIME
      const result = features[feature].result

      const keys = Object.keys(time)[0];
      const r = time[keys].map((item: any, index: string | number) => [item, result[keys][index]]);

      setFeaturesList(prevState => [...prevState, r]);
      setDangerName(prevState => [...prevState, feature]);
    })

    const summaryValue = Object.values(summary)[0];
    const substring = summaryValue.toString().substring(0, 4)
    const floatNum = parseFloat(substring)
    const res = parseFloat((floatNum / 100).toFixed(2))
    setDanger(res);
  };

  const fetchSentimentData = async () => {
    const response = await getSentiment();
    const { features = [], summary = {} } = response.result || {};

    Object.keys(features).forEach(feature => {
      const time = features[feature].TIME
      const result = features[feature].result

      const keys = Object.keys(time)[0];
      const r = time[keys].map((item: any, index: string | number) => [item, result[keys][index]]);

      setSentList(prevState => [...prevState, r]);
      setSentName(prevState => [...prevState, feature]);
    });

    const summaryValue = Object.values(summary)[0]
    const substring = summaryValue.toString().substring(0, 4);
    const floatNum = parseFloat(substring);
    let res = (floatNum / 100).toFixed(2);
    setSentSummary(res);
  };


  const seriesData = dangerList.map((feature, index) => {
    return {
      name: dangerName[index],
      type: 'line',
      stack: 'Total',
      data: feature
    }
  });

  const sentData = sentList.map((feature, index) => {
    return {
      name: sentName[index],
      type: 'line',
      stack: 'Total',
      data: feature
    }
  });

  useEffect(() => {
    fetchSentimentData();
    fetchData();
  }, []);

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
          {danger}
          {/* {parseFloat(danger.toFixed(2))} */}
          <EChartsGauge size={danger} />
          {/* {danger ? <EChartsGauge size={danger} /> : null} */}
        </Col>
      </Row>

      {sentData.map((item, index) => {
        return (
          <Row key={index}>
            <Col key={index} span={24} >
              <Risk legendData={[item.name]} seriesData={item} />
            </Col>
            <Col style={{ marginTop: 10, marginBottom: 40 }} key={index + '' + item} span={24} >
              <AutoCenter  >
                <Ellipsis direction='end' rows={3} content={content}
                  expandText='展开'
                  collapseText='收起' />
              </AutoCenter>
            </Col >
          </Row >
        )
      })}
      <Row >
        <Divider orientation="left"></Divider>
      </Row>
      <Row >
        <Col span={18}>
          <Divider orientation="left"><h2 style={{ color: "#E92838" }}>危险指数</h2></Divider>
          <Grid columns={8} gap={8}>
            <Grid.Item span={1}>
            </Grid.Item>
            <Grid.Item span={7}>
              <div >近期，全球财经市场关注的焦点集中在两大主题上：一是科技股的调整，二是各国央行的政策走向。</div>
            </Grid.Item>
          </Grid>
        </Col>

        <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} span={6}>
          <EChartsGauge size={sentSummary} />
        </Col>
      </Row>

      {seriesData.map((item, index) => {
        return (
          <Grid key={index} columns={1} gap={8}>
            <Grid.Item key={index} span={8}>
              <Risk legendData={[item.name]} seriesData={item} />
            </Grid.Item>
            <Grid.Item style={{ marginTop: 10, marginBottom: 40 }} key={index + '' + item} span={8}>
              <AutoCenter>
                <Ellipsis direction='end' rows={3} content={content}
                  expandText='展开'
                  collapseText='收起' />
              </AutoCenter>
            </Grid.Item>
          </Grid>
        )
      })}
    </>
  )
}
