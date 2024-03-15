import React, { useEffect } from 'react';
import * as echarts from 'echarts/core';
import { GaugeChart, GaugeSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GaugeChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<GaugeSeriesOption>;

const EChartsComponent: React.FC = () => {
    const chartRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const getOption = (grade: number): EChartsOption => {
        return {
            series: [
                {
                    type: 'gauge',
                    startAngle: 270,
                    endAngle: 90,
                    center: ['100%', '45%'],
                    radius: '90%',
                    min: 0,
                    max: 1,
                    splitNumber: 8,
                    axisLine: {
                        lineStyle: {
                            width: 6,
                            color: [
                                [0.25, '#1D8EFB'],
                                [0.5, '#5771C4'],
                                [0.75, '#A34B7B'],
                                [1, '#E92838']
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
                        fontSize: 15,
                        distance: -40,
                        rotate: 'tangential',
                        formatter: function (value: number) {
                            // if (value === 0.875) {
                            //     return 'Grade A';
                            // } else if (value === 0.625) {
                            //     return 'Grade B';
                            // } else if (value === 0.375) {
                            //     return 'Grade C';
                            // } else if (value === 0.125) {
                            //     return 'Grade D';    
                            // }
                            return '';
                        }
                    },
                    title: {
                        offsetCenter: [-40, '115%'],
                        // formatter: function () {
                        //     console.log(this);
                        //     // 使用path标签绘制字体路径
                        //     return `<path d="M0,0 L0,50 L100,25 Z" fill="none" stroke="black" stroke-width="2" style="font-family: myfont; font-size: 16px;"></path>`;
                        // },
                        fontSize: 18
                    },
                    detail: {
                        fontSize: 30,
                        offsetCenter: [-20, '0%'],
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
                }
            ]
        };
    };

    useEffect(() => {
        if (chartRef.current ) {
            const myChart = echarts.init(chartRef.current);
            // const context = canvasRef.current.getContext('2d');
            // // 在Canvas上绘制标题
            // context.font = '16px Arial'; // 设置字体样式
            // context.fillText('Your Title Here', 10, 50); // 绘制标题文本

            // 设置图表选项
            const option = getOption(0.3);
            myChart.setOption(option);
        }
    }, []);

    return <div ref={chartRef} style={{ width: '100%', height: '280px' }}>
        {/* <canvas ref={canvasRef}></canvas> */}
    </div>;
};

export default EChartsComponent;
