/*
 * @LastEditors: sharp
 */
import { ApiUrl } from '../apiConfig';
import { REQUEST } from '../AxionsInstance';

export class HomeServices {
  public static fetchModels(params: any): Promise<any> {
    return REQUEST({ url: ApiUrl.MODEL, params });
  }
}
