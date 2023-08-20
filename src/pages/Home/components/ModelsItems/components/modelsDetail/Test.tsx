import React, { useEffect } from 'react';
import G6 from '@antv/g6';

const MyGraph: React.FC = () => {
  useEffect(() => {
    const container = document.getElementById('container');
    if (!container) return;

    const LIMIT_OVERFLOW_WIDTH = container.scrollWidth;
    const LIMIT_OVERFLOW_HEIGHT = container.scrollHeight || 500;

    const graph = new G6.Graph({
      container: 'container',
      width: LIMIT_OVERFLOW_WIDTH,
      height: LIMIT_OVERFLOW_HEIGHT,
      linkCenter: true,
      modes: {
        default: ['drag-canvas'],
      },
      defaultNode: {
        type: 'bubble',
        size: 95,
        labelCfg: {
          position: 'center',
          style: {
            fill: 'white',
            fontStyle: 'bold',
          },
        },
      },
      
      defaultEdge: {
        stroke: '#000',
        lineWidth: 2,
        lineAppendWidth: 4,
        endArrow: true,
        labelCfg: {
          style: {
            fill: '#000',
          },
        },
      },
    });

    // Fetch and load data when component mounts
    fetch('https://gw.alipayobjects.com/os/bmw-prod/fc6e64fc-be94-40fb-b9e2-2d13dd414f38.json')
      .then((res) => res.json())
      .then((data) => {
        graph.data(data); // Load data into the graph
        graph.render();   // Render the graph
      });

    // Handle resizing
    const handleResize = () => {
      if (!graph || graph.get('destroyed')) return;
      if (!container || !container.scrollWidth || !container.scrollHeight) return;
      graph.changeSize(container.scrollWidth, container.scrollHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div id="container" style={{ width: '100%', height: '100vh' }}></div>;
};

export default MyGraph;
