import React, { useEffect, useRef, useState } from 'react'
import { IndexBar, List } from 'antd-mobile'
import { IndexBarRef } from 'antd-mobile/es/components/index-bar'
import { getEvents } from '../../../service';

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

const data = {
    "经济数据一览": [
        {
            avatar:
                'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
            name: '中国2月社会融资规模(亿元)',
            description: 'Commodi earum exercitationem id numquam vitae',
            rate: 3.5,
        },
        {
            avatar:
                'https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
            name: '中国2月M1货币供应年率',
            description: '中国2月社会融资规模(亿元)',
            rate: 2.5,
        },
        {
            avatar:
                'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
            name: '中国2月新增人民币贷款(亿元)',
            description: 'Deserunt dolor ea eaque eos',
            rate: 4,
        },
        {
            avatar:
                'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
            name: '中国2月M2货币供应年率',
            description: 'Animi eius expedita, explicabo',
            rate: 3,
        },
    ],
    "港股时段": [
        {
            avatar:
                'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
            name: '中国2月社会融资规模(亿元)',
            description: 'Commodi earum exercitationem id numquam vitae',
            rate: 3.5,
        },
        {
            avatar:
                'https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
            name: '中国2月M1货币供应年率',
            description: '中国2月社会融资规模(亿元)',
            rate: 2.5,
        },
        {
            avatar:
                'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
            name: '中国2月新增人民币贷款(亿元)',
            description: 'Deserunt dolor ea eaque eos',
            rate: 4,
        },
    ],
}

const getRandomList = (min: number, max: number): string[] => {
    return new Array(Math.floor(Math.random() * (max - min) + min)).fill('')
}

function lorem(count = 1) {
    const words = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
    ];
    let result = '';
    for (let i = 0; i < count; i++) {
        result += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return result.trim();
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
    const indexBarRef = useRef<IndexBarRef>(null)
    const [eventList, setEventList] = useState<eventsType>([])
    // const [events, setEvents] = useState<eventsListType[]>([])
    const eventGroups = Array(26)
        .fill('')
        .map((_, i) => ({
            title: String.fromCharCode('A'.charCodeAt(0) + i),
            items: eventList.map(event => (
                event.items
            )),
        }))

    const getEventList = async () => {
        const response = await getEvents();
        const keys = Object.keys(response.data);
        const values = Object.values(response.data) as eventsListType[];
        const events = createData(keys, values);
        // setEvents(values)
        setEventList(events);
        console.log(values, "values");
        // console.log(events, "events");
        // console.log(eventGroups, 'eventGroups')
        // console.log(eventList, "eventList");
    }
    // async function getEventList() {
    //     const response = await getEvents();
    //     const keys = Object.keys(response.data);
    //     const values = Object.values(response.data);
    //     const events = keys.map((key, index) => ({ key, value: values[index] }));

    //     const test: eventsType = events.reduce((accumulator, item) => {
    //         const key = item.key as string;
    //         const value = item.value as eventsListType[];
    //         return { ...accumulator, [key]: value };
    //     }, {} as eventsType);

    //     console.log(test, "test");
    //     setEventList(test);
    // }


    useEffect(() => {
        getEventList()
    }, [])

    return (
        <div style={{ height: window.innerHeight - 150 }}>
            <IndexBar ref={indexBarRef}>
                {eventGroups.map(group => {
                    // const { title, items } = group
                    console.log(group, "group");

                    return (
                        <IndexBar.Panel
                            index={group.title}
                            title={`标题${group.title}`}
                            key={`标题${group.title}`}
                        >
                            {group.items.map((a, index) => (
                                <List>
                                    {a.map(b => <List.Item key={group.title + index}>{b.name}</List.Item>)}
                                </List>
                            ))}
                        </IndexBar.Panel>

                    )
                })}
            </IndexBar>
        </div>
    )
}
