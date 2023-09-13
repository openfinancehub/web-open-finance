import React, { useState, useEffect } from 'react';
import { ProCard, ProFormCascader } from '@ant-design/pro-components';
import { Select, } from 'antd';
const { Option } = Select;

import { Mix } from '@ant-design/plots';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MyComponentProps {
    // Define any props required by the component
}

const Factor: React.FC<MyComponentProps> = () => {

    const [stockData, setData] = useState([]);
    const [lineData, setlineData] = useState([]);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/antfincdn/ZWgtj7pC%261/stock.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
        fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
            .then((response) => response.json())
            .then((json) => setlineData(json))
            .catch((error) => {
              console.log('fetch data failed', error);
            });
    };

    useEffect(() => {
        asyncFetch();
    }, []);

    const averageData = [
        {
          date: '2015-02',
          value: 21168,
        },
        {
          date: '2015-08',
          value: 21781,
        },
        {
          date: '2016-01',
          value: 23818,
        },
        {
          date: '2017-02',
          value: 25316,
        },
        {
          date: '2018-01',
          value: 26698,
        },
        {
          date: '2018-08',
          value: 27890,
        },
    ];
      const config = {
        appendPadding: 8,
        tooltip: {
          shared: true,
        },
        slider: {},
        syncViewPadding: true,
        plots: [
          {
            type: 'line',
            options: {
              data: averageData,
              xField: 'date',
              yField: 'value',
              xAxis: false,
              yAxis: {
                type: 'log',
                max: 100000,
              },
              label: {
                offsetY: -8,
              },
              meta: {
                value: {
                  alias: '平均租金(元)',
                },
              },
              color: '#FF6B3B',
              annotations: averageData.map((d) => {
                return {
                  type: 'dataMarker',
                  position: d,
                  point: {
                    style: {
                      stroke: '#FF6B3B',
                      lineWidth: 1.5,
                    },
                  },
                };
              }),
            },
          },
          {
            type: 'line',
            options: {
              data: [
                {
                  date: '2015-02',
                  value: null,
                },
                {
                  date: '2015-08',
                  value: 0.029,
                },
                {
                  date: '2016-01',
                  value: 0.094,
                },
                {
                  date: '2017-02',
                  value: 0.148,
                },
                {
                  date: '2018-01',
                  value: 0.055,
                },
                {
                  date: '2018-08',
                  value: 0.045,
                },
              ],
              xField: 'date',
              yField: 'value',
              xAxis: false,
              yAxis: {
                line: null,
                grid: null,
                position: 'right',
                max: 0.16,
                tickCount: 8,
              },
              meta: {
                date: {
                  sync: 'date',
                },
                value: {
                  alias: '递增',
                  formatter: (v) => `${(v * 100).toFixed(1)}%`,
                },
              },
              smooth: true,
              label: {
                callback: (value) => {
                  return {
                    offsetY: value === 0.148 ? 36 : value === 0.055 ? 0 : 20,
                    style: {
                      fill: '#1AAF8B',
                      fontWeight: 700,
                      stroke: '#fff',
                      lineWidth: 1,
                    },
                  };
                },
              },
              color: '#1AAF8B',
            },
          },
        ],
      };

    return (
    <ProCard gutter={16} ghost wrap>
        <div style={{width:500}}>
        <Mix {...config} />;
        </div>
    </ProCard>
    )

}
export default Factor;
