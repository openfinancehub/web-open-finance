import { useEffect, useState } from 'react';
import { useModel } from 'umi';

type WebSocketHook = {
  message: any[];
  clearMessage: () => void;
  sendWebSocketMessage: (message: string, info: any) => void;
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
      const content = response.output?.answer;
      // const tempList = [...message];
      setMessage(pre => {
        const tempList = [...pre].map(item => ({ ...item, flag: false }));
        return [...tempList, { sender: 'bot', content }];
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

  const sendWebSocketMessage = (message: string, info: any) => {
    setMessage(pre => [
      ...pre,
      { sender: 'user', content: message, flag: true }
    ]);

    if (socket && socket.readyState === WebSocket.OPEN) {
      const data = {
        header: {
          // currentUser.username
          user: 'admin',
          token: 'yes',
          req_id: currentUser.id,
          req_src: currentUser.avatarUrl
        },
        data: {
          role: info.role,
          input: message,
          company: info.company,
          task: info.task,
          // id + username + token的后六位
          session_id:
            currentUser.id +
            currentUser.username +
            currentUser.token.substr(currentUser.token.length - 4)
        }
      };
      socket.send(JSON.stringify(data));
    }
  };

  return { message, sendWebSocketMessage, clearMessage };
};

export default useWebSocket;
