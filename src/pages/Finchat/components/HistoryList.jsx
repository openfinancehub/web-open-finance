import React from 'react';
import { Divider, List, Typography, Collapse, Empty } from 'antd';
import { EditOutlined, MessageTwoTone } from '@ant-design/icons'

const { Panel } = Collapse


const HistoryList = (props) => {
  const { data = [], handleViewList } = props;

  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.substring(0, num) + '...';
  };

  return (
    <Collapse defaultActiveKey="1">
      <Panel header="历史对话记录" key="1">
        {
          data?.length ? (
            <List
              size="small"
              dataSource={data}
              renderItem={(item) => 
                  <List.Item 
                    onClick={() => handleViewList(item)}
                    style={{ backgroundColor: '#f5f5ff', marginBottom: '8px', borderRadius: '4px'}}
                  >
                    {truncateString(item.desc, 5)}
                  </List.Item>
              }
            />
          ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
      </Panel>
    </Collapse>
  )
}

export default HistoryList;