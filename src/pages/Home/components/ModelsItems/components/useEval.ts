import { useEffect, useState } from 'react';

type useEvalHook = {
    message: any[];
    clearMessage: () => void;
    sendWebSocketMessage: (message: string, info: any) => void;
};
const [message, setMessage] = useState<any[]>([]);
const useEval = (factor: string, model: string): useEvalHook => {
    try {
        let header = {
            req_id: '1234',
            req_src: 'source',
            user: 'user',
            token: 'token',
        };
        let dataStr = {
            ip: '127.0.0.1',
            factor: model,
            model: "default",
            time: '',
            extra: 'extra',
        };
        const responseData = fetch('/api/eval', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                header: header,
                data: dataStr
            }),
        }).then(rep => {
            console.log(rep);
            return rep.json();
        }).then(json => {
            const response = JSON.parse(json.data || '{}');
            let content = response.output?.answer;
            content = content.replace(/\n/g, '<br>');
            let chart = response.output?.chart;
            setMessage(pre => {
                const tempList = [...pre].map(item => ({ ...item, flag: false }));
                return [...tempList, { sender: 'bot', content, chart }];
            });
        });
    } catch (error) {
        console.error('error:', error);
    }
    const sendWebSocketMessage = (message: string, info: any) => {
        setMessage(pre => [
            ...pre,
            { sender: 'user', content: message, flag: true }
        ]);
    };

    const clearMessage = () => {
        setMessage([]);
    };
    return { message, sendWebSocketMessage, clearMessage };
};

export default useEval;