import React, { useState, useEffect } from 'react'
import { IndexBar, List, Rate } from 'antd-mobile'
import { getNews } from '../../../service';

interface newsType {
    id: string,
    avatar: string,
    name: string,
    description: string,
    rate: number,
}

export default () => {
    const [newsList, setNewsList] = useState<newsType[]>([])

    const getRandomList = async () => {
        try {
            const response = await getNews();
            const values = Object.values(response.data) as newsType[]
            setNewsList(values)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getRandomList();
    }, [])
    // 生成标题索引
    const groups = Array.from({ length: 26 }, (_, i) => ({
        title: String.fromCharCode('A'.charCodeAt(0) + i),
        items: newsList,
    }))

    return (
        <div style={{ height: window.innerHeight - 120 }}>
            <IndexBar>
                {groups.map(group => {
                    const { title, items } = group
                    return (
                        <IndexBar.Panel
                            index={title}
                            title={`标题${title}`}
                            key={`标题${title}`}
                        >
                            <List>
                                {items.map((item, index) => (
                                    <List.Item key={index}
                                        prefix={
                                            <span style={{ color: '#ff5500' }}>|</span>
                                        }>
                                        <div>
                                            <span style={{ fontSize: '10px', color: '#969597' }}>重要性</span>
                                            <Rate allowHalf readOnly value={item.rate}
                                                style={{
                                                    '--star-size': '10px',
                                                }} />
                                        </div>
                                        {item.name}
                                    </List.Item>
                                ))}
                            </List>
                        </IndexBar.Panel>
                    )
                })}
            </IndexBar>
        </div>
    )
}
