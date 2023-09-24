import { ModelsItem, modelsData, header } from './data';

export const modelsJson = async (header: header, dataStr: modelsData) => {
  try {
    const response = await fetch('http://121.37.5.77:5003/api/models', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        header: header,
        data: dataStr
      })
    });
    const json = (await response.json()) as { models: ModelsItem[] };
    return {
      data: json.models,
      total: json.models.length,
      success: true
    };
  } catch (error) {
    console.error('error', error);
    return { data: [], total: 0, success: false };
  }
};
// 首页因子信息
export const categoryJson = async () => {
  try {
    const response = await fetch('http://121.37.5.77:5003/api/category', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    return {
      data: json.category,
      total: json.category.length,
      success: true
    };
  } catch (error) {
    console.error('An error occurred:', error);
    return { data: [], total: 0, success: false };
  }
};
//查询代码
export const getCode = async (factor: string, model: string,) => {
  try {
    let header = {
      req_id: '1234',
      req_src: 'source',
      user: 'user',
      token: 'token',
    };
    let dataStr = {
      ip: '127.0.0.1',
      factor: model,
      model: "author",
      time: '',
      extra: 'extra',
    };
    const response = await fetch('/api/getCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        header: header,
        data: dataStr
      }),
    });
    const json = await response.json()
    return {
      data: json.models,
      ret_code: json.ret_code,
      msg: json.msg,
      extra: json.extra
    };
  } catch (error) {
    console.error('An error occurred:', error);
    return {
      data: null,
      ret_code: -1,
      msg: 'error',
      extra: '',
    };
  }
};
//更新或者新增代码&&删除
export const updateCode = async (factor: string, model: string, code: string, text: string, extra: string) => {
  try {
    let header = {
      req_id: '1234',
      req_src: 'source',
      user: 'user',
      token: 'token',
    };
    let dataStr = {
      ip: '127.0.0.1',
      factor: factor,
      model: model,
      code: code,
      text: text,
      time: '',
      extra: extra,
    };
    const response = await fetch('/api/updateCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        header: header,
        data: dataStr
      }),
    });
    const json = await response.json()
    return {
      data: json.data,
      ret_code: json.ret_code,
      msg: json.msg,
      extra: json.extra
    };
  } catch (error) {
    console.error('error:', error);
    return {
      data: null,
      ret_code: -1,
      msg: 'error',
      extra: '',
    };
  }
};
//关系图形界面
export const getModelData = async (factor: string, model: string) => {
  try {
    let header = {
      req_id: '1234',
      req_src: 'source',
      user: 'user',
      token: 'token',
    };
    let dataStr = {
      ip: '127.0.0.1',
      factor: factor,
      model: model,
      time: '',
      extra: 'extra',
    };
    const response = await fetch('/api/eval', {
      method: 'POSt',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        header: header,
        data: dataStr
      }),
    });
    const json = await response.json()
    console.log(json)
    return {
      data: json.data,
      ret_code: json.ret_code,
      msg: json.msg,
      extra: json.extra
    };
  } catch (error) {
    console.error('error:', error);
    return {
      data: null,
      ret_code: -1,
      msg: 'error',
      extra: '',
    };
  }
};
//上传文件
export const uploadFileService = async (formData: FormData) => {
  try {
    let header = {
      req_id: '1234',
      req_src: 'source',
      user: 'user',
      token: 'token',
    };
    // console.log("获取到的请求data", formData);
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: JSON.stringify({
        header: header,
        data: formData
      }),
    });
    const json = await response.json();
    return {
      data: json.data,
      ret_code: json.ret_code,
      msg: json.msg,
      extra: json.extra
    };
  } catch (error) {
    console.error('上传文件时出错:', error);
    return {
      data: null,
      ret_code: -1,
      msg: 'error',
      extra: '',
    };
  }
};