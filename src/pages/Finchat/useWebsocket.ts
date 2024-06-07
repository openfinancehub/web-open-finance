import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import createTable from './components/MyTables';

type WebSocketHook = {
  message: any[];
  clearMessage: () => void;
  sendWebSocketMessage: (message: string, info: any, session_id: any) => void;
};

const useWebSocket = (url: string): WebSocketHook => {
  const {
    initialState: { currentUser }
  } = useModel('@@initialState');
  console.log(currentUser);

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<any[]>([]);

  useEffect(() => {
    const newSocket = new WebSocket(url);

    newSocket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    newSocket.onmessage = event => {
      console.log(event, 99);
      const response = JSON.parse(event.data || '{}');
      let content = response.output?.answer;
      content = content.replace(/\n/g, '<br>');
      let chart = response.output?.chart;
      if (typeof chart === 'object' && Object.keys(chart).length === 0) {
        chart = null;
      }
      let table = response.output?.table;
      if (typeof table === 'object' && Object.keys(table).length === 0) {
        table = null;
      } else {
        table = createTable(table);
      }
      
      // console.log(chart)
      // const tempList = [...message];
      setMessage(pre => {
        const tempList = [...pre].map(item => ({ ...item, flag: false }));
        return [...tempList, { sender: 'bot', content, chart, table}];
      });
    };

    newSocket.onerror = error => {
      console.error('WebSocket error:', error);
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    setSocket(newSocket);

    // Cleanup function to close WebSocket connection when the component unmounts
    return () => {
      newSocket.close();
    };
  }, [url]);

  const clearMessage = () => {
    setMessage([]);
  };

  const sendWebSocketMessage = (message: string, info: any, session_id: any) => {
    setMessage(pre => [
      ...pre,
      { sender: 'user', content: message, flag: true }
    ]);

    if (socket && socket.readyState === WebSocket.OPEN) {
      const data = {
        header: {
          // currentUser.username
          user: currentUser.username,
          token: currentUser.token,
          req_id: currentUser.id,
          req_src: currentUser.avatarUrl
        },
        data: {
          role: info.role,
          input: message,
          company:
            info.company?.length > 1
              ? info.company.map((i: any) => i.company)
              : info.company[0]?.company,
          task: info.task,
          // id + username + token的后六位
          session_id
            
            // currentUser.token.substr(currentUser.token.length - 4)
        }
      };
      socket.send(JSON.stringify(data));
    }
  };

  return { message, sendWebSocketMessage, clearMessage };
};

export default useWebSocket;
