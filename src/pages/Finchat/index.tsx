import {
  AndroidOutlined,
  AudioOutlined,
  CopyTwoTone,
  PlusOutlined,
  UserOutlined
} from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Button, Card, Input, Popover, Radio } from 'antd';
import React, { useEffect, useState } from 'react';

import { FinchatServices } from '@/services';
import { ChatList, CompanyList, TaskList } from './components';
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
  const {
    initialState: { currentUser }
  } = useModel('@@initialState');

  const [inputValue, setInputValue] = useState<string>('');
  const [activeKey, setActiveKey] = useState<string>('a');
  const [historyList, setHistoryList] = useState<any[]>([]);
  const [roleList, setRoleList] = useState<any[]>([]);
  const [taskList, setTaskList] = useState<any[]>([]);
  const [stockList, setStockList] = useState<any[]>([]);
  const [selectedCom, setSelectedCom] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  // ws://121.37.5.77:5004
  const { message, sendWebSocketMessage, clearMessage } = useWebSocket(
    'ws://121.37.5.77:5004'
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const fetchSidebar = async () => {
    try {
      // const jsonStr = JSON.stringify({ user: 'admin' });
      // const encodedData = encodeURIComponent(jsonStr);
      const res = await FinchatServices.fetchSidebar({
        header: {
          user: currentUser.username,
          req_id: currentUser.id,
          req_src: currentUser.avatarUrl,
          token: currentUser.token
        }
      });
      const {
        history_list = [],
        role_list = [],
        task_list = [],
        stock_list = []
      } = res.output || {};
      setHistoryList(history_list);
      setRoleList(role_list);
      setStockList(stock_list);
      setTaskList(task_list);
      console.log(res, 'res');
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    fetchSidebar();
  }, []);

  const onSearch = (value: string) => console.log(value);

  const handleSendMessage = () => {
    if (!inputValue) return;
    sendWebSocketMessage(inputValue, {
      ...selectedCom,
      ...selectedRole,
      task: selectedTask
    });
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
    const val = e.target.value;
    // if (val === 'b') {
    //   setSelectedCom(null);
    // }
    setActiveKey(val);
  };

  const handleRole = (item: any) => {
    setSelectedRole(item);
    clearMessage();
  };

  const handleCompany = (item: any) => {
    setSelectedCom(item);
    setActiveKey('c');
  };

  const handleTask = item => {
    setSelectedTask(item);
    setActiveKey('b');
  };

  const handlePublish = () => {
    sessionStorage.setItem('content', JSON.stringify(message));
    history.push({
      pathname: `/user/user/content`
    });
  };

  const disabled = !(selectedTask || selectedCom || selectedRole);

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
          value={activeKey}
          buttonStyle="solid"
          onChange={handleChange}>
          <Radio.Button value="a">Task</Radio.Button>
          <Radio.Button value="b">Companies</Radio.Button>
          <Radio.Button value="c">Roles</Radio.Button>
        </Radio.Group>
        <Search
          placeholder="Search by name or ticker"
          allowClear
          onSearch={onSearch}
          style={{ width: '80%', margin: '0 0 12px 0' }}
        />
        {activeKey === 'a' && (
          <TaskList list={taskList} handleProps={handleTask} />
        )}
        {activeKey === 'b' && (
          <CompanyList list={stockList} handleProps={handleCompany} />
        )}
        {activeKey === 'c' && (
          <ChatList list={roleList} handleProps={handleRole} />
        )}
      </div>
      <div className={styles.right}>
        <div className={styles.wrapCopy}>
          <Popover content="一键发布当前聊天内容" trigger="hover">
            <CopyTwoTone
              style={{ fontSize: 18, cursor: 'pointer', zIndex: 999 }}
              onClick={handlePublish}
            />
          </Popover>
        </div>

        <div className={styles.content}>
          {selectedRole?.role && (
            <div className={styles.user}>
              <Card style={{ width: 300 }}>{`hello！my name is ${
                selectedRole.role
              }, ${
                selectedCom?.company ? `你选择了${selectedCom.company}` : ''
              }, 请输入您要咨询的问题?`}</Card>
            </div>
          )}
          {message.map((item, index) => {
            if (item.sender === 'user') {
              return (
                <div className={styles.user} key={index}>
                  <Card style={{ width: 300 }}>
                    {item.content}
                    {item.flag && <span className={styles.cursor} />}
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
              disabled={disabled}
              value={inputValue}
              onPressEnter={handleSendMessage}
              onChange={handleInputChange}
            />
            <Button
              type="primary"
              onClick={handleSendMessage}
              disabled={disabled}>
              send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finchat;
