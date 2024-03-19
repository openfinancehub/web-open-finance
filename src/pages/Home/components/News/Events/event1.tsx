import React, { useEffect, useRef, useState } from 'react'
import { IndexBar, List, Rate, Image } from 'antd-mobile'
import { IndexBarRef } from 'antd-mobile/es/components/index-bar'
import { getEvents } from '../../../service';
import { ProList } from '@ant-design/pro-components';

type eventsType = {
    title: string,
    items: eventsListType[],
}[];
// type eventsType = { [key: string]: eventsListType[] };

type eventsListType = {
    avatar: string,
    name: string,
    description: string,
    rate: number,
}

const createData = (titles: string[], description: any[]): eventsType => {
    if (titles.length !== description.length) {
        throw new Error('error');
    }
    return titles.map((title, index) => ({
        title,
        items: description[index] as eventsListType[]
    }));
};

export default () => {

    const [eventList, setEventList] = useState<eventsType>([])

    const getEventList = async () => {
        const response = await getEvents();
        const keys = Object.keys(response.data);
        const values = Object.values(response.data) as eventsListType[];
        const events = createData(keys, values);
        // setEvents(values)
        setEventList(events);
        console.log(values, "values");

    }

    useEffect(() => {
        getEventList()
    }, [])

    return (
        <div style={{ height: window.innerHeight - 150 }}>
            <ProList
                itemLayout="vertical"
                rowKey="id"
                dataSource={eventList}
                metas={{
                    title: {},
                    description: {
                        dataIndex: 'description',
                        title: '',
                        render: (_, item) => {
                            return (
                                item.items.map((event, index) => (
                                    <List key={item.title + event.name}>
                                        <List.Item
                                            prefix={<Image src={event.avatar}
                                                style={{ borderRadius: 20 }}
                                                fit='cover'
                                                width={40}
                                                height={40}
                                            />}
                                            description={event.name}
                                        >
                                            <span style={{ fontSize: '10px', color: '#217DFF' }}>重要性 </span>
                                            <Rate allowHalf readOnly value={event.rate}
                                                style={{
                                                    '--star-size': '10px',
                                                }} />
                                        </List.Item>
                                    </List>
                                ))
                            );
                        },
                    },
                }}
            />
        </div>
    )
}
