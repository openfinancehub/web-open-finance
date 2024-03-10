import React, { useState } from 'react'
import { InfiniteScroll, List, DotLoading, Ellipsis, Button } from 'antd-mobile'
import { Input, Space, Spin } from 'antd';
import { getNews } from '../../../service';

interface newsType {
    title: string;
    content: string;
}

const InfiniteScrollContent = ({ hasMore }: { hasMore?: boolean }) => {
    return (
        <>
            {hasMore ? (
                <>
                    <span>Loading</span>
                    <DotLoading />
                </>
            ) : (
                <span>--- 我是有底线的 ---</span>
            )}
        </>
    )
}
export default () => {
    const [newsList, setNewsList] = useState<newsType[]>([])
    const [hasMore, setHasMore] = useState(true)

    const [data, setData] = useState<newsType[]>([]);
    const [searchText, setSearchText] = React.useState('');

    const handleSearch = () => {
        // 在这里处理搜索逻辑，可以根据searchText进行过滤或搜索操作
        // 假设搜索结果为searchResult
        console.log(newsList)
        const searchResult = data.filter(news => news.title.includes(searchText));
        setNewsList(searchResult);
    };

    async function loadMore() {
        const append = await getNews();
        try {
            if (append?.result.data) {
                const values = Object.values(append?.result.data)
                console.log(newsList)
                setNewsList(val => [...val, ...values])
                setData(val => [...val, ...values])
                setHasMore(values.length > 0)
                console.log(values.length)
            }
        } catch (err) {
            // console.error(err)
            setHasMore(false);
        }
    }
    return (
        <>
            {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                <Input
                    style={{ flex: 1, marginRight: '10px' }}
                    placeholder="请输入搜索关键词"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button style={{ height: '35px' }} onClick={handleSearch}>搜索</Button>
            </div> */}
            <List>
                {newsList.map((news, index) => (
                    <List.Item key={index}>
                        <h2><List.Item>{news.title}</List.Item></h2>
                        <Ellipsis
                            direction='end'
                            rows={3}
                            content={news.content}
                            expandText='展开'
                            collapseText='收起'
                        />
                        {/* <List.Item>{news.content}</List.Item> */}
                    </List.Item>
                ))}
            </List>
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
                <InfiniteScrollContent hasMore={hasMore} />
            </InfiniteScroll>
        </>
    )
}