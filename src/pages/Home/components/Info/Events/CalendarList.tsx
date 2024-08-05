import type { BadgeProps } from 'antd';
import { Alert, Avatar, Badge, Calendar, Col, Image, List, Modal, Rate, Row } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { MarketService } from '../../../service/';
import { economicType, eventType, countryFlags } from './data.d';

// import { List, Rate, Image, Grid, Collapse, Button, DatePicker, Footer, DotLoading } from 'antd-mobile';
interface dataType {
  economic: economicType[],
  event: eventType[],
  future_economic: {},
  future_event: {},
}


const CalendarList: React.FC = () => {

  const [dateValue, setDateValue] = useState(() => moment(new Date()));
  const [titleValue, setTitleValue] = useState<string>('');
  const [titleId, setTitleId] = useState<number>(0);

  const [dataList, setDataList] = useState<dataType>({
    economic: [], event: [], future_economic: {}, future_event: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  // 月视图
  const getListData = (value: Moment) => {
    const targetDate = value;
    // 过滤 economicList
    const filteredEconomicList = dataList.economic.filter(item => {
      const pubTime = moment.unix(item.pub_time_unix).utc();
      return pubTime.isSame(targetDate, 'day');
    });

    // 过滤 eventList
    const filteredEventList = dataList.event.filter(item => {
      const pubTime = moment(item.event_time).utc();
      return pubTime.isSame(targetDate, 'day');
    });

    // 合并两个过滤后的列表
    const filteredListData = {
      economic: filteredEconomicList,
      event: filteredEventList
    };

    return filteredListData;
  };

  // 年视图
  const getMonthData = (value: Moment) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const getEventList = async (time: Moment) => {
    setIsLoading(true);
    try {
      const etime = time.year() + "-" + (time.month() + 1) + "-" + time.date();

      const response = await MarketService.getEvents(etime);

      if (!response || !response.data) {
        console.warn("Invalid response data", response);
        return;
      }

      setDataList(response.data)
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initialLoad = async () => {
      try {
        await getEventList(dateValue);
      } catch (error) {
        console.error(error);
      }
    };
    initialLoad();
  }, [dateValue]);

  const monthCellRender = (value: Moment) => {
    const num = getMonthData(value);
    return num ? (
      <div >
        <section>{num}</section>
        <span>当前月份重大事件</span>
      </div>
    ) : null;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = (name: string, id: number) => {
    setTitleValue(name);
    setTitleId(id);
    setIsModalOpen(true);
  };

  const colors = [
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime',
  ];

  const dateCellRender = (value: Moment) => {
    const listData = getListData(value);
    const isCurrentDate = value.isSame(dateValue, 'day');
    return (
      <div>
        {listData.economic.map((item, index) => (
          <span
            key={index + item.name}
            onClick={isCurrentDate ? () => handleOpen(item.name, item.id) : undefined}
          >
            <Badge color={colors[index]} text={item.name} />
          </span>
        ))}
        {listData.event.map((item, index) => (
          <span
            key={index + item.event_content}
            onClick={isCurrentDate ? () => handleOpen(item.event_content, item.id) : undefined}
          >
            <Badge color={colors[index]} text={item.event_content} />
          </span>
        ))}
      </div>
    );
  };

  const onSelect = (newValue: Moment) => {
    setDateValue(newValue);
  };

  const onPanelChange = (newValue: Moment) => {
    setDateValue(newValue);
  };

  const getEventDetails = (titleId: number): any => {
    const economicMatch = dataList.economic.find(item => item.id === titleId);
    const eventMatch = dataList.event.find(item => item.id === titleId);

    return economicMatch ? [economicMatch] : eventMatch ? [eventMatch] : [];
  };

  return <div>
    <Alert message={`当前选择查看日期: ${dateValue?.format('YYYY-MM-DD')}`} />
    <Calendar dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
      onSelect={onSelect}
      onPanelChange={onPanelChange} />
    <Modal
      title={titleValue}
      centered
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      width={1000}
    >
      {getEventDetails(titleId).map((item, index) => (
        <Row key={index} gutter={[16, 24]}>
          <Col span={6}>
            {item.country}
          </Col>
          <Col span={6}>
            {moment.unix(item.pub_time_unix).utc().format('MM-DD HH:mm:ss')}
          </Col>
          <Col span={6}>
            <Rate disabled allowHalf defaultValue={item.star} />
          </Col>
          <Col span={6}>
            {item.name}
          </Col>
          <Col span={6}>
          </Col>
        </Row>
      ))}
    </Modal>
  </div >;
};

export default CalendarList;