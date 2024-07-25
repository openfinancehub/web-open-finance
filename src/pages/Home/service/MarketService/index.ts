

import { GETRequest } from '../apiConfig';
import { PostRequest } from '../apiConfig';

const apiPushUrl = 'http://129.204.166.171:5002/api/v1/market/';
const apiUrl = 'http://129.204.166.171:5002/api/v1/company/';

export class MarketService {
    // 获取情绪热度
    public static getSentiment(): Promise<any> {
        return GETRequest(`${apiPushUrl}` + 'sentiment')
    }
    // 获取危险指数
    public static getDanger(): Promise<any> {
        return GETRequest(`${apiPushUrl}` + 'danger')
    };

    // 获取事件信息
    public static getEvents(time: any): Promise<any> {
        const dataStr = {
            header: {
                req_id: '1234',
                req_src: 'source',
                user: 'user',
                token: 'token',
            },
            data: {
                ip: '127.0.0.1',
                model: 'author',
                date: time,
                extra: 'extra',
            }

        };
        return PostRequest(`${apiPushUrl}` + 'event', dataStr);
    };


    // 获取公司推荐
    public static getStock(): Promise<any> {
        return GETRequest(`${apiPushUrl}` + 'stock')
    };


    // 获取公司推荐
    public static getStockData(company: string): Promise<any> {
        const dataStr = {
            company: company,
        };
        return PostRequest(`${apiUrl}` + 'data', dataStr);
    };
}