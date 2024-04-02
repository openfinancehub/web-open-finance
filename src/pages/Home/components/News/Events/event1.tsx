import React, { useCallback, useEffect, useRef, useState } from 'react'
import { List, Rate, Image, Grid, Collapse, CalendarPickerView, Button, DatePicker } from 'antd-mobile'
import { getEvents } from '../../../service';
import { economicType, eventType, countryFlags } from './data.d';
import { Timeline } from 'antd';
import moment from "moment";



export default () => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC',
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);

    const [visible, setVisible] = useState(false)
    const [dateTime, setDateTime] = useState(new Date())

    const [economicList, setEconomicList] = useState<economicType[]>([])
    const [eventList, setEventList] = useState<eventType[]>([])
    const [eventOriginal, setEventOriginal] = useState<eventType[]>([]);
    const [economicOriginal, setEconomicOriginal] = useState<economicType[]>([]);

    useEffect(() => {
        getEventList();
    }, [])



    const getEventList = async () => {
        try {
            const response = await getEvents();
            const {
                economic = [],
                event = [],
            } = response.data || {};

            setEconomicList(economic)
            setEventList(event)

            setEventOriginal(event)
            setEconomicOriginal(economic)
        } catch (error) {
            console.error(error)
        }
    }

    const changeEventList = (time: Date) => {
        const startDate = new Date(time);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(time);
        endDate.setHours(23, 59, 59, 999);
        // console.log(startDate, endDate, '时间范围')
        const eventList = eventOriginal.filter((item) => {
            let date = new Date(item.event_time);
            date.setHours(date.getHours() - 8);
            return startDate <= date && date <= endDate;
        })

        const economicList = economicOriginal.filter((item) => {
            let date = new Date(item.pub_time);
            date.setHours(date.getHours() - 8);
            return startDate <= date && date <= endDate;
        })

        setEconomicList(economicList)
        setEventList(eventList)

    };

    const changeDateValue = (value: number) => {
        const newDateTime = new Date(dateTime);
        newDateTime.setDate(newDateTime.getDate() + value);
        setDateTime(newDateTime);
        changeEventList(newDateTime)
    }


    return (
        <div style={{ height: window.innerHeight - 150, touchAction: 'none' }}>
            <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }} columns={3} gap={16}>
                <Grid.Item>
                    <Button onClick={() => {
                        changeDateValue(-1)
                        // changeEventList(dateTime)
                    }}> 前一日
                    </Button>
                </Grid.Item>
                <Grid.Item>
                    <span style={{ fontSize: 18, }}
                        onClick={() => {
                            setVisible(true)
                        }}  >
                        {dateTime.getFullYear()}年{dateTime.getMonth() + 1}月{dateTime.getDate()}日
                    </span>
                </Grid.Item>
                <Grid.Item>
                    <Button onClick={() => {
                        changeDateValue(1)
                        // changeEventList(dateTime)
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
                    changeDateValue(val.getDate() - dateTime.getDate())
                    // changeEventList(dateTime)
                    setDateTime(val)
                }}
            // renderLabel={labelRenderer}
            />
            <Collapse >
                <Collapse.Panel key='1' title='经济数据一览'>
                    {economicList.length > 0 ? (
                        economicList.map((item, index) =>
                            <Timeline.Item key={index}>
                                <Grid columns={8} gap={2}>
                                    <Grid.Item >
                                        <Image src={countryFlags[item.country]} />
                                    </Grid.Item>
                                    <Grid.Item span={7}>
                                        <Grid columns={10} gap={1}>
                                            <Grid.Item span={6} style={{ color: "#007ACC" }}>
                                                {formatter.format(new Date(item.pub_time))}
                                            </Grid.Item>
                                            <Grid.Item span={8}>
                                                <Rate allowHalf readOnly style={{ '--star-size': '13px' }} defaultValue={item.star} />
                                            </Grid.Item>
                                            <Grid.Item span={10}>
                                                {item.name}
                                            </Grid.Item>
                                            <Grid.Item span={4}>
                                                前值： {item.previous}
                                            </Grid.Item>
                                            <Grid.Item span={4}>
                                                当日： {item.actual}
                                            </Grid.Item>
                                        </Grid>
                                    </Grid.Item>
                                </Grid>
                            </Timeline.Item>
                        )
                    ) : (
                        <div>暂无数据</div>
                    )}
                </Collapse.Panel>
                <Collapse.Panel key='2' title='重大事件'>
                    {eventList.length > 0 ? (
                        eventList.map((item, index) =>
                            <Timeline.Item key={index}>
                                <Grid columns={8} gap={2}>
                                    <Grid.Item >
                                        <Image src={countryFlags[item.country]} />
                                    </Grid.Item>
                                    <Grid.Item span={7}>
                                        <Grid columns={10} gap={1}>
                                            <Grid.Item span={6} style={{ color: "#007ACC" }}>
                                                {/* {moment(item.event_time).format('yyyy-MM-DD HH:mm:ss')} */}
                                                {formatter.format(new Date(item.event_time))}
                                            </Grid.Item>
                                            <Grid.Item span={8}>
                                                <Rate allowHalf readOnly style={{ '--star-size': '13px' }} defaultValue={item.star} />
                                            </Grid.Item>
                                            <Grid.Item span={10}>
                                                {item.event_content}
                                            </Grid.Item>
                                        </Grid>
                                    </Grid.Item>

                                </Grid>
                            </Timeline.Item>
                        )
                    )
                        : (
                            <div>暂无数据</div>
                        )}
                </Collapse.Panel>
            </Collapse>
        </div >
    )
}
