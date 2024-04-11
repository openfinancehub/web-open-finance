import React, { useEffect } from 'react';
import * as echarts from 'echarts/core';
import { GaugeChart, GaugeSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { Divider } from 'antd';

echarts.use([GaugeChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<GaugeSeriesOption>;

const EChartsComponent: React.FC<{ size: number }> = ({ size }) => {
    const chartRef = React.useRef<HTMLDivElement>(null);
    const getOption = (grade: number): EChartsOption => {
        return {
            series: [
                {
                    type: 'gauge',
                    startAngle: 270,
                    endAngle: 90,
                    center: ['100%', '50%'],
                    radius: '190%',
                    min: 0,
                    max: 1,
                    splitNumber: 8,
                    axisLine: {
                        lineStyle: {
                            width: 6,
                            color: [
                                [0.25, '#EA6508'],
                                [0.5, '#E60314'],
                                [0.75, '#A30035'],
                                [1, '#690015']
                            ]
                        }
                    },
                    pointer: {
                        icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                        length: '12%',
                        width: 20,
                        offsetCenter: [0, '-60%'],
                        itemStyle: {
                            color: 'auto'
                        }
                    },
                    axisTick: {
                        length: 12,
                        lineStyle: {
                            color: 'auto',
                            width: 2
                        }
                    },
                    splitLine: {
                        length: 20,
                        lineStyle: {
                            color: 'auto',
                            width: 5
                        }
                    },
                    axisLabel: {
                        color: '#464646',
                        fontSize: 12,
                        distance: -40,
                        rotate: 'tangential',
                        formatter: function (value: number) {
                            return '';
                        }
                    },
                    // title: {
                    //     offsetCenter: [-40, '115%'],
                    //     fontSize: 12
                    // },
                    detail: {
                        fontSize: 18,
                        offsetCenter: [-25, '0%'],
                        valueAnimation: true,
                        formatter: function (value: number) {
                            return Math.round(value * 100) + '';
                        },
                        color: 'inherit'
                    },
                    data: [
                        {
                            value: grade,
                            name: ''
                        }
                    ]
                },
            ]
        };
    };

    useEffect(() => {
        if (chartRef.current) {
            const myChart = echarts.init(chartRef.current);
            // 设置图表选项
            const option = getOption(size);
            myChart.setOption(option);
        }
    }, []);

    return (
        <>
            <div ref={chartRef} style={{ width: '100%', height: '280px', float: 'right' }} />
        </>
    )

};

export default EChartsComponent;
