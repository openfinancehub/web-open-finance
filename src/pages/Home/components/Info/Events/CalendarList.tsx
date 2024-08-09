import type { BadgeProps } from 'antd';
import { Alert, Avatar, Badge, Calendar, Col, Image, List, Modal, Rate, Row } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { MarketService } from '../../../service/';
import { economicType, eventType, countryFlags } from './data.d';
import ReactMarkdown from 'react-markdown';

interface dataType {
  economic: economicType[],
  event: eventType[],
  future_economic: {},
  future_event: {},
}
interface BaseEventType {
  DATE: string;
  data: string;
  type: 'event' | 'data';
}


const colors = [
  'pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta',
];

const CalendarList: React.FC = () => {

  const [dateValue, setDateValue] = useState(() => moment(new Date()));
  const [titleValue, setTitleValue] = useState<string>('');
  const [titleId, setTitleId] = useState<string>('');
  const [eventList, setEventList] = useState<dataType>({
    economic: [], event: [], future_economic: {}, future_event: {},
  });

  const [briefEventList, setBriefEventList] = useState<BaseEventType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getBriefList = async (time: Moment) => {
    setIsLoading(true);
    try {
      const response = await MarketService.getBriefEvent(time);

      if (!response || !response.data) {
        console.warn("Invalid response data", response);
        return;
      }
      setBriefEventList(response.data);
      console.log(briefEventList);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBriefList(dateValue);
  }, [dateValue]);

  const handleOpen = (content: string, type: string) => {
    setTitleId(type + `@` + content);
    setTitleValue(content);
    setIsModalOpen(true);
  };

  const filterEventsByDate = (targetDate: Moment) => {
    return briefEventList.filter(item => {
      const pubTime = moment(item.DATE, 'YYYY-MM-DD');
      return pubTime.isSame(targetDate, 'day');
    });
  };

  const getMonthData = (value: Moment) => {
    const filteredEconomicList = filterEventsByDate(value);
    return filteredEconomicList.length;
  };

  const monthCellRender = (value: Moment) => {
    const num = getMonthData(value);
    return num ? (
      <div>
        <section>{num}</section>
        <span>当前月份重大事件</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Moment) => {
    const listData = filterEventsByDate(value);
    return (
      <div>
        {listData.map((item, index) => {
          const dataObj = parseEventData(item);
          const textToDisplay = item.type === 'event' ? dataObj.event_content : dataObj.name;
          const textToPass = item.type === 'event' ? dataObj.event_content : dataObj.name;

          return (
            <span
              key={index}
              onClick={() => handleOpen(textToPass, item.type)}
            >
              <Badge color={colors[index % colors.length]} text={textToDisplay} />
            </span>
          );
        })}
      </div>
    );
  };

  const parseEventData = (item: any) => {
    try {
      return JSON.parse(item.data);
    } catch (error) {
      console.error('Failed to parse item.data:', error);
      return {};
    }
  };

  const getEventDetails = (titleId: string): Record<string, string> => {
    const match = briefEventList.find(item => {
      const dataObj = parseEventData(item);
      const matchKey = item.type + '@' + (item.type === 'event' ? dataObj.event_content : dataObj.name);
      return matchKey === titleId;
    });
    return match ? parseEventData(match) : {};
  };

  const onSelect = (newValue: Moment) => {
    setDateValue(newValue);
  };

  const onPanelChange = (newValue: Moment) => {
    setDateValue(newValue);
  };

  return (
    <div>
      <Alert message={`当前选择查看日期: ${dateValue?.format('YYYY-MM-DD')}`} />
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
      <Modal
        title={titleValue}
        centered
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width={1000}
      >
        {Object.entries(useMemo(() => getEventDetails(titleId), [titleId])).map(([key, value], index) => (
          <Row key={index} gutter={[0, 0]}>
            <Col >
              {key === 'country' ? value : ''}
            </Col>
            <Col>
              {key === 'event_time' || key === 'pub_time'
                ? moment(value).format('YYYY-MM-DD HH:mm:ss')
                : ''}
            </Col>
            <Col>
              {key === 'star' && <Rate disabled allowHalf defaultValue={Number(value)} />}
            </Col>
            <Col>
              {key === 'event_content' || key === 'name' ? value : ''}
            </Col>
          </Row>
        ))}
      </Modal>
    </div>
  );
};

export default CalendarList;