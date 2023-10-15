import React, { useEffect, useState } from 'react';
import { DecompositionTreeGraph } from '@ant-design/graphs';
import styles from './style.less';
import { getModelData } from '@/pages/Home/service';
type TreeGraphData = import('@antv/g6-core/lib/types').TreeGraphData;
import { useLocation } from 'react-router-dom';

interface IDataValue {
  title: string,
  items: Array<{ text: string, value?: string, icon?: string }>,
}

interface IChildren {
  id: string,
  value: IDataValue,
  children?: Array<IChildren>,
}

interface IData {
  id: string,
  value: IDataValue,
  children?: Array<IChildren>,
}

const defaultData = {
  id: 'A0',
  value: {
    title: '',
    items: [
      {
        text: '',
      },
    ],
  },
  children: [],
};

const convertDataToTreeGraphData = (data: IData): TreeGraphData => {
  const treeGraphData: TreeGraphData = {
    id: data.id,
    label: data.value.title, 
    children: data.children?.map((child) => convertDataToTreeGraphData(child)),
  };
  return treeGraphData;
};

const DemoDecompositionTreeGraph = () => {
  const [data, setData] = useState<TreeGraphData>(defaultData);
  //获取请求中的model数据
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const modelValue = searchParams.get('model')!;
  const factorValue = searchParams.get('factor')!;

  useEffect(() => {
    // 在组件加载时从后端获取数据
    getModelData(factorValue, modelValue)
      .then((response) => {
        if (response.ret_code == 0) {
          console.log(response.data)
          // setData(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  // 自定义样式
  const stroke = '#EA2F97';
  const nodeStyle = (arg: { value: { percent: number; }; }) => ({
    fill: '#fff',
    radius: 2,
    // stroke: arg.value.percent > 0.3 ? stroke : '#1f8fff',
  });

  const percentStyle = (arg: { value: { percent: number; }; }) => ({
    radius: [0, 0, 0, 2],
    // fill: arg.value.percent > 0.3 ? stroke : '#1f8fff',
  });

  const markerStyle = (arg: { value: { percent: number; }; }) => ({
    // stroke: arg.value.percent > 0.3 ? stroke : '#1f8fff',
  });

  return (
    <div className={styles['decomposition-tree-graph-container']}>
      <DecompositionTreeGraph
        data={data}
        nodeCfg={{
          size: [140, 25],
          percent: {
            position: 'bottom',
            size: 4,
            style: percentStyle,
          },
          items: {
            containerStyle: {
              fill: '#fff',
            },
            padding: 6,
            style: (cfg: any, group: any, type: string) => {
              const styles = {
                icon: {
                  width: 12,
                  height: 12,
                },
                value: {
                  fill: '#f00',
                },
                text: {
                  fill: '#aaa',
                },
              };
              return styles[type];
            },
          },
          nodeStateStyles: {
            hover: {
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
          style: nodeStyle,
        }}
        edgeCfg={{
          label: {
            style: {
              fill: '#aaa',
              fontSize: 12,
              fillOpacity: 1,
            },
          },
          style: (edge) => ({
            stroke: '#518AD3',
            strokeOpacity: 0.5,
          }),
          endArrow: {
            fill: '#518AD3',
          },
          edgeStateStyles: {
            hover: {
              strokeOpacity: 1,
            },
          },
        }}
        markerCfg={(cfg) => ({
          position: 'right',
          show: cfg.children?.length ?? 0,
          style: markerStyle,
        })}
        behaviors={['drag-canvas', 'zoom-canvas', 'drag-node']}
      />
    </div>
  );
};

export default DemoDecompositionTreeGraph;
