import React, { useEffect, useRef } from 'react';
import { Chart, Line, Column, DataView } from '@ant-design/charts';
import DataSet from '@antv/data-set';
export default function MyChart() {
    const chartContainer = useRef(null);
    const sliderContainer = useRef(null);

    useEffect(() => {
        if (chartContainer.current && sliderContainer.current) {
            const data = [
                // 数据集
            ];

            const chart = new Chart({
                container: chartContainer.current,
                autoFit: true,
                padding: 'auto',
            });

            const ds = new DataSet();
            const dv = ds.createView().source(data);

            const lineView = chart.createView();
            lineView.data(dv.rows);
            lineView.scale({
                x: { nice: true },
                y: { nice: true },
            });
            lineView
                .line()
                .position('x*y')
                .color('type');

            const columnView = chart.createView();
            columnView.data(dv.rows);
            columnView.scale({
                x: { nice: true },
                y: { nice: true },
            });
            columnView
                .interval()
                .position('x*y')
                .color('type')
                .adjust('stack');

            const slider = new DataView.Slider({
                container: sliderContainer.current,
                start: 0.2,
                end: 0.8,
                data,
                xAxis: 'x',
                yAxis: 'y',
                onChange: ({ startValue, endValue }) => {
                    chart.filter('x', (val) => {
                        const x = val as number;
                        return x >= startValue && x <= endValue;
                    });
                    chart.render();
                },
            });

            chart.render();
        }
    }, []);

    return (
        <div>
            <div ref={chartContainer} />
            <div ref={sliderContainer} />
        </div>
    );
}