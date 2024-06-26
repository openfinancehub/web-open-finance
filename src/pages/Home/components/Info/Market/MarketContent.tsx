import React, { useEffect, useState } from 'react';
import { Avatar, Card, Col, Divider, Typography } from 'antd';
import { MarketService } from '../../../service';
import { ProCard } from '@ant-design/pro-components';
import SearchCompany from '../../FinanceModels/SearchCompany';
import FeatureCard from './FeatureCard'

import type { MenuProps } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import News from '../../News';
// interface MenuItem {
//     key: string;
//     label: string;
//     type?: string;
//     children?: MenuItem[];
// }
type MenuItem = Required<MenuProps>['items'][number];


interface FeatureItem {
    title: string;
    data: any[][];
    text: string;
}


const MsgCard: React.FC = () => {
    const [loading, setLoading] = useState(true);

    const [dangerList, setFeaturesList] = useState<any[]>([]);
    const [dangerSize, setDangerSize] = useState<number>(0);
    const [dangerText, setDangerText] = useState<string>('');

    const [sentList, setSentList] = useState<any[]>([]);
    const [sentSize, setSentSize] = useState<number>(0);
    const [sentText, setSentText] = useState<string>('');

    const [NavList, setNavList] = useState<any[]>([]);

    // 在组件的state中添加一个refs对象来存储图表的ref
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
            onChange(true)
        } catch (error) {
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

    const sentData = mapToEchartsConfig(sentList, 80, 100);
    const seriesData = mapToEchartsConfig(dangerList, 80, 100);

    useEffect(() => {
        fetchDataAndProcess(MarketService.getSentiment, setSentList, setSentText, setSentSize);
        fetchDataAndProcess(MarketService.getDanger, setFeaturesList, setDangerText, setDangerSize);
    }, []);

    const onChange = (checked: boolean) => {
        setLoading(!checked);
    };

    // 初始化refs对象
    useEffect(() => {
        const newRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {};
        NavList.forEach(item => {
            newRefs[item] = React.createRef();
        });
        setChartRefs(newRefs);
    }, [NavList]);

    return (
        <ProCard gutter={16} wrap>
            <ProCard headerBordered>
                <SearchCompany />
            </ProCard>
            <ProCard headerBordered >
                <Typography>
                    <blockquote style={{ fontSize: '1.5em', fontWeight: 'bold', color: 'red', textAlign: 'left' }}>今日热度</blockquote>
                </Typography>
                <Divider />

                {sentData.map((item, index) => (
                    <div>
                        <FeatureCard
                            key={index}
                            item={item}
                            loading={loading}
                            refCallback={chartRefs[item.textContent]}
                        />
                        <br /><br /><br />
                    </div>
                ))}

                <Typography>
                    <blockquote style={{ fontSize: '1.5em', fontWeight: 'bold', color: 'red', textAlign: 'left' }}>危险指数</blockquote>
                </Typography>
                <Divider />

                {seriesData.map((item, index) => (
                    <div>
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

export default MsgCard;