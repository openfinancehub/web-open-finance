import React, { useState } from 'react'
import { InfiniteScroll, List, DotLoading } from 'antd-mobile'
import { getNews } from '../../../service';

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
    const [data, setData] = useState<string[]>([])
    const [hasMore, setHasMore] = useState(true)
    async function loadMore() {
        const append = await getNews();
        try {
            if (append?.result.data) {
                const values = Object.values(append?.result.data)
                console.log(data)
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
            <List>
                {data.map((news, index) => (
                    <List.Item key={index}>
                        <h2><List.Item>{news.title}</List.Item></h2>
                        <List.Item>{news.content}</List.Item>
                    </List.Item>
                ))}
            </List>
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
                <InfiniteScrollContent hasMore={hasMore} />
            </InfiniteScroll>
        </>
    )
}