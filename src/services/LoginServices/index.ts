import { ApiUrl } from '../apiConfig';
import { REQUEST } from '../AxionsInstance';

export class LoginServices {
  public static getCaptcha(params: any): Promise<any> {
    return REQUEST({
      url: ApiUrl.GET_CAPTCHA,
      params,
      baseURL: 'http://39.101.71.109/app-api'
    });
  }
  public static login(data: any): Promise<any> {
    return REQUEST({
      method: 'POST',
      url: ApiUrl.LOGIN,
      data,
      baseURL: 'http://39.101.71.109/app-api'
    });
  }
}
