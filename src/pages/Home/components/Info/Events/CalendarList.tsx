import type { BadgeProps } from 'antd';
import { Alert, Badge, Calendar } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { MarketService } from '../../../service/';
import { economicType, eventType, countryFlags } from './data.d';

interface dataType {
  economic: economicType[],
  event: eventType[],
  future_economic: {},
  future_event: {},
}

const getMonthData = (value: Moment) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const App: React.FC = () => {

  const [dateValue, setDateValue] = useState(() => moment(new Date()));

  const [dataList, setDataList] = useState<dataType>({
    economic: [], event: [], future_economic: {}, future_event: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  const getListData = (value: Moment) => {
    const targetDate = value;

    // 过滤 economicList
    const filteredEconomicList = dataList.economic.filter(item => {
      const pubTime = moment.unix(item.pub_time_unix);
      return pubTime.isSame(targetDate, 'day');
    });

    // 过滤 eventList
    const filteredEventList = dataList.event.filter(item => {
      const pubTime = moment(item.event_time);
      return pubTime.isSame(targetDate, 'day');
    });

    // 合并两个过滤后的列表
    const filteredListData = {
      economic: filteredEconomicList,
      event: filteredEventList
    };

    return filteredListData;
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
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Moment) => {
    const listData = getListData(value);
    return (
      <ul >
        {listData.economic.map((item, index) => (
          <li key={item.id}>
            <div>{item.name}</div>
          </li>
        ))}
        {listData.event.map(item => (
          <li key={item.id}>
            <div>{item.event_content}</div>
          </li>
        ))}
      </ul>
    );
  };

  const onSelect = (newValue: Moment) => {
    setDateValue(newValue);
  };

  const onPanelChange = (newValue: Moment) => {
    setDateValue(newValue);
  };

  return <div>
    <Alert message={`You selected date: ${dateValue?.format('YYYY-MM-DD')}`} />
    <Calendar dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
      onSelect={onSelect}
      onPanelChange={onPanelChange} />
  </div>;
};

export default App;