import React, { useMemo, useRef } from 'react';
import { Card, Carousel, Divider } from 'antd';
import Risk from './Risk';
import './FeatureCard.css'; // 引入自定义样式文件
import ReactMarkdown from 'react-markdown';
import { Space, Swiper } from 'antd-mobile'
import { SwiperRef } from 'antd-mobile/es/components/swiper'

import styles from './FeatureCard.css'

interface Props {
    title: string,
    data: any[],
    text: string,
}

interface FeatureCardProps {
    items: Props[];
}

const FeatureCard: React.FC<FeatureCardProps> = ({ items }) => {
    // console.log(items)

    const mapToEchartsConfig = (list: Props[], zoomStart: number, zoomEnd: number): any[] => {
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

    const ref = useRef<SwiperRef>(null)

    return (
        // <Carousel
        //     arrows
        //     // dotPosition="top"
        //     infinite={false}
        //     dots
        // // autoplay={true}
        // // autoplaySpeed={3000}
        // >
        //     {sentData.map((item, index) => (
        //         <Card
        //             key={index}
        //             title={item.echartsConf.name}
        //             type="inner"
        //         >
        //             <Card style={{ margin: '16px 0 16px 0' }}>
        //                 <Risk legendData={item.echartsConf.name} dataZoom={item.dataZoom} seriesData={item.echartsConf} />
        //             </Card>
        //             <Card style={{ margin: '16px 0 16px 0' }}>
        //                 <ReactMarkdown>
        //                     {item.textContent}
        //                 </ReactMarkdown>
        //             </Card>
        //         </Card>
        //     ))
        //     }
        // </Carousel >
        <div className="swiper-container">
            <button
                className="prev-button"
                onClick={() => {
                    ref.current?.swipePrev()
                }}
            >上一张</button>
            <Swiper ref={ref}
                slideSize={94}
                trackOffset={3}
                stuckAtBoundary={false}
                indicator={(total, current) => (
                    <div className="customIndicator">
                        {`${current + 1} / ${total}`}
                    </div>
                )
                }>
                {
                    sentData.map((item, index) => (
                        <Swiper.Item key={index} >
                            <Card
                                key={index}
                                title={item.echartsConf.name}
                                type="inner"
                            >
                                <Card style={{ margin: '16px 0 16px 0' }}>
                                    <Risk legendData={item.echartsConf.name} dataZoom={item.dataZoom} seriesData={item.echartsConf} />
                                </Card>
                                <Card style={{ margin: '16px 0 16px 0' }}>
                                    <ReactMarkdown>
                                        {item.textContent}
                                    </ReactMarkdown>
                                </Card>
                            </Card>
                        </Swiper.Item>
                    ))
                }
            </Swiper >

            <button
                className="next-button"
                onClick={() => {
                    ref.current?.swipeNext()
                }}
            >下一张</button>
        </div >

    );
};

export default FeatureCard;
