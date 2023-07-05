// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import { RadialTreeGraph } from '@ant-design/graphs';
// import { categoryJson } from '../service';

// const def = {
//   id: 'Category',
//   value: 'Category',
//   children: []
// }
// const transformData = (inputData: { [children: string]: any[]; }) => {
//   const categories = Object.keys(inputData);
//   return {
//     id: 'Category',
//     children: categories.map(category => ({
//       id: category,
//       value: category,
//       children: inputData[category].map(factor => ({ id: factor.factor, value: factor.factor })),
//     })),
//     value: 'Category'
//   };
// }

// const DemoRadialTreeGraph = () => {
//   type DataType = { id: string, children: { id: string, value: string, children: any }[], value: String }
//   const [data, setData] = useState<DataType>(def);
//   // 初始化数据
//   useEffect(() => {
//     const fetchCategories = async () => {
//       const response = await categoryJson();
//       if (response && response.data) {
//         const transformedData = transformData(response.data);
//         setData(transformedData);
//       } else {
//         console.error("error");
//       }
//     }

//     fetchCategories();
//   }, []);

//   // 点击处理函数
//   const handleNodeClick = (node: any) => {
//     console.log('Clicked node:', node);
//   };

//   const config = {
//     data,
//     nodeCfg: {
//       type: 'circle',
//       size: 40,
//       style: (node: { depth: any; }) => {
//         let color = '';
//         switch (node.depth) {
//           case 0: color = '#F0E68C'; break;
//           case 1: color = '#ADD8E6'; break;
//           default: color = 'pink'; break;
//         }
//         return {
//           fill: color,
//           stroke: color
//         };
//       },
//       events: {
//         onClick: (evt: any, node: any) => {
//           console.log('Clicked node:', node);
//         },

//       },
//     },
//     // onReady: (graph) => {
//     //   console.log(graph)
//     //   graph.downloadFullImage('tree-graph', {
//     //     backgroundColor: '#ddd',
//     //     padding: [30, 15, 15, 15],
//     //   });
//     // },
//     layout: {
//       type: 'compactBox',
//       direction: 'RL',
//       nodeSep: 20,
//       rankSep: 100,
//       getId: function getId(d: { id: any; }) {
//         return d.id;
//       },
//       getHeight: () => {
//         return 20;
//       },
//       getWidth: () => {
//         return 20;
//       },
//       getVGap: () => {
//         return 20;
//       },
//       getHGap: () => {
//         return Math.random() * 40;
//       },
//       radial: true,
//     },
//     behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
//   };

//   return <RadialTreeGraph {...config} />;
// };

// export default DemoRadialTreeGraph;
