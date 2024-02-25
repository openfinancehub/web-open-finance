import React from 'react';
import { List, Button } from 'antd-mobile';
import { Input, Space, Spin } from 'antd';
import { getNews } from '../../service';

interface newsType {
  title: string;
  content: string;
}


const NewsPage = () => {
  const [newsList, setNewsList] = React.useState<newsType[]>([]);
  const [searchText, setSearchText] = React.useState('');

  const newsData = async () => {
    const dataJson = await getNews();
    console.log(dataJson?.result.data)
    setNewsList(dataJson?.result.data);
  };


  React.useEffect(() => {
    newsData()
  }, []);

  const handleSearch = () => {
    // 在这里处理搜索逻辑，可以根据searchText进行过滤或搜索操作
    // 假设搜索结果为searchResult
    const searchResult = newsList.filter(news => news.title.includes(searchText));
    setNewsList(searchResult);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          style={{ flex: 1, marginRight: '10px' }}
          placeholder="请输入搜索关键词"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button style={{ height: '35px' }} onClick={handleSearch}>搜索</Button>
      </div>

      <List>
        {newsList.map((news, index) => (
          <List.Item key={index}>
            <h2><List.Item>{news.title}</List.Item></h2>
            <List.Item>{news.content}</List.Item>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default NewsPage;
