import { ApiUrl } from '../apiConfig';
import { REQUEST } from '../AxionsInstance';

export class FinchatServices {
  public static fetchSidebar(data: any): Promise<any> {
    return REQUEST({ method: 'POST', url: ApiUrl.SIDEBAR, data });
  }
}
