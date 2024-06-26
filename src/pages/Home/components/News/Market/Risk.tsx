import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    VisualMapComponent,
    DataZoomComponent,
    LegendComponent,
    ToolboxComponent
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
    LegendComponent,
    ToolboxComponent,
    LineChart,
    CustomChart,
    CanvasRenderer,
    UniversalTransition
]);
import { test } from '../../../service';
import { getDanger } from '../../../service';

const WindChart = ({
    seriesData = {},
    legendData,
}) => {
    const chartRef = useRef(null);

    // console.log(seriesData, 'seriesData')
    // console.log(legendData, 'legendData')
    // 图表的配置
    const option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: legendData
        },
        grid: {},
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
        },
        yAxis: {
            type: 'value'
        },
        dataZoom: [
            {
                type: 'inside',
                start: 80,
                end: 100,
            },
            {
                start: 50,
                end: 100,
            }
        ],
        series: seriesData
    };

    useEffect(() => {
        if (chartRef.current) {
            const myChart = echarts.init(chartRef.current);
            myChart.setOption(option);
        }
    }, [seriesData]);

    return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default WindChart;
