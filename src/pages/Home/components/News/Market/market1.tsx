import React, { useState } from 'react'
import { InfiniteScroll, List, DotLoading } from 'antd-mobile'
import { getMarket } from '../../../service'
import { Input, Button } from 'antd'
import EChartsGauge from './Gauge'
import { Col, Divider, Row } from 'antd';

export default () => {

  return (
    <>
      <Divider orientation="left"><h2 style={{ color: "#E92838" }}>今日热度</h2></Divider>
      {/* <Row gutter={16} justify="space-around" align="middle">
        <Col span={2}>
          <span >当前指数属性</span>
        </Col>
        <Col span={2}>
          <span>当前指数数值</span>
        </Col>
        <Col span={16}>
          <EChartsGauge />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <span >中立</span>
        </Col>
        <Col span={8}>
          <span>30</span>
        </Col>
      </Row> */}
      <EChartsGauge />
    </>
  )
}
