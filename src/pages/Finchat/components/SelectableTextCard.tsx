import React from 'react';
import styled from 'styled-components';


const TextList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 8px;
  background-color: rgba(0, 0, 0, 0.05); /* 添加淡灰色背景 */
  color: #000000; /* 修改字体颜色 */
  padding: 4px 8px; /* 添加内边距 */
  border-radius: 4px; /* 添加圆角 */
`;

const SelectableTextCard = ({ texts }) => {

  const TEXTS = [
    '中国去年的GDP是多少',
    '@search 贵州茅台的市盈率是多少',
    '@pick RSI小于10同时利润率高于0.2的公司有哪些',
    '@巴菲特 你怎么看待贵州茅台这家公司',
    '@pick 最近趋势反转的公司有哪些',
    '@rank 帮我贵州茅台，比亚迪，中国中车三个公司进行排序',
    '@analysis 分析一下泸州老窖为什么最近下跌这么多',        
  ];

  return (
      <TextList>
        {texts??TEXTS.map((text, index) => (
          <ListItem key={index} onClick={() => console.log(`Selected: ${text}`)}>
            {text}
          </ListItem>
        ))}
      </TextList>
  );
};

export default SelectableTextCard;