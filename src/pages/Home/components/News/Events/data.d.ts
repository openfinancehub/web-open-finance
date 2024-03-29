import {
    America, China, Britain, Japan, Australia, Germany,
    France, Eurobond, Switzerland, Italy, Canada, Russia, HongKong
} from '../Image';

export interface economicType {
    actual: string,
    affect: number,
    consensus: string,
    country: '美国' | '中国' | '欧元区' | '英国' | '日本' | '德国' | '法国' | '加拿大' | '澳大利亚' | '瑞士' | '意大利' | '俄罗斯' | '中国香港',
    id: number,
    indicator_id: number,
    name: string,
    previous: string,
    pub_time: Date,
    pub_time_unix: number,
    revised: string,
    show_affect: number,
    star: number,
    time_period: string,
    time_status: string,
    unit: string,
    video_url: string,
    vip_resource: string,
}

export interface eventType {
    country: '美国' | '中国' | '欧元区' | '英国' | '日本' | '德国' | '法国' | '加拿大' | '澳大利亚' | '瑞士' | '意大利' | '俄罗斯' | '中国香港',
    determine: number,
    emergencies: number,
    event_content: string,
    event_time: Date,
    id: number,
    note: string,
    people: string,
    region: string,
    star: number,
    vip_resource: string,
}

export const countryFlags = {
    '美国': America,
    '中国': China,
    '欧元区': Eurobond,
    '英国': Britain,
    '日本': Japan,
    '德国': Germany,
    '法国': France,
    '加拿大': Canada,
    '澳大利亚': Australia,
    '巴西': 'https://example.com/brazil_flag.png',
    '中国香港': HongKong,
    '瑞士': Switzerland,
    '意大利': Italy,
    '俄罗斯': Russia,
};