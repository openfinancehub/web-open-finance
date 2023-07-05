import { useEffect, useState } from 'react';

type WebSocketHook = {
  message: any[];
  sendWebSocketMessage: (message: string) => void;
};

const useWebSocket = (url: string): WebSocketHook => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<any[]>([]);

  useEffect(() => {
    const newSocket = new WebSocket(url);

    newSocket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    newSocket.onmessage = event => {
      const response = JSON.parse(event.data || '{}');
      const content = response.output?.answer;
      setMessage(pre => [...pre, { sender: 'bot', content }]);
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

  const sendWebSocketMessage = (message: string) => {
    setMessage(pre => [...pre, { sender: 'user', content: message }]);

    if (socket && socket.readyState === WebSocket.OPEN) {
      const data = {
        header: { user: 'admin', token: 'yes' },
        data: { name: 'test', role: 'test-buffett', input: message }
      };
      socket.send(JSON.stringify(data));
    }
  };

  return { message, sendWebSocketMessage };
};

export default useWebSocket;
