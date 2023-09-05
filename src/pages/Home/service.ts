import { ModelsItem, header, dataString } from './data';

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
    console.error('An error occurred:', error);
    return { data: [], total: 0, success: false };
  }
};


// let header = {
//   req_id: '1234',
//   req_src: 'source',
//   user: 'user',
//   token: 'token',
// };
// let dataStr = {
//   ip: '127.0.0.1',
//   factor: '',
//   time: '',
//   extra: 'extra',
// };

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


export const ModelsDetail = async (id: string) => {
  try {
    let header = {
      req_id: '1234',
      req_src: 'source',
      user: 'user',
      token: 'token',
    };
    let dataStr = {
      id: id,
      code: '',
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
      // total: json.category.length,
      success: true,
    };
  } catch (error) {
    console.error('An error occurred:', error);
    return { data: [], total: 0, success: false };
  }
};

export const updateModelCode = async (id: string, code: string) => {
  try {
    let dataStr = {
      id: '127.0.0.1',
      code: '',
      time: '',
      extra: 'extra',
    };
    const response = await fetch('/api/updateModelCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: { id, code }
      }),
    });
    const json = await response.json()
    return {
      data: json.data,
      success: true,
    };
  } catch (error) {
    console.error('An error occurred:', error);
    return { data: [], total: 0, success: false };
  }
};

export const getModelData = async () => {
  try {

    const response = await fetch('/api/modelData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      // data: { id, code }
      // }),
    });
    const json = await response.json()
    console.log(json)
    return {
      data: json.data,
      success: true,
    };
  } catch (error) {
    console.error('An error occurred:', error);
    // return { data: [], total: 0, success: false };
  }
};

export const upload = async () => {
  try {

    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      // data: { id, code }
      // }),
    });
    const json = await response.json()
    console.log(json)
    return {
      data: json.data,
      success: true,
    };
  } catch (error) {
    console.error('An error occurred:', error);
    // return { data: [], total: 0, success: false };
  }
};