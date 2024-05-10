import React, { useRef } from 'react'
import { Button, NavBar, Space, Swiper, Toast } from 'antd-mobile'
import { history } from 'umi';
import { SearchOutline, MoreOutline, CloseOutline } from 'antd-mobile-icons'

const Demo: React.FC<{}> = () => {
    const right = (
        <div style={{ fontSize: 24 }}>
            <Space style={{ '--gap': '16px' }}>
                <SearchOutline />
                <MoreOutline />
            </Space>
        </div>
    )
    const back = () => {
        Toast.show({
            content: '点击了返回区域',
            duration: 1000,
        })
        history.back()
    }

    return (
        <>
            <NavBar right={right} onBack={back}>
                事件详情界面
            </NavBar>
            {/* <button onClick={() => { history.back() }}>返回</button> */}
            {/* <div title='循环'>
                事件详情界面
            </div> */}
        </>
    )
}
export default Demo;