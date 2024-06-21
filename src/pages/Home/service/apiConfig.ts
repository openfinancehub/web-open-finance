// get通用请求
export const GETRequest = async (url: string) => {
    try {
        const requestConfig = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(`${url}`, requestConfig);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

// post通用请求
export const PostRequest = async (url: string, data: any) => {
    try {
        const header = {
            req_id: '1234',
            req_src: 'source',
            user: 'user',
            token: 'token',
        };

        const requestConfig = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                header,
                data,
            })
        };

        const response = await fetch(`${url}`, requestConfig);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        if (!data) {
            throw new Error('Response data is empty or not valid JSON');
        }
        return result;
    } catch (error) {
        console.error('An error occurred:', error);
    }
};