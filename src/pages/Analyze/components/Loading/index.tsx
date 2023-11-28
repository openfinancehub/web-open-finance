import { useEffect,useRef } from "react"
import * as echarts from 'echarts/core';
import { GraphicComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([GraphicComponent, CanvasRenderer]);

const Loading = ()=>{
    const loadingRef = useRef(null)
    useEffect(()=>{
        const option = {
            elements: [
                {
                  type: 'group',
                  left: 'center',
                  top: 'center',
                  children: new Array(7).fill(0).map((val, i) => ({
                    type: 'rect',
                    x: i * 20,
                    shape: {
                      x: 0,
                      y: -40,
                      width: 10,
                      height: 80
                    },
                    style: {
                      fill: '#5470c6'
                    },
                    keyframeAnimation: {
                      duration: 1000,
                      delay: i * 200,
                      loop: true,
                      keyframes: [
                        {
                          percent: 0.5,
                          scaleY: 0.3,
                          easing: 'cubicIn'
                        },
                        {
                          percent: 1,
                          scaleY: 1,
                          easing: 'cubicOut'
                        }
                      ]
                    }
                  }))
                }
            ]
        }
        const chart = echarts.init(loadingRef.current);
        chart.setOption(option);
    },[])
    return(
        <div ref={loadingRef}></div>
    )
}
export default Loading
