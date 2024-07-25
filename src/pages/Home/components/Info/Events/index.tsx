import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { List, Rate, Image, Grid, Collapse, Button, DatePicker, Footer, DotLoading } from 'antd-mobile';
import { MarketService } from '../../../service/';
import { economicType, eventType, countryFlags } from './data.d';
import moment from "moment";
import { useNavigate, } from 'react-router-dom';
import CalendarList from './CalendarList';

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
        <div style={{ touchAction: 'none' }}>
            <div>
                <CalendarList />
            </div>

            <Collapse  >
                <Collapse.Panel key='1' title='经济数据一览' >
                    {isLoading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                            <DotLoading color="primary" />
                        </div>
                    ) : (
                        economicList.length > 0 ? (
                            economicList.map((item, index) =>
                                <List.Item key={index}
                                    prefix={
                                        <Image src={countryFlagsMemo[item.country]}
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
                                                    {formatTime(item.pub_time)}
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
                                                    {item.video_url && item.video_url.length > 0 && (
                                                        <Footer
                                                            links={[
                                                                {
                                                                    text: '视频地址',
                                                                    href: item.video_url,
                                                                },
                                                            ]}
                                                        />
                                                    )}
                                                </Grid.Item>
                                                <Grid.Item span={10}>
                                                    vip内容:
                                                    {item.vip_resource && item.vip_resource.length > 0 && (
                                                        item.vip_resource ? '暂无内容' : ''
                                                    )}
                                                </Grid.Item>
                                            </Grid>
                                        </Grid.Item>
                                    </Grid>
                                </List.Item>
                            )
                        ) : <div>暂无数据</div>
                    )}
                </Collapse.Panel>
                <Collapse.Panel key='2' title='重大事件'>
                    {isLoading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                            <DotLoading color="primary" />
                        </div>
                    ) : (
                        eventList.length > 0 ? (
                            eventList.map((item, index) =>
                                <List.Item key={index}
                                    prefix={
                                        <Image src={countryFlags[item.country]}
                                            style={{ borderRadius: 20 }}
                                            fit='cover'
                                            width={40}
                                            height={40} />
                                    }
                                    arrow={false}
                                >
                                    <Grid columns={8} gap={2}>
                                        <Grid.Item span={7}>
                                            <Grid columns={10} gap={1}>
                                                <Grid.Item span={7} >
                                                    {formatTime(item.event_time)}
                                                </Grid.Item>
                                                <Grid.Item span={3}>
                                                    <Rate allowHalf readOnly style={{ '--star-size': '13px', '--active-color': '#E24052' }} defaultValue={item.star} />
                                                </Grid.Item>
                                                <Grid.Item style={{ color: "#007ACC" }} span={10} onClick={() => navigate('/home/news/events/info', { state: item.event_content })}>
                                                    {item.event_content}
                                                </Grid.Item>
                                                <Grid.Item span={3}>
                                                    {/* <Footer
                                                    chips={[{
                                                        text: 'vip内容:',
                                                    }]}
                                                /> */}
                                                    vip内容:
                                                </Grid.Item>
                                                <Grid.Item span={3}>
                                                    {item.vip_resource && item.vip_resource.length > 0 && (
                                                        <Footer
                                                            links={[
                                                                {
                                                                    text: item.vip_resource ? '' : '网上直播',
                                                                    href: (item.vip_resource ? '' : item.vip_resource[0].link) as string,
                                                                },
                                                            ]}
                                                        />
                                                    )}
                                                </Grid.Item>
                                            </Grid>
                                        </Grid.Item>
                                    </Grid>
                                </List.Item>
                            )
                        ) : <div>暂无数据</div>
                    )}
                </Collapse.Panel>
            </Collapse >
        </div >
    )
}

export default Event;
