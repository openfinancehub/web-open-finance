import { FinchatServices } from '@/services';
import {
  AndroidOutlined,
  CopyTwoTone,
  PlusOutlined,
  UserOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import ReactEcharts from 'echarts-for-react';
import { Button, Card, Input, message as Message, Popover, Radio, Typography, Tooltip, Table  } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { ChatList, CompanyList, TaskList, HistoryList} from './components';

import styles from './index.less';
import useWebSocket from './useWebsocket';

const { Search } = Input;
const { Text } = Typography;

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
  // 左边历史记录
  const [historyList, setHistoryList] = useState<any[]>([]);
  // 单条历史记录
  const [singleList, setSingleList] = useState<any[]>([]);
  const [roleList, setRoleList] = useState<any[]>([]);
  const [taskList, setTaskList] = useState<any[]>([]);
  const [stockList, setStockList] = useState<any[]>([]);
  const [selectedCom, setSelectedCom] = useState<any>([]);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<any>(null);
  const [initCompanyList, setInitCompanyList] = useState<any[]>([]);
  // ws://129.204.166.171:5004
  const { message, sendWebSocketMessage, clearMessage } = useWebSocket(
    'ws://129.204.166.171:5004'
  );

  const [messageList, setMessageList] = useState<any[]>(message);

  const commonHeader = {
    user: currentUser.username,
    req_id: currentUser.id,
    req_src: currentUser.avatarUrl,
    token: currentUser.token
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const fetchSidebar = async () => {
    try {
      // const jsonStr = JSON.stringify({ user: 'admin' });
      // const encodedData = encodeURIComponent(jsonStr);
      const res = await FinchatServices.fetchSidebar({
        header: commonHeader
      });
      const {
        history_list = [],
        role_list = [],
        task_list = [],
        stock_list = []
      } = res.output || {};
      setHistoryList(history_list);
      setRoleList(role_list);
      setInitCompanyList(stock_list);
      setStockList(stock_list);
      setTaskList(task_list);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const fetchHistoryList = async (session_id: any) => {
    try {
      const res = await FinchatServices.fetchHistoryList({
        header: commonHeader,
         data:{ session_id}
      });
      const { output } = res;
      if (output?.result?.length) {
        const tempList = output.result;
        const chatList: any[] = []
        tempList.forEach((item: any) => {
          chatList.push( { sender: 'user', content: item.input })
          chatList.push({
             sender: 'bot', content: item.output, chartData: item.chartData?.type ? item.chartData : null 
         })
        })   
        setSingleList(chatList)
        setMessageList(chatList)
      }
      setSelectedSessionId(session_id)
       
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    fetchSidebar();
  }, []);

  useEffect(() => {
    setMessageList([...singleList, ...message])
  }, [message]);

  useEffect(() => {
    console.log(JSON.parse(sessionStorage.getItem("role")), "effect")
    setSelectedRole(JSON.parse(sessionStorage.getItem("role")))
  }, []);

  const onSearch = async (value: string) => {
    try {
      if (!value) {
        setStockList(initCompanyList);
        return;
      }
      const res = await FinchatServices.queryCompany({
        header: commonHeader,
        data: { query: value }
      });
      const list = res.output?.result || [];
      setStockList(list);
    } catch (error: any) {
      Message.error(error?.msg);
    }
  };

  const onChange = _.debounce((e: any) => {
    const str = e.target.value;
    if (!str) {
      setStockList(initCompanyList);
      return;
    }
    const list = stockList.filter(i => i.company.indexOf(str) !== -1);
    setStockList(list);
  }, 1000);

  const handleSendMessage = () => {
    // console.log(selectedRole);
    if (!inputValue) return;
     let s_id = selectedSessionId;
    if (!s_id) {
     s_id = (currentUser.id +
        currentUser.username + new Date().getTime())
      setSelectedSessionId(s_id);
      
    }
    sendWebSocketMessage(inputValue, {
      company: selectedCom,
      ...selectedRole,
      task: selectedTask
    }, s_id);
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

  const handleCompany = (list: any[]) => {
    if (selectedTask !== 'compare') {
      setActiveKey('c');
    }
    setSelectedCom(list);
  };

  const handleTask = item => {
    setSelectedTask(item);
    setActiveKey('b');
  };

  const handleViewLists = (item) => {
    fetchHistoryList(item.session_id)
    
  }

  const handlePublish = () => {
    sessionStorage.setItem('content', JSON.stringify(messageList));
    history.push({
      pathname: `/user/user/content`
    });
  };

  const handleNewChat = () => {
    setMessageList([]);
    setSingleList([])
    setSelectedSessionId(null)
  }

  const histotyTmp = (
    <>
       <Tooltip placement="top" title="历史记录" >
        <HistoryOutlined onClick={fetchHistoryList} style={{margin: '0 0 0 12px', fontSize: '16px'}} />
          </Tooltip>
    </>
  )
  const disabled = !(selectedTask || selectedCom || selectedRole);
  
  return (
    <div className={styles.wrapFinchat}>
      <div className={styles.left}>
       
        {
        historyList?.length ? (
           <div className={styles.wrapHistory}>
              <HistoryList data={historyList} handleViewList={ handleViewLists} />
           </div>
        ) : null
        }
         <Button
          style={{ width: '80%' }}
          icon={<PlusOutlined />} onClick={handleNewChat}>
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
        {activeKey === 'b' && (
          <Search
            placeholder="Search by name or ticker"
            allowClear
            onSearch={onSearch}
            onChange={onChange}
            style={{ width: '80%', margin: '0 0 12px 0' }}
          />
        )}
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
                selectedCom?.length
                  ? `你选择了${selectedCom.map(i => i.company).join('、')}`
                  : ''
                }, 请输入您要咨询的问题?`}{histotyTmp}</Card>
            </div>
          )}
          {messageList.map((item, index) => {
            if (item.sender === 'user') {
              return (
                <div className={styles.user} key={index}>
                  <Card style={{ width: 300 }}>
                    {item.content && (
                      <div
                        style={{ padding: '0 16px 0 0' }}
                        dangerouslySetInnerHTML={{
                          __html: item.content
                        }}
                      />
                    )}
                    {item.flag && <span className={styles.cursor} />}
                    <span className={styles.tag}>
                      <UserOutlined style={{ fontSize: '18px' }} />
                    </span>                   
                  </Card>
                </div>
              );
            }
            return (
              <div className={styles.user} key={index}>
                <Card style={{ width: 300 }}>
                  {item.chart && (
                      <ReactEcharts
                        option= {item.chart}
                        style={{height: '300px'}}
                      />
                    )
                  } 
                  {
                    item.table && (
                      <Table
                        columns={item.table.columns}
                        rowSelection={{}}
                        dataSource={item.table.data}
                      />
                    )
                  }                                   
                  {item.content && (
                    <div
                      style={{ padding: '0 16px 0 0' }}
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  )}
                  <span className={styles.tag}>
                    <AndroidOutlined style={{ fontSize: '18px' }} />
                  </span>
                </Card>
              </div>
            );
          })}
        </div>
        <div className={styles.wrapTxt}>
          <div className={styles.top}>
            <Button>Regenerate</Button>
            <Button icon={<PlusOutlined />} style={{ margin: '0 0 0 20px' }} onClick={handleNewChat}>
              New Chat
            </Button>
          </div>
          <div className={styles.bottom}>
            <Input
              placeholder="@search 中国的GDP是多少"
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
