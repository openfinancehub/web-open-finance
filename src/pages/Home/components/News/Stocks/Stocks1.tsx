import React, { useState, useEffect } from 'react'
import { InfiniteScroll, List, DotLoading, Ellipsis, Button, Image, Rate } from 'antd-mobile'
import { getFocusedStocks } from '../../../service';

interface newsType {
  id: string,
  avatar: string,
  name: string,
  description: string,
  rate: number,
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

  async function loadMore() {
    const response = await getFocusedStocks();
    try {
      const values = Object.values(response.data) as newsType[]

      setNewsList(values)
      setHasMore(values.length > 0)
    } catch (err) {
      setHasMore(false);
    }
  }
  useEffect(() => {
    loadMore();
  }, [])

  return (
    <>
      <List>
        {newsList.map((news, index) => (
          <List.Item key={index}
            prefix={<Image src={news.avatar}
              style={{ borderRadius: 20 }}
              fit='cover'
              width={40}
              height={40}
            />}
            description={news.description}
          >
            <div> <Rate allowHalf readOnly value={news.rate}
              style={{
                '--star-size': '15px',
              }} />
            </div>
            <div>{news.name}</div>
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
        <InfiniteScrollContent hasMore={hasMore} />
      </InfiniteScroll>
    </>
  )
}