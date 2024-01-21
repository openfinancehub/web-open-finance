import { ApiUrl } from '../apiConfig';
import { REQUEST } from '../AxionsInstance';

export class AgentServices {
  public static fetchAgent(data: any): Promise<any> {
    return REQUEST({ method: 'POST', url: ApiUrl.SEARCH_AGENT, data });
  }
}
