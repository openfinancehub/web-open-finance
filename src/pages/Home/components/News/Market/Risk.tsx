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
import { Restore } from '@mui/icons-material';

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

const WindChart = ({
    seriesData = {},
    dataZoom = {},
    legendData = {},
}) => {
    const chartRef = useRef(null);

    // 图表的配置
    const option = {
        // title: {
        //     text: ''
        // },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: legendData
        },
        grid: {
            left: '4%',   // 调整左侧距离，给图例留空间
            right: '4%',
            // containLabel: true,
        },
        toolbox: {
            feature: {
                saveAsImage: {},
                restore: {},
            },
            right: 10,
            top: 'top',
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
        },
        yAxis: {
            type: 'value'
        },
        dataZoom: dataZoom,
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
