import { Alert, Avatar, Col, List, Modal, Rate, Skeleton } from 'antd';
import { economicType, eventType, countryFlags } from './data.d';
import { Moment } from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { MarketService } from '../../../service/';

const Text: React.FC<{ time: Moment, showBar: string }> = ({ time, showBar }) => {
    const [economicList, setEconomicList] = useState<economicType[]>([]);
    const [eventList, setEventList] = useState<eventType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const countryFlagsMemo = useMemo(() => countryFlags, [countryFlags]);

    const getEventList = async (time: Moment) => {
        setIsLoading(true);
        try {
            const response = await MarketService.getEvents(time);

            if (!response || !response.data) {
                console.warn("Invalid response data", response);
                return;
            }

            console.log(response.data, 'response.data');
            setEventList(response.data);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getEventList(time);
    }, [time]);

    return (
        <div>
            {showBar === 'economic' ? (
                <List
                    loading={isLoading}
                    itemLayout="horizontal"
                    pagination={{
                        pageSize: 5,
                        // total: eventList.economic?.length ?? 0,
                        // onChange: handlePageChange,
                        // showSizeChanger: true,
                    }}
                    dataSource={eventList.economic}
                    renderItem={(item) => (
                        <List.Item
                            actions={item.vip_resource && item.vip_resource.length > 0 && (
                                <a href={item.vip_resource[0].link}>{item.vip_resource[0].title}</a>
                            )}
                        >
                            <Skeleton avatar title={false} loading={isLoading} active>
                                <List.Item.Meta
                                    avatar={<Avatar src={countryFlagsMemo[item.country]} />}
                                    title={
                                        <div>
                                            {item.country}{' '}
                                            <Rate allowHalf disabled defaultValue={item.star} />
                                        </div>
                                    }
                                    description={item.pub_time}
                                />
                                <Col span={17} offset={0}>
                                    <div>{item.name}</div>
                                </Col>
                            </Skeleton>
                        </List.Item>
                    )}
                />
            ) : (
                <List
                    loading={isLoading}
                    itemLayout="horizontal"
                    pagination={{
                        pageSize: 5,
                        // total: eventList.economic?.length ?? 0,
                        // onChange: handlePageChange,
                        // showSizeChanger: true,
                    }}
                    dataSource={eventList.event}
                    renderItem={(item) => (
                        <List.Item
                            actions={item.vip_resource && item.vip_resource.length > 0 && (
                                <a href={item.vip_resource[0].link}>{item.vip_resource[0].title}</a>
                            )}
                        >
                            <Skeleton avatar title={false} loading={isLoading} active>
                                <List.Item.Meta
                                    avatar={<Avatar src={countryFlagsMemo[item.country]} />}
                                    title={
                                        <div>
                                            {item.country}
                                            <Rate allowHalf disabled defaultValue={item.star} />
                                        </div>
                                    }
                                    description={item.event_time}
                                />
                                <Col span={17} offset={0}>
                                    <div>{item.event_content}</div>
                                </Col>
                            </Skeleton>
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
};

export default Text;