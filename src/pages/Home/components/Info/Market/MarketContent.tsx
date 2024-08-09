import { useEffect, useState } from 'react';
import { MarketService } from '../../../service';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';
import Gauge from './Gauge';
import FeatureCard from './FeatureCard';
import ReactMarkdown from 'react-markdown';

interface FeatureItem {
    title: string;
    data: any[][];
    text: string;
}

interface FetchDataResult {
    features?: FeatureItem[];
    summary?: any;
}

interface MarketContentProps {
    fetchDataUrl: () => Promise<any>;
    title: string;
}

function useFetchMarketData(url: () => Promise<any>): FetchDataResult {
    const [features, setFeatures] = useState<FeatureItem[]>();
    const [summary, setSummary] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await url();
            if (!response) {
                console.error('Error: Response is undefined');
                return;
            }
            const { features = {}, summary = {} } = response.result || {};

            const processedFeatures = Object.entries(features).reduce((acc, [indicators, dataValue]) => {
                const { TIME, result, text } = dataValue;
                const keys = Object.keys(TIME)[0];

                const formattedData = typeof TIME[keys] === 'object' && !Array.isArray(TIME)
                    ? TIME[keys].map((item: any, index: string | number) => [item, result[keys][index]])
                    : [TIME, result];

                acc.push({ title: indicators, data: formattedData, text });
                return acc;
            }, [] as FeatureItem[]);

            setFeatures(processedFeatures);
            setSummary(summary);
        };

        fetchData();
    }, [url]);


    return { features, summary };
}

const MarketContent: React.FC<MarketContentProps> = ({ fetchDataUrl, title }) => {
    const { features, summary } = useFetchMarketData(fetchDataUrl);

    const [gaugeValue, setGaugeValue] = useState<number>(0);

    useEffect(() => {
        if (summary) {
            const shangZhiZhenShu = summary['上证指数'];
            const substring = shangZhiZhenShu.toString().substring(0, 4);
            const floatNum = parseFloat(substring);
            const res = parseFloat((floatNum / 100).toFixed(2));
            // console.log(res, "res")
            setGaugeValue(res);
        }
    }, [summary]);

    return (
        <ProCard direction="column" style={{ marginBlockStart: 8 }} gutter={8} wrap>
            <ProCard>
                <Typography>
                    <blockquote style={{ fontSize: '1.5em', fontWeight: 'bold', color: 'red', textAlign: 'left' }}>{title}</blockquote>
                </Typography>
                <Divider />
            </ProCard>
            <ProCard>
                <div>
                    <Gauge size={gaugeValue} />
                    <ReactMarkdown>{summary?.text}</ReactMarkdown>
                </div>
            </ProCard>
            <ProCard>
                <FeatureCard items={features || []} />
            </ProCard>
        </ProCard>
    );
};

export const SentContent: React.FC = () => {
    return (
        <MarketContent
            fetchDataUrl={MarketService.getSentiment}
            title="今日热度指数表"
        />
    );
};

export const DangerContent: React.FC = () => {
    return (
        <MarketContent
            fetchDataUrl={MarketService.getDanger}
            title="危险指数"
        />
    );
};