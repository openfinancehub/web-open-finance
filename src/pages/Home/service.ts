
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
    const response = await fetch('http://129.204.166.171:5003/api/upload', {
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

// 测试接口
export const test = async () => {

  try {
    let requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`http://127.0.0.1:8000/api/test`, requestConfig);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let result = await response.json();
    return result;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
  
const apiUrl = 'http://129.204.166.171:5002/api/info/';
// get通用请求
const GETRequest = async (url: string) => {
  try {
    let requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`${url}`, requestConfig);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    let result = await response.json();

    return result;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// post通用请求
const PostRequest = async (url: string, method: string, data: any) => {
  try {
    const header = {
      req_id: '1234',
      req_src: 'source',
      user: 'user',
      token: 'token',
    };

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

    const response = await fetch(`${url}`, requestConfig);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    let result = await response.json();

    if (!data) {
      throw new Error('Response data is empty or not valid JSON');
    }
    return result;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export const getModels = async (factor: string) => {
  const dataStr = {
    ip: '127.0.0.1',
    factor: factor,
    model: 'author',
    time: '',
    extra: 'extra',
  };
  return PostRequest(`${apiUrl}` + 'models', 'POST', dataStr);
};
// 获取因子分类
export const categoryJson = async () => {
  return GETRequest(`${apiUrl}` + 'category',);
};


// 获取models代码
export const getCode = async (factor: string, model: string) => {

  const dataStr = {
    ip: '127.0.0.1',
    factor: model,
    model: 'author',
    time: '',
    extra: 'extra',
  };

  return PostRequest(`${apiUrl}` + 'getCode', 'POST', dataStr);
};
// 更新models
export const updateCode = async (factor: string, model: string, code: string, text: string, extra: string) => {

  const dataStr = {
    ip: '127.0.0.1',
    factor,
    model,
    code,
    text,
    time: '',
    extra,
  };

  return PostRequest(`${apiUrl}` + 'updateCode', 'POST', dataStr);
};

// model图形界面展示
export const getEval = async (factor: string, model: string, inputValue: string) => {

  let dataStr = {
    ip: '127.0.0.1',
    factor: model,
    model: "default",
    input: inputValue,
    time: '',
    extra: 'extra',
  };
  return PostRequest(`${apiUrl}` + 'eval', 'POST', dataStr);
};


const apiPushUrl = 'http://129.204.166.171:5002/api/';

//获取新闻信息
export const getNews = async () => {
  try {
    let requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`http://127.0.0.1:8000/api/getNews`, requestConfig);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let result = await response.json();
    return result;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// 获取市场指数  
export const getMarket = async () => {
  try {
    let requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`http://127.0.0.1:8000/api/getMarket`, requestConfig);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let result = await response.json();
    return result;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// 获取情绪热度
export const getSentiment = async () => {
  return GETRequest(`${apiPushUrl}` + 'strategy/sentiment')
};

// export const getEvents = async () => {
//   return GETRequest(`${apiPushUrl}` + 'strategy/event')
// };

export const getEvents = async (time: string) => {
  const dataStr = {
    ip: '127.0.0.1',
    model: 'author',
    date: time,
    extra: 'extra',
  };
  return PostRequest(`${apiPushUrl}` + 'strategy/event', 'POST', dataStr);
};

// 获取危险指数
export const getDanger = async () => {
  return GETRequest(`${apiPushUrl}` + 'strategy/danger')
};

// 获取公司推荐
export const getStock = async () => {
  return GETRequest(`${apiPushUrl}` + 'strategy/stock')
};


// 获取重点关注股票信息  
export const getStocks = async () => {
  try {
    let requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`http://127.0.0.1:8000/api/stocks`, requestConfig);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let result = await response.json();
    return result;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};