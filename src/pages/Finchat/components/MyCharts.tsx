import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function MyCharts({chartData}: any) {
    console.log(chartData, 123)
  const chartRef = useRef(null);

  // 在组件挂载后初始化图表
  useEffect(() => {
    console.log(chartData, 12312)
    const chart = echarts.init(chartRef.current);
    
    // 配置图表选项
    const options = {
      title: {
        text: 'ECharts 示例图表',
      },
      xAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'D', 'E'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '示例数据',
          type: 'bar',
          data: [5, 10, 15, 20, 25],
        },
      ],
    };

    chart.setOption(options);

    // 在组件卸载时销毁图表，防止内存泄漏
    return () => {
      chart.dispose();
    };
  }, [chartData]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>;
}

export default MyCharts;
