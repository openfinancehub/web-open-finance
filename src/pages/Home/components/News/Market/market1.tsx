import React, { useState } from 'react'
import { InfiniteScroll, List, DotLoading } from 'antd-mobile'
import { getMarket } from '../../../service'
import { Input, Button } from 'antd'

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

  const [searchText, setSearchText] = React.useState('');
  const [news, setNews] = React.useState(data);
  const [original, setOriginal] = React.useState(data);

  const handleSearch = () => {
    const searchResult = original.filter(s => s.includes(searchText));
    setNews(searchResult);
  };

  async function loadMore() {
    const append = await getMarket();
    try {
      if (append?.result.data) {
        const dataValues = Object.values(append.result.data) as string[];
        console.log(dataValues);
        const values = [...data, ...dataValues];
        setData(values);
        setOriginal(values);
        setHasMore(values.length > 0)
      }
    } catch (err) {
      // console.error(err)
      setHasMore(false);
    }
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          style={{ flex: 1, marginRight: '10px' }}
          placeholder="请输入搜索关键词"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <Button style={{ height: '35px' }} onClick={handleSearch}>搜索</Button>
      </div>
      <div >
        <List >
          {data.map((item, index) => (
            <List.Item key={index}>{item}</List.Item>
          ))}
        </List>
      </div>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
        <InfiniteScrollContent hasMore={hasMore} />
      </InfiniteScroll>
    </>
  )
}
