import React, { useEffect } from 'react';

import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer
]);

const EChartsComponent: React.FC<{ titleName: string, xData: any[], yData: number[] }> = ({ titleName, xData, yData }) => {
    // console.log(xData, 'xData')
    // console.log(yData, 'yData')
    const chartRef = React.useRef<HTMLDivElement>(null);
    const getOption = () => {
        return {
            title: {
                text: titleName
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {},
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: yData,
            },
            series: [
                {
                    name: '',
                    type: 'bar',
                    data: xData
                },
                // {
                //     name: '2012',
                //     type: 'bar',
                //     data: [19325, 23438, 31000, 121594, 134141, 681807]
                // }
            ]
        };
    };

    // useEffect(() => {
    //     const initChart = () => {
    //         if (chartRef.current) {
    //             const myChart = echarts.init(chartRef.current);
    //             const option = getOption();
    //             myChart.setOption(option);
    //         }
    //     };

    //     requestAnimationFrame(initChart);
    // }, [xData, yData]);

    let animationFrameId: number;

    useEffect(() => {
        const initChart = () => {
            if (chartRef.current) {
                const myChart = echarts.init(chartRef.current);
                const option = getOption();
                myChart.setOption(option);
            }
        };

        animationFrameId = requestAnimationFrame(initChart);

        return () => {
            cancelAnimationFrame(animationFrameId); // 添加清理函数，取消动画帧请求
        };
    }, [xData, yData]);


    return (
        <div ref={chartRef} style={{ width: "100%", height: "350px", float: 'inline-start' }} />
    )

};

export default EChartsComponent;
