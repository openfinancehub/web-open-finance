import React, { useCallback, useEffect, useRef, useState } from 'react'
import { List, Rate, Image, Grid, Collapse, CalendarPickerView, Button, DatePicker, DotLoading, Footer } from 'antd-mobile'
import { getEvents } from '../../../service';
import { economicType, eventType, countryFlags } from './data.d';
import { history } from '@umijs/max';
import moment from "moment";
import styles from '../styles.less';
import { useNavigate, } from 'react-router-dom'


export default () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false)
    const [dateTime, setDateTime] = useState(new Date())

    const [economicList, setEconomicList] = useState<economicType[]>([])
    const [eventList, setEventList] = useState<eventType[]>([])
    const [eventOriginal, setEventOriginal] = useState<eventType[]>([]);
    const [economicOriginal, setEconomicOriginal] = useState<economicType[]>([]);

    useEffect(() => {
        getEventList(dateTime);
    }, [])

    const getEventList = async (eTime) => {
        try {
            const time = eTime.getFullYear() + `-` + (eTime.getMonth() + 1) + `-` + eTime.getDate()
            // console.log(time)
            const response = await getEvents(time);
            const {
                economic = [],
                event = [],
            } = response.data || {};


            const startDate = new Date(time);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(time);
            endDate.setHours(23, 59, 59, 999);

            const eventList = event.filter((item: any) => {
                let date = new Date(item.event_time);
                date.setHours(date.getHours() - 8);
                return startDate <= date && date <= endDate;
            })

            const economicList = economic.filter((item: any) => {
                let date = new Date(item.pub_time);
                date.setHours(date.getHours() - 8);
                return startDate <= date && date <= endDate;
            })
            // console.log(dateTime, economicList)
            setEconomicList(economicList)
            setEventList(eventList)

            // setEventOriginal(event)
            // setEconomicOriginal(economic)

        } catch (error) {
            console.error(error)
        }
    }
    // const changeEventList = (time: Date) => {
    //     const startDate = new Date(time);
    //     startDate.setHours(0, 0, 0, 0);
    //     const endDate = new Date(time);
    //     endDate.setHours(23, 59, 59, 999);
    //     const eventList = eventOriginal.filter((item) => {
    //         let date = new Date(item.event_time);
    //         date.setHours(date.getHours() - 8);
    //         return startDate <= date && date <= endDate;
    //     })

    //     const economicList = economicOriginal.filter((item) => {
    //         let date = new Date(item.pub_time);
    //         date.setHours(date.getHours() - 8);
    //         return startDate <= date && date <= endDate;
    //     })

    //     setEconomicList(economicList)
    //     setEventList(eventList)
    // };

    const changeDateValue = (value: number) => {
        const newDateTime = new Date(dateTime);
        newDateTime.setDate(newDateTime.getDate() + value);
        setDateTime(newDateTime);
        // changeEventList(newDateTime)
        getEventList(newDateTime);
    }
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

    return (
        <div className={styles.content} style={{ height: window.innerHeight - 150, touchAction: 'none' }}>
            <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }} columns={3} gap={16}>
                <Grid.Item>
                    <Button onClick={() => {
                        changeDateValue(-1)
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
                    setDateTime(val)
                }}
                renderLabel={labelRenderer}
            />
            <Collapse  >
                <Collapse.Panel key='1' title='经济数据一览' >
                    {economicList.length > 0 ? (
                        economicList.map((item, index) =>
                            <List.Item key={index}
                                prefix={
                                    <Image src={countryFlags[item.country]}
                                        style={{ borderRadius: 20 }}
                                        fit='cover'
                                        width={40}
                                        height={40} />
                                }
                                arrow={false}
                                style={{}}
                            >
                                <Grid columns={8} gap={2}>
                                    <Grid.Item span={7}>
                                        <Grid columns={10} gap={1}>
                                            <Grid.Item span={7} >
                                                {moment(item.pub_time).utc().format('MM-DD HH:mm:ss')}
                                            </Grid.Item>
                                            <Grid.Item span={3}>
                                                <Rate allowHalf readOnly style={{ '--star-size': '13px', '--active-color': '#E24052', }} defaultValue={item.star} />
                                            </Grid.Item>
                                            <Grid.Item style={{ color: "#007ACC" }} span={10} onClick={() => navigate('/home/news/events/info', { state: item.name })}>
                                                {item.name}
                                            </Grid.Item>
                                            <Grid.Item span={4}>
                                                前值: {item.previous === null ? "---" : item.previous}
                                            </Grid.Item>
                                            <Grid.Item span={4}>
                                                公布: {item.actual === null ? "---" : item.actual}
                                            </Grid.Item>
                                            <Grid.Item span={2}>
                                                <Footer
                                                    links={[
                                                        {
                                                            text: item.video_url === null ? '' : '视频地址',
                                                            href: item.video_url === null ? "---" : item.video_url,
                                                        },
                                                    ]}
                                                />
                                            </Grid.Item>
                                            <Grid.Item span={10}>
                                                vip内容:
                                                {
                                                    item.vip_resource === null ? '暂无内容' : ''
                                                }
                                            </Grid.Item>
                                        </Grid>
                                    </Grid.Item>
                                </Grid>
                            </List.Item>
                        )
                    ) : (
                        <div>暂无数据</div>
                    )}
                </Collapse.Panel>
                <Collapse.Panel key='2' title='重大事件'>
                    {eventList.length > 0 ? (
                        eventList.map((item, index) =>
                            <List.Item key={index}
                                prefix={
                                    <Image src={countryFlags[item.country]}
                                        style={{ borderRadius: 20 }}
                                        fit='cover'
                                        width={40}
                                        height={40} />
                                }
                                // onClick={() => { history.push('/home/news/stocks/info'); }}
                                arrow={false}
                            >
                                <Grid columns={8} gap={2}>
                                    <Grid.Item span={7}>
                                        <Grid columns={10} gap={1}>
                                            <Grid.Item span={7} >
                                                {moment(item.event_time).utc().format('MM-DD HH:mm:ss')}
                                            </Grid.Item>
                                            <Grid.Item span={3}>
                                                <Rate allowHalf readOnly style={{ '--star-size': '13px', '--active-color': '#E24052' }} defaultValue={item.star} />
                                            </Grid.Item>
                                            <Grid.Item style={{ color: "#007ACC" }} span={10} onClick={() => navigate('/home/news/events/info', { state: item.event_content })}>
                                                {item.event_content}
                                            </Grid.Item>
                                            <Grid.Item span={3}>
                                                <Footer
                                                    chips={[{
                                                        text: 'vip内容:',
                                                    }]}
                                                />
                                            </Grid.Item>
                                            <Grid.Item span={3}>
                                                <Footer
                                                    links={[
                                                        {
                                                            text: item.vip_resource === null ? '' : '网上直播',
                                                            href: (item.vip_resource === null ? '' : item.vip_resource[0].link) as string,
                                                        },
                                                    ]}
                                                />
                                            </Grid.Item>
                                        </Grid>
                                    </Grid.Item>
                                </Grid>
                            </List.Item>
                        )
                    ) : (
                        <div>暂无数据</div>
                        // <DotLoading />
                    )}
                </Collapse.Panel>
            </Collapse >
        </div >
    )
}
