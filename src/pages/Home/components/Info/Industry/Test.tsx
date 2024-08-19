import { Card, Drawer } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { size } from 'lodash';

const Text: React.FC = () => {
    const [responsive, setResponsive] = useState(false);
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <ProCard split={responsive ? 'horizontal' : 'vertical'}>
            <ProCard bordered>
                <a type="primary" onClick={showDrawer}>
                    Open
                </a>
                <Drawer
                    // title="Basic Drawer"
                    placement="right"
                    closable={false}
                    size={'large'}
                    onClose={onClose}
                    open={open}
                    getContainer={false}
                    style={{ position: 'absolute', height: '80vh', }}
                >
                    <embed
                        src="https://pdf.dfcfw.com/pdf/H2_AN202408191639329975_1.pdf?1724068313000.pdf#page=4"
                        title="PDF Viewer"
                        width="100%"
                        height="500px"
                    />
                </Drawer>
            </ProCard>
            {/* <ProCard bordered>
            </ProCard> */}
        </ProCard >
    );
};

export default Text;