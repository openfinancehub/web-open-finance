import React, { useEffect, useRef } from 'react';
import G6 from '@antv/g6';
import { message } from 'antd';
import { modelsJson, categoryJson } from '../service';
import { ModelsItem, header, dataString } from '../data';

let head: header = {
  req_id: '1234',
  req_src: 'source',
  user: 'user',
  token: 'token',
};
let dataStr: dataString = {
  ip: '127.0.0.1',
  factor: '',
  time: '',
  extra: 'extra',
};

const transformData = (inputData: { [x: string]: any[]; }) => {
  const categories = Object.keys(inputData);
  return {
    id: 'Category',
    children: categories.map(category => ({
      id: category,
      value: category,
      children: inputData[category].map(factor => ({ id: factor.factor, value: factor.factor })),
    })),
    value: 'Category'
  };
}

const fetchDataAndCreateGraph = async (graphRef: React.MutableRefObject<G6.TreeGraph>,
  containerRef: React.RefObject<HTMLDivElement>,
  handleTriggerEvent) => {
  try {
    const dataJson = await categoryJson();
    const transformedData = transformData(dataJson.data);

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const width = containerRef.current.clientWidth;
    const height = container.clientHeight || 500;

    const graph = new G6.TreeGraph({
      container,
      width,
      height,
      linkCenter: true,
      modes: {
        default: [
          {
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              return item ? (item.getModel().collapsed = collapsed, true) : false;
            },
          },
          'drag-canvas',
          'zoom-canvas',
        ],
      },
      defaultNode: {
        size: 26,
      },
      layout: {
        type: 'dendrogram',
        direction: 'LR',
        nodeSep: 20,
        rankSep: 100,
        radial: true,
      },
    });

    // 颜色映射，用于每一层级的节点颜色
    const colorMapping = {
      '0': '#F0E68C',
      '1': '#ADD8E6',
      '2': 'pink',
    };

    graph.node((node) => {
      const depth = (node.depth || 0) as keyof typeof colorMapping;
      return {
        label: node.id,
        style: {
          fill: colorMapping[depth] || 'red', // 使用对应层级的颜色，如果没有设置则默认为红色
        },
      };
    });

    graph.data(transformedData);
    graph.render();
    graph.fitView();

    // 添加节点点击事件监听器
    graph.on('node:click', (evt) => {
      const nodeValue = evt.item?.getModel();
      if (nodeValue) {
        // console.log('点击了', nodeValue.value);
        if (nodeValue.value === dataStr.factor) {
          nodeValue.value = ''
        }
        dataStr.factor = nodeValue.value as string;
        handleTriggerEvent();
      }
    });

    graphRef.current = graph; // 存储图形实例
  } catch (error) {
    console.error(error);
    message.error('数据获取失败，请刷新页面重试！');
  }
};


const DemoRadialTreeGraph = ({ onFilterFinance }: { onFilterFinance: (data: any) => void }) => {
  const containerRef = useRef(null);
  const graphRef = useRef<G6.TreeGraph>();

  //初始化因子结构数据
  const handleTriggerEvent = async () => {
    const dataJson = await modelsJson(head, dataStr);
    onFilterFinance(dataJson.data);
  };

  useEffect(() => {
    fetchDataAndCreateGraph(graphRef, containerRef, handleTriggerEvent);

    return () => {
      if (graphRef.current) {
        graphRef.current.destroy();
      }
    };
  }, []);

  return <div ref={containerRef} id="container" />;
};

export default DemoRadialTreeGraph;
