import React from 'react';
import { List, FloatingBubble, Button, Toast } from 'antd-mobile';
import { Input, Space, Spin } from 'antd';
import { MessageFill } from 'antd-mobile-icons'
import { getNews } from '../../service';
import Demo from './Stocks/Demo'
import Indices from './Market/Indices'
import ImportantEvents from './Events/ImportantEvents'
interface newsType {
  title: string;
  content: string;
}


const NewsPage = () => {
  const [newsList, setNewsList] = React.useState<newsType[]>([]);
  const [searchText, setSearchText] = React.useState('');



  const onClick = () => {
    Toast.show('查看了一条关注信息')
  }


  const handleSearch = () => {
    // 在这里处理搜索逻辑，可以根据searchText进行过滤或搜索操作
    // 假设搜索结果为searchResult
    const searchResult = newsList.filter(news => news.title.includes(searchText));
    setNewsList(searchResult);
  };

  return (
    <div>
      <Demo></Demo>
      {/* <Indices /> */}
      {/* <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          style={{ flex: 1, marginRight: '10px' }}
          placeholder="请输入搜索关键词"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button style={{ height: '35px' }} onClick={handleSearch}>搜索</Button>
      </div> */}

      <ImportantEvents></ImportantEvents>

      <FloatingBubble
        axis='xy'
        magnetic='x'
        style={{
          '--initial-position-bottom': '24px',
          '--initial-position-right': '24px',
          '--edge-distance': '24px',
        }}
        onClick={onClick}
      >
        <MessageFill fontSize={32} />
      </FloatingBubble>
    </div>
  );
};

export default NewsPage;
