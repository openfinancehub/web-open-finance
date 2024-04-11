import React, { useEffect, useState } from 'react'
import { InfiniteScroll, List, Grid, } from 'antd-mobile'
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

  const fetchData = async () => {
    const response = await getDanger();
    const { features = [], summary = {} } = response.result || {};

    setDanger(summary);
    Object.keys(features).forEach(feature => {
      const time = features[feature].TIME
      const result = features[feature].result

      const keys = Object.keys(time)[0];
      const r = time[keys].map((item: any, index: string | number) => [item, result[keys][index]]);

      setFeaturesList(prevState => [...prevState, r]);
      setDangerName(prevState => [...prevState, feature]);
    })
  };

  const fetchSentimentData = async () => {
    const response = await getSentiment();
    const { features = [], summary = {} } = response.result || {};

    setSentSummary(summary);

    Object.keys(features).forEach(feature => {
      const time = features[feature].TIME
      const result = features[feature].result

      const keys = Object.keys(time)[0];
      const r = time[keys].map((item: any, index: string | number) => [item, result[keys][index]]);

      setSentList(prevState => [...prevState, r]);
      setSentName(prevState => [...prevState, feature]);
    });
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
  function convertToOneDigitDecimal(num: number) {
    const numStr = num.toString();
    const decimalPointIndex = numStr.indexOf('.');
    if (decimalPointIndex === -1) {
      const length = numStr.length;
      if (length > 10) {
        return parseFloat(numStr.slice(0, 10));
      }
      return parseFloat(numStr) / Math.pow(10, length);
    }
    const decimalPlaces = numStr.length - decimalPointIndex - 1;

    const decimalPart = numStr.slice(decimalPointIndex + 1);
    const truncatedDecimalPart = decimalPart.slice(0, 10);
    const newNumStr = numStr.slice(0, decimalPointIndex) + '.' + truncatedDecimalPart;

    return parseFloat(newNumStr) / Math.pow(10, decimalPlaces);
  }

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

          {danger && danger.上证指数 ? <EChartsGauge size={danger.上证指数} /> : null}
        </Col>
      </Row>
      <Row>
        {sentData.map((item, index) => {
          return (
            <Col key={index} span={24} >
              <Risk legendData={[item.name]} seriesData={item} />
            </Col>)
        })}
      </Row>
      <Row >
        <Divider orientation="left"></Divider>
      </Row>
      <Row >
        <Col span={18}>
          <Divider orientation="left"><h2 style={{ color: "#E92838" }}>危险指数</h2></Divider>
        </Col>
        <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} span={6}>
          {sentSummary && sentSummary.上证指数 ? <EChartsGauge size={sentSummary.上证指数} /> : null}
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
