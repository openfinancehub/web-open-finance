import React, { useEffect } from 'react';
import * as echarts from 'echarts/core';
import { GaugeChart, GaugeSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { Divider } from 'antd';

echarts.use([GaugeChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<GaugeSeriesOption>;

const EChartsComponent: React.FC<{ size: number }> = ({ size }) => {
    // console.log(size, '收到得size')
    const chartRef = React.useRef<HTMLDivElement>(null);
    const getOption = (): EChartsOption => {
        return {
            series: [
                {
                    type: 'gauge',
                    startAngle: 200,
                    endAngle: -20,
                    center: ['50%', '65%'],
                    radius: '120%',
                    min: 0,
                    max: 1,
                    splitNumber: 10,
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            width: 30,
                            color: [
                                [0.125, '#1E8CF8'],
                                [0.25, '#4E75CC'],
                                [0.375, '#5F6DBC'],
                                [0.5, '#7E5D9D'],
                                [0.625, '#9D4E81'],
                                [0.75, '#AB4673'],
                                [0.875, '#CC3755'],
                                [1, '#E82839']
                            ]
                        }
                    },
                    pointer: {
                        // icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                        // length: '12%',
                        // width: 20,
                        offsetCenter: [0, '-20%'],
                        itemStyle: {
                            color: 'auto'
                        }
                    },
                    axisTick: {
                        length: 0,
                        lineStyle: {
                            color: 'auto',
                            width: 2
                        }
                    },
                    splitLine: {
                        distance: 20,
                        length: 30,
                        lineStyle: {
                            color: 'auto',
                            width: 3
                        }
                    },
                    axisLabel: {
                        color: '#464646',
                        fontSize: 12,
                        distance: 0,
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
                        offsetCenter: [0, '0%'],
                        valueAnimation: true,
                        color: 'inherit'
                    },
                    data: [
                        {
                            value: size,
                            // name: ''
                        }
                    ]
                },
            ]
        };
    };

    useEffect(() => {
        const initChart = () => {
            if (chartRef.current) {
                const myChart = echarts.init(chartRef.current);
                const option = getOption();
                myChart.setOption(option);
            }
        };
        requestAnimationFrame(initChart);
    }, [size]);

    return (
        <div ref={chartRef} style={{ width: "50%", height: "350px", float: 'inline-start' }} />
    )

};

export default EChartsComponent;
