export interface ModelsItem {
    download: number;
    icon: string;
    jump_url: string;
    like: string;
    model: string;
    tag: number;
    time: string;
}

export interface header {
    req_id: string;
    req_src: string;
    user: string;
    token: string;
}

export interface dataString {
    ip: string;
    factor: string;
    time: string;
    extra: string;
}


type Description = {
    factor: string,
    icon: string,
    jump_url: string,
};

type ListCategoryType = {
    title: string,
    description: Description[],
}[];

export interface transCategory {
    id: String,
    value: String,
    children: []
};