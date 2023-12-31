
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
    const response = await fetch('http://121.37.5.77:5003/api/upload', {
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

const apiUrl = 'http://121.37.5.77:5003/api';
// get通用请求
const performGETRequest = async (url: string, header: { req_id?: string; req_src?: string; user?: string; token?: string; }) => {
  try {
    let requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`${apiUrl}/${url}`, requestConfig);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    let result = await response.json();

    return { result };
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// post通用请求
const performPostRequest = async (url: string, method: string, header: { req_id?: string; req_src?: string; user?: string; token?: string; }, data: { ip?: string; factor?: any; model?: any; time?: string; extra?: any; code?: any; text?: any; }) => {
  try {
    let requestConfig = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // 只有在 POST、PUT 或 DELETE 请求时才包含请求体
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      requestConfig.body = JSON.stringify({
        header,
        data,
      });
    }

    const response = await fetch(`${apiUrl}/${url}`, requestConfig);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    let result = await response.json();

    if (!data) {
      throw new Error('Response data is empty or not valid JSON');
    }
    return { result };
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export const getModels = async (factor: string) => {
  const header = {
    req_id: '1234',
    req_src: 'source',
    user: 'user',
    token: 'token',
  };

  const dataStr = {
    ip: '127.0.0.1',
    factor: factor,
    model: 'author',
    time: '',
    extra: 'extra',
  };
  return performPostRequest('models', 'POST', header, dataStr);
};

export const categoryJson = async () => {
  return performGETRequest('category', {});
};
// 获取models代码
export const getCode = async (factor: string, model: string) => {
  const header = {
    req_id: '1234',
    req_src: 'source',
    user: 'user',
    token: 'token',
  };

  const dataStr = {
    ip: '127.0.0.1',
    factor: model,
    model: 'author',
    time: '',
    extra: 'extra',
  };

  return performPostRequest('getCode', 'POST', header, dataStr);
};
// 更新models
export const updateCode = async (factor: string, model: string, code: string, text: string, extra: string) => {
  const header = {
    req_id: '1234',
    req_src: 'source',
    user: 'user',
    token: 'token',
  };

  const dataStr = {
    ip: '127.0.0.1',
    factor,
    model,
    code,
    text,
    time: '',
    extra,
  };

  return performPostRequest('updateCode', 'POST', header, dataStr);
};
// models详情页图形
export const getModelData = async (factor: string, model: string) => {
  const header = {
    req_id: '1234',
    req_src: 'source',
    user: 'user',
    token: 'token',
  };
  const dataStr = {
    ip: '127.0.0.1',
    factor: model,
    model: "default",
    time: '',
    extra: 'extra',
  };
  return performPostRequest('test', 'POST', header, dataStr);
};

export const getEval = async (factor: string, model: string, inputValue: string) => {
  let header = {
    req_id: '1234',
    req_src: 'source',
    user: 'user',
    token: 'token',
  };
  let dataStr = {
    ip: '127.0.0.1',
    factor: model,
    model: "default",
    input: inputValue,
    time: '',
    extra: 'extra',
  };
  return performPostRequest('eval', 'POST', header, dataStr);
};

//上传文件
// export const uploadFileService = async (formData) => {
//   const header = {
//     req_id: '1234',
//     req_src: 'source',
//     user: 'user',
//     token: 'token',
//   };

//   return performPostRequest('upload', 'POST', header, formData);
// };
