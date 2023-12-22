import React from 'react';
import { Divider, List, Typography, Collapse, Empty } from 'antd';
import { EditOutlined } from '@ant-design/icons'

const { Panel } = Collapse


const HistoryList = (props) => {
  const { data = [] } = props;

  return (
    <Collapse defaultActiveKey="1">
      <Panel header="历史对话记录" key="1">
        {
          data?.length ? (
            <List
              size="small"
              bordered
              dataSource={data}
              renderItem={(item) => <List.Item>{item}<EditOutlined style={{ margin: '0 0 0 8px' }} /></List.Item>}
            />
          ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
      </Panel>
    </Collapse>
  )

}

export default HistoryList;