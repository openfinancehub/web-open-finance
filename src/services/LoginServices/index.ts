import { ApiUrl } from '../apiConfig';
import { REQUEST } from '../AxionsInstance';

export class LoginServices {
  public static getCaptcha(params: any): Promise<any> {
    return REQUEST({
      url: ApiUrl.GET_CAPTCHA,
      params,
      baseURL: 'https://finance-api.tocmcc.cn:443/api'
    });
  }
  public static login(data: any): Promise<any> {
    return REQUEST({
      method: 'POST',
      url: ApiUrl.LOGIN,
      data,
      baseURL: 'https://finance-api.tocmcc.cn:443/api'
    });
  }
}
