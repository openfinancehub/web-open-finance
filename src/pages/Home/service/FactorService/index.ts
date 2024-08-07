import { GETRequest } from '../apiConfig';
import { PostRequest } from '../apiConfig';


const apiUrl = 'http://129.204.166.171:5002/api/info/';
// const apiPushUrl = 'http://129.204.166.171:5002/api/';

export class FactorService {
    public static getModels(factor: string): Promise<any> {
        const dataStr = {
            header: {
                req_id: '1234',
                req_src: 'source',
                user: 'user',
                token: 'token',
            },
            data: {
                ip: '127.0.0.1',
                factor: factor,
                model: 'author',
                time: '',
                extra: 'extra',
            }
        };
        return PostRequest(`${apiUrl}` + 'models', dataStr);
    }

    // 获取py代码
    public static getCode(factor: string, model: string): Promise<any> {
        const dataStr = {
            header: {
                req_id: '1234',
                req_src: 'source',
                user: 'user',
                token: 'token',
            },
            data: {
                ip: '127.0.0.1',
                factor: model,
                model: 'author',
                time: '',
                extra: 'extra',
            }
        };

        return PostRequest(`${apiUrl}` + 'getCode', dataStr);
    };
    // 更新models
    public static updateCode(factor: string, model: string, code: string, text: string, extra: string): Promise<any> {
        const dataStr = {
            header: {
                req_id: '1234',
                req_src: 'source',
                user: 'user',
                token: 'token',
            },
            data: {
                ip: '127.0.0.1',
                factor,
                model,
                code,
                text,
                time: '',
                extra,
            }
        };

        return PostRequest(`${apiUrl}` + 'updateCode', dataStr);
    };

    // model图形界面展示
    public static getEval(factor: string, model: string, inputValue: string): Promise<any> {
        let dataStr = {
            header: {
                req_id: '1234',
                req_src: 'source',
                user: 'user',
                token: 'token',
            },
            data: {
                ip: '127.0.0.1',
                factor: model,
                model: "default",
                input: inputValue,
                time: '',
                extra: 'extra',
            }

        };
        return PostRequest(`${apiUrl}` + 'eval', dataStr);
    };

    // 获取因子分类
    public static categoryJson(): Promise<any> {
        return GETRequest(`${apiUrl}` + 'category',);
    };


    public static uploadFileService(formData: FormData): Promise<any> {
        return PostRequest('http://121.37.5.77:5003/api/upload', formData)
    };
}

// export const uploadFileService = async (formData: FormData) => {
//     try {
//         let header = {
//             req_id: '1234',
//             req_src: 'source',
//             user: 'user',
//             token: 'token',
//         };

//         const response = await fetch('http://121.37.5.77:5003/api/upload', {
//             method: 'POST',
//             body: JSON.stringify({
//                 header: header,
//                 data: formData
//             }),
//         });
//         const json = await response.json();
//         return {
//             data: json.data,
//             ret_code: json.ret_code,
//             msg: json.msg,
//             extra: json.extra
//         };
//     } catch (error) {
//         console.error('上传文件时出错:', error);
//         return {
//             data: null,
//             ret_code: -1,
//             msg: 'error',
//             extra: '',
//         };
//     }
// };



