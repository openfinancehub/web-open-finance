/* eslint-disable @typescript-eslint/no-shadow */
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import qs from 'qs';

export const { CancelToken } = axios;

export const source = CancelToken.source();

interface CustomizeConfig extends AxiosRequestConfig {
  retry: number;
  retryDelay: number;
}

// axios config options
const options: CustomizeConfig = {
  // baseURL: '/app-api',
  baseURL: 'http://121.37.5.77:5005/api',
  timeout: 1000 * 60 * 5,
  retry: 0,
  retryDelay: 1000,
  paramsSerializer: (params: any) => qs.stringify(params)
};

const AxiosInstance = axios.create(options);
AxiosInstance.interceptors.request.use(config => {
  return config;
});

AxiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.message.includes('timeout')) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

let networkErrorFlag = false;
const axiosRequest = async ({
  baseURL,
  headers = {},
  url,
  method,
  data = {},
  params,
  responseType
}: any) => {
  try {
    const res = await AxiosInstance({
      baseURL,
      headers,
      url,
      method,
      data,
      params,
      responseType
    });
    console.log(res, 'resdddddd');
    if (res.status === 200 && res.statusText === 'OK') {
      const resp = res.data;
      console.log(resp, 'respppppp');
      if (typeof resp === 'string') {
        return resp;
      }
      if (resp.ret_code === 0 || resp.code === 200) {
        console.log(resp, 'resp');
        return Promise.resolve(resp);
      } else {
        console.log(resp, 'resp');
        return Promise.reject(resp);
      }
    } else {
      const error = {
        message: '服务器开小差~请稍后再试',
        code: -1
      };
      return Promise.reject(error);
    }
  } catch (err) {
    console.log(err);
    if (networkErrorFlag) return;
    networkErrorFlag = true;
  }
};

export const REQUEST = ({
  method = 'GET',
  url,
  data,
  params,
  responseType,
  headers = {
    // 'multipart/form-data'  application/json
    'Content-Type': 'application/json'
    // user: 'admin'
  }
}: any) => {
  return axiosRequest({
    method,
    url,
    data,
    params,
    responseType,
    headers
  });
};

export default AxiosInstance;
