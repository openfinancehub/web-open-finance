// FeatureCard.tsx
import React from 'react';
import { Card, Typography } from 'antd';
import Risk from '../../News/Market/Risk';

interface Props {
    item: {
        echartsConf: any;
        dataZoom: any[];
        textContent: string;
    };
    loading: boolean;
    refCallback: React.LegacyRef<HTMLDivElement>;
}

const FeatureCard: React.FC<Props> = ({ item, loading, refCallback }) => {
    const { echartsConf, dataZoom, textContent } = item;

    return (
        <Card
            title={textContent}
            ref={refCallback}
            type="inner"
            loading={loading}
        >
            <Risk legendData={[echartsConf.name]} dataZoom={dataZoom} seriesData={echartsConf} />
            <Typography.Paragraph
                ellipsis={{
                    expandable: true,
                    onExpand: (event) => event.altKey,
                }}
                copyable
            >
                {textContent}
            </Typography.Paragraph>
        </Card>
    );
};

export default FeatureCard;