import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    DatasetComponent,
    GridComponent,
    VisualMapComponent,
    DataZoomComponent,
    ToolboxComponent,

} from 'echarts/components';
import { BarChart, LineChart, CustomChart, PieChart } from 'echarts/charts';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout,
    BarChart,
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer,
    VisualMapComponent,
    DataZoomComponent,
    LegendComponent,
    ToolboxComponent,
    LineChart,
    CustomChart,
    CanvasRenderer,
    UniversalTransition
]);

const DefaultChart = ({
    // eCharts配置
    optionData = {},
    // 设置默认宽度和高度
    width = '100%',
    height = '400px',
}) => {
    const chartRef = useRef(null);
    const option = optionData;
    // console.log(optionData, 'optionData')

    useEffect(() => {
        if (chartRef.current) {
            const myChart = echarts.init(chartRef.current);
            myChart.setOption(option);
        }
    }, [optionData]);

    return <div ref={chartRef} style={{ width: width, height: height, margin: 'auto', }} />;
};

export default DefaultChart;
