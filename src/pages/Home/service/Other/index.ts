

import moment, { Moment } from 'moment';
import { GETRequest } from '../apiConfig';
import { PostRequest } from '../apiConfig';

const apiPushUrl = 'http://129.204.166.171:5009/api/v1/';

export class Other {
    // 获取因子图表数据
    public static getgraph(): Promise<any> {
        return GETRequest(`${apiPushUrl}` + 'llmfactors/graph')
    }
}