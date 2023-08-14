import { ApiUrl } from '../apiConfig';
import { REQUEST } from '../AxionsInstance';

export class UserServices {
  public static createArticle(data: any): Promise<any> {
    return REQUEST({ method: 'POST', url: ApiUrl.CREATE_ARTICLE, data });
  }
}
