import type { BadgeProps, MenuProps } from 'antd';
import { Alert, Avatar, Badge, Typography, Calendar, Col, List, Menu, Modal, Rate, Row, Skeleton } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { MarketService } from '../../../service/';
import { economicType, eventType, countryFlags } from './data.d';
import { AntDesignOutlined, DollarCircleOutlined } from '@ant-design/icons';
const { Title, Paragraph, Text, Link } = Typography;

const colors = [
  'pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta',
];

const items: MenuProps['items'] = [
  {
    label: '经济数据',
    key: 'economic',
    icon: <DollarCircleOutlined />,
  },
  {
    label: '重大事件',
    key: 'event',
    icon: <AntDesignOutlined />,
  },

];

type EventOrEconomicItem = eventType | economicType;

interface CalendarListProps {
  // Define any additional props here.
}
interface BaseEventType {
  DATE: string;
  data: string;
  type: 'event' | 'data';
}

const CalendarList: React.FC<CalendarListProps> = () => {
  const [dateValue, setDateValue] = useState<Moment>(() => moment());
  const [briefEventList, setBriefEventList] = useState<BaseEventType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBar, setShowBar] = useState<'economic' | 'event'>('economic');

  const [eventList, setEventList] = useState<{
    economic: economicType[];
    event: eventType[];
  }>({ economic: [], event: [] });

  const countryFlagsMemo = useMemo(() => countryFlags, [countryFlags]);

  const getBriefList = useCallback(async (time: Moment) => {
    setIsLoading(true);
    try {
      const response = await MarketService.getBriefEvent(time);
      if (!response || !response.data) {
        console.warn("Invalid response data", response);
        return;
      }
      setBriefEventList(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getBriefList(dateValue);
  }, [getBriefList, dateValue]);

  const handleOpen = useCallback((content: string, type: string) => {
    setIsModalOpen(true);
  }, []);

  const filterEventsByDate = useCallback((targetDate: Moment) => {
    return briefEventList.filter(item => {
      const pubTime = moment(item.DATE, 'YYYY-MM-DD');
      return pubTime.isSame(targetDate, 'day');
    });
  }, [briefEventList]);

  const getMonthData = useCallback((value: Moment) => {
    const filteredEconomicList = filterEventsByDate(value);
    return filteredEconomicList.length;
  }, [filterEventsByDate]);
  // 年度数据展示
  const monthCellRender = useCallback((value: Moment) => {
    const num = getMonthData(value);
    return num ? (
      <div>
        <section>{num}</section>
        <span>当前月份重大事件</span>
      </div>
    ) : null;
  }, [getMonthData]);
  // 月度数据展示
  const dateCellRender = useCallback((value: Moment) => {
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
  }, [filterEventsByDate, handleOpen]);

  const parseEventData = (item: BaseEventType) => {
    try {
      return JSON.parse(item.data);
    } catch (error) {
      console.error('Failed to parse item.data:', error);
      return {};
    }
  };

  const onSelect = useCallback(async (newValue: Moment) => {
    setDateValue(newValue);
    await getEventList(newValue);
  }, []);

  const onPanelChange = useCallback((newValue: Moment) => {
    setDateValue(newValue);
  }, []);
  // 获取事件接口数据
  const getEventList = useCallback(async (time: Moment) => {
    setIsLoading(true);
    try {
      const response = await MarketService.getEvents(time);
      if (!response || !response.data) {
        console.warn("Invalid response data", response);
        return;
      }
      setEventList(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const renderItem = useCallback(
    (item: EventOrEconomicItem, type: 'economic' | 'event') => (
      <List.Item
      // actions={item.vip_resource && item.vip_resource.length > 0 && (
      //   <a href={item.vip_resource[0].link}>{item.vip_resource[0].title}</a>
      // )}
      >
        <Skeleton avatar title={false} loading={isLoading} active>
          <Col span={6} >
            <List.Item.Meta
              avatar={<Avatar src={countryFlagsMemo[item.country]} />}
              title={
                <div>
                  {item.country}{' '}
                  <Rate allowHalf disabled defaultValue={item.star} />
                </div>
              }
              description={type === 'economic' ? moment(item.pub_time).utc().format('YYYY-MM-DD HH:mm:ss') : moment(item.event_time).utc().format('YYYY-MM-DD HH:mm:ss')}
            />
          </Col>
          <Col span={12}>
            <div>
              {type === 'economic' ? item.name : item.event_content}&nbsp;
              {type === 'economic' ? (
                <span >
                  <Text type="warning">{item.previous}</Text>&nbsp;{item.unit ?? ''}
                </span>
              ) : ''}
            </div>
          </Col>

          <Col span={2}>
            <div>
              {type === 'economic' ? item.vip_resource?.map(item => (
                <a href={item.link}>{item.title}</a>
              )) : item.vip_resource?.map(item => (
                <a href={item.link}>{item.title}</a>
              ))}
            </div>
          </Col>

        </Skeleton>
      </List.Item >
    ),
    [isLoading, countryFlagsMemo]
  );

  const setModalBar: MenuProps['onClick'] = e => {
    console.log('click ', e);
    setShowBar(e.key);
  };

  return (
    <div>
      <Alert message={`当前选择查看日期: ${dateValue.format('YYYY-MM-DD')}`} />
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
      <Modal
        title={<Menu onClick={setModalBar} selectedKeys={[showBar]} mode="horizontal" items={items} />}
        centered
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width={1000}
      >
        {showBar === 'economic' ? (
          <List
            loading={isLoading}
            itemLayout="horizontal"
            pagination={{
              pageSize: 5,
            }}
            dataSource={eventList.economic}
            renderItem={item => renderItem(item, 'economic')}
          />
        ) : (
          <List
            loading={isLoading}
            itemLayout="horizontal"
            pagination={{
              pageSize: 5,
            }}
            dataSource={eventList.event}
            renderItem={item => renderItem(item, 'event')}
          />
        )}
      </Modal>
    </div>
  );
};

export default CalendarList;