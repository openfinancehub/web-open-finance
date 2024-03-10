import React, { useEffect, useRef } from 'react'
import { FloatingPanel, List, Space } from 'antd-mobile'
import ImportantEvents from '../Events/ImportantEvents'
import { Input, Button } from 'antd';
// import type { FloatingPanelRef } from '../index'

const anchors = [100, window.innerHeight * 0.2, window.innerHeight * 0.8]

export default () => {
  const targetRef = useRef<HTMLDivElement>(null)

  const onHeightChange = () => {
    const target = targetRef.current
    if (!target) return
    target.style.height = '100%'
    target.style.width = '90%'
    target.style.position = 'absolute';
    target.style.top = '60%';
    target.style.left = '50%';
    target.style.transform = 'translate(-50%, -50%)';
    target.style.overflowY = 'auto'; 
  }
  const ref = useRef(null)
  
  const data = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
  ]

  const [searchText, setSearchText] = React.useState('');
  const [news, setNews] = React.useState(data);
  const [original, setOriginal] = React.useState(data);

  const handleSearch = () => {
    console.log(searchText)
    const searchResult = original.filter(s => s.includes(searchText));
    setNews(searchResult);
  };

  useEffect(() => {
    onHeightChange()
  }, [])

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
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <List>
          {news.map((item, index) => (
            <List.Item key={index}>{item}</List.Item>
          ))}
        </List>
      </div>

      <FloatingPanel anchors={anchors}  ref={ref} >
        {/* <div style={{ width: '90%', display: 'Block', justifyContent: 'center', alignItems: 'center' }}>
          <ImportantEvents />
        </div> */}
        {/* <div ref={targetRef}>
          <ImportantEvents />
        </div> */}

        <ImportantEvents />
      </FloatingPanel>
    </div>
  )
}