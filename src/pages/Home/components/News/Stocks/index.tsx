import React, { useRef } from 'react'
import { Button, Space, Swiper, Toast } from 'antd-mobile'
import { history } from 'umi';
const Demo: React.FC<{}> = () => {

    return (
        <>
            <button onClick={() => { history.back() }}>返回</button>
            <div title='循环'>
                股票详情界面
            </div>
        </>
    )
}
export default Demo;