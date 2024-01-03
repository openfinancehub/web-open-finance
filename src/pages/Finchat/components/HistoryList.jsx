import React from 'react';
import { Divider, List, Typography, Collapse, Empty } from 'antd';
import { EditOutlined, MessageTwoTone } from '@ant-design/icons'

const { Panel } = Collapse


const HistoryList = (props) => {
  const { data = [], handleViewList } = props;

  return (
    <Collapse defaultActiveKey="1">
      <Panel header="历史对话记录" key="1">
        {
          data?.length ? (
            <List
              size="small"
              dataSource={data}
              renderItem={(item) => <List.Item onClick={() => handleViewList(item)}><MessageTwoTone style={{ margin: '0 8px 0 0' }} />{item.desc}</List.Item>}
            />
          ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
      </Panel>
    </Collapse>
  )

}

export default HistoryList;