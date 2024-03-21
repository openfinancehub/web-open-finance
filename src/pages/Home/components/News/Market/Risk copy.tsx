import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    VisualMapComponent,
    DataZoomComponent
} from 'echarts/components';
import { LineChart, CustomChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    VisualMapComponent,
    DataZoomComponent,
    LineChart,
    CustomChart,
    CanvasRenderer,
    UniversalTransition
]);
import { test } from '../../../service';

const WindChart = () => {
    const chartRef = useRef(null);
    const [data, setData] = React.useState<any[]>([]);
    
    const fetchData = async () => {
        const response = await test();
        const a = response.data.data.map(function (entry) {
            return [entry.time, entry.windSpeed, entry.R, entry.waveHeight];
        });
        setData(a);

        const directionMap: Record<string, number> = {};
        // prettier-ignore
        ['W', 'WSW', 'SW', 'SSW', 'S', 'SSE', 'SE', 'ESE', 'E', 'ENE', 'NE', 'NNE', 'N', 'NNW', 'NW', 'WNW'].forEach(function (name, index) {
            directionMap[name] = Math.PI / 8 * index;
        });

        // 定义维度映射
        const dims = {
            time: 0,
            windSpeed: 1,
            R: 2,
            waveHeight: 3,
            weatherIcon: 2,
            minTemp: 3,
            maxTemp: 4
        };
        const arrowSize = 18;
        // 箭头的配置
        const renderArrow = function (param, api) {
            const point = api.coord([
                api.value(dims.time),
                api.value(dims.windSpeed)
            ]);
            return {
                type: 'path',
                shape: {
                    pathData: 'M31 16l-15-15v9h-26v12h26v9z',
                    x: -arrowSize / 2,
                    y: -arrowSize / 2,
                    width: arrowSize,
                    height: arrowSize
                },
                rotation: directionMap[api.value(dims.R)],
                position: point,
                style: api.style({
                    stroke: '#555',
                    lineWidth: 1
                })
            };
        };
        // 图标的配置
        const option = {
            title: {
                text: '风险指数',
                subtext: '示例数据源于 www.seabreeze.com.au',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    return [
                        echarts.format.formatTime(
                            'yyyy-MM-dd',
                            params[0].value[dims.time]
                        ) +
                        ' ' +
                        echarts.format.formatTime('hh:mm', params[0].value[dims.time]),
                        '风速：' + params[0].value[dims.windSpeed],
                        '风向：' + params[0].value[dims.R],
                        '浪高：' + params[0].value[dims.waveHeight]
                    ].join('<br>');
                }
            },
            grid: {
                top: 160,
                bottom: 125
            },
            xAxis: {
                type: 'time',
                maxInterval: 3600 * 1000 * 24,
                splitLine: {
                    lineStyle: {
                        color: '#ddd'
                    }
                }
            },
            yAxis: [
                {
                    name: '风速（节）',
                    nameLocation: 'middle',
                    nameGap: 35,
                    axisLine: {
                        lineStyle: {
                            color: '#666'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#ddd'
                        }
                    }
                },
                {
                    name: '浪高（米）',
                    nameLocation: 'middle',
                    nameGap: 35,
                    max: 6,
                    axisLine: {
                        lineStyle: {
                            color: '#015DD5'
                        }
                    },
                    splitLine: { show: false }
                },
                {
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: { show: false },
                    splitLine: { show: false }
                }
            ],
            visualMap: {
                type: 'piecewise',
                // show: false,
                orient: 'horizontal',
                left: 'center',
                bottom: 10,
                pieces: [
                    {
                        gte: 17,
                        color: '#18BF12',
                        label: '大风（>=17节）'
                    },
                    {
                        gte: 11,
                        lt: 17,
                        color: '#f4e9a3',
                        label: '中风（11  ~ 17 节）'
                    },
                    {
                        lt: 11,
                        color: '#D33C3E',
                        label: '微风（小于 11 节）'
                    }
                ],
                seriesIndex: 1,
                dimension: 1
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    minSpan: 5
                },
                {
                    type: 'slider',
                    xAxisIndex: 0,
                    minSpan: 5,
                    bottom: 50
                }
            ],
            series: [
                {
                    type: 'line',
                    yAxisIndex: 1,
                    showSymbol: false,
                    emphasis: {
                        scale: false
                    },
                    symbolSize: 10,
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            global: false,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'rgba(88,160,253,1)'
                                },
                                {
                                    offset: 0.5,
                                    color: 'rgba(88,160,253,0.7)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(88,160,253,0)'
                                }
                            ]
                        }
                    },
                    lineStyle: {
                        color: 'rgba(88,160,253,1)'
                    },
                    itemStyle: {
                        color: 'rgba(88,160,253,1)'
                    },
                    encode: {
                        x: dims.time,
                        y: dims.waveHeight
                    },
                    data: data,
                    z: 2
                },
                {
                    type: 'custom',
                    renderItem: renderArrow,
                    encode: {
                        x: dims.time,
                        y: dims.windSpeed
                    },
                    data: data,
                    z: 10
                },
                {
                    type: 'line',
                    symbol: 'none',
                    encode: {
                        x: dims.time,
                        y: dims.windSpeed
                    },
                    lineStyle: {
                        color: '#aaa',
                        type: 'dotted'
                    },
                    data: data,
                    z: 1
                }
            ]
        };

        if (chartRef.current) {
            const myChart = echarts.init(chartRef.current);
            myChart.setOption(option);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return <div ref={chartRef} style={{ width: '100%', height: '600px' }} />;
};

export default WindChart;
