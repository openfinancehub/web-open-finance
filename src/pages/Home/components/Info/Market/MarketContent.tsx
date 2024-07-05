import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Card, Col, Divider, Layout, Typography } from 'antd';
import { MarketService } from '../../../service';
import { ProCard } from '@ant-design/pro-components';
import SearchCompany from '../../FinanceModels/SearchCompany';
import FeatureCard from './FeatureCard'

import News from '../../News';
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

const MarketContent: React.FC = () => {
    const [loading, setLoading] = useState(true);

    const [dangerList, setFeaturesList] = useState<any[]>([]);
    // 危险指数
    const [dangerSize, setDangerSize] = useState<number>(0);
    // 危险指数文本
    const [dangerText, setDangerText] = useState<string>('');

    const [sentList, setSentList] = useState<any[]>([]);
    // 热度解读指数
    const [sentSize, setSentSize] = useState<number>(0);
    // 热度解读文本
    const [sentText, setSentText] = useState<string>('');

    // 在组件的state中添加一个refs对象来存储图表的ref
    const [NavList, setNavList] = useState<any[]>([]);
    const [chartRefs, setChartRefs] = useState<{ [key: string]: React.RefObject<HTMLDivElement> }>({});

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

    // 抽取图表所需要的数据
    const mapToEchartsConfig = (list: FeatureItem[], zoomStart: number, zoomEnd: number): any[] => {
        return list.map((feature, index) => ({
            echartsConf: {
                name: feature.title,
                type: 'line',
                stack: 'Total',
                data: feature.data
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: feature.data.length < 20 ? 0 : zoomStart,
                    end: feature.data.length < 20 ? 100 : zoomEnd,
                    zoomLock: true,
                },
                {
                    start: zoomStart,
                    end: zoomEnd,
                }
            ],
            textContent: feature.text
        }));
    };

    useEffect(() => {
        fetchDataAndProcess(MarketService.getSentiment, setSentList, setSentText, setSentSize);
        fetchDataAndProcess(MarketService.getDanger, setFeaturesList, setDangerText, setDangerSize);
    }, []);


    // 初始化refs对象
    useEffect(() => {
        const newRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {};
        NavList.forEach(item => {
            newRefs[item] = React.createRef();
        });
        setChartRefs(newRefs);
    }, [NavList]);

    const sentData = useMemo(() => mapToEchartsConfig(sentList, 80, 100), [sentList]);
    const seriesData = useMemo(() => mapToEchartsConfig(dangerList, 80, 100), [dangerList]);

    return (
        <ProCard direction="column" wrap>
            <ProCard headerBordered>
                <SearchCompany />
            </ProCard>
            <ProCard >
                <Typography>
                    <blockquote style={{ fontSize: '1.5em', fontWeight: 'bold', color: 'red', textAlign: 'left' }}>今日热度指数表</blockquote>
                </Typography>
                <Divider />
            </ProCard>
            <ProCard >
                <ProCard >
                    <Gauge size={sentSize} />
                </ProCard>
                <ProCard >
                    <ReactMarkdown>一部分热度解读内容</ReactMarkdown>
                </ProCard>
            </ProCard>
            <ProCard >
                <ReactMarkdown>{sentText}</ReactMarkdown>
            </ProCard>
            <ProCard headerBordered >
                {sentData.map((item, index) => (
                    <div key={index}>
                        <FeatureCard
                            key={index}
                            item={item}
                            loading={loading}
                            refCallback={chartRefs[item.textContent]}
                        />
                        <br /><br /><br />
                    </div>
                ))}
            </ProCard>
            <ProCard >
                <Typography>
                    <blockquote style={{ fontSize: '1.5em', fontWeight: 'bold', color: 'red', textAlign: 'left' }}>危险指数</blockquote>
                </Typography>
                <Divider />
            </ProCard>
            <ProCard >
                <ProCard >
                    <Gauge size={dangerSize} />
                </ProCard>
                <ProCard >
                    <ReactMarkdown>一部分危险指数内容</ReactMarkdown>
                </ProCard>
            </ProCard>
            <ProCard >
                <ReactMarkdown>{dangerText}</ReactMarkdown>
            </ProCard>
            <ProCard >
                {seriesData.map((item, index) => (
                    <div key={index}>
                        <FeatureCard
                            key={index}
                            item={item}
                            loading={loading}
                            refCallback={chartRefs[item.textContent]}
                        />
                        <br /><br /><br />
                    </div>
                ))}
            </ProCard>
        </ProCard >

    );
};

export default MarketContent;