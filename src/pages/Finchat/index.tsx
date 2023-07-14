import { AndroidOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Input, Radio } from 'antd';
import React, { useEffect, useState } from 'react';

import io, { Socket } from 'socket.io-client';
import { ChatList, CompanyList } from './components';

import styles from './index.less';

const Finchat = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const [activeKey, setActiveKey] = useState<string>('a');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const newSocket = io('');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('message', (message: string) => {
        setMessages(prevMessages => [...prevMessages, message]);
      });
    }
  }, [socket]);

  const handleSendMessage = () => {
    // if (message && socket) {
    //   socket.emit('message', message);
    //   // setMessages([...messages, { content: inputValue, sender: 'user' }]);
    //   setInputValue('');
    // }
    setMessages([...messages, { content: inputValue, sender: 'user' }]);
    setInputValue('');
  };

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
          <Radio.Button value="b">Chats</Radio.Button>
        </Radio.Group>
        {activeKey === 'a' ? <CompanyList /> : <ChatList />}
      </div>
      <div className={styles.right}>
        <div className={styles.content}>
          {messages.map((item, index) => {
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
