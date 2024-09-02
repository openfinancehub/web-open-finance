import { Card, Drawer, InputNumber } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { ProCard, ProTable } from '@ant-design/pro-components';
import PDFContent from './PDFContent';

const Text: React.FC = () => {
    const [page, setPage] = useState<number>(0);
    // https://api.idocv.com/view/url?url=http%3a%2f%2fapi.idocv.com%2fdata%2fdoc%2ftest.pdf
    // https://pdf.dfcfw.com/pdf/H2_AN202408191639329975_1.pdf?1724068313000.pdf
    const [url, setUrl] = useState<string>();

    const changeURL = (value: string) => {
        setUrl(value)
    }


    return (
        <div >
            <div>
                <a onClick={() => changeURL(`https://www.pwithe.com/Public/Upload/download/20170211/589ebf8e5bb13.pdf`)}>
                    open PDF
                </a>
                <InputNumber min={1} max={10} defaultValue={1} />
            </div>
            {url ? <PDFContent url={url}></PDFContent> : <div></div>}
        </div >
    );
};

export default Text;