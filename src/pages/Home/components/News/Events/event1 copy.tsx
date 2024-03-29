import React, { useCallback, useEffect, useRef, useState } from 'react'
import { List, Rate, Image, Divider, Button, DatePicker, Toast, Space, Grid } from 'antd-mobile'
import { getEvents } from '../../../service';
import { Radio, Timeline } from 'antd';
import moment from "moment";
type eventsType = {
    title: string,
    items: eventsListType[],
}[];

type eventsListType = {
    avatar: string,
    name: string,
    description: string,
    rate: number,
    time: string,
}

const createData = (titles: string[], description: any[]): eventsType => {
    return titles.map((title, index) => ({
        title,
        items: description[index]
    }));
};


export default () => {

    const [eventList, setEventList] = useState<eventsType>([])
    const [originalData, setOriginalData] = useState<eventsType>([]);
    const [visible, setVisible] = useState(false)
    const [dateValue, setDateValue] = useState(new Date())

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatter = new Intl.DateTimeFormat('zh-CN', options);

    const labelRenderer = useCallback((type: string, data: number) => {
        switch (type) {
            case 'year':
                return data + '年'
            case 'month':
                return data + '月'
            case 'day':
                return data + '日'
            case 'hour':
                return data + '时'
            case 'minute':
                return data + '分'
            case 'second':
                return data + '秒'
            default:
                return data
        }
    }, [])

    const getEventList = async () => {
        const response = await getEvents();
        const keys = Object.keys(response.data);
        const values = Object.values(response.data) as eventsListType[];
        const events = createData(keys, values);
        setEventList(events);
        setOriginalData(events);
        console.log(events, "events");
    }
    //过滤eventList中时间日期
    const changeEventList = (time: Date) => {
        const filtered = eventList.map((event) => {
            const startDate = new Date(time);
            const endDate = new Date(time);
            endDate.setDate(endDate.getDate() + 1);
            const newEvents = event.items.filter(item => {
                const eventTime = new Date(item.time);
                return startDate <= eventTime && eventTime <= endDate;
            });
            return {
                title: newEvents.length === 0 ? "" : event.title,
                items: newEvents,
            };
        });
        setOriginalData(filtered);
    };


    useEffect(() => {
        getEventList()
    }, [])

    return (
        <div style={{ height: window.innerHeight - 150, touchAction: 'none' }}>
            <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} columns={3} gap={16}>
                <Grid.Item>
                    <Button onClick={() => {
                        dateValue.setDate(dateValue.getDate() - 1)
                        changeEventList(dateValue)
                    }}> 前一日
                    </Button>
                </Grid.Item>
                <Grid.Item>
                    <span
                        style={{ fontSize: 18, }}
                        onClick={() => {
                            setVisible(true)
                        }}
                    >
                        {formatter.format(dateValue)}
                    </span>
                </Grid.Item>
                <Grid.Item>
                    <Button onClick={() => {
                        dateValue.setDate(dateValue.getDate() + 1)
                        changeEventList(dateValue)
                    }}> 后一日
                    </Button>
                </Grid.Item>
            </Grid>

            <DatePicker
                visible={visible}
                onClose={() => {
                    setVisible(false)
                }}
                onConfirm={val => {
                    changeEventList(val)
                    setDateValue(val)
                }}
                renderLabel={labelRenderer}
            />
            {originalData.map((event, index) => (
                <Timeline mode="left" key={index}>
                    <Divider contentPosition='left'><h2 style={{ color: "#E92838" }}>{event.title}</h2></Divider>
                    {event.items.map((item, index) => (
                        <Timeline.Item key={event.title + item.name}>
                            <Grid columns={8} gap={2}>
                                <Grid.Item >
                                    <Image src={item.avatar}
                                        style={{ borderRadius: 20 }}
                                        fit='cover'
                                        width={40}
                                        height={40}
                                    />
                                </Grid.Item>
                                <Grid.Item span={7}>
                                    <Grid columns={10} gap={1}>
                                        <Grid.Item span={2} style={{ color: "#007ACC" }}>
                                            {moment(item.time).format('HH:mm:ss')}
                                        </Grid.Item>
                                        <Grid.Item span={8}>
                                            {item.name}
                                        </Grid.Item>
                                        <Grid.Item span={10}>
                                            {item.description}
                                        </Grid.Item>
                                    </Grid>
                                </Grid.Item>
                            </Grid>
                        </Timeline.Item>
                    ))}
                </Timeline>
            ))}
        </div >
    )
}