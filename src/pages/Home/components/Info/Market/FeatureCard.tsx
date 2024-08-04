import React, { useMemo } from 'react';
import { Card, Carousel, Typography } from 'antd';
import Risk from '../../News/Market/Risk';
import './FeatureCard.css'; // 引入自定义样式文件
import ReactMarkdown from 'react-markdown';

interface Props {
    title: string,
    data: any[],
    text: string,
}

interface FeatureCardProps {
    items: Props[];
    loading?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ items, loading }) => {
    // console.log(items)

    const mapToEchartsConfig = (list: Props[], zoomStart: number, zoomEnd: number): any[] => {
        // console.log(list)
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

    const sentData = useMemo(() => mapToEchartsConfig(items, 80, 100), [items]);

    return (
        <Carousel
            arrows
            // dotPosition="top"
            infinite={false}
            dots
        // autoplay={true}
        // autoplaySpeed={3000}
        >
            {sentData.map((item, index) => (
                <Card
                    key={index}
                    title={item.echartsConf.name}
                    type="inner"
                >
                    <Risk legendData={item.echartsConf.name} dataZoom={item.dataZoom} seriesData={item.echartsConf} />
                    <Typography.Paragraph
                        ellipsis={{
                            expandable: true,
                            onExpand: (event) => event.altKey,
                        }}
                        copyable
                    >
                        <ReactMarkdown>
                            {item.textContent}
                        </ReactMarkdown>
                    </Typography.Paragraph>
                </Card>
            ))}
        </Carousel>
    );
};

export default FeatureCard;
