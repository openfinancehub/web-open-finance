import { ModelsItem, header, dataString } from './data';
// 首页models信息
export const modelsJson = async (header: header, data: dataString) => {
  try {
    const response = await fetch('/api/models', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        header: header,
        data: data,
      }),
    });
    const json = await response.json() as { models: ModelsItem[] };
    return {
      data: json.models,
      total: json.models.length,
      success: true,
    };
  } catch (error) {
    console.error('error', error);
    return { data: [], total: 0, success: false };
  }
};
// 首页因子信息
export const categoryJson = async () => {
  try {
    const response = await fetch('/api/category', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json()
    return {
      data: json.category,
      total: json.category.length,
      success: true,
    };
  } catch (error) {
    console.error('An error occurred:', error);
    return { data: [], total: 0, success: false };
  }
};


export const ModelsDetail = async (factor: string) => {
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
      time: '',
      extra: 'extra',
    };
    const response = await fetch('/api/queryModel', {
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
    console.error('An error occurred:', error);
    return {
      data: null,
      ret_code: -1,
      msg: 'error',
      extra: '',
    };
  }
};
//更新代码
export const updateModelCode = async (factor: string, code: string, text: string) => {
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
      code: code,
      text: text,
      time: '',
      extra: 'extra',
    };
    const response = await fetch('/api/updateModelCode', {
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

export const getModelData = async (factor: string) => {
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
      time: '',
      extra: 'extra',
    };
    const response = await fetch('/api/modelData', {
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

export const uploadFileService = async (formData: FormData) => {
  try {
    console.log("获取到的请求data", formData);
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData, // 直接将 FormData 作为请求体
    });

    const json = await response.json();
    console.log("后端返回的", json.data);
    return {
      data: json.data,
      success: true,
    };
  } catch (error) {
    console.error('上传文件时出错:', error);
    throw error;
  }
};