import { ApiUrl } from '../apiConfig';
import { REQUEST } from '../AxionsInstance';

export class FinchatServices {
  public static fetchSidebar(data: any): Promise<any> {
    return REQUEST({ method: 'POST', url: ApiUrl.SIDEBAR, data });
  }
  public static queryCompany(data: any): Promise<any> {
    return REQUEST({ method: 'POST', url: ApiUrl.QUERY_COMPANY, data });
  }
}
