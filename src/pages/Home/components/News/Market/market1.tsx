import React, { useEffect, useState } from 'react'
import { InfiniteScroll, List, Grid, DotLoading } from 'antd-mobile'
import { getMarket } from '../../../service'
import EChartsGauge from './Gauge'
import Risk from './Risk'
import { Col, Divider, Row, } from 'antd';
import style from './style.less'

import { test } from '../../../service';
export default () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await test();
    const a = response.data.data.map(function (entry) {
      return [entry.time, entry.windSpeed, entry.R, entry.waveHeight];
    });
    setData(a);
  }

  useEffect(() => {
    getData();
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
          <EChartsGauge />
        </Col>
      </Row>
      <Row >
        <Divider orientation="left"><h2 style={{ color: "#E92838" }}>风险指数</h2></Divider>
      </Row>
      <Row >
        <Col span={24}>
          <Risk />
        </Col>
      </Row>
    </>
  )
}
