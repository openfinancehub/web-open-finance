

import { GETRequest } from '../apiConfig';
import { PostRequest } from '../apiConfig';

const apiPushUrl = 'http://129.204.166.171:5002/api/';
// const apiUrl = 'http://129.204.166.171:5002/api/info/';

export class MarketService {
    // 获取情绪热度
    public static getSentiment(): Promise<any> {
        return GETRequest(`${apiPushUrl}` + 'strategy/sentiment')
    }
    // 获取危险指数
    public static getDanger(): Promise<any> {
        return GETRequest(`${apiPushUrl}` + 'strategy/danger')
    };

    // 获取事件信息
    public static getEvents(time: any): Promise<any> {
        const dataStr = {
            ip: '127.0.0.1',
            model: 'author',
            date: time,
            extra: 'extra',
        };
        return PostRequest(`${apiPushUrl}` + 'strategy/event', dataStr);
    };


    // 获取公司推荐
    public static getStock(): Promise<any> {
        return GETRequest(`${apiPushUrl}` + 'strategy/stock')
    };
}