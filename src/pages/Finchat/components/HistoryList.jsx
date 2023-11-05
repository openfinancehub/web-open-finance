import React from 'react';
import { Divider, List, Typography } from 'antd';
import {EditOutlined} from '@ant-design/icons'

const HistoryList = () => {
    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
      ];

    return (
        <List
        size="small"
        bordered
        dataSource={data}
        renderItem={(item) => <List.Item>{item}<EditOutlined style={{margin: '0 0 0 8px'}}/></List.Item>}
      />
    )

}

export default HistoryList;