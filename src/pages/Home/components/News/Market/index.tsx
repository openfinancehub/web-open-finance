import React, { useEffect, useState } from 'react'
import { InfiniteScroll, List, Grid, Ellipsis, AutoCenter, } from 'antd-mobile'
import EChartsGauge from './Gauge'
import Risk from './Risk'
import { Col, Divider, Row, Statistic, } from 'antd';
import { MarketService } from '../../../service/';
export default () => {

  const [dangerList, setFeaturesList] = useState<any[]>([]);
  const [dangerSize, setDangerSize] = useState<number>(0);
  const [dangerText, setDangerText] = useState<string>('');

  const [sentList, setSentList] = useState<any[]>([]);
  const [sentSize, setSentSize] = useState<number>(0);
  const [sentText, setSentText] = useState<string>('');

  const fetchDataAndProcess = async (url: () => Promise<any>, setList: any,
    setText: any, setSize: any) => {
    const response = await url();
    if (response) {


      const { features = [], summary = {} } = response.result || {};

      Object.keys(features).forEach(feature => {
        const time = features[feature].TIME
        const result = features[feature].result
        const text = features[feature].text

        const keys = Object.keys(time)[0];
        if (typeof time[keys] === 'object' && !Array.isArray(time)) {
          const r = time[keys].map((item: any, index: string | number) => {
            return [item, result[keys][index]]
          });
          setList(prevState => [...prevState, { title: feature, data: r, text: text }]);

        } else {
          const r = [time, result];
          setList(prevState => [...prevState, { title: feature, data: r, text: text }]);
        }
      });

      const textContent = summary.text;
      const shangZhiZhenShu = summary['上证指数'];

      const substring = shangZhiZhenShu.toString().substring(0, 4)
      const floatNum = parseFloat(substring)
      const res = parseFloat((floatNum / 100).toFixed(2))
      setSize(res);
      setText(textContent)
    }
  };

  const sentData = sentList.map((feature, index) => {
    return {
      echartsConf: {
        name: feature.title,
        type: 'line',
        stack: 'Total',
        data: feature.data
      },
      dataZoom: [
        {
          type: 'inside',
          start: feature.data.length < 20 ? 0 : 80,
          end: feature.data.length < 20 ? 100 : 100,
        },
        {
          start: 50,
          end: 100,
        }
      ],
      textContent: feature.text
    }
  });

  const seriesData = dangerList.map((feature, index) => {
    return {
      echartsConf: {
        name: feature.title,
        type: 'line',
        stack: 'Total',
        data: feature.data
      },
      dataZoom: [
        {
          type: 'inside',
          start: feature.data.length < 20 ? 0 : 80,
          end: feature.data.length < 20 ? 100 : 100,
        },
        {
          start: 10,
          end: 100,
        }
      ],
      textContent: feature.text
    }
  });

  useEffect(() => {
    fetchDataAndProcess(MarketService.getSentiment, setSentList, setSentText, setSentSize);
    fetchDataAndProcess(MarketService.getDanger, setFeaturesList, setDangerText, setDangerSize);
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
              <div >{sentText}</div>
            </Grid.Item>
          </Grid>
        </Col>
        <Col span={8} >
          <EChartsGauge size={sentSize} />
        </Col>
      </Row>

      {sentData.map((item, index) => {
        return (
          <Row key={index}>
            <Col key={index} span={24} >
              <Risk legendData={[item.echartsConf.name]}
                dataZoom={item.dataZoom}
                seriesData={item.echartsConf} />
            </Col>
            <Col style={{ marginTop: 10, marginBottom: 40 }} key={index + '' + item.echartsConf.name} span={24} >
              <AutoCenter  >
                <Ellipsis direction='end' rows={3} content={item.textContent}
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
      <Row>
        <Col span={16}>
          <Divider orientation="left"><h2 style={{ color: "#E92838" }}>危险指数</h2></Divider>
          <Grid columns={8} gap={8}>
            <Grid.Item span={1}>
            </Grid.Item>
            <Grid.Item span={7}>
              <h3 >危险信息</h3>
            </Grid.Item>
            <Grid.Item span={2}>
            </Grid.Item>
            <Grid.Item span={6}>
              <div >{dangerText}</div>
            </Grid.Item>
          </Grid>
        </Col>
        <Col span={8} >
          <EChartsGauge size={dangerSize} />
        </Col>
      </Row>
      {seriesData.map((item, index) => {
        return (
          <Grid key={index} columns={1} gap={8}>
            <Grid.Item key={index} span={8}>
              <Risk legendData={[item.echartsConf.name]}
                dataZoom={item.dataZoom}
                seriesData={item.echartsConf} />
            </Grid.Item>
            <Grid.Item style={{ marginTop: 10, marginBottom: 40 }} key={index + '' + item.echartsConf.name} span={8}>
              <AutoCenter>
                <Ellipsis direction='end' rows={3} content={item.textContent}
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
