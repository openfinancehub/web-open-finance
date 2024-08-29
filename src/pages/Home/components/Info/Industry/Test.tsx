import { Card, Drawer, InputNumber } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { ProCard, ProTable } from '@ant-design/pro-components';


const Text: React.FC = () => {
    const [page, setPage] = useState<number>(0);
    // https://api.idocv.com/view/url?url=http%3a%2f%2fapi.idocv.com%2fdata%2fdoc%2ftest.pdf
    const [url, setUrl] = useState(`https://pdf.dfcfw.com/pdf/H3_AP202404151630216109_1.pdf?1717004850000.pdf#page=` + page);
    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    };

    const onChange = (value: number) => {
        setPage(value);
        setUrl(`https://pdf.dfcfw.com/pdf/H3_AP202404151630216109_1.pdf?1717004850000.pdf#page=${value}`);
        console.log(url);
    };

    const showDrawer = () => {
        setOpen(true);
    };


    return (
        <ProCard split={'vertical'}>
            <ProCard bordered>
                <a type="primary" onClick={showDrawer}>
                    open PDF
                </a>
                <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} />

            </ProCard>
            <Drawer
                // title="Basic Drawer"
                placement="right"
                closable={false}
                size={'large'}
                onClose={onClose}
                open={open}
                getContainer={false}
                style={{ height: '80vh', }}
            >
                <embed
                    src={url}
                    title="PDF Viewer"
                    width="100%"
                    height="100%"
                />
            </Drawer>
        </ProCard >
    );
};

export default Text;