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
    const response = await fetch('/api/queryModel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
