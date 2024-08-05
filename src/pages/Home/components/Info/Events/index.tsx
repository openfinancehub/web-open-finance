import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { List, Rate, Image, Grid, Collapse, Button, DatePicker, Footer, DotLoading } from 'antd-mobile';
import { MarketService } from '../../../service/';
import { economicType, eventType, countryFlags } from './data.d';
import moment from "moment";
import { useNavigate, } from 'react-router-dom';
import CalendarList from './CalendarList';
import EventTest from './event';
import { ProCard } from '@ant-design/pro-components';

const Event: React.FC = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [dateTime, setDateTime] = useState(new Date());

    const [economicList, setEconomicList] = useState<economicType[]>([]);
    const [eventList, setEventList] = useState<eventType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    // 格式化时间的函数
    const formatTime = (time: Date) => moment(time).utc().format('MM-DD HH:mm:ss');

    const countryFlagsMemo = useMemo(() => countryFlags, [countryFlags]);
    const setVisibleCallback = useCallback(() => setVisible(false), [setVisible]);

    const getEventList = async (eTime: Date) => {
        setIsLoading(true);
        try {
            const time = eTime.getFullYear() + "-" + (eTime.getMonth() + 1) + "-" + eTime.getDate();

            const response = await MarketService.getEvents(time);

            if (!response || !response.data) {
                console.warn("Invalid response data", response);
                return;
            }

            const startDate = new Date(time);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(time);
            endDate.setHours(23, 59, 59, 999);

            const filterEconomicList = (items: economicType[]) => {
                return items.filter((item) => {
                    const date = new Date(item.pub_time);
                    date.setHours(date.getHours() - 8);
                    return startDate <= date && date <= endDate;
                });
            };

            const filterEventList = (items: eventType[]) => {
                return items.filter((item) => {
                    const date = new Date(item.event_time);
                    date.setHours(date.getHours() - 8);
                    return startDate <= date && date <= endDate;
                });
            };

            setEconomicList(filterEconomicList(response.data.economic as economicType[]));
            setEventList(filterEventList(response.data.event as eventType[]));
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };



    const labelRenderer = useCallback((type: string, data: number) => {
        switch (type) {
            case 'year':
                return data + '年';
            case 'month':
                return data + '月';
            case 'day':
                return data + '日';
            case 'hour':
                return data + '时';
            case 'minute':
                return data + '分';
            case 'second':
                return data + '秒';
            default:
                return data;
        }
    }, []);

    useEffect(() => {
        const initialLoad = async () => {
            try {
                const eTime = new Date();
                await getEventList(eTime);
            } catch (error) {
                console.error(error);
            }
        };
        initialLoad();
    }, []);

    return (
        <ProCard direction="row" wrap>

            <ProCard >
                <CalendarList />
            </ProCard>
            <ProCard >
                <EventTest />
            </ProCard>

        </ProCard >
    )
}

export default Event;
