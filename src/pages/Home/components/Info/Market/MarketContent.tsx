import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Card, Carousel, Col, Divider, Layout, Typography } from 'antd';
import { MarketService } from '../../../service';
import { ProCard } from '@ant-design/pro-components';
import SearchCompany from '../../FinanceModels/SearchCompany';
import FeatureCard from './FeatureCard'

import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Gauge from './Gauge';
interface FeatureItem {
    title: string;
    data: any[][];
    text: string;
}
interface FetchDataResult {
    features?: FeatureItem[];
    summary?: any;
}


// const MarketContent: React.FC = () => {
//     return (
//         <ProCard direction="column" wrap>
//             <SentContent />
//             <DangerContent />
//         </ProCard >
//     );
// };

export const SentContent: React.FC = () => {
    const [loading, setLoading] = useState(true);

    const [sentList, setSentList] = useState<any[]>([]);
    // 热度解读指数
    const [sentSize, setSentSize] = useState<number>(0);
    // 热度解读文本
    const [sentText, setSentText] = useState<string>('');

    // 在组件的state中添加一个refs对象来存储图表的ref
    const [NavList, setNavList] = useState<any[]>([]);

    const fetchDataAndProcess = async (url: () => Promise<any>,
        setList: any,
        setText: any, setSize: any) => {
        const response = await url();
        try {
            const { features = [], summary = {} } = response.result || {};
            let textsToAppend: string[] = [];
            Object.keys(features).forEach(feature => {
                const time = features[feature].TIME
                const result = features[feature].result
                const text = features[feature].text

                textsToAppend.push(text);
                const keys = Object.keys(time)[0];
                if (typeof time[keys] === 'object' && !Array.isArray(time)) {
                    const r = time[keys].map((item: any, index: string | number) => {
                        return [item, result[keys][index]]
                    });
                    setList((prevState: any) => [...prevState, { title: feature, data: r, text: text }]);
                } else {
                    const r = [time, result];
                    setList((prevState: any) => [...prevState, { title: feature, data: r, text: text }]);
                }
            });
            setNavList((prevState: any[]) => [...prevState, ...textsToAppend]);

            const textContent = summary.text;
            const shangZhiZhenShu = summary['上证指数'];
            const substring = shangZhiZhenShu.toString().substring(0, 4)
            const floatNum = parseFloat(substring)
            const res = parseFloat((floatNum / 100).toFixed(2))
            setSize(res);
            setText(textContent)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    };

    useEffect(() => {
        fetchDataAndProcess(MarketService.getSentiment, setSentList, setSentText, setSentSize);
    }, []);


    // 初始化refs对象
    useEffect(() => {
        const newRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {};
        NavList.forEach(item => {
            newRefs[item] = React.createRef();
        });
    }, [NavList]);

    return (
        <ProCard direction="column" style={{ marginBlockStart: 8 }} gutter={8} wrap>
            <ProCard >
                <Typography>
                    <blockquote style={{ fontSize: '1.5em', fontWeight: 'bold', color: 'red', textAlign: 'left' }}>今日热度指数表</blockquote>
                </Typography>
                <Divider />
            </ProCard>
            <ProCard >
                <ProCard >
                    <Gauge size={sentSize} />
                    <ReactMarkdown>{sentText}</ReactMarkdown>
                </ProCard>
                {/* <ProCard colSpan={{ xs: 20, sm: 16, md: 12, lg: 12, xl: 12 }}>
                    <Gauge size={sentSize} />
                </ProCard>
                <ProCard >
                    <ReactMarkdown>{sentText}</ReactMarkdown>
                </ProCard> */}

            </ProCard>
            <ProCard>
                <FeatureCard
                    items={sentList}
                    loading={loading}
                />
            </ProCard>
        </ProCard >

    );
};

export const DangerContent: React.FC = () => {
    const [loading, setLoading] = useState(true);

    const [dangerList, setFeaturesList] = useState<any[]>([]);
    // 危险指数
    const [dangerSize, setDangerSize] = useState<number>(0);
    // 危险指数文本
    const [dangerText, setDangerText] = useState<string>('');

    // 在组件的state中添加一个refs对象来存储图表的ref
    const [NavList, setNavList] = useState<any[]>([]);

    const fetchDataAndProcess = async (url: () => Promise<any>,
        setList: any,
        setText: any, setSize: any) => {
        const response = await url();
        try {
            const { features = [], summary = {} } = response.result || {};
            let textsToAppend: string[] = [];
            Object.keys(features).forEach(feature => {
                const time = features[feature].TIME
                const result = features[feature].result
                const text = features[feature].text

                textsToAppend.push(text);
                const keys = Object.keys(time)[0];
                if (typeof time[keys] === 'object' && !Array.isArray(time)) {
                    const r = time[keys].map((item: any, index: string | number) => {
                        return [item, result[keys][index]]
                    });
                    setList((prevState: any) => [...prevState, { title: feature, data: r, text: text }]);
                } else {
                    const r = [time, result];
                    setList((prevState: any) => [...prevState, { title: feature, data: r, text: text }]);
                }
            });
            setNavList((prevState: any[]) => [...prevState, ...textsToAppend]);

            const textContent = summary.text;
            const shangZhiZhenShu = summary['上证指数'];
            const substring = shangZhiZhenShu.toString().substring(0, 4)
            const floatNum = parseFloat(substring)
            const res = parseFloat((floatNum / 100).toFixed(2))
            setSize(res);
            setText(textContent)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    };

    useEffect(() => {
        fetchDataAndProcess(MarketService.getDanger, setFeaturesList, setDangerText, setDangerSize);
    }, []);


    // 初始化refs对象
    useEffect(() => {
        const newRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {};
        NavList.forEach(item => {
            newRefs[item] = React.createRef();
        });
    }, [NavList]);


    return (
        <ProCard direction="column" wrap>
            <ProCard >
                <Typography>
                    <blockquote style={{ fontSize: '1.5em', fontWeight: 'bold', color: 'red', textAlign: 'left' }}>危险指数</blockquote>
                </Typography>
                <Divider />
            </ProCard>
            <ProCard >
                <ProCard >
                    <Gauge size={dangerSize} />
                    <ReactMarkdown>{dangerText}</ReactMarkdown>
                </ProCard>
            </ProCard>
            <ProCard>
                <FeatureCard
                    items={dangerList}
                    loading={loading}
                />
            </ProCard>

        </ProCard >

    );
};

// export default MarketContent;