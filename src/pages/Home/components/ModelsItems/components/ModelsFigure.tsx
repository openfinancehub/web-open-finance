import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { getModelData } from '@/pages/Home/service';
import { useLocation } from 'react-router-dom';
import { FlowAnalysisGraph } from '@ant-design/graphs';

type Nodes = {
  nodes: {
    id: string;
    value: {
      title: string;
      items: {
        text: string;
        value: string;
        icon: string;
        trend: string;
      }[];
    };
  };
  edges: {
    source: string;
    target: string;
  }[];
};


const DemoDecompositionTreeGraph = () => {
  const [data, setData] = useState<Nodes[] | null>(null);

  const transformData = (inputData: { relation: any; nodes: any; }) => {
    const { relation, nodes } = inputData;
    const nodesValue = Object.entries(nodes).map(([id, value]) => ({ id, value: { title: id + " ", items: value } }));
    return { nodes: nodesValue, edges: relation };
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const modelValue = searchParams.get('model')!;
  const factorValue = searchParams.get('factor')!;

  const fetchData = async () => {
    // 在组件加载时从后端获取数据
    await getModelData(factorValue, modelValue).then((resp) => {
      if (resp.data.ret_code === 0) {

        const transformedData = transformData(resp.data.data.chart)
        // console.log(transformedData)
        setData(transformedData);
      }
    }).catch((err) => {
      console.error('Error fetching data:', err);
    })
  };
  useEffect(() => {
    fetchData();
  }, []);

  // console.log(data)
  if (data === null) {
    return (
      <div>
        <span>错误</span>
        <label >
          {message.error("获取数据失败")}
        </label>
      </div>
    );
  }
  console.log(data)
  const config = {
    data: data,
    nodeCfg: {
      size: [180, 30],
      items: {
        padding: 6,
        containerStyle: {
          fill: '#fff',
        },
      },
      customContent: (item: { text: any; value: any; icon: any; trend: any; }, group: { addShape: (arg0: string, arg1: { attrs: { textBaseline: string; x: any; y: any; text: any; fill: string; } | { textBaseline: string; x: any; y: any; text: any; fill: string; } | { x: any; y: any; width: number; height: number; img: any; } | { textBaseline: string; x: any; y: any; text: any; fill: string; }; name: string; }) => any; }, cfg: { startX: any; startY: any; width: any; }) => {
        const { startX, startY, width } = cfg;
        const { text, value, icon, trend } = item;
        text &&
          group?.addShape('text', {
            attrs: {
              textBaseline: 'top',
              x: startX,
              y: startY,
              text,
              fill: '#aaa',
            },
            // group 内唯一字段
            name: `text-${Math.random()}`,
          });
        value &&
          group?.addShape('text', {
            attrs: {
              textBaseline: 'top',
              x: startX + 60,
              y: startY,
              text: value,
              fill: '#000',
            },
            name: `value-${Math.random()}`,
          });
        icon &&
          group?.addShape('image', {
            attrs: {
              x: startX + 100,
              y: startY,
              width: 8,
              height: 10,
              img: icon,
            },
            name: `image-${Math.random()}`,
          });
        trend &&
          group?.addShape('text', {
            attrs: {
              textBaseline: 'top',
              x: startX + 110,
              y: startY,
              text: trend,
              fill: '#f00',
            },
            name: `value-${Math.random()}`,
          });

        // 行高
        return 14;
      },
      nodeStateStyles: {
        hover: {
          stroke: '#1890ff',
          lineWidth: 2,
        },
      },
      title: {
        containerStyle: {
          fill: 'transparent',
        },
        style: {
          fill: '#000',
          fontSize: 12,
        },
      },
      style: {
        fill: '#E6EAF1',
        stroke: '#B2BED5',
        radius: 2,
      },
    },
    edgeCfg: {
      label: {
        style: {
          fill: '#aaa',
          fontSize: 12,
          fillOpacity: 0.5,
        },
      },
      edgeStateStyles: {
        hover: {
          stroke: '#1890ff',
          lineWidth: 2,
        },
      },
    },
    markerCfg: (cfg: { id: string; }) => {
      const { edges } = data;
      return {
        position: 'right',
        show: edges.find((item) => item.source === cfg.id),
      };
    },
    layout: {
      ranksepFunc: () => 30,
      nodesepFunc: () => 30,
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
  };

  return <FlowAnalysisGraph {...config} />;
};

export default DemoDecompositionTreeGraph;
