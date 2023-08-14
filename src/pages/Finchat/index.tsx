import {
  AndroidOutlined,
  AudioOutlined,
  PlusOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Button, Card, Input, Radio } from 'antd';
import React, { useState } from 'react';

import { HomeServices } from '@/services';
import { ChatList, CompanyList } from './components';
import styles from './index.less';
import useWebSocket from './useWebsocket';

const { Search } = Input;

// const suffix = (
//   <AudioOutlined
//     style={{
//       fontSize: 16,
//       color: '#1677ff'
//     }}
//   />
// );

const Finchat = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [activeKey, setActiveKey] = useState<string>('a');
  // ws://121.37.5.77:5004
  const { message, sendWebSocketMessage } = useWebSocket('ws://xxxxxx');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const fetchModels = async () => {
    try {
      const res = await HomeServices.fetchModels({ data: 0 });
    } catch (error) {}
  };

  const onSearch = (value: string) => console.log(value);

  const handleSendMessage = () => {
    sendWebSocketMessage(inputValue);
    setInputValue('');
  };

  //  const handleSendMessage = () => {
  //    if (inputValue && socket) {
  //      socket.emit('message', inputValue);
  //      // setMessages([...messages, { content: inputValue, sender: 'user' }]);
  //      setInputValue('');
  //    }
  //    setMessages([...messages, { content: inputValue, sender: 'user' }]);
  //    setInputValue('');
  //  };

  const handleChange = (e: any) => {
    setActiveKey(e.target.value);
  };

  return (
    <div className={styles.wrapFinchat}>
      <div className={styles.left}>
        <Button
          style={{ width: '80%', marginTop: '12px' }}
          icon={<PlusOutlined />}>
          New Chat
        </Button>
        <Radio.Group
          defaultValue={activeKey}
          buttonStyle="solid"
          onChange={handleChange}>
          <Radio.Button value="a">Companies</Radio.Button>
          <Radio.Button value="b">Roles</Radio.Button>
        </Radio.Group>
        <Search
          placeholder="Search by name or ticker"
          allowClear
          onSearch={onSearch}
          style={{ width: '80%', margin: '0 0 12px 0' }}
        />
        {activeKey === 'a' ? <CompanyList /> : <ChatList />}
      </div>
      <div className={styles.right}>
        <div className={styles.content}>
          {message.map((item, index) => {
            if (item.sender === 'user') {
              return (
                <div className={styles.user} key={index}>
                  <Card style={{ width: 300 }}>
                    {item.content}
                    <span className={styles.tag}>
                      <UserOutlined />
                    </span>
                  </Card>
                </div>
              );
            }
            return (
              <div className={styles.user} key={index}>
                <Card style={{ width: 300 }}>
                  {item.content}
                  <span className={styles.tag}>
                    <AndroidOutlined />
                  </span>
                </Card>
              </div>
            );
          })}
        </div>
        <div className={styles.wrapTxt}>
          <div className={styles.top}>
            <Button>Regenerate</Button>
            <Button icon={<PlusOutlined />} style={{ margin: '0 0 0 20px' }}>
              New Chat
            </Button>
          </div>
          <div className={styles.bottom}>
            <Input
              placeholder="Send a message"
              allowClear
              value={inputValue}
              onPressEnter={handleSendMessage}
              onChange={handleInputChange}
            />
            <Button type="primary" onClick={handleSendMessage}>
              send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finchat;
