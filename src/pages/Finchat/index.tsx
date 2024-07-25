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
import { Button, Card, Input, message as Message, Popover, Avatar, Typography, Tooltip, Table  } from 'antd';
import { ToolOutlined, FileSearchOutlined, AreaChartOutlined} from '@ant-design/icons';

import FlexRow from './components/FlexRow';
import SelectableTextCard from './components/SelectableTextCard';

import _ from 'lodash';

import { useEffect, useState } from 'react';
import { MemoizedReactMarkdown } from '@/components//markdown/MemoizedReactMarkdown'
import remarkGfm from 'remark-gfm'

import { ShareWithOthers, ChatList, CompanyList, TaskList, HistoryList} from './components';

import styles from './index.less';
import useWebSocket from './useWebsocket';

const { Search } = Input;
const { Text } = Typography;

const Finchat = () => {
  const {
    initialState: { currentUser }
  } = useModel('@@initialState');

  const [inputValue, setInputValue] = useState<string>('');
  const [activeKey, setActiveKey] = useState<boolean>(true);
  // 左边历史记录
  const [historyList, setHistoryList] = useState<any[]>([]);
  // 单条历史记录
  const [singleList, setSingleList] = useState<any[]>([]);
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
    setActiveKey(false);
  };

  const handleUserSelect = (user) => {
    setSelectedRole(user);
    setActiveKey(false);
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
    setMessageList([...singleList, ...message])
  }, [message]);


  const handleSendMessage = () => {
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
    setActiveKey(false);
  };

  const fetchSidebar = async () => {
    try {
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
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    fetchSidebar();
  }, []);

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
    setMessageList([])
    setSingleList([])
    setSelectedSessionId(null)
    setActiveKey(true)
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
         <Button
          className={styles.newchat}
          icon={<PlusOutlined />} onClick={handleNewChat}>
          开始新对话
        </Button>
        {
          historyList?.length ? (
            <div className={styles.wrapHistory}>
                <HistoryList data={historyList} handleViewList={ handleViewLists} />
            </div>
          ) : null
        }
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
        <div className={styles.infobox}>
          {
            activeKey && (
              <div className={styles.cardcontainer}>
                <FlexRow>
                  <Card title="角色" style={{ width: 'calc(50% - 16px)', maxHeight: '300px', overflowY: 'auto' }}>
                      <ShareWithOthers onUserSelect={handleUserSelect}/>
                  </Card>
                  <Card title="大家都在问" style={{ width: 'calc(33.333% - 16px)', maxHeight: '300px', overflowY: 'auto' }}>
                    <SelectableTextCard texts={null}/>
                  </Card>
                  <Card
                      style={{ width: 'calc(33.333% - 16px)', maxHeight: '300px', overflowY: 'auto' }}
                    >
                      <Card.Meta
                        avatar={<Avatar icon={<FileSearchOutlined />} />}
                        title="筛选"
                        description="@pick 设定选择条件，选择你感兴趣的公司"
                      />
                  </Card> 
                  <Card
                      style={{ width: 'calc(33.333% - 16px)', maxHeight: '300px', overflowY: 'auto' }}
                    >
                      <Card.Meta
                        avatar={<Avatar icon={<ToolOutlined />} />}
                        title="搜索"
                        description="@search 搜索任何你感兴趣的公司行业市场宏观等等信息"
                      />
                  </Card>                   
                  <Card
                      style={{ width: 'calc(33.333% - 16px)', maxHeight: '300px', overflowY: 'auto' }}
                    >
                      <Card.Meta
                        avatar={<Avatar icon={< AreaChartOutlined/>} />}
                        title="分析"
                        description="@analsis 分析你任何感兴趣的公司行业宏观市场信息"
                      />
                  </Card>                 
                </FlexRow>                  
              </div>
            )
          }
        </div>
        <div className={styles.content}>
          {selectedRole?.role && (
            <div className={styles.user}>
              <Card style={{ width: 300 }}>{`你好～我是${
                selectedRole.role
              }, ${''}, 请输入您要咨询的问题?`}{histotyTmp}</Card>
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
                        style= {{width: '1080px'}}
                        scroll={{x: 'max-content'}}
                      />
                    )
                  }                                   
                  {item.content && (
                    <MemoizedReactMarkdown remarkPlugins={[remarkGfm]}>
                      {item.content}
                    </MemoizedReactMarkdown>
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
              发送
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finchat;
